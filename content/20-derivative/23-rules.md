---
title: 2.3 求导法则：四则与复合
slug: 2-3-rules
part: p2
chapter: c2
order: 3
type: section
stars: 3
minutes: 25
summary: 计算量最大的一节。链式法则只有一句口诀：由外向内，逐层乘导。练到不用想。
exam: [2022, 2023, 2024, 2025]
concepts: [c-chain-rule, c-product-rule, c-basic-derivatives]
---

## 锚点结果

两个导数，限时 30 秒：

1. $\left[\ln(1+x^{2})\right]'=\dfrac{2x}{1+x^{2}}$
2. $\left[\sin(e^{x})\right]'=e^{x}\cos(e^{x})$

如果第 1 条你写成了 $\dfrac{1}{1+x^2}$，说明漏了内层导数——这是链式法则最常见的错。

## 机制

### 四则法则

$$(u\pm v)'=u'\pm v',\qquad (uv)'=u'v+uv',\qquad \left(\frac uv\right)'=\frac{u'v-uv'}{v^{2}}$$

乘积法则的记法：**"前导后不导，加前不导后导"**。

商的法则记法：**"上导下不导，减上不导下导，除以分母的平方"**。分子顺序不能反，否则符号整体错。

:::trap
$(uv)'\neq u'v'$，$\left(\dfrac uv\right)'\neq\dfrac{u'}{v'}$。这两个"想当然"是初学最常见的错，考场上不要出现。
:::

### 链式法则：本节的全部重点

$$\frac{d}{dx}f\big(g(x)\big)=f'\big(g(x)\big)\cdot g'(x)$$

白话：**先把内层 $g(x)$ 当成一个整体 $u$，对外层 $f$ 求导，再乘上内层的导数。**

三层复合就再乘一次：$y=f(g(h(x)))$ 时

$$y'=f'\big(g(h(x))\big)\cdot g'\big(h(x)\big)\cdot h'(x)$$

### 怎么找"内层"

拿到一个式子，先问：**这个函数最外层是什么运算？**

| 式子 | 最外层 | 内层 | 导数 |
| --- | --- | --- | --- |
| $\ln(1+x^2)$ | $\ln(\cdot)$ | $1+x^2$ | $\dfrac{1}{1+x^2}\cdot2x$ |
| $\sin(e^x)$ | $\sin(\cdot)$ | $e^x$ | $\cos(e^x)\cdot e^x$ |
| $(1+x^2)^{10}$ | $(\cdot)^{10}$ | $1+x^2$ | $10(1+x^2)^9\cdot2x$ |
| $e^{x^2}$ | $e^{(\cdot)}$ | $x^2$ | $e^{x^2}\cdot2x$ |
| $\sqrt{1-x^2}$ | $\sqrt{\cdot}$ | $1-x^2$ | $\dfrac{1}{2\sqrt{1-x^2}}\cdot(-2x)$ |
| $\arctan\dfrac1x$ | $\arctan(\cdot)$ | $\dfrac1x$ | $\dfrac{1}{1+1/x^2}\cdot\left(-\dfrac1{x^2}\right)$ |
| $\ln\sin x$ | $\ln(\cdot)$ | $\sin x$ | $\dfrac{1}{\sin x}\cdot\cos x$ |

最后两个可以化简：

$$\left(\sqrt{1-x^2}\right)'=\frac{-x}{\sqrt{1-x^2}},\qquad

<!-- ex: 2.3-e1 -->
\left(\arctan\frac1x\right)'=\frac{1}{1+\frac1{x^2}}\cdot\left(-\frac1{x^2}\right)=-\frac{1}{1+x^2}$$

:::practice
链式法则的方向只有一个：**从外往里剥**。剥的时候把内层**原样抄下来**（不要急着化简），最后再乘内层的导数。抄错内层是最容易丢分的地方——尤其当内层很长的时候，用括号把它整个包住。
:::

### 反函数的导数

若 $y=f(x)$ 的反函数存在且 $f'(x)\neq0$，则

$$\left[f^{-1}(y)\right]'=\frac{1}{f'(x)} .$$

例：$y=\arcsin x$ 的导数。由 $x=\sin y$ 得 $\dfrac{dx}{dy}=\cos y$，故

$$(\arcsin x)'=\frac{1}{\cos y}=\frac{1}{\sqrt{1-\sin^2 y}}=\frac{1}{\sqrt{1-x^2}} .$$

（取正号是因为 $y\in\left[-\frac\pi2,\frac\pi2\right]$，$\cos y\ge0$。）

## 速查

### 求导表

