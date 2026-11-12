---
title: 1.5 无穷小与等价无穷小
slug: 1-5-infinitesimal
part: p1
chapter: c1
order: 5
type: section
stars: 3
minutes: 25
summary: 期中最高频的工具。九组等价式 + 一条铁律（乘除能换，加减不能换）+ 加减抵消时怎么办。
exam: [2022, 2023, 2024, 2025]
concepts: [c-infinitesimal, c-equivalent, c-order]
---

## 锚点结果

两个分数，现场算：

1. $\lim\limits_{x\to0}\dfrac{1-\cos x}{x\sin x}=\dfrac12$
2. $\lim\limits_{x\to0}\dfrac{\tan x-\sin x}{x^{3}}=\dfrac12$

第 1 条直接用 $\sin x\sim x$ 与 $1-\cos x\sim\dfrac{x^2}{2}$ 代进去，答案立刻出来。

第 2 条**不能**直接代。代进去会得到 $\dfrac{x-x}{x^3}=0$，是错的。原因是 $\tan x$ 与 $\sin x$ 的一阶项恰好抵消了，必须升到三阶看。这一"抵消"是本节唯一的技术难点，也是年年出错的地方。

## 机制

### 无穷小是什么

$\lim\limits_{x\to x_0}\alpha(x)=0$ 时，称 $\alpha$ 是 $x\to x_0$ 时的**无穷小**（记法 $\alpha=o(1)$）。

注意"无穷小"描述的是一个**极限过程**，不是"很小的数"。$10^{-100}$ 是数，不是无穷小；$\dfrac{1}{x}$ 当 $x\to\infty$ 时才是无穷小。

### 阶的比较：就是算一个比值

设 $\alpha,\beta$ 都是同一过程中的无穷小，考察

$$\lim\frac{\beta}{\alpha}=c .$$

| $c$ | 名称 | 记法 | 白话 |
| --- | --- | --- | --- |
| $0$ | $\beta$ 比 $\alpha$ 高阶 | $\beta=o(\alpha)$ | $\beta$ 趋于 $0$ 更快 |
| $c\neq0,1$ | 同阶但不等价 | — | 趋于 $0$ 的速度可比 |
| $1$ | 等价 | $\alpha\sim\beta$ | 速度几乎一样 |
| $\infty$ | 低阶 | — | $\beta$ 趋于 $0$ 更慢 |

所以"判断阶"这类单选题，**没有别的技巧，就是把两个量相除算极限**。

### 等价替换定理：只在乘除位置成立

若 $\alpha\sim\alpha'$，$\beta\sim\beta'$，且 $\lim\dfrac{\alpha'}{\beta'}$ 存在，则

$$\lim\frac{\alpha}{\beta}=\lim\frac{\alpha'}{\beta'} .$$

**限制**：这条定理说的是"整个式子是乘除结构时"。如果 $\alpha$ 出现在**加减号的一边**，替换会改变答案。

$$\lim_{x\to0}\frac{\tan x-\sin x}{x^3}\ \overset{\text{错}}{\longrightarrow}\ \lim_{x\to0}\frac{x-x}{x^3}=0\quad(\text{错})$$

正确做法是**先因式分解，把加减变成乘除**：

$$\tan x-\sin x=\frac{\sin x}{\cos x}-\sin x=\sin x\left(\frac{1}{\cos x}-1\right)=\sin x\cdot\frac{1-\cos x}{\cos x}$$

现在整式是乘积结构，各项都能替换：

$$\sin x\cdot\frac{1-\cos x}{\cos x}\ \sim\ x\cdot\frac{x^2/2}{1}=\frac{x^3}{2}$$

所以原极限是 $\dfrac12$。

:::key
这一手是本节的核心：**遇到加减抵消，先提公因式/通分/因式分解，把它变回乘除，再替换。** 变不成就说明需要更高阶的等价式（见下面的三阶表）。
:::

### 等价无穷小的来源

以 $1-\cos x\sim\dfrac{x^2}{2}$ 为例，看它是怎么来的（这能防止记错）：

$$1-\cos x=2\sin^2\frac{x}{2},$$

而 $\sin\dfrac x2\sim\dfrac x2$，所以

$$2\sin^2\frac x2\sim2\left(\frac x2\right)^2=\frac{x^2}{2}.$$

$\ln(1+x)\sim x$ 来自 $\lim\limits_{x\to0}\dfrac{\ln(1+x)}{x}=1$（1.4 节的第三个题）。$\sqrt[3]{1+x}-1\sim\dfrac x3$ 来自广义二项式 $(1+x)^\alpha-1\sim\alpha x$。

## 速查

### 一阶（$x\to0$）

