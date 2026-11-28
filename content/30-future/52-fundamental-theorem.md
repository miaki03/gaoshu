---
title: 5.2 微积分基本定理与变限积分
slug: 5-2-ftc
part: p3
chapter: c5
order: 2
type: section
stars: 3
minutes: 30
summary: 变限积分求导是本章最高频的题型。先背死 Φ′(x)=f(x) 和上下限都是函数的版本，再用牛顿-莱布尼茨算定积分。
concepts: [c-ftc]
---

## 这节怎么用

检测题 5-2 一共三个大题。**变限求导是重点**，填空和选择题里反复出现。

| 题号 | 题型 | 考什么 |
| --- | --- | --- |
| 一、1–6 | 填空 | 定积分值、隐函数与参数方程求导（2.5、2.6 的复习）、变限积分求导 |
| 二、1–6 | 选择 | 变限积分的值、N-L 相关等式哪个不成立、变限搭极限、能不能直接用 N-L |
| 三、1 | 计算 | 分段函数求变限积分函数的表达式 |
| 三、2 | 计算 | 变限积分搭极限 |
| 三、3 | 计算 | 变限积分函数的最大值与最小值 |

这一节只有两个公式，但第二个的**变形必须练到条件反射**：

$$\Phi(x)=\int_a^x f(t)\,dt\ \Longrightarrow\ \Phi'(x)=f(x),$$

$$\int_a^b f(x)\,dx=F(b)-F(a),\qquad F'=f .$$

## 一、牛顿-莱布尼茨：把定积分变成减法

**第一步，先证 $\Phi'(x)=f(x)$。** 按导数定义写差商，用区间可加：

$$\frac{\Phi(x+\Delta x)-\Phi(x)}{\Delta x}=\frac{1}{\Delta x}\int_x^{x+\Delta x}f(t)\,dt .$$

右边是 $f$ 在 $[x,x+\Delta x]$ 上的平均值。要证明它趋于 $f(x)$，用**积分中值定理**：存在 $\xi$ 介于 $x$ 与 $x+\Delta x$ 之间，使

$\frac{1}{\Delta x}\int_x^{x+\Delta x}f(t)\,dt=f(\xi).$

$f$ 连续，当 $\Delta x\to0$ 时 $\xi\to x$，故 $f(\xi)\to f(x)$。所以

$$\Phi'(x)=\lim_{\Delta x\to0}\frac{1}{\Delta x}\int_x^{x+\Delta x}f(t)\,dt=f(x).$$

**第二步，任意原函数只差常数。** 若 $F$ 也是 $f$ 的原函数，则 $(F-\Phi)'=f-f=0$，由 3.1 的常值判据，$F-\Phi\equiv C$。取 $x=a$：$\Phi(a)=\int_a^a f=0$，所以 $C=F(a)$，即

$$\Phi(x)=F(x)-F(a).$$

**第三步，令 $x=b$：**

$$\int_a^b f(x)\,dx=F(b)-F(a).$$

这就是**牛顿-莱布尼茨公式**。它把"求极限的和"变成了"原函数代两端的差"。

:::trap
N-L 公式要求 $f$ 在 $[a,b]$ 上**连续**（至少可积且存在连续的原函数）。$f$ 在区间内有瑕点就不能直接用：例如 $\int_{-1}^{1}\frac{dx}{x^{2}}$ 硬套公式得 $\left[-\frac1x\right]_{-1}^{1}=-1-1=-2$，但被积函数恒正，积分不可能是负数——这个积分实际发散。遇到分母为零、对数真数为零的点，先停下来，那属于 5.5 的广义积分。
:::

:::problem id=5.2-01 level=易 source="本校检测题 5-2 一、1 同类"
计算 $\displaystyle\int_1^2\left(x+\frac1x\right)dx$。

:::ans
**答案：$\dfrac32+\ln2\approx2.1931$。**

先找原函数：$x$ 的原函数是 $\dfrac{x^{2}}{2}$，$\dfrac1x$ 的原函数是 $\ln\lvert x\rvert$。在 $[1,2]$ 上 $x>0$，直接写 $\ln x$。

$$\int_1^2\left(x+\frac1x\right)dx=\left[\frac{x^{2}}{2}+\ln x\right]_1^2=\left(2+\ln2\right)-\left(\frac12+0\right)=\frac32+\ln2 .$$

:::key
写答案分两行：先写 $[\,\cdot\,]_a^b$，把原函数填进方括号；再写"代上限减代下限"。别跳步，跳步时最容易把减号写丢。
:::
:::
:::

:::problem id=5.2-02 level=中 source="本校检测题 5-2 三、1 同类"
计算 $\displaystyle\int_0^2\lvert x-1\rvert\,dx$。

:::ans
**答案：$1$。**

被积函数含绝对值，**必须先分区间**，把绝对值拆掉：

$$\lvert x-1\rvert=\begin{cases}1-x, & 0\le x\le1,\\ x-1, & 1<x\le2.\end{cases}$$

