---
title: 1.2 数列的极限
slug: 1-2-sequence-limit
part: p1
chapter: c1
order: 2
type: section
stars: 2
minutes: 18
summary: 收敛与有界的关系、夹逼、单调有界，以及"数列性质"这类单选题的固定答案。
exam: [2022, 2023, 2024, 2025]
concepts: [c-sequence, c-converge, c-bounded, c-squeeze]
---

## 锚点结果

两个结果，都是直接能用的：

1. $\lim\limits_{n\to\infty}\dfrac{\sin n}{n}=0$。理由不是"$\sin n$ 趋于 0"，而是 $\left\lvert\dfrac{\sin n}{n}\right\rvert\le\dfrac1n\to0$。
2. "数列 $\{a_n\}$ 有界"是"$\lim\limits_{n\to\infty}a_n$ 存在"的**必要**条件，不是充分条件。

第 2 条几乎是"数列性质"单选题的标准答案，四年里出现三次。

## 机制

### 收敛是什么意思

$a_n\to A$ 的意思是：**$n$ 足够大以后，$a_n$ 与 $A$ 的距离可以任意小**。

形式化写法（不考证明，但要能读懂）：对任意 $\varepsilon>0$，存在 $N$，当 $n>N$ 时 $\lvert a_n-A\rvert<\varepsilon$。

这句定义里"任意 $\varepsilon$"是关键：不是"存在一个很小的误差"，而是"你随便给多小的误差都能做到"。区别就在于前有限项可以是任意乱的，只看**尾部**。

### 收敛与有界：单向关系

$$
\{a_n\}\text{ 收敛}\ \Longrightarrow\ \{a_n\}\text{ 有界}
$$

反过来**不成立**。反例是 $a_n=(-1)^n$：它有界（$\lvert a_n\rvert=1$），但不收敛（在 $-1$ 与 $1$ 之间跳）。

所以在"$A$ 是 $B$ 的什么条件"这类题里：

| 命题 | 结论 |
| --- | --- |
| 有界 $\Rightarrow$ 收敛 | 假 |
| 收敛 $\Rightarrow$ 有界 | 真 |
| 所以"有界"是"收敛"的 | **必要但非充分** |

:::trap
"必要"和"充分"的判断方法是**看箭头方向**：$B\Rightarrow A$ 时 $A$ 是 $B$ 的必要条件；$A\Rightarrow B$ 时 $A$ 是 $B$ 的充分条件。别靠语感。收敛 $\Rightarrow$ 有界，所以有界是收敛的**必要**条件。
:::

### 子列：判断不收敛的工具

若 $a_n\to A$，则它的任何子列（如 $a_{2n}$、$a_{2n+1}$）都 $\to A$。

逆否命题更好用：**若两个子列收敛到不同的值，则原数列发散。** $(-1)^n$ 就是 $a_{2n}\to1$、$a_{2n+1}\to-1$，所以发散。

反方向的判定：若 $a_{2n}\to A$ 且 $a_{2n+1}\to A$（**同一个** $A$），则 $a_n\to A$。

:::trap
"$a_{2n}$ 与 $a_{2n+1}$ 都收敛"**不能**推出 $a_n$ 收敛。必须两者收敛到**同一个**极限。

别把"子列"和"夹逼"混成一件事。2025–2026 单选第 3 题考的是**夹逼**：已知 $\lim x_n=1$、$2x_n\le y_n\le 2x_n+\dfrac1{2^n}$，求 $\{y_n\}$——两端都趋于 $2$，故 $y_n\to2$（选"收敛于 2"）。"两个子列极限不同 ⇒ 发散"是另一条工具，用来排除"收敛于某值"这种选项。
:::

### 四则运算与夹逼

$$\lim(a_n\pm b_n)=\lim a_n\pm\lim b_n,\quad \lim(a_nb_n)=\lim a_n\cdot\lim b_n$$

前提仍是两个极限都存在。

**夹逼准则**：若 $b_n\le a_n\le c_n$，且 $\lim b_n=\lim c_n=A$，则 $\lim a_n=A$。

它的用法特征：**出现有界但震荡的量**（如 $\sin n$、$(-1)^n$）时，用"夹"而不是直接算。

