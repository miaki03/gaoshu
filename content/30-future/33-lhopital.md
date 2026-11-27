---
title: 3.2 洛必达：先学会判断"能不能用"
slug: 3-2-lhopital
part: p3
chapter: c3
order: 2
type: section
stars: 3
minutes: 25
summary: 检测题 3-2 的选择题专考"这个解法错在哪"。先把三种错法认清，再做十二道计算。
concepts: [c-lhopital, c-indeterminate]
---

## 这节怎么用

检测题 3-2 的结构：

| 题号 | 题型 | 数量 | 考什么 |
| --- | --- | --- | --- |
| 一 | 填空 | 4 | 直接算极限 |
| 二 | 选择 | 2 | **这个解法错在哪** / 哪个过程正确 |
| 三 | 计算 | 12 | 用洛必达算极限 |
| 四 | 证明 | 1 | 证不等式 |

十二道计算题看着吓人，其实只有三种套路。先学会判断能不能用——选择题就在考这个。

## 一、选择题：三种错法

:::problem id=3.2-01 level=中 source="本校检测题 3-2 二、1 同类"
有人这样算：$\lim\limits_{x\to0}\dfrac{x+1}{x+2}\overset{\text{洛}}{=}\lim\limits_{x\to0}\dfrac{1}{1}=1$。这个计算（ ）

(A) 正确
(B) 错误，因为 $\dfrac{x+1}{x+2}$ 不是 $\dfrac00$ 型未定式
(C) 错误，因为 $\lim\dfrac{(x+1)'}{(x+2)'}$ 不存在
(D) 错误，因为 $\dfrac{x+1}{x+2}$ 是 $\dfrac{\infty}{\infty}$ 型未定式

:::ans
**选 B。**

代值就知道：$x=0$ 时分子是 $1$、分母是 $2$，极限直接是 $\dfrac12$。**它压根不是未定式，不该用洛必达。**

洛必达只对 $\dfrac00$ 和 $\dfrac{\infty}{\infty}$ 两种型有效。第一步永远是——**先代值，看是不是未定式**。

:::key
这类题不考计算，考"该不该用"。判断两步：① 代值，是 $\dfrac00$ 或 $\dfrac{\infty}{\infty}$ 吗？不是就别用。② 用了之后，$\lim\dfrac{f'}{g'}$ 存在吗？不存在也不能用。
:::
:::
:::

:::problem id=3.2-02 level=难 source="本校检测题 3-2 二、2 同类"
下列哪一步**正确**使用了洛必达法则？

(A) $\lim\limits_{x\to\infty}\dfrac{x+\sin x}{x}\overset{\text{洛}}{=}\lim\limits_{x\to\infty}\dfrac{1+\cos x}{1}$
(B) $\lim\limits_{x\to0}\dfrac{\sin x}{x}\overset{\text{洛}}{=}\lim\limits_{x\to0}\dfrac{\cos x}{1}=1$
(C) $\lim\limits_{x\to0}\dfrac{e^{x}-1-x}{x^{2}}\overset{\text{洛}}{=}\lim\limits_{x\to0}\dfrac{e^{x}-1}{2x}\overset{\text{洛}}{=}\lim\limits_{x\to0}\dfrac{e^{x}}{2}=\dfrac12$
(D) $\lim\limits_{x\to0}\dfrac{x^{2}\sin\frac1x}{x}\overset{\text{洛}}{=}\lim\limits_{x\to0}\dfrac{2x\sin\frac1x-\cos\frac1x}{1}$

:::ans
**选 C。**

| 选项 | 病在哪 |
| --- | --- |
| (A) | 是 $\dfrac{\infty}{\infty}$，但求导后的比值 $1+\cos x$ **在 $x\to\infty$ 时振荡、没有极限**，条件 3 不满足。原极限其实是 $1$（拆成 $1+\frac{\sin x}{x}$） |
| (B) | 形式上能用，但 $(\sin x)'=\cos x$ 这个公式**本身就是靠 $\frac{\sin x}{x}\to1$ 推出来的**，拿它算这个极限是循环论证。这是基本极限，不能反过来用洛必达证 |
| (C) | $\dfrac00$ 型；第一次求导后仍是 $\dfrac00$，再求一次得到 $\dfrac{e^{0}}{2}$，**不再是未定式就停手**。每一步都合法 |
| (D) | 求导后 $\dfrac{2x\sin\frac1x-\cos\frac1x}{1}$ 在 $0$ 附近振荡，极限不存在。原极限其实是 $0$（无穷小乘有界量） |

:::trap
(C) 里最容易错的是**没停手**。第二次求导后分子 $e^{x}\to1$、分母是常数 $2$，已经不是未定式；再求导毫无意义。**每用一次洛必达，都重新判一次型。**
:::
:::
:::

## 二、计算：三种套路装下十二道题

### 套路一：纯 $\dfrac00$ —— 一直求导，直到不是未定式

$$\lim_{x\to0}\frac{e^{x}-1-x}{x^{2}}\overset{\text{洛}}{=}\lim_{x\to0}\frac{e^{x}-1}{2x}\overset{\text{洛}}{=}\lim_{x\to0}\frac{e^{x}}{2}=\frac12 .$$

### 套路二：$0\cdot\infty$ 或 $\infty-\infty$ —— 先变形

$x\ln x$ 在 $x\to0^{+}$ 是 $0\cdot\infty$。**把"求导后变简单"的那个留在分子**：

