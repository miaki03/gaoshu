---
title: 3.2 洛必达法则
slug: 3-2-lhopital
part: p3
chapter: c3
order: 2
type: section
stars: 3
minutes: 22
summary: 只对 0/0 与 ∞/∞ 有效；其他五种未定式先变形。附一个"用洛必达会算错"的反例——那是它失效的判据。
concepts: [c-lhopital, c-indeterminate]
---

## 锚点结果

三个极限，第一个需要连用两次：

1. $\lim\limits_{x\to0}\dfrac{e^{x}-1-x}{x^{2}}=\dfrac12$
2. $\lim\limits_{x\to0^{+}}x\ln x=0$
3. $\lim\limits_{x\to\infty}\dfrac{\ln x}{x}=0$

而下面这个**不能用洛必达**，尽管它也是"分母趋于无穷"：

$$\lim_{x\to\infty}\frac{x+\sin x}{x}=1$$

为什么？见机制最后一段——这是本节唯一的坑。

## 机制

### 法则本身：只对两种未定式

若

1. $\lim\dfrac{f(x)}{g(x)}$ 是 $\dfrac00$ 型或 $\dfrac{\infty}{\infty}$ 型；
2. 在 $x_0$ 的某去心邻域内 $f,g$ 可导，且 $g'(x)\neq0$；
3. $\lim\dfrac{f'(x)}{g'(x)}$ 存在（或为 $\pm\infty$）；

则

$$\lim\frac{f(x)}{g(x)}=\lim\frac{f'(x)}{g'(x)} .$$

**用法**：逐次求导，每次都要重新检查是不是仍是 $\dfrac00$ 或 $\dfrac{\infty}{\infty}$；一旦不是，立刻停止并直接代值。

### 五种"看起来不能直接用"的未定式，先化成两种

| 原式 | 类型 | 化法 |
| --- | --- | --- |
| $f\cdot g$ | $0\cdot\infty$ | 写成 $\dfrac{f}{1/g}$ 或 $\dfrac{g}{1/f}$，变成 $\dfrac00$ 或 $\dfrac\infty\infty$ |
| $f-g$ | $\infty-\infty$ | 通分，或提出公因式 |
| $f^{g}$ | $1^{\infty}$、$0^{0}$、$\infty^{0}$ | 取对数：$g\ln f$，先算这个极限（通常是 $0\cdot\infty$） |

例（第二个锚点）：$x\to0^{+}$ 时 $x\ln x$ 是 $0\cdot\infty$。改写成

$$x\ln x=\frac{\ln x}{1/x}\quad\left(\frac{\infty}{\infty}\text{ 型}\right),$$

用洛必达：

$$\lim_{x\to0^{+}}\frac{\ln x}{1/x}=\lim_{x\to0^{+}}\frac{1/x}{-1/x^{2}}=\lim_{x\to0^{+}}(-x)=0 .$$

:::trap
改写成 $\dfrac{\ln x}{1/x}$ 还是 $\dfrac{x}{1/\ln x}$，结果一样但计算量差别很大。**规则：把"求导后变简单"的那个留在分子。**$\ln x$ 求导变 $1/x$（简单），$1/\ln x$ 求导会更复杂。选错了会越算越乱。
:::

### 什么时候洛必达会失效（本节重点）

条件 3 是"$\lim\dfrac{f'}{g'}$ 存在"。**它不存在时，法则不成立，但原极限可能存在。**

$$\lim_{x\to\infty}\frac{x+\sin x}{x}=1+\lim_{x\to\infty}\frac{\sin x}{x}=1+0=1 .$$

若硬用洛必达：

$$\frac{(x+\sin x)'}{(x)'}=\frac{1+\cos x}{1},$$

这个式子当 $x\to\infty$ 时在 $0$ 与 $2$ 之间振荡，**极限不存在**。所以洛必达在这里不适用——不是"算错了"，是"前提没满足"。

:::key
**判断洛必达能不能用的顺序**：① 是 $\frac00$ 或 $\frac\infty\infty$ 吗？② 求导后那个比值有极限吗？两个都"是"才能用。第 ② 步很多人跳过，于是把"振荡"误当成"无穷"，写出错误的答案。
:::

### 和等价无穷小比：选哪个

| 情形 | 用哪个 | 理由 |
| --- | --- | --- |
| 乘除结构、能直接替换（如 $\frac{\sin 3x}{x}$） | 等价无穷小 | 一行出结果 |
| 需要二阶以上信息（如 $\frac{e^x-1-x}{x^2}$） | 洛必达 | 等价替换要背三阶表，洛必达两次就够 |
| $0\cdot\infty$、$\infty-\infty$ | 先变形，两者都行 | 变形后往往是 $\frac00$ |
| 含 $\ln x$ 与幂函数混合（如 $\frac{\ln x}{x}$） | 洛必达 | 求导能把 $\ln$ 消掉 |

## 速查

### 常见极限要几次洛必达

| 极限 | 值 | 次数 |
| --- | --- | --- |
| $\lim\limits_{x\to0}\dfrac{\sin x}{x}$ | $1$ | 1 次 |
| $\lim\limits_{x\to0}\dfrac{e^{x}-1}{x}$ | $1$ | 1 次 |
| $\lim\limits_{x\to0}\dfrac{1-\cos x}{x^{2}}$ | $\dfrac12$ | 1 次 |
| $\lim\limits_{x\to0}\dfrac{e^{x}-1-x}{x^{2}}$ | $\dfrac12$ | 2 次 |
| $\lim\limits_{x\to0}\dfrac{x-\sin x}{x^{3}}$ | $\dfrac16$ | 3 次 |
| $\lim\limits_{x\to\infty}\dfrac{\ln x}{x^{a}}\ (a>0)$ | $0$ | 1 次 |
| $\lim\limits_{x\to\infty}\dfrac{x^{n}}{e^{x}}$ | $0$ | $n$ 次 |

