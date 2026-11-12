---
title: 2.1 导数的定义
slug: 2-1-derivative-def
part: p2
chapter: c2
order: 1
type: section
stars: 3
minutes: 20
summary: 定义式本身是填空题的常客（"已知 f'(x0)=A，求某个极限"）。以及什么时候必须用定义求导。
exam: [2022, 2023, 2024, 2025]
concepts: [c-derivative, c-left-right-derivative]
---

## 锚点结果

两个结果：

1. $f(x)=x^{2}$ 在 $x=1$ 处的导数，用**定义**算：

$$f'(1)=\lim_{h\to0}\frac{(1+h)^{2}-1^{2}}{h}=\lim_{h\to0}\frac{2h+h^{2}}{h}=\lim_{h\to0}(2+h)=2 .$$

2. 若 $f'(x_0)=A$，则 $\lim\limits_{h\to0}\dfrac{f(x_0+h)-f(x_0-h)}{h}=2A$。

第 2 条是填空题的高频形式，也是本节最该背的东西。注意分母是 $h$ 时答案是 $2A$；分母是 $2h$ 时答案是 $A$。

## 机制

### 定义

$$
f'(x_0)=\lim_{\Delta x\to0}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}
=\lim_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}
$$

两个表达式完全等价（令 $x=x_0+\Delta x$）。它表达的是：**函数值的改变量除以自变量的改变量，当改变量趋于 0 时的极限**。

几何意义：曲线在 $(x_0,f(x_0))$ 处**切线的斜率**。

### 三个必须记住的变形

$$
\boxed{\lim_{\Delta x\to0}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}=f'(x_0)}
$$

$$
\boxed{\lim_{h\to0}\frac{f(x_0+h)-f(x_0-h)}{2h}=f'(x_0)}
$$

$$
\boxed{\lim_{h\to0}\frac{f(x_0+ah)-f(x_0+bh)}{h}=(a-b)\,f'(x_0)}
$$

第三个是通用的，前两个是它的特例：$a=1,b=0$ 得第一个；$a=1,b=-1$ 得第二个（$(1-(-1))f'=2f'$，分母是 $h$；若分母写 $2h$ 则再除以 2）。

:::trap
最常见的错是**分母与分子不匹配**。$\dfrac{f(x_0+h)-f(x_0-h)}{h}$ 等于 $2f'(x_0)$，不是 $f'(x_0)$。考场上先看分母：分子里两个函数值之差的"跨度"是 $2h$，分母就该是 $2h$。跨度与分母不一致时，用第三个公式的系数补。
:::

### 什么时候必须用定义求导

三种情况，不能直接用求导公式：

| 情形 | 为什么 |
| --- | --- |
| 分段函数在**分界点** | 该点两侧表达式不同，要先确认可导 |
| 含绝对值、$\max$、$\min$ 的式子在某点 | 该点可能不可导，需用左右导数 |
| 只给了抽象条件（如"$f$ 可导且 $f(x+y)=f(x)+f(y)$"） | 没有具体表达式，只能用定义 |

分界点上的固定动作：

$$f'_-(x_0)=\lim_{h\to0^-}\frac{f(x_0+h)-f(x_0)}{h},\qquad
f'_+(x_0)=\lim_{h\to0^+}\frac{f(x_0+h)-f(x_0)}{h}$$

两者存在且相等 $\iff$ 可导。

### 导数的物理意义（一句话）

$s=s(t)$ 是位移，则 $s'(t)$ 是瞬时速度；$v=v(t)$ 是速度，则 $v'(t)$ 是加速度。这类题在期中只作为选择题的干扰项出现，知道一下即可。

## 速查

### 变形公式对照

| 极限形式 | 值 |
| --- | --- |
| $\lim\limits_{h\to0}\dfrac{f(x_0+h)-f(x_0)}{h}$ | $f'(x_0)$ |
| $\lim\limits_{h\to0}\dfrac{f(x_0)-f(x_0-h)}{h}$ | $f'(x_0)$ |
| $\lim\limits_{h\to0}\dfrac{f(x_0+h)-f(x_0-h)}{h}$ | $2f'(x_0)$ |
| $\lim\limits_{h\to0}\dfrac{f(x_0+h)-f(x_0-h)}{2h}$ | $f'(x_0)$ |
| $\lim\limits_{h\to0}\dfrac{f(x_0+ah)-f(x_0)}{h}$ | $a\,f'(x_0)$ |
| $\lim\limits_{x\to x_0}\dfrac{f(x)-f(x_0)}{x-x_0}$ | $f'(x_0)$ |

### 用定义求导的两种写法

**写法一（$\Delta x$ 型）**：

$$f'(x)=\lim_{\Delta x\to0}\frac{f(x+\Delta x)-f(x)}{\Delta x}$$

**写法二（$x\to x_0$ 型）**，求某点导数时更方便：

$$f'(x_0)=\lim_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}$$

## 题

:::problem id=2.1-01 level=中 source="本站自编"
设 $f'(x_0)$ 存在，求 $\lim\limits_{h\to0}\dfrac{f(x_0+h)-f(x_0-h)}{2h}$。

:::ans
分子是两个函数值之差，跨度是 $2h$，正好与分母一致。用第三个公式取 $a=1,b=-1$：

$$\lim_{h\to0}\frac{f(x_0+h)-f(x_0-h)}{h}=(1-(-1))f'(x_0)=2f'(x_0),$$

所以

$$\lim_{h\to0}\frac{f(x_0+h)-f(x_0-h)}{2h}=f'(x_0).$$

**复算**：`2.1-01` 的 verify 用 $f=\sin$、$x_0=1$ 实测，得 $\cos 1\approx0.5403$，正是 $f'(1)$。
:::
:::

:::problem id=2.1-03 level=中 source="本站自编"
设 $f'(x_0)$ 存在，求 $\lim\limits_{h\to0}\dfrac{f(x_0+h)-f(x_0-h)}{h}$。

:::ans
与上一题只差分母的一个因子 $2$。由上题结果：

$$\frac{f(x_0+h)-f(x_0-h)}{h}=2\cdot\frac{f(x_0+h)-f(x_0-h)}{2h}\longrightarrow 2f'(x_0).$$

**复算**：`2.1-03` 的 verify 得 $2\cos1\approx1.0806$。

:::trap
这两题放一起看，就是为了让你记住：**同一个分子，分母是 $2h$ 得 $f'$，分母是 $h$ 得 $2f'$。** 考题改一个数字就能换答案，这是填空题最省力的出题方式。
:::
:::
:::

:::problem id=2.1-02 level=易 source="本站自编"
设 $f(x)=\lvert x\rvert$，用左右导数判断 $f$ 在 $x=0$ 处是否可导。

:::ans
$f(0)=0$。

左导数（$h<0$ 时 $\lvert h\rvert=-h$）：

$$f'_-(0)=\lim_{h\to0^-}\frac{\lvert h\rvert-0}{h}=\lim_{h\to0^-}\frac{-h}{h}=-1 .$$

右导数（$h>0$ 时 $\lvert h\rvert=h$）：

$$f'_+(0)=\lim_{h\to0^+}\frac{\lvert h\rvert-0}{h}=\lim_{h\to0^+}\frac{h}{h}=1 .$$

左、右导数都存在但不相等，故 $f$ 在 $x=0$ 处**不可导**。

**复算**：`2.1-02` 的 verify 用单侧极限复算，得 $-1$。
:::
:::

:::key
这一节在期中卷上：填空一道（导数定义式求极限，3 分）＋ 单选一道（左右导数是否存在，3 分）。**六条变形公式背下来，这 6 分是白送的。**
:::
