---
title: 公式速查卡
slug: formulas
part: p0
chapter: c0
order: 3
type: section
stars: 3
minutes: 25
summary: 期中全部会用到的公式，按"什么时候用"排。考前只背这一页。
---

## 怎么用这页

按顺序背，但真正要背到**条件反射**的只有三块：**等价无穷小**、**求导表**、**两个重要极限**。其余的是查的。

背的标准不是"看着眼熟"，是**合上屏幕能默写**。默写的顺序建议就是下面的 1→7。

---

## 1 极限的四则运算

若 $\lim f$ 与 $\lim g$ 都存在，则

$$
\lim (f\pm g)=\lim f\pm \lim g,\qquad
\lim (fg)=\lim f\cdot\lim g,\qquad
\lim\frac{f}{g}=\frac{\lim f}{\lim g}\ (\lim g\neq 0)
$$

:::trap
前提是"两个极限都存在"。$\lim f$ 不存在、$\lim g$ 不存在时，**不能**写 $\lim(f+g)=\lim f+\lim g$。选择题里这条被反复用来设陷阱。
:::

## 2 等价无穷小（$x\to 0$）

这是期中最高频的工具。**只有乘除可以直接替换，加减不能随便替换。**

| 原式 | 等价于 | 备注 |
| --- | --- | --- |
| $\sin x$ | $x$ | |
| $\tan x$ | $x$ | |
| $\arcsin x$ | $x$ | |
| $\arctan x$ | $x$ | |
| $1-\cos x$ | $\dfrac{x^2}{2}$ | 二阶，最容易忘 |
| $\ln(1+x)$ | $x$ | |
| $e^x-1$ | $x$ | |
| $a^x-1$ | $x\ln a$ | |
| $(1+x)^{\alpha}-1$ | $\alpha x$ | 广义二项式 |
| $\log_a(1+x)$ | $\dfrac{x}{\ln a}$ | |
| $x-\sin x$ | $\dfrac{x^3}{6}$ | 三阶，小题出现 |
| $\tan x-x$ | $\dfrac{x^3}{3}$ | 三阶 |
| $\tan x-\sin x$ | $\dfrac{x^3}{2}$ | 三阶；等于前两式之差 |
| $x-\arctan x$ | $\dfrac{x^3}{3}$ | 三阶 |
| $\arcsin x-x$ | $\dfrac{x^3}{6}$ | 三阶 |

:::trap
两个最常见的错：<br>① $\sin(x^2)\sim x^2$ 对，但 $\sin x - x\sim 0$ 就错了（这时 $\sin x\sim x$ 精度不够，要用三阶）。<br>② 加减法里直接替换：$\lim\dfrac{\tan x-\sin x}{x^3}$ 若把 $\tan x\sim x$、$\sin x\sim x$ 代进去，得到 $0$，**错**。正确答案是 $\dfrac12$。加减中出现同阶抵消时，必须升到更高阶。
:::

## 3 无穷小的阶

设 $\alpha,\beta$ 都是同一过程的无穷小，$\lim\dfrac{\beta}{\alpha}=c$：

| $c$ 的值 | 结论 |
| --- | --- |
| $c=0$ | $\beta$ 是 $\alpha$ 的**高阶**无穷小，记 $\beta=o(\alpha)$ |
| $c\neq 0$ 且 $c\neq 1$ | **同阶**但不等价 |
| $c=1$ | **等价**无穷小，记 $\alpha\sim\beta$ |
| $c=\infty$ | $\beta$ 是 $\alpha$ 的**低阶**无穷小 |

判阶的标准动作：**把两个无穷小相除，算这个极限**。不要凭感觉。

## 4 两个重要极限

$$
\lim_{x\to 0}\frac{\sin x}{x}=1
\qquad\qquad
\lim_{x\to\infty}\left(1+\frac1x\right)^{x}=e
=\lim_{x\to 0}(1+x)^{\frac1x}
$$

由此推出来的常用结果（$x\to 0$）：