### 五种未定式的标准变形

| 型 | 变形 | 备注 |
| --- | --- | --- |
| $0\cdot\infty$ | $\dfrac{f}{1/g}$ | 谁"求导后简单"谁留分子 |
| $\infty-\infty$ | 通分 | 有根号先有理化 |
| $1^{\infty}$ | $e^{\lim g(f-1)}$ | 也可取对数后洛必达 |
| $0^{0}$ | $e^{\lim g\ln f}$ | $\ln f\to-\infty$，用 $0\cdot\infty$ 化法 |
| $\infty^{0}$ | $e^{\lim g\ln f}$ | $\ln f\to\infty$，同上 |

## 题

:::problem id=3.2-01 level=中 source="本站自编"
求 $\lim\limits_{x\to0}\dfrac{e^{x}-1-x}{x^{2}}$。

:::ans
代值：分子 $1-1-0=0$，分母 $0$，是 $\dfrac00$ 型，可用洛必达。

**第一次**：

$$\lim_{x\to0}\frac{e^{x}-1-x}{x^{2}}\overset{\text{洛}}{=}\lim_{x\to0}\frac{e^{x}-1}{2x}.$$

仍是 $\dfrac00$（分子 $\to0$，分母 $\to0$），再洛一次：

$$\overset{\text{洛}}{=}\lim_{x\to0}\frac{e^{x}}{2}=\frac12 .$$

现在分母是常数 $2$，不再是未定式，**停止**。

:::practice
每次用完洛必达都要判一次型：**不是 $\frac00$ 或 $\frac\infty\infty$ 就立刻代值**。这题第二次之后分子是 $e^x\to1$、分母是 $2$，已经不是未定式了，再求导就错。
:::
:::
:::

:::problem id=3.2-02 level=中 source="本站自编"
求 $\lim\limits_{x\to0^{+}}x\ln x$。

:::ans
$x\to0^{+}$ 时 $x\to0$、$\ln x\to-\infty$，是 $0\cdot\infty$ 型。改写成 $\dfrac{\infty}{\infty}$：

$$x\ln x=\frac{\ln x}{1/x}.$$

用洛必达：

$$\lim_{x\to0^{+}}\frac{\ln x}{1/x}\overset{\text{洛}}{=}\lim_{x\to0^{+}}\frac{1/x}{-1/x^{2}}=\lim_{x\to0^{+}}(-x)=0 .$$

:::trap
这题的答案 $0$ 是"负数乘正数"看不出来的——$x$ 趋于 $0$ 更快，把 $\ln x$ 的"负无穷"压住了。这类题的固定动作就是**改写成 $\frac{\infty}{\infty}$**，不要试图用"谁大谁小"直觉判断。
:::
:::
:::

:::problem id=3.2-03 level=难 source="本站自编"
求 $\lim\limits_{x\to\infty}\dfrac{x+\sin x}{x}$，并说明能不能用洛必达。

:::ans
**先直接算**：

$$\frac{x+\sin x}{x}=1+\frac{\sin x}{x}.$$

而 $\left\lvert\dfrac{\sin x}{x}\right\rvert\le\dfrac1{\lvert x\rvert}\to0$，所以

$$\lim_{x\to\infty}\frac{x+\sin x}{x}=1 .$$

**能不能用洛必达**：不能，或严格说"用了也得不到答案"。形式上它确实是 $\dfrac{\infty}{\infty}$，但求导后的比值

$$\frac{1+\cos x}{1}$$

在 $x\to\infty$ 时不存在（在 $0$ 与 $2$ 之间振荡）。洛必达的第三个条件是"$\lim\frac{f'}{g'}$ 存在"，这里不满足，**所以法则不适用**——原极限存在并不矛盾。

:::trap
这是洛必达最典型的失效案例，也是考题里区分"背公式"和"懂条件"的地方。判断标准不是"原式是不是未定式"，而是"**求导后的比值有没有极限**"。
:::
:::
:::

:::problem id=3.2-04 level=易 source="本站自编"
求 $\lim\limits_{x\to\infty}\dfrac{\ln x}{x}$。

:::ans
$\dfrac{\infty}{\infty}$ 型，用洛必达：

$$\lim_{x\to\infty}\frac{\ln x}{x}\overset{\text{洛}}{=}\lim_{x\to\infty}\frac{1/x}{1}=\lim_{x\to\infty}\frac1x=0 .$$

**结论可以推广**：$\ln x$ 增长得比任何正幂次 $x^{a}$ 都慢，所以 $\lim\limits_{x\to\infty}\dfrac{\ln x}{x^{a}}=0$（$a>0$）。

:::practice
这条与 $\lim\dfrac{x^n}{e^x}=0$ 一起记：**增长速度由慢到快是 $\ln x \ll x^a \ll a^x \ll x!$**。期末里比较大小、判断收敛都要用它。
:::
:::
:::

:::key
第三章 33% 里，洛必达是**纯计算得分点**：给一个未定式，变形 → 求导 → 判型 → 得出数。唯一需要理解的是"条件 3 不满足时不能用"，而它正好对应 3.2-03 那道题。
:::
