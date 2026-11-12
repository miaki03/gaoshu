---
title: 2.7 对数求导法
slug: 2-7-log-derivative
part: p2
chapter: c2
order: 7
type: section
stars: 2
minutes: 16
summary: 幂指函数 $u^v$ 和多因子乘除的专用武器。考过两次，且题目明写"用其他方法不给分"。
exam: [2022, 2023]
concepts: [c-log-derivative, c-power-exponential]
---

## 锚点结果

$$\left(x^{x}\right)'=x^{x}\left(\ln x+1\right)$$

这个式子既不是幂函数（指数在变）也不是指数函数（底数在变），**没有现成公式可用**。唯一通用手段是两边取对数。

2022–2023 与 2023–2024 两年的解答题都写着"**注：利用其他方法不给分**"，指的就是这个方法。

## 机制

### 什么样的式子需要它

| 类型 | 例子 | 为什么需要 |
| --- | --- | --- |
| 幂指函数 | $x^{x}$、$(\sin x)^{x}$、$x^{\ln x}$ | 底数和指数都在变，幂函数/指数函数的公式都不适用 |
| 多因子乘除 | $\dfrac{(x+1)^{3}\sqrt{x-1}}{(x+2)^{5}}$ | 直接用商的法则要算很长时间，取对数后变成加减 |
| 带根号的复杂式 | $\sqrt{\dfrac{(x+1)(x-2)}{(x+3)(x-4)}}$ | 同上 |

### 三步

**第一步**：两边取自然对数，化简成加减。

$$\ln y=\ln\left(u^{v}\right)=v\ln u$$

**第二步**：两边对 $x$ 求导。左边是 $\ln y$，导数是 $\dfrac{y'}{y}$（这里用到链式法则）。

$$\frac{y'}{y}=\left[v\ln u\right]'$$

**第三步**：两边乘 $y$，把 $y$ 换回原表达式。

$$y'=y\cdot\left[v\ln u\right]'=u^{v}\left[v\ln u\right]'$$

### 完整算一遍：$y=x^{x}$

取对数：

$$\ln y=x\ln x .$$

两边对 $x$ 求导，右边用乘积法则：

$$\frac{y'}{y}=1\cdot\ln x+x\cdot\frac1x=\ln x+1 .$$

两边乘 $y=x^{x}$：

$$y'=x^{x}\left(\ln x+1\right).$$

:::trap
第二步左边必须是 $\dfrac{y'}{y}$，**不是** $y'$。$\ln y$ 是复合函数（外层 $\ln$、内层 $y$），所以导数是 $\dfrac1y\cdot y'$。漏掉 $\dfrac1y$ 是这个方法最常见的错。
:::

### 另一种写法（等价，但考试可能不认）

$$u^{v}=e^{v\ln u}\ \Longrightarrow\ \left(u^{v}\right)'=e^{v\ln u}\left[v\ln u\right]'=u^{v}\left[v\ln u\right]'$$

结果完全一样。但如果题目写了"利用其他方法不给分"，就老老实实用取对数，把"两边取对数得"这句话写出来。

:::conv
阅卷看的是**方法标记**：有没有"取对数"这一步。所以即使你心算用 $e^{v\ln u}$，答题纸上也要先写"两边取对数得"。这不是形式主义，是拿分。
:::

## 速查

### 常用结果

| 函数 | 导数 |
| --- | --- |
| $x^{x}$ | $x^{x}(\ln x+1)$ |
| $x^{\sin x}$ | $x^{\sin x}\left(\cos x\ln x+\dfrac{\sin x}{x}\right)$ |
| $(\sin x)^{x}$ | $(\sin x)^{x}\left(\ln\sin x+x\cot x\right)$ |
| $x^{a}$（$a$ 常数） | 直接公式 $ax^{a-1}$，不需要对数求导 |
| $a^{x}$（$a$ 常数） | 直接公式 $a^{x}\ln a$ |

### 对数性质（用之前先化简）

| 原式 | 化简 |
| --- | --- |
| $\ln(uv)$ | $\ln u+\ln v$ |
| $\ln\dfrac uv$ | $\ln u-\ln v$ |
| $\ln u^{n}$ | $n\ln u$ |
| $\ln\sqrt[n]{u}$ | $\dfrac1n\ln u$ |

## 题

:::problem id=2.7-01 level=中 source="本站自编"
设 $y=x^{x}$（$x>0$），求 $y'(1)$。

:::ans
两边取对数：

$$\ln y=x\ln x .$$

两边对 $x$ 求导：

$$\frac{y'}{y}=\ln x+x\cdot\frac1x=\ln x+1 .$$

所以

$$y'=x^{x}\left(\ln x+1\right).$$

代入 $x=1$：$y'(1)=1^{1}(0+1)=1$。

**复算**：`2.7-01` 的 verify 用数值导数复算，得 $1$。
:::
:::

:::problem id=2.7-02 level=难 source="2023–2024 期中 · 解答题 3 同类"
设 $y=\dfrac{(x+1)^{2}\sqrt{x-1}}{(x+2)^{3}}$（$x>1$），求 $y'$。

:::ans
两边取对数，用对数性质拆开：

$$\ln y=2\ln(x+1)+\frac12\ln(x-1)-3\ln(x+2) .$$

两边对 $x$ 求导：

$$\frac{y'}{y}=\frac{2}{x+1}+\frac{1}{2(x-1)}-\frac{3}{x+2} .$$

所以

$$y'=\frac{(x+1)^{2}\sqrt{x-1}}{(x+2)^{3}}\left[\frac{2}{x+1}+\frac{1}{2(x-1)}-\frac{3}{x+2}\right].$$

:::practice
**括号里不必通分**。阅卷只看结构，通分只会增加算错符号的机会。若题目要求"化简"，再通分。
:::

:::trap
$\ln\dfrac uv=\ln u-\ln v$，最后一个符号是**减**。写成加号会导致 $-\dfrac{3}{x+2}$ 变正，整题错。
:::
:::
:::

:::key
这一节在期中以**解答题**形式出现（6–8 分），两年考过两次，且题目指定方法。**三步模板（取对数 → 求导 → 乘回）背下来**，看到 $u^v$ 或多因子乘除就直接套。
:::