$$x\ln x=\frac{\ln x}{1/x}\ \left(\frac{\infty}{\infty}\right)\overset{\text{洛}}{=}\frac{1/x}{-1/x^{2}}=-x\to0 .$$

:::problem id=3.2-03 level=中 source="本校检测题 3-2 三、7 同类"
求 $\lim\limits_{x\to0^{+}}x\ln x$。

:::ans
改写：$x\ln x=\dfrac{\ln x}{1/x}$，成为 $\dfrac{\infty}{\infty}$ 型。用洛必达：

$$\lim_{x\to0^{+}}\frac{\ln x}{1/x}\overset{\text{洛}}{=}\lim_{x\to0^{+}}\frac{1/x}{-1/x^{2}}=\lim_{x\to0^{+}}(-x)=0 .$$

**答案 $0$。**

:::practice
为什么把 $\ln x$ 留在分子？因为它求导变成 $\dfrac1x$，变简单了；而 $\dfrac1{\ln x}$ 求导会更复杂。**改写方向选错，越算越乱。**
:::
:::
:::

### 套路三：幂指函数 $f^{g}$ —— 取对数

$1^{\infty}$、$0^{0}$、$\infty^{0}$ 都用这一招：先算 $g\ln f$ 的极限，再取 $e$ 的幂。

$$\lim u^{v}=\exp\left(\lim v\ln u\right)$$

例：$\lim\limits_{x\to0}(1+2x)^{1/x}$。取对数得 $\dfrac{\ln(1+2x)}{x}$，是 $\dfrac00$ 型，

$$\overset{\text{洛}}{=}\frac{\frac{2}{1+2x}}{1}\to2\ \Longrightarrow\ \text{原式}=e^{2}.$$

## 三、证明题：洛必达配合单调性

检测题 3-2 第四大题是"证明当 $x>a$ 时某不等式"。做法不是用洛必达硬算，而是**移项成函数，证它单调递增**（下一节 3.4 讲透）。

例：证 $x>0$ 时 $x>\ln(1+x)$。

设 $f(x)=x-\ln(1+x)$，则 $f(0)=0$，且

$$f'(x)=1-\frac{1}{1+x}=\frac{x}{1+x}>0\quad(x>0).$$

所以 $f$ 在 $[0,+\infty)$ 上递增，$x>0$ 时 $f(x)>f(0)=0$，即 $x>\ln(1+x)$。

## 四、什么时候失效（本节唯一的理解点）

:::problem id=3.2-04 level=难 source="本站自编"
求 $\lim\limits_{x\to\infty}\dfrac{x+\sin x}{x}$，并说明能不能用洛必达。

:::ans
**先直接算**：

$$\frac{x+\sin x}{x}=1+\frac{\sin x}{x}.$$

因为 $\left\lvert\dfrac{\sin x}{x}\right\rvert\le\dfrac1{\lvert x\rvert}\to0$，所以

$$\lim_{x\to\infty}\frac{x+\sin x}{x}=1 .$$

**能不能用洛必达：不能。** 形式上它是 $\dfrac{\infty}{\infty}$，但求导后的比值

$$\frac{1+\cos x}{1}$$

在 $x\to\infty$ 时不存在（在 $0$ 与 $2$ 之间振荡）。洛必达的第三个条件"$\lim\frac{f'}{g'}$ 存在"不满足，所以法则不适用——原极限本来就有，这不矛盾。

:::trap
判断标准不是"原式是不是未定式"，而是"**求导后的比值有没有极限**"。很多题形式上是 $\frac\infty\infty$，但导完振荡，那就不能用洛必达。
:::
:::
:::

## 速查

### 五种未定式怎么化

| 型 | 化法 | 注意 |
| --- | --- | --- |
| $0\cdot\infty$ | 写成 $\dfrac{f}{1/g}$ | 让"求导后简单"的那个留在分子 |
| $\infty-\infty$ | 通分 | 有根号先有理化 |
| $1^{\infty}$、$0^{0}$、$\infty^{0}$ | 取对数算 $g\ln f$ | 要求该邻域内 $f>0$ |

### 常见极限（记值即可）

| 极限 | 值 |
| --- | --- |
| $\lim\limits_{x\to0}\dfrac{\sin x}{x}$ | $1$（基本极限，不能用洛必达） |
| $\lim\limits_{x\to0}\dfrac{e^{x}-1}{x}$ | $1$ |
| $\lim\limits_{x\to0}\dfrac{1-\cos x}{x^{2}}$ | $\dfrac12$ |
| $\lim\limits_{x\to0}\dfrac{e^{x}-1-x}{x^{2}}$ | $\dfrac12$ |
| $\lim\limits_{x\to0}\dfrac{x-\sin x}{x^{3}}$ | $\dfrac16$ |
| $\lim\limits_{x\to\infty}\dfrac{\ln x}{x^{a}}\ (a>0)$ | $0$ |
| $\lim\limits_{x\to\infty}\dfrac{x^{n}}{e^{x}}$ | $0$ |

### 增长速度（每个箭头都有条件）

$$\ln x \ll x^{a}\ (a>0) \ll b^{x}\ (b>1) \ll x!$$

:::trap
底数 $b\le1$ 时不能这么写：$b=0.5$ 时 $0.5^{x}\to0$，比 $x^{0.5}$ 小得多。**"指数函数增长快"只对底数大于 $1$ 成立。**
:::

## 作业对应

检测题 **3-2** 全做。第二题（判断解法对错）和最后几道计算题最值得花时间——前者考理解，后者考熟练。

上一节：[3.1 中值定理](/s/3-1-mvt)。
