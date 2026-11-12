#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""复算题库里每道题的答案。只用标准库，不依赖 sympy。

用法:
    python scripts/verify.py            # 校验全部
    python scripts/verify.py 1.5        # 只校验 id 以 1.5 开头的题

题库 kb/problems.json 每条形如:
    {
      "id": "1.5-01",
      "page": "1-5-infinitesimal",
      "level": "易",
      "answer": "1/2",            # 给人看的答案
      "expect": 0.5,              # 期望的数值（省略时从 answer 解析）
      "verify": "lim(lambda x: (1-cos(x))/x**2, 0)"
    }

verify 是一个 Python 表达式，可以用本文件提供的一组数值工具。
数学题只验最终答案是不够的，所以中间步骤也单独登记成题（"断点题"）。
"""
import json
import math
import os
import re
import sys
from fractions import Fraction

PI = math.pi
E = math.e
INF = float('inf')


# ── 数值工具 ────────────────────────────────────────────────
def _neville(xs, ys, x):
    """Neville 多项式插值，用于 Richardson 外推。"""
    n = len(xs)
    tab = [[0.0] * n for _ in range(n)]
    for i in range(n):
        tab[i][0] = ys[i]
    for k in range(1, n):
        for i in range(n - k):
            tab[i][k] = ((x - xs[i + k]) * tab[i][k - 1] + (xs[i] - x) * tab[i + 1][k - 1]) / (xs[i] - xs[i + k])
    return tab[0][n - 1]


def _extrapolate(samples, p=2.0):
    """samples: [(h, v)]，假设误差 ~ h^p，外推到 h=0。"""
    xs = [h ** p for h, _ in samples]
    ys = [v for _, v in samples]
    return _neville(xs, ys, 0.0)


def lim(f, target=0.0, side='both', h0=None, levels=7, p=None):
    """数值极限。target 可为数字或 'inf' / '-inf'。"""
    if target in ('inf', INF):
        hs = [10.0 ** k for k in range(1, levels + 1)]
        vals = [(1.0 / h, f(h)) for h in hs]
        return _extrapolate(vals, p if p is not None else 1.0)

    if target in ('-inf', -INF):
        hs = [10.0 ** k for k in range(1, levels + 1)]
        vals = [(1.0 / h, f(-h)) for h in hs]
        return _extrapolate(vals, p if p is not None else 1.0)

    a = float(target)
    scale = max(1.0, abs(a))
    h0 = h0 or 0.1 * scale

    def run(sign):
        vals = []
        for k in range(levels):
            h = h0 / (2 ** k)
            vals.append((h, f(a + sign * h)))
        return _extrapolate(vals, p if p is not None else 1.0)

    if side == 'both':
        left = run(-1)
        right = run(+1)
        if abs(left - right) > 1e-5 * max(1.0, abs(right)):
            raise AssertionError(f'左右极限不一致: 左 {left:.8g} 右 {right:.8g}')
        return (left + right) / 2
    return run(-1 if side == 'left' else +1)


def deriv(f, x, n=1):
    """数值导数（中心差分 + Richardson）。"""
    scale = max(1.0, abs(float(x)))
    h0 = 0.05 * scale
    best = None
    for k in range(6):
        h = h0 / (2 ** k)
        if n == 1:
            v = (f(x + h) - f(x - h)) / (2 * h)
        elif n == 2:
            v = (f(x + h) - 2 * f(x) + f(x - h)) / (h * h)
        else:
            raise ValueError('只支持一阶、二阶数值导数')
        samples = [(hh, vv) for hh, vv in (best or [])]
        samples.append((h, v))
        best = samples
    return _extrapolate(best, 2.0)


def d1(f, x):
    return deriv(f, x, 1)


def d2(f, x):
    return deriv(f, x, 2)


def integ(f, a, b, n=20000):
    """复合 Simpson 数值积分。"""
    if n % 2:
        n += 1
    h = (b - a) / n
    s = f(a) + f(b)
    for i in range(1, n):
        s += f(a + i * h) * (4 if i % 2 else 2)
    return s * h / 3


def F(v):
    """精确分数。"""
    return Fraction(v)


def solve(f, lo=-10.0, hi=10.0, tol=1e-12, iters=200):
    """二分法解 f(y)=0（要求 f(lo)、f(hi) 异号），用于隐函数题的数值验证。"""
    flo, fhi = f(lo), f(hi)
    if flo == 0:
        return lo
    if fhi == 0:
        return hi
    if flo * fhi > 0:
        raise AssertionError(f'区间 [{lo},{hi}] 两端不异号，无法二分')
    for _ in range(iters):
        mid = (lo + hi) / 2
        fm = f(mid)
        if abs(fm) < tol or (hi - lo) < tol:
            return mid
        if flo * fm < 0:
            hi, fhi = mid, fm
        else:
            lo, flo = mid, fm
    return (lo + hi) / 2


# ── 答案比对 ────────────────────────────────────────────────
def parse_expect(item):
    if 'expect' in item:
        return float(item['expect'])
    a = str(item['answer']).strip()
    m = re.fullmatch(r'(-?\d+)\s*/\s*(\d+)', a)
    if m:
        return float(Fraction(int(m.group(1)), int(m.group(2))))
    try:
        return float(a)
    except ValueError:
        raise SystemExit(f"{item['id']}: 答案 {a!r} 不是数字，请在题目里显式写 expect")


def close(got, want, tol=1e-6):
    if isinstance(got, complex):
        got = got.real
    if math.isinf(want) or math.isinf(got):
        return got == want
    return abs(got - want) <= tol * max(1.0, abs(want))


def main(argv):
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    kbdir = os.path.join(root, 'kb')
    items = []
    for name in sorted(os.listdir(kbdir)):
        if name.startswith('problems') and name.endswith('.json'):
            items.extend(json.load(open(os.path.join(kbdir, name), encoding='utf-8')))

    prefix = argv[1] if len(argv) > 1 else None
    sel = [it for it in items if not prefix or it['id'].startswith(prefix)]

    env = {
        'sin': math.sin, 'cos': math.cos, 'tan': math.tan,
        'asin': math.asin, 'acos': math.acos, 'atan': math.atan,
        'exp': math.exp, 'log': math.log, 'ln': math.log,
        'sqrt': math.sqrt, 'abs': abs, 'pow': pow,
        'pi': PI, 'e': E, 'inf': INF,
        'lim': lim, 'deriv': deriv, 'd1': d1, 'd2': d2, 'integ': integ, 'F': F, 'solve': solve,
        'float': float, 'int': int, 'round': round, 'max': max, 'min': min,
        '__builtins__': {},
    }

    ok = fail = 0
    for it in sel:
        try:
            want = parse_expect(it)
            got = eval(it['verify'], env)  # noqa: S307
            got = float(got)
            tol = float(it.get('tol', 1e-6))
            if close(got, want, tol):
                ok += 1
            else:
                fail += 1
                print(f"✗ {it['id']}: 期望 {it['answer']} = {want:g}，复算得到 {got:g}")
                print(f"    verify: {it['verify']}")
        except Exception as exc:  # noqa: BLE001
            fail += 1
            print(f"✗ {it['id']}: 复算出错 — {type(exc).__name__}: {exc}")
            print(f"    verify: {it['verify']}")

    print(f"\n复算完成：{ok} 通过 · {fail} 失败 · 共 {len(sel)} 题")
    return 1 if fail else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