例：$\lim\limits_{n\to\infty}\dfrac{\sin n}{n}$。因为 $-\dfrac1n\le\dfrac{\sin n}{n}\le\dfrac1n$，两端都 $\to0$，故原极限为 $0$。

**单调有界准则**：单调递增且有上界（或单调递减且有下界）的数列必收敛。这条告诉你"存在"，但**不给极限值**；求值还要另想办法（通常是对递推式两边取极限）。

## 速查

| 极限 | 值 | 条件 |
| --- | --- | --- |
| $\lim\limits_{n\to\infty}\dfrac{1}{n^{p}}$ | $0$ | $p>0$ |
| $\lim\limits_{n\to\infty}q^{n}$ | $0$ | $\lvert q\rvert<1$ |
| $\lim\limits_{n\to\infty}\sqrt[n]{n}$ | $1$ | — |
| $\lim\limits_{n\to\infty}\sqrt[n]{a}$ | $1$ | $a>0$ |
| $\lim\limits_{n\to\infty}\left(1+\dfrac1n\right)^{n}$ | $e$ | — |
| $\lim\limits_{n\to\infty}\dfrac{a^{n}}{n!}$ | $0$ | $a>0$ |

**有理分式** $\dfrac{P(n)}{Q(n)}$ 当 $n\to\infty$：比较分子分母的最高次数 $m$ 与 $k$：

- $m<k$：极限 $0$
- $m=k$：极限为最高次项系数之比
- $m>k$：极限不存在（趋于 $+\infty$ 或 $-\infty$）

## 题

:::problem id=1.2-01 level=易 source="本站自编"
设 $a_n=\dfrac{2n^2+3n-1}{5n^2-n+4}$，求 $\lim\limits_{n\to\infty}a_n$。

:::ans
分子分母同除以 $n^2$：

$$\lim_{n\to\infty}\frac{2+\frac3n-\frac1{n^2}}{5-\frac1n+\frac4{n^2}}=\frac25 .$$

**判据**：最高次都是 2 次，取系数之比。
:::
:::

:::problem id=1.2-02 level=中 source="本站自编（子列判别）"
已知数列 $\{a_n\}$ 满足 $\lim\limits_{n\to\infty}a_{2n}=1$，$\lim\limits_{n\to\infty}a_{2n+1}=2$，则数列 $\{a_n\}$（ ）

(A) 收敛于 $1$   (B) 收敛于 $2$   (C) 收敛于 $\dfrac32$   (D) 一定能确定发散

:::ans
**(D)**。

两个子列收敛到**不同**的值，整个数列就不可能收敛：若 $a_n\to A$，则每个子列都 $\to A$，矛盾。所以 $\{a_n\}$ **一定发散**。

:::conv
"D 一定能确定发散"就是"一定发散"这个结论本身，别被选项措辞绕住。判断这类题只问一件事：**两个子列的极限是否相同**。相同 → 可能收敛（还要看是否覆盖全部项）；不同 → 一定发散。
:::

:::trap
注意选项 $C$ 的诱惑：把 $1$ 和 $2$ 平均成 $\dfrac32$。数列极限不是取平均，子列极限不同就是发散。
:::
:::
:::

:::problem id=1.2-03 level=中 source="本站自编"
求 $\lim\limits_{n\to\infty}\left(\dfrac{1}{n^2}+\dfrac{2}{n^2}+\cdots+\dfrac{n}{n^2}\right)$。

:::ans
先把和算出来再取极限。括号内是等差数列求和：

$$
\frac{1+2+\cdots+n}{n^2}=\frac{\frac{n(n+1)}{2}}{n^2}=\frac{n+1}{2n},
$$

所以

$$
\lim_{n\to\infty}\frac{n+1}{2n}=\frac12 .
$$

:::trap
这题**不能**用夹逼。逐项放缩只能得到 $\dfrac1n\le$ 原式 $\le1$，两端极限分别是 $0$ 与 $1$，不相等，夹逼失效。遇到"$n$ 项求和"先求通项的和，是固定动作。
:::
:::
:::

:::key
这一节在期中卷上的形式是**一道单选（3 分）**，问的性质就是"有界/收敛"与"子列/整体"的关系。填空题里出现过纯计算的数列极限（如 $\lim\dfrac{\sin n}{n}$）。背两条：**收敛必有界、有界不一定收敛**；**子列极限不同则发散**。
:::
