---
title: 1.4 两个重要极限与极限存在准则
slug: 1-4-two-limits
part: p1
chapter: c1
order: 4
type: section
stars: 3
minutes: 22
summary: 第一个重要极限靠"凑"，第二个靠"化 1 加无穷小"，$1^{\infty}$ 型靠取对数。解答题第一题的主武器。
exam: [2022, 2023, 2024, 2025]
concepts: [c-important-limits, c-squeeze, c-one-to-infinity]
---

## 锚点结果

三个数，先自己算：

1. $\lim\limits_{x\to0}\dfrac{\tan x}{x}=1$
2. $\lim\limits_{x\to0}(1+2x)^{\frac1x}=e^{2}$
3. $\lim\limits_{x\to\infty}\left(\dfrac{x+2}{x-1}\right)^{x}=e^{3}$

三条都能在 20 秒内做出来，说明这两个重要极限到手了。做不出来看下面的"凑"的写法——**这两个极限的考法百分之百是"凑"，不是直接套**。

## 机制

### 第一个重要极限：$\sin$ 与自变量之比

$$
\lim_{x\to0}\frac{\sin x}{x}=1
$$

为什么成立（不要求会证，但知道来源能防止套错）：在 $0<x<\dfrac{\pi}{2}$ 时有

$$\sin x<x<\tan x .$$

三边同除 $\sin x$（正数，不等号方向不变）得

$$1<\frac{x}{\sin x}<\frac{1}{\cos x} .$$

两边当 $x\to0^+$ 时都趋于 $1$，由夹逼准则得 $\dfrac{x}{\sin x}\to1$，取倒数即 $\dfrac{\sin x}{x}\to1$。左侧同理（$\sin$ 是奇函数、$\cos$ 是偶函数）。

**推广形式**：只要 $\square\to0$，就有 $\dfrac{\sin \square}{\square}\to1$。$\square$ 可以是 $3x$、$x^2$、$\ln(1+x)$ 等任何趋于 $0$ 的表达式。

这就是"凑"的含义：把式子改造成 $\dfrac{\sin\square}{\square}$ 的形状，再确认 $\square\to0$。

$$\lim_{x\to0}\frac{\sin 3x}{x}=\lim_{x\to0}\frac{\sin 3x}{3x}\cdot 3=1\cdot 3=3$$

$$\lim_{x\to0}\frac{\tan x}{x}=\lim_{x\to0}\frac{\sin x}{x}\cdot\frac{1}{\cos x}=1\cdot1=1$$

:::trap
"凑"的时候**乘进去多少就要除出来多少**，不能凭空变系数。$\dfrac{\sin 3x}{x}$ 里为了凑出 $3x$，分子分母同乘 $3$，所以结果带一个 $3$。漏掉这个 $3$ 是这类题最普遍的错。
:::

### 第二个重要极限：$(1+\text{无穷小})^{\text{无穷大}}$

$$
\lim_{x\to\infty}\left(1+\frac1x\right)^{x}=e
\qquad\Longleftrightarrow\qquad
\lim_{x\to0}(1+x)^{\frac1x}=e
$$

两者是同一个极限（令 $t=\frac1x$ 互换）。**它的一般形状是 $1^{\infty}$ 型**：底数趋于 $1$，指数趋于 $\infty$。

**推广**：只要 $\square\to0$，就有 $(1+\square)^{\frac1\square}\to e$。

$$\lim_{x\to0}(1+2x)^{\frac1x}=\lim_{x\to0}\left[(1+2x)^{\frac{1}{2x}}\right]^{2}=e^{2}$$

方括号内是 $(1+\square)^{1/\square}$ 的形状（$\square=2x$），整体再取 $2$ 次方。

### $1^{\infty}$ 型的通用算法

设 $u\to1$，$v\to\infty$，则

$$
\lim u^{v}=\exp\!\left(\lim v\,(u-1)\right)
$$

**为什么**：写 $u^{v}=e^{v\ln u}$，而 $\ln u=\ln\big(1+(u-1)\big)\sim u-1$（因为 $u-1\to0$），所以 $v\ln u\sim v(u-1)$。指数上换成等价的 $v(u-1)$ 不影响极限（指数函数的连续性）。

**固定三步**：

1. 把底数写成 $1+\square$ 的形状（$\square\to0$）；
2. 算出 $v\cdot\square$ 的极限，记为 $L$；
3. 答案是 $e^{L}$。

例：$\left(\dfrac{x+2}{x-1}\right)^{x}$，先做除法：

$$\frac{x+2}{x-1}=1+\frac{3}{x-1},$$

所以 $\square=\dfrac{3}{x-1}$，$v=x$，于是

$$L=\lim_{x\to\infty}x\cdot\frac{3}{x-1}=3,\qquad \text{原式}=e^{3}.$$