$$
\lim_{x\to 0}\frac{\tan x}{x}=1,\quad
\lim_{x\to 0}\frac{\arcsin x}{x}=1,\quad
\lim_{x\to 0}\frac{1-\cos x}{x^2}=\frac12
$$

$$
\lim_{x\to 0}\frac{\ln(1+x)}{x}=1,\quad
\lim_{x\to 0}\frac{e^x-1}{x}=1,\quad
\lim_{x\to 0}\frac{(1+x)^{a}-1}{x}=a
$$

### $1^{\infty}$ 型的固定写法

若 $u\to 1$、$v\to\infty$，则

$$
\lim u^{v}=\exp\!\left(\lim v\,(u-1)\right)
$$

更一般的三步：**写成 $e$ 的幂 → 取对数 → 用等价无穷小**。

例：$\lim_{x\to\infty}\left(\dfrac{x+1}{x-1}\right)^{x}$，先化成 $\left(1+\dfrac{2}{x-1}\right)^{x}$，再用上面公式得 $e^{2}$。

:::key
含参数的指数型：$\lim\left(1+\dfrac{a}{x}\right)^{bx}=e^{ab}$。这个结果考试里常直接套，不必每次重推。
:::

## 5 连续与间断点

$f$ 在 $x_0$ 连续 $\iff$ $\lim\limits_{x\to x_0}f(x)=f(x_0)$ $\iff$ 左极限 $=$ 右极限 $=$ 函数值。

分段函数在分界点连续的条件：**左极限 = 右极限 = 该点函数值**。这一步是"连续求参数"题的唯一动作。

| 类型 | 判定 | 细分 |
| --- | --- | --- |
| 第一类（左右极限都存在） | 两个单侧极限都算得出来（有限数） | 左 $=$ 右，但不等于函数值（或函数无定义）→ **可去**；左 $\neq$ 右 → **跳跃** |
| 第二类（至少一个不存在） | 至少一个单侧极限不存在 | 出现 $\infty$ → **无穷**；来回震荡 → **振荡** |

判定顺序（照这个顺序走，不会错）：

1. 先算 $\lim\limits_{x\to x_0^-}f(x)$ 和 $\lim\limits_{x\to x_0^+}f(x)$；
2. 两个都是有限数 → 第一类，比较大小定可去/跳跃；
3. 有一个是 $\infty$ → 无穷间断点；
4. 有一个不存在且不是 $\infty$（如 $\sin\frac1x$）→ 振荡。

## 6 闭区间上连续函数的三个定理

设 $f$ 在 $[a,b]$ 上连续：

| 定理 | 结论 | 什么时候用 |
| --- | --- | --- |
| 最值定理 | $f$ 在 $[a,b]$ 上取得最大值 $M$ 与最小值 $m$ | 证明里要先说"存在 $m,M$" |
| 介值定理 | 对任意 $m\le\mu\le M$，存在 $\xi\in[a,b]$ 使 $f(\xi)=\mu$ | 证明"存在一点使函数取某值" |
| 零点定理 | 若 $f(a)f(b)<0$，则存在 $\xi\in(a,b)$，$f(\xi)=0$ | 判断"方程在哪个区间有根" |

:::conv
"零点所在区间"这类单选题，标准动作是**把每个选项的两个端点分别代入，看是否异号**。异号 = 该区间一定有零点。四个选项里只有一个异号，就是它。全程不需要解方程。
:::

## 7 导数定义与变形

$$
f'(x_0)=\lim_{\Delta x\to 0}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}
=\lim_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}
$$

必须记住的两个变形（填空题直接考）：

$$
\lim_{h\to 0}\frac{f(x_0+h)-f(x_0-h)}{2h}=f'(x_0)
\qquad
\lim_{h\to 0}\frac{f(x_0+ah)-f(x_0+bh)}{h}=(a-b)f'(x_0)
$$

:::trap
$\lim\limits_{h\to0}\dfrac{f(x_0+h)-f(x_0-h)}{2h}$ 里的分母必须是 $2h$。写成 $h$ 时结果是 $2f'(x_0)$。考场上这种分母被偷偷改掉的题，年年有。
:::

