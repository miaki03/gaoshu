---
title: 2.6 参数方程求导
slug: 2-6-parametric
part: p2
chapter: c2
order: 6
type: section
stars: 3
minutes: 18
summary: 一个公式加一个"二阶再除一次"。解答题每年考，坑只有一个：二阶导数的分母。
exam: [2022, 2024, 2025]
concepts: [c-parametric, c-second-derivative]
---

## 锚点结果

$$\begin{cases}x=t^{2}\\ y=t^{3}\end{cases}
\qquad\Longrightarrow\qquad
\frac{dy}{dx}=\frac{3t}{2},\quad
\frac{d^{2}y}{dx^{2}}=\frac{3}{4t}$$

一阶是一步；二阶的关键在分母：它除的是 $x'(t)=2t$，**不是** $x''(t)=2$。

这一步四年里被踩了无数次，也是本节全部的技术含量。

## 机制

### 一阶导数

$$\frac{dy}{dx}=\frac{\dfrac{dy}{dt}}{\dfrac{dx}{dt}}=\frac{y'(t)}{x'(t)}$$

**为什么**：由链式法则，$\dfrac{dy}{dt}=\dfrac{dy}{dx}\cdot\dfrac{dx}{dt}$，两边除以 $\dfrac{dx}{dt}$ 即可（要求 $x'(t)\neq0$）。

### 二阶导数

$$\frac{d^{2}y}{dx^{2}}=\frac{\dfrac{d}{dt}\left(\dfrac{dy}{dx}\right)}{x'(t)}$$

**为什么**：二阶导数是"对 $x$ 再求一次导"，即 $\dfrac{d}{dx}\left(\dfrac{dy}{dx}\right)$。但手上的表达式是 $t$ 的函数，对 $x$ 求导要先对 $t$ 求导再乘 $\dfrac{dt}{dx}$：

$$\frac{d}{dx}\left(\frac{dy}{dx}\right)=\frac{d}{dt}\left(\frac{dy}{dx}\right)\cdot\frac{dt}{dx}=\frac{\dfrac{d}{dt}\left(\dfrac{dy}{dx}\right)}{\dfrac{dx}{dt}} .$$

分母出现的是 $\dfrac{dx}{dt}=x'(t)$，这是推导的直接结果。

:::trap
三个典型错，全都出在分母上：<br>① 除 $x''(t)$（本应是 $x'(t)$）；<br>② 除 $(x'(t))^2$（那是 $\dfrac{d^2y/dt^2}{(dx/dt)^2}$ 的形式，不对）；<br>③ 忘了除，直接把 $\dfrac{d}{dt}\left(\dfrac{dy}{dx}\right)$ 当答案。<br>**记法：分子对 $t$ 求导一次，分母抄一遍 $x'(t)$。**
:::

### 完整算一遍

$x=t^{2}$，$y=t^{3}$：

$$\frac{dx}{dt}=2t,\qquad\frac{dy}{dt}=3t^{2},$$

$$\frac{dy}{dx}=\frac{3t^{2}}{2t}=\frac{3t}{2}\quad(t\neq0).$$

再对 $t$ 求导：$\dfrac{d}{dt}\left(\dfrac{3t}{2}\right)=\dfrac32$。除以 $x'(t)=2t$：

$$\frac{d^{2}y}{dx^{2}}=\frac{\frac32}{2t}=\frac{3}{4t} .$$

**验算**（这会让你相信它）：从 $x=t^2$、$y=t^3$ 消去 $t$，得 $y=x^{3/2}$（$t>0$ 时 $t=\sqrt x$）。

$$y'=\frac32x^{1/2},\qquad y''=\frac32\cdot\frac12x^{-1/2}=\frac{3}{4\sqrt x} .$$

把 $x=t^2$ 代入：$\dfrac{3}{4t}$ ✓ 与上面一致。

## 速查

### 公式

| 阶数 | 公式 |
| --- | --- |
| 一阶 | $\dfrac{dy}{dx}=\dfrac{y'(t)}{x'(t)}$ |
| 二阶 | $\dfrac{d^{2}y}{dx^{2}}=\dfrac{\left(\dfrac{dy}{dx}\right)'_t}{x'(t)}$ |