| 等价式 | 说明 |
| --- | --- |
| $\sin x\sim x$ | 最基础的 |
| $\tan x\sim x$ | |
| $\arcsin x\sim x$ | |
| $\arctan x\sim x$ | |
| $\ln(1+x)\sim x$ | |
| $e^{x}-1\sim x$ | |
| $a^{x}-1\sim x\ln a$ | |
| $(1+x)^{\alpha}-1\sim\alpha x$ | 含 $\sqrt{1+x}-1\sim\dfrac x2$、$\sqrt[3]{1+x}-1\sim\dfrac x3$ |
| $\log_a(1+x)\sim\dfrac{x}{\ln a}$ | |

### 二阶、三阶

| 等价式 | 阶 |
| --- | --- |
| $1-\cos x\sim\dfrac{x^2}{2}$ | 二阶 |
| $x-\sin x\sim\dfrac{x^3}{6}$ | 三阶 |
| $\tan x-x\sim\dfrac{x^3}{3}$ | 三阶 |
| $\tan x-\sin x\sim\dfrac{x^3}{2}$ | 三阶 |
| $x-\arctan x\sim\dfrac{x^3}{3}$ | 三阶 |
| $\arcsin x-x\sim\dfrac{x^3}{6}$ | 三阶 |

:::conv
一阶的九组必须背到闭眼能写。二阶、三阶的六组在期中只以单选题（"$\alpha$ 是 $\beta$ 的几阶无穷小"）或化简题出现，**认得出、会算比值**即可，不必背到条件反射。
:::

### 用替换的三条纪律

1. **只在乘除位置替换**；加减先变形；
2. 替换后要验证剩下的式子极限存在（分母不能变成 $0$）；
3. 出现同阶相减（$\tan x-\sin x$）时，一定升阶，不要硬凑。

## 题

:::problem id=1.5-01 level=易 source="本站自编"
求 $\lim\limits_{x\to0}\dfrac{1-\cos x}{x\sin x}$。

:::ans
$x\to0$ 时 $1-\cos x\sim\dfrac{x^2}{2}$，$\sin x\sim x$，且整体是乘除结构，可以替换：

$$\lim_{x\to0}\frac{1-\cos x}{x\sin x}=\lim_{x\to0}\frac{\frac{x^2}{2}}{x\cdot x}=\frac12 .$$

**复算**：`1.5-01` 的 verify 得 $0.5$。
:::
:::

:::problem id=1.5-02 level=难 source="本站自编"
求 $\lim\limits_{x\to0}\dfrac{\tan x-\sin x}{x^{3}}$。

:::ans
**不能**直接替换（加减抵消）。先因式分解：

$$\tan x-\sin x=\sin x\left(\frac{1}{\cos x}-1\right)=\sin x\cdot\frac{1-\cos x}{\cos x}$$

此时是乘除结构：

$$\sim\ x\cdot\frac{x^2/2}{1}=\frac{x^3}{2}$$

所以

$$\lim_{x\to0}\frac{\tan x-\sin x}{x^3}=\frac12 .$$

**复算**：`1.5-02` 的 verify 得 $0.5$。

:::trap
如果直接代 $\tan x\sim x$、$\sin x\sim x$，得到 $0$。这个错误在四年真题的等价无穷小单选里反复出现——出题人专门用"同阶相减"来区分会背表和会用表的人。
:::
:::
:::

:::problem id=1.5-03 level=中 source="2023–2024 期中 · 填空 4 同类"
当 $x\to0$ 时，$x-\sin x$ 是 $x^{2}$ 的几阶无穷小？

:::ans
算比值：

$$\lim_{x\to0}\frac{x-\sin x}{x^2}=\lim_{x\to0}\frac{x^3/6}{x^2}=\lim_{x\to0}\frac x6=0 .$$

比值为 $0$，说明 $x-\sin x$ 比 $x^2$ **高阶**。再和 $x^3$ 比：

$$\lim_{x\to0}\frac{x-\sin x}{x^3}=\frac16\quad(\text{非零常数})$$

所以它是 $x^{3}$ 的同阶（且等价）无穷小。

**结论**：$x-\sin x$ 是 $x$ 的**三阶**无穷小。

:::trap
题目问"是 $x^2$ 的几阶无穷小"时，答案不是"高阶"就完事——要看它到底和 $x$ 的几次方同阶。**把 $x$ 的各个幂次依次除一遍，找到比值为非零常数的那一个**，那个次数才是阶数。
:::
:::
:::

:::key
这一节在期中卷上贡献：填空一道（求含无穷小的极限，3 分）+ 单选一道（阶的比较，3 分）。**这 6 分是整张卷子里最"背了就会"的 6 分。**
:::