**可导 ⟹ 连续，但连续 ⇏ 可导。** 可导 ⟺ 可微。三条关系必背：

| 命题 | 真假 | 反例 |
| --- | --- | --- |
| 可导 ⟹ 连续 | 真 | — |
| 连续 ⟹ 可导 | 假 | $\lvert x\rvert$ 在 $x=0$ |
| 可导 ⟺ 可微 | 真 | — |
| 连续 ⟹ 可微 | 假 | 同上 |

## 8 求导公式表

| 函数 | 导数 | 函数 | 导数 |
| --- | --- | --- | --- |
| $x^{\alpha}$ | $\alpha x^{\alpha-1}$ | $\sin x$ | $\cos x$ |
| $a^{x}$ | $a^{x}\ln a$ | $\cos x$ | $-\sin x$ |
| $e^{x}$ | $e^{x}$ | $\tan x$ | $\sec^2 x=\dfrac{1}{\cos^2x}$ |
| $\log_a x$ | $\dfrac{1}{x\ln a}$ | $\cot x$ | $-\csc^2 x$ |
| $\ln x$ | $\dfrac1x$ | $\sec x$ | $\sec x\tan x$ |
| $\arcsin x$ | $\dfrac{1}{\sqrt{1-x^2}}$ | $\csc x$ | $-\csc x\cot x$ |
| $\arccos x$ | $-\dfrac{1}{\sqrt{1-x^2}}$ | $\arctan x$ | $\dfrac{1}{1+x^2}$ |
| $\operatorname{arccot} x$ | $-\dfrac{1}{1+x^2}$ | $\sqrt{x}$ | $\dfrac{1}{2\sqrt{x}}$ |

### 求导法则

$$
(u\pm v)'=u'\pm v',\qquad (uv)'=u'v+uv',\qquad
\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}
$$

复合函数（链式法则）：

$$
\frac{d}{dx}f(g(x))=f'(g(x))\cdot g'(x)
$$

写成"由外向内，逐层乘导"：先对最外层求导（内层原样保留），再乘内层的导数。

反函数：$[f^{-1}(y)]'=\dfrac{1}{f'(x)}$，其中 $y=f(x)$。

## 9 高阶导数

常用 $n$ 阶导数（$n\ge 1$）：

$$
(\sin x)^{(n)}=\sin\!\left(x+\frac{n\pi}{2}\right),\qquad
(\cos x)^{(n)}=\cos\!\left(x+\frac{n\pi}{2}\right)
$$

$$
\left(e^{ax}\right)^{(n)}=a^{n}e^{ax},\qquad
\left(\frac{1}{1+x}\right)^{(n)}=\frac{(-1)^{n}n!}{(1+x)^{n+1}}
$$

$$
\left(\ln(1+x)\right)^{(n)}=\frac{(-1)^{n-1}(n-1)!}{(1+x)^{n}}
$$

多项式型：$(x^{m})^{(n)}=m(m-1)\cdots(m-n+1)x^{m-n}$（$n\le m$）；$n>m$ 时为 $0$。

莱布尼茨公式：

$$
(uv)^{(n)}=\sum_{k=0}^{n}\binom{n}{k}u^{(k)}v^{(n-k)}
$$

## 10 隐函数求导（固定动作）

方程 $F(x,y)=0$ 确定 $y=y(x)$。三步：

1. **两边同时对 $x$ 求导**，把 $y$ 看作 $x$ 的函数，遇到 $y$ 就乘 $y'$；
2. 把含 $y'$ 的项移到一边，其余移到另一边；
3. 解出 $y'$，**结果里允许出现 $y$**（不必换成 $x$）。

:::practice
考场上先写"两边对 $x$ 求导得："这七个字，再动笔。这一步本身就有过程分。
:::

## 11 参数方程求导（固定动作）

$$
\begin{cases}x=x(t)\\ y=y(t)\end{cases}
\quad\Longrightarrow\quad
\frac{dy}{dx}=\frac{dy/dt}{dx/dt}=\frac{y'(t)}{x'(t)}
$$