| 函数 | 导数 | 函数 | 导数 |
| --- | --- | --- | --- |
| $x^{a}$ | $ax^{a-1}$ | $\sin x$ | $\cos x$ |
| $a^{x}$ | $a^{x}\ln a$ | $\cos x$ | $-\sin x$ |
| $e^{x}$ | $e^{x}$ | $\tan x$ | $\sec^2x$ |
| $\log_a x$ | $\dfrac{1}{x\ln a}$ | $\cot x$ | $-\csc^2x$ |
| $\ln x$ | $\dfrac1x$ | $\sec x$ | $\sec x\tan x$ |
| $\arcsin x$ | $\dfrac{1}{\sqrt{1-x^2}}$ | $\csc x$ | $-\csc x\cot x$ |
| $\arccos x$ | $-\dfrac{1}{\sqrt{1-x^2}}$ | $\arctan x$ | $\dfrac{1}{1+x^2}$ |
| $\operatorname{arccot}x$ | $-\dfrac{1}{1+x^2}$ | $\sqrt x$ | $\dfrac{1}{2\sqrt x}$ |

三个不常用的记号：$\sec x=\dfrac{1}{\cos x}$，$\csc x=\dfrac{1}{\sin x}$，$\cot x=\dfrac{\cos x}{\sin x}=\dfrac{1}{\tan x}$。记不住导数公式时可以换成倒数再求导，但要**一一对应**：$\sec$ 换 $\cos$、$\csc$ 换 $\sin$、$\cot$ 换 $\tan$，不要一律换成 $\cos$。

### 三个"看起来复杂但一步就能出"的式子

| 式子 | 导数 |
| --- | --- |
| $\ln\ln x$ | $\dfrac{1}{x\ln x}$ |
| $x^{x}$（用对数求导，见 2.7） | $x^{x}(\ln x+1)$ |
| $\dfrac{e^{x}}{x}$ | $\dfrac{e^{x}(x-1)}{x^{2}}$ |

## 题

:::problem id=2.3-01 level=易 source="本站自编"
设 $y=\ln(1+x^{2})$，求 $y'(1)$。

:::ans
先求导（链式，外层 $\ln$，内层 $1+x^2$）：

$$y'=\frac{1}{1+x^{2}}\cdot 2x=\frac{2x}{1+x^{2}} .$$

代入 $x=1$：

$$y'(1)=\frac{2}{2}=1 .$$

**复算**：`2.3-01` 的 verify 用数值导数复算，得 $1$。
:::
:::

:::problem id=2.3-02 level=中 source="本站自编"
设 $y=\sin(e^{x})$，求 $y'(0)$。

:::ans
外层 $\sin$，内层 $e^x$：

$$y'=\cos(e^{x})\cdot e^{x}=e^{x}\cos(e^{x}) .$$

代入 $x=0$：$y'(0)=e^{0}\cos(e^{0})=1\cdot\cos1=\cos1\approx0.5403$。

**复算**：`2.3-02` 的 verify 得 $0.5403$。
:::
:::

:::problem id=2.3-03 level=中 source="本站自编"
设 $y=\dfrac{x}{1+x^{2}}$，求 $y'$。

:::ans
用商的法则，$u=x$，$v=1+x^2$：

$$y'=\frac{1\cdot(1+x^{2})-x\cdot 2x}{(1+x^{2})^{2}}=\frac{1+x^{2}-2x^{2}}{(1+x^{2})^{2}}=\frac{1-x^{2}}{(1+x^{2})^{2}} .$$

:::trap
分子里一定是 "$u'v-uv'$"，顺序反了会得到 $\dfrac{x^2-1}{(\cdots)^2}$，符号整体错。**验一下 $x=0$ 处**：原函数在 $0$ 附近是增的（$x$ 增大、分母几乎不变），所以 $y'(0)$ 应该为正。代入上式得 $\dfrac{1}{1}=1>0$，对。
:::
:::
:::

:::problem id=2.3-04 level=难 source="本站自编"
设 $y=\ln\dfrac{1-\sqrt{x}}{1+\sqrt{x}}$，求 $y'$。

:::ans
先用对数性质拆成减法，能省很多计算：

$$y=\ln\left(1-\sqrt{x}\right)-\ln\left(1+\sqrt{x}\right).$$

逐项用链式：

$$y'=\frac{1}{1-\sqrt{x}}\cdot\left(-\frac{1}{2\sqrt{x}}\right)-\frac{1}{1+\sqrt{x}}\cdot\frac{1}{2\sqrt{x}} .$$

整理（通分或直接合并）：

$$y'=\frac{1}{2\sqrt{x}}\left[\frac{-1}{1-\sqrt{x}}-\frac{1}{1+\sqrt{x}}\right]
=\frac{1}{2\sqrt{x}}\cdot\frac{-(1+\sqrt{x})-(1-\sqrt{x})}{(1-\sqrt{x})(1+\sqrt{x})}
=\frac{1}{2\sqrt{x}}\cdot\frac{-2}{1-x}$$

$$y'=\frac{-1}{\sqrt{x}\,(1-x)} .$$

:::key
这题的技巧是**先用对数性质把商拆成差**。直接对 $\ln\dfrac{\cdot}{\cdot}$ 用链式也能做，但要算 $(\cdot/\cdot)'$，计算量翻倍。**看到 $\ln$ 里有乘除，先拆。**
:::
:::
:::

:::key
这一节的分数最多：填空一道（3 分）＋单选一道（3 分）＋解答题第 4、5 题里都要用到。**链式法则不出错 = 第二章一半的分拿到了。**
:::