按 $x=1$ 拆积分，用区间可加：

$$\int_0^2\lvert x-1\rvert\,dx=\int_0^1(1-x)\,dx+\int_1^2(x-1)\,dx=\frac12+\frac12=1 .$$

**几何验算**：图形是两个腰长为 $1$ 的等腰直角三角形，面积 $\dfrac12+\dfrac12=1$。

:::key
定积分里看到 $\lvert\,\cdot\,\rvert$、$\max$、$\min$、分段函数，第一件事永远是**找分段点，把积分拆开**。绝对值不可能一次积出来，但分段之后每段都是多项式。
:::
:::
:::

## 二、变限积分求导：本章最该练熟的公式

基本版：$\dfrac{d}{dx}\displaystyle\int_a^x f(t)\,dt=f(x)$。

上下限都是函数：设 $u(x)$、$v(x)$ 可导，$f$ 连续，则

$$\frac{d}{dx}\int_{u(x)}^{v(x)}f(t)\,dt=f\bigl(v(x)\bigr)v'(x)-f\bigl(u(x)\bigr)u'(x).$$

**怎么记**：把积分看成 $\Phi(v(x))-\Phi(u(x))$，其中 $\Phi'=f$。对外层用链式法则：

$$\Phi\bigl(v(x)\bigr)'=f\bigl(v(x)\bigr)v'(x),\qquad \Phi\bigl(u(x)\bigr)'=f\bigl(u(x)\bigr)u'(x).$$

相减就是上面的公式。**上限带 $+$，下限带 $-$，谁都别忘乘自己的导数。**

求导套路三步：① 认准谁是 $u(x)$、谁是 $v(x)$，写下 $u'$、$v'$；② 把 $f$ 分别在上限、下限处求值；③ 代公式相减。

:::problem id=5.2-03 level=易 source="本校检测题 5-2 一、6 同类"
设 $\Phi(x)=\displaystyle\int_1^x\sqrt{1+t^{3}}\,dt$，求 $\Phi'(1)$。

:::ans
**答案：$\sqrt2$。**

这里上限是 $x$（$v'=1$），下限是常数 $1$（$u'=0$），所以只有第一项：

$$\Phi'(x)=\sqrt{1+x^{3}}\cdot1-0=\sqrt{1+x^{3}} .$$

代入 $x=1$：$\Phi'(1)=\sqrt{1+1}=\sqrt2$。

:::trap
下限是常数时，这一项是 $f(1)\cdot(1)'=f(1)\cdot0=0$，整项消失。常见错法是把下限也当成变量，写成 $f(x)\cdot1-f(1)\cdot1$，代 $x=1$ 得 $\sqrt2-\sqrt2=0$。**常数求导是零**，先看上下限是不是变量。
:::
:::
:::

:::problem id=5.2-04 level=中 source="本校检测题 5-2 一、6 同类"
设 $F(x)=\displaystyle\int_{\sin x}^{\cos x}e^{t}\,dt$，求 $F'(0)$。

:::ans
**答案：$-1$。**

上下限都是函数：

$$u(x)=\sin x,\quad u'(x)=\cos x;\qquad v(x)=\cos x,\quad v'(x)=-\sin x .$$

被积函数 $f(t)=e^{t}$，所以

$$F'(x)=e^{\cos x}\cdot(-\sin x)-e^{\sin x}\cdot\cos x .$$

代 $x=0$：$\cos0=1$，$\sin0=0$，于是

$$F'(0)=e^{1}\cdot0-e^{0}\cdot1=0-1=-1 .$$

:::key
代入时先把 $\sin0=0$、$\cos0=1$ 写出来再算，不要心算。第二项前面的负号来自公式，$e^{\sin x}\cdot\cos x$ 在 $x=0$ 处等于 $1$，整体就是 $-1$。
:::
:::
:::

:::problem id=5.2-06 level=难 source="本校检测题 5-2 一、6 同类"
设 $\Phi(x)=\displaystyle\int_0^{x^{2}}\frac{dt}{1+t^{2}}$，求 $\Phi'(1)$。

:::ans
**答案：$1$。**

上限是 $x^{2}$，不是 $x$。按公式，上限要代进被积函数**并且乘上限的导数**：

$$\Phi'(x)=\frac{1}{1+(x^{2})^{2}}\cdot(x^{2})'=\frac{2x}{1+x^{4}} .$$

代 $x=1$：$\Phi'(1)=\dfrac{2}{1+1}=1$。

:::trap
最常见的错法是漏掉 $(x^{2})'=2x$，写成 $\dfrac{1}{1+x^{4}}$，代 $1$ 得 $\dfrac12$。**上限是函数就必须乘它的导数**——这一步和复合函数求导是同一条链式法则。
:::
:::
:::

### 变限积分搭极限

变限积分和极限一起考时，套路固定：先确认是 $\dfrac00$ 型，再对分子用变限求导、对分母正常求导（洛必达）。