二阶导数：

$$
\frac{d^2y}{dx^2}=\frac{\dfrac{d}{dt}\left(\dfrac{dy}{dx}\right)}{x'(t)}
$$

:::trap
二阶导数的分母是 $x'(t)$，**不是** $x''(t)$，也**不是** $x'(t)^2$。这是这道题唯一的坑，且年年有人踩。
:::

## 12 对数求导法（幂指函数）

形如 $u(x)^{v(x)}$ 或一串乘除开方。步骤：

1. 两边取对数：$\ln y=v\ln u$；
2. 两边对 $x$ 求导（左边得 $\dfrac{y'}{y}$）；
3. 两边乘 $y$，把 $y$ 换回原式。

:::conv
2022–2023 与 2023–2024 两年的解答题都写了"**注：利用其他方法不给分**"。看到这句话，必须用对数求导法，用 $e^{v\ln u}$ 硬算也不给分。
:::

## 13 微分与切线

$$
dy=f'(x)\,dx,\qquad f'(x)=\frac{dy}{dx}
$$

一阶微分形式不变性：无论 $x$ 是自变量还是中间变量，$dy=f'(u)\,du$ 都成立。

**切线**在点 $(x_0,y_0)$：

$$
y-y_0=f'(x_0)\,(x-x_0)
$$

**法线**（当 $f'(x_0)\neq 0$）：

$$
y-y_0=-\frac{1}{f'(x_0)}\,(x-x_0)
$$

:::trap
"在点 $P$ 处的切线"和"过点 $P$ 的切线"不是一回事。前者 $P$ 是切点，直接代公式；后者 $P$ 可能在曲线外，要设切点 $(x_1,y_1)$ 再解方程。期中一般考前者，但读题要确认"在点"还是"过点"。
:::

## 14 遇到极限题怎么办：决策表

照这个顺序判断，不要跳：

| 现象 | 第一步 | 依据 |
| --- | --- | --- |
| 直接代值能算出数 | 直接代入，结束 | 连续性 |
| 代进去是 $\frac{0}{0}$ | 找等价无穷小替换（乘除位置） | 第 2 节 |
| 代进去是 $\frac{\infty}{\infty}$ 且是多项式之比 | 分子分母同除最高次 | 无穷大比较 |
| 出现 $\sin\frac{1}{x}$、$x\sin\frac1x$ | 用夹逼 / 有界量 × 无穷小 = 无穷小 | 有界性 |
| 出现 $1^{\infty}$、$0^0$、$\infty^0$ | 取对数，化成 $e^{\lim v(u-1)}$ | 第 4 节 |
| 出现根号差 | 分子（分母）有理化 | 平方差 |
| 出现 $\infty-\infty$ | 通分，或提公因式 | 化成 $\frac00$ |
| 分段函数在分界点 | 分别算左右极限 | 第 5 节 |

:::key
**洛必达不是必须的，但也不是禁区。** 大纲把第三章（含洛必达）列为期末考试内容，所以期中卷不会**考**它；但按进度表它大约在第 9 周就讲过了，所以在期中考卷上用它算 0/0 型极限是合法解法。

策略上仍建议**优先等价无穷小**：更快、过程更短、不容易算错导数。洛必达留作验算手段，或用于等价无穷小不好处理的题型（如 $\dfrac{e^x-1-x}{x^2}$ 这种需要二阶信息的）。
:::

## 15 常用数列极限

$$
\lim_{n\to\infty}\frac{1}{n^{p}}=0\ (p>0),\qquad
\lim_{n\to\infty}\sqrt[n]{n}=1,\qquad
\lim_{n\to\infty}\sqrt[n]{a}=1\ (a>0)
$$

$$
\lim_{n\to\infty}q^{n}=0\ (\lvert q\rvert<1),\qquad
\lim_{n\to\infty}\left(1+\frac1n\right)^{n}=e
$$

有理分式 $n\to\infty$ 时只看最高次：分子次数低 → $0$；次数相等 → 系数之比；分子次数高 → $\infty$（极限不存在）。