:::trap
三个典型错：<br>① 把 $\square$ 找错（写成 $\frac3x$ 而不是 $\frac3{x-1}$，结果碰巧对但过程错）；<br>② 忘了 $e$ 的底；<br>③ 把 $v$ 当成 $x-1$ 后忘了它趋于无穷。<br>最稳的写法是**先做除法把分子降成常数**，再套公式。
:::

### 极限存在准则（考试只用两条）

| 准则 | 条件 | 结论 |
| --- | --- | --- |
| 夹逼准则 | $g\le f\le h$，且 $\lim g=\lim h=A$ | $\lim f=A$ |
| 单调有界准则 | 单调 + 有界 | 极限存在 |

夹逼的典型场景：$\sin$、$\cos$、$(-1)^n$ 这类**有界但震荡**的量乘上一个无穷小。

$$\lim_{x\to0}x\sin\frac1x=0$$

理由：$\left\lvert x\sin\frac1x\right\rvert\le\lvert x\rvert\to0$。"无穷小 × 有界量 = 无穷小"这句话在 2025–2026 的解答题第 5 题里直接是得分点。

## 速查

### 由两个重要极限导出的常用结果（$x\to0$）

| 极限 | 值 |
| --- | --- |
| $\lim\dfrac{\sin ax}{x}$ | $a$ |
| $\lim\dfrac{\sin ax}{\sin bx}$ | $\dfrac{a}{b}$ |
| $\lim\dfrac{\tan x}{x}$ | $1$ |
| $\lim\dfrac{\arcsin x}{x}$ | $1$ |
| $\lim\dfrac{\arctan x}{x}$ | $1$ |
| $\lim(1+ax)^{\frac bx}$ | $e^{ab}$ |
| $\lim\left(1+\dfrac{a}{x}\right)^{bx}$ | $e^{ab}$ |

### $1^{\infty}$ 型速判

| 见到 | 动作 |
| --- | --- |
| 底数 $\to1$，指数 $\to\infty$ | 取 $e^{\lim v(u-1)}$ |
| 底数形如 $\dfrac{\text{多项式}}{\text{多项式}}$ | 先做除法变成 $1+\dfrac{c}{x+\cdots}$ |
| 底数是 $(\cos x)^{1/x^2}$ 之类 | 先写 $\cos x=1+(\cos x-1)$，$\square=\cos x-1\sim-\frac{x^2}{2}$ |

## 题

:::problem id=1.4-01 level=中 source="本站自编"
求 $\lim\limits_{x\to\infty}\left(\dfrac{x+2}{x-1}\right)^{x}$。

:::ans
先做除法：$\dfrac{x+2}{x-1}=1+\dfrac{3}{x-1}$，这是 $1^{\infty}$ 型。

$$L=\lim_{x\to\infty}x\cdot\frac{3}{x-1}=3,\qquad\text{原式}=e^{3}.$$

**复算**：`1.4-01` 的 verify 用数值极限复算，得 $20.0855=e^3$。
:::
:::

:::problem id=1.4-02 level=易 source="本站自编"
求 $\lim\limits_{x\to0}\dfrac{\sin 3x}{\sin 2x}$。

:::ans
上下各自凑：

$$\frac{\sin 3x}{\sin 2x}=\frac{\frac{\sin 3x}{3x}\cdot 3x}{\frac{\sin 2x}{2x}\cdot 2x}=\frac{1\cdot 3x}{1\cdot 2x}=\frac32 .$$

所以极限为 $\dfrac32$。

:::trap
不要写成 $\dfrac{3x}{2x}$ 就直接得 $\dfrac32$ 而不说明理由——过程分要的是"两个重要极限各用一次"。在解答题里要把 $\dfrac{\sin3x}{3x}\to1$ 写出来。
:::
:::
:::

:::problem id=1.4-03 level=中 source="本站自编"
求 $\lim\limits_{x\to0}\dfrac{\ln(1+x)}{x}$。

:::ans
这是 $1^{\infty}$ 的"对数版"，用第二个重要极限推：

$$\lim_{x\to0}\frac{\ln(1+x)}{x}=\lim_{x\to0}\ln(1+x)^{\frac1x}=\ln\left[\lim_{x\to0}(1+x)^{\frac1x}\right]=\ln e=1 .$$

**注意**：这里用到了"$\ln$ 连续，可以把极限搬进 $\ln$ 里面"。

**复算**：这就是 1.5 节等价无穷小表里的 $\ln(1+x)\sim x$ 的来源。
:::
:::

:::key
解答题第 1 题（8 分）几乎一定是这一节的方法：要么"凑"第一个重要极限，要么把 $1^{\infty}$ 化成 $e^{\lim v(u-1)}$。**两个都写熟练，这 8 分就是稳的。**
:::