### 三类常见参数方程

| 形式 | $x'$ | $y'$ | $\dfrac{dy}{dx}$ |
| --- | --- | --- | --- |
| $x=t^{2},y=t^{3}$ | $2t$ | $3t^{2}$ | $\dfrac{3t}{2}$ |
| $x=a\cos t,y=a\sin t$（圆/椭圆） | $-a\sin t$ | $a\cos t$ | $-\cot t$ |
| $x=t-\sin t,y=1-\cos t$（摆线） | $1-\cos t$ | $\sin t$ | $\dfrac{\sin t}{1-\cos t}$ |

### 二阶的分母到底是什么

| 你算出的 $x'(t)$ | 二阶分母 |
| --- | --- |
| $2t$ | $2t$ |
| $-a\sin t$ | $-a\sin t$ |
| $1-\cos t$ | $1-\cos t$ |

一句话：**分母就是 $x'(t)$ 本身，原样抄一遍。**

## 题

:::problem id=2.6-01 level=易 source="本站自编"
设 $\begin{cases}x=t^{2}\\ y=t^{3}\end{cases}$，求 $\dfrac{dy}{dx}$ 在 $t=2$ 处的值。

:::ans
$$\frac{dy}{dx}=\frac{y'(t)}{x'(t)}=\frac{3t^{2}}{2t}=\frac{3t}{2} .$$

代入 $t=2$：$\dfrac{dy}{dx}=\dfrac{3\cdot2}{2}=3$。

**复算**：消去 $t$ 得 $y=x^{3/2}$，`2.6-01` 的 verify 算 $y'(4)=3$，一致。
:::
:::

:::problem id=2.6-02 level=难 source="本站自编"
同上参数方程，求 $\dfrac{d^{2}y}{dx^{2}}$ 在 $t=2$ 处的值。

:::ans
由上一题 $\dfrac{dy}{dx}=\dfrac{3t}{2}$。对 $t$ 求导：$\dfrac{d}{dt}\left(\dfrac{3t}{2}\right)=\dfrac32$。

二阶：

$$\frac{d^{2}y}{dx^{2}}=\frac{\frac32}{x'(t)}=\frac{\frac32}{2t}=\frac{3}{4t} .$$

代入 $t=2$：$\dfrac{3}{8}=0.375$。

**复算**：`2.6-02` 的 verify 用 $y=x^{3/2}$ 的二阶导数在 $x=4$ 处算，得 $0.375$。✓
:::
:::

:::problem id=2.6-03 level=中 source="2024–2025 期中 · 解答题 4 同类"
设 $\begin{cases}x=a\cos t\\ y=b\sin t\end{cases}$（$a,b>0$），求 $\dfrac{dy}{dx}$ 与 $\dfrac{d^{2}y}{dx^{2}}$。

:::ans
$$\frac{dx}{dt}=-a\sin t,\qquad\frac{dy}{dt}=b\cos t,$$

$$\frac{dy}{dx}=\frac{b\cos t}{-a\sin t}=-\frac{b}{a}\cot t .$$

再对 $t$ 求导：

$$\frac{d}{dt}\left(-\frac ba\cot t\right)=-\frac ba\cdot\left(-\csc^{2}t\right)=\frac{b}{a}\csc^{2}t .$$

除以 $x'(t)=-a\sin t$：

$$\frac{d^{2}y}{dx^{2}}=\frac{\frac{b}{a}\csc^{2}t}{-a\sin t}=-\frac{b}{a^{2}}\cdot\frac{1}{\sin^{3}t} .$$

:::trap
$\cot t$ 的导数是 $-\csc^2 t$，外面还有一个 $-\dfrac ba$，两个负号相乘变成正。这类双重符号是此题的主要失分点：**先写清每层的符号，最后再合并**。
:::
:::
:::

:::key
参数方程求导是解答题第 4 题（8 分）：一阶 4 分、二阶 4 分。**哪怕二阶算错，一阶写对也有 4 分** —— 所以永远先把一阶写完整。
:::