:::problem id=5.2-05 level=中 source="本校检测题 5-2 三、2 同类"
求 $\displaystyle\lim_{x\to0}\frac{1}{x^{2}}\int_0^x\sin t\,dt$。

:::ans
**答案：$\dfrac12$。**

分子 $\to\int_0^0\sin t\,dt=0$，分母 $\to0$，是 $\dfrac00$ 型，可以用洛必达。

分子求导用变限求导：$\left(\int_0^x\sin t\,dt\right)'=\sin x$；分母求导：$(x^{2})'=2x$。于是

$$\lim_{x\to0}\frac{\int_0^x\sin t\,dt}{x^{2}}=\lim_{x\to0}\frac{\sin x}{2x}=\frac12 .$$

**也可直接算**：$\int_0^x\sin t\,dt=1-\cos x$，而 $1-\cos x\sim\dfrac{x^{2}}{2}$，所以原式 $=\lim\dfrac{x^{2}/2}{x^{2}}=\dfrac12$。两条路答案一致。

:::key
这类题先看被积函数**能不能积出来**。能（如 $\sin t$、$e^{t}$、多项式）就直接积完再算极限，更稳。不能（如 $e^{-t^{2}}$、$\sqrt{1+t^{3}}$）就必须洛必达 + 变限求导。
:::
:::
:::

:::trap
两个高频错误。① 被积函数里含 $x$ 时不能直接对上限求导，例如 $\int_0^x(x-t)f(t)\,dt$：先把 $x$ 当常数拆出去，$\int_0^x(x-t)f(t)\,dt=x\int_0^x f(t)\,dt-\int_0^x tf(t)\,dt$，拆完再求导。② 分子分母要**分别**求导，别把整个分式当乘积处理。
:::

## 速查

### 两个核心公式

| 公式 | 条件 | 用途 |
| --- | --- | --- |
| $\dfrac{d}{dx}\int_a^x f(t)\,dt=f(x)$ | $f$ 连续 | 变限求导，上限是 $x$ |
| $\int_a^b f(x)\,dx=F(b)-F(a)$ | $f$ 在 $[a,b]$ 连续；$F$ 在 $[a,b]$ 连续、在 $(a,b)$ 内 $F'=f$ | 算定积分 |

### 变限求导的三种形态

| 形态 | 导数 | 例子 |
| --- | --- | --- |
| $\int_a^x f$ | $f(x)$ | $\left(\int_1^x\sqrt{1+t^{3}}dt\right)'=\sqrt{1+x^{3}}$ |
| $\int_a^{x^{2}}f$ | $f(x^{2})\cdot2x$ | $\left(\int_0^{x^{2}}\frac{dt}{1+t^{2}}\right)'=\frac{2x}{1+x^{4}}$ |
| $\int_{u(x)}^{v(x)}f$ | $f(v)v'-f(u)u'$ | 上限加、下限减，各乘各的导数 |

### 变限积分的另外两种考法（第三大题 1、3）

| 考法 | 做法 |
| --- | --- |
| 分段函数求 $\Phi(x)=\int_a^x f(t)\,dt$ 的表达式 | 按分段点把 $x$ 的取值分成几段。$x$ 落在哪一段，就把积分从 $a$ 拆到分段点、再积到 $x$，每段各写一个式子 |
| 求 $\Phi$ 在 $[a,b]$ 上的最大值、最小值 | 先算 $\Phi'(x)=f(x)$，解 $f(x)=0$ 找驻点（以及端点），把这几点的 $\Phi$ 值算出来比较 |

### 常见原函数（N-L 用）

| 被积函数 | 原函数 |
| --- | --- |
| $x^{n}$（$n\neq-1$） | $\dfrac{x^{n+1}}{n+1}$ |
| $\dfrac1x$ | $\ln\lvert x\rvert$ |
| $e^{x}$ | $e^{x}$ |
| $\sin x$、$\cos x$ | $-\cos x$、$\sin x$ |
| $\dfrac{1}{1+x^{2}}$ | $\arctan x$ |
| $\dfrac{1}{\sqrt{1-x^{2}}}$ | $\arcsin x$ |

## 作业对应

检测题 **5-2 全做**。按大题拆：填空 1–3 是定积分值、4–5 是隐函数与参数方程求导（回去翻 2.5、2.6）、第 6 题是变限求导；选择题 5、6 专问"哪个能用、哪个不能用 N-L"；第三大题 1 是分段函数求 $\Phi(x)$ 的表达式、2 是变限搭极限、3 是求 $\Phi$ 的最大值与最小值。做完自查：① 上下限是常数的那一项处理对了没；② 上限是 $x^{2}$ 时乘了 $2x$ 没；③ 被积函数含 $x$ 时先拆了没。

上一节：[5.1 定积分的概念与性质](/s/5-1-concept)。下一节：[5.3 定积分的换元与分部](/s/5-3-substitution)。
