---
title: 4.3 分部积分法：谁当 u
slug: 4-3-parts
part: p3
chapter: c4
order: 3
type: section
stars: 2
minutes: 25
summary: 检测题 4-3 全是乘积型：x e^x、x sin x、x ln x、ln x、e^x sin x。选 u 只有一条规则"反对幂指三"，循环型只有一步"移项除 2"。
concepts: [c-parts]
---

## 这节怎么用

检测题 4-3 就五类题，全是乘积。**先做，做不动再看下面的讲解。**

| 题号 | 题型 | 考什么 | 对照题 |
| --- | --- | --- | --- |
| 一、1 | 计算 | 幂函数 × 指数函数，一次分部就完 | 4.3-01 |
| 一、2 | 计算 | 幂函数 × 三角函数，一次分部 | 4.3-02 |
| 一、3 | 计算 | 只有 $\ln x$，把 $dx$ 当 $dv$ | 4.3-03、4.3-04 |
| 一、4 | 计算 | 反三角函数，一次分部加一次代数变形 | 4.3-05 |
| 一、5 | 计算 | $e^{x}\sin x$，两次分部后移项 | 4.3-06 |

上一节：[4.2 换元积分法](/s/4-2-substitution)。这一节和 4.2 是并列的两条路：凑不出来的乘积，改走分部。

## 一、公式从乘积求导来

乘积求导公式是 $(uv)'=u'v+uv'$，移项得 $uv'=(uv)'-u'v$。两边积分：

$$\int u v'\,dx=uv-\int u'v\,dx .$$

写成微分形式就是这一节唯一要记的式子：

$$\int u\,dv=uv-\int v\,du .$$

用法是一进一退：**把被积式拆成 $u$ 和 $dv$ 两部分**，$u$ 求导变简单，$dv$ 积分能算出来，然后换成一个新的积分 $\int v\,du$。这条路只有在"新的积分比原来的简单"时才有用，所以选谁当 $u$ 是关键（见第二节）。

:::key
四步固定写法：

| 步 | 做什么 |
| --- | --- |
| 1 | 拆：写出 $u=$ 什么，$dv=$ 什么 |
| 2 | 分别算 $du=u'\,dx$，$v=\int dv$（这里**不写 $C$**） |
| 3 | 代公式 $\int u\,dv=uv-\int v\,du$ |
| 4 | 算出 $\int v\,du$，最后统一写 $+C$ |

四步都算完才写 $+C$，中间步骤带 $C$ 只会乱。
:::

:::problem id=4.3-01 level=易 source="本校检测题 4-3 一、1 同类"
计算 $\displaystyle\int x e^{x}dx$。

:::ans
**第一步：拆。** 取 $u=x$（求导后变成 $1$，变简单），$dv=e^{x}dx$（积分后还是 $e^{x}$，好算）。

**第二步：算 $du$ 与 $v$。** $du=dx$，$v=e^{x}$。

**第三步：代公式。**
$$\int x e^{x}dx=x e^{x}-\int e^{x}dx=x e^{x}-e^{x}+C=(x-1)e^{x}+C .$$

**验算**：$((x-1)e^{x})'=e^{x}+(x-1)e^{x}=x e^{x}$，对上了。

:::trap
如果反过来取 $u=e^{x}$、$dv=x\,dx$，会得到 $\dfrac{x^{2}}{2}e^{x}-\int\dfrac{x^{2}}{2}e^{x}dx$——次数从 $x$ 升到 $x^{2}$，越算越难。**分部积分的方向对不对，看"次数是升还是降"**：$u$ 求导后次数要降，$dv$ 积分后次数可以升，但整体要变简单。
:::
:::
:::

## 二、谁当 $u$：反对幂指三

顺序是固定的五个字：

$$\textbf{反}\ \textbf{对}\ \textbf{幂}\ \textbf{指}\ \textbf{三}$$

反三角、对数、幂函数、指数、三角函数。**排在前面的当 $u$，排在后面的塞进 $dv$。** 理由是这个顺序大致就是"求导后会变简单"的强弱次序：$\ln x$ 求导变 $\frac1x$（非常好），$x$ 求导变 $1$（好），$e^{x}$ 求导不变（没用），$\sin x$ 求导只是换成 $\cos x$（没用）。

所以：

| 被积式 | $u$ | $dv$ | 依据 |
| --- | --- | --- | --- |
| $x e^{x}$ | $x$（幂） | $e^{x}dx$（指） | 幂在指前 |
| $x\sin x$ | $x$（幂） | $\sin x\,dx$（三） | 幂在三前 |
| $x\ln x$ | $\ln x$（对） | $x\,dx$（幂） | 对在幂前 |
| $x\arctan x$ | $\arctan x$（反） | $x\,dx$（幂） | 反在幂前 |
| $e^{x}\sin x$ | $\sin x$（或 $e^{x}$） | 剩下那个 | 循环型：口诀在这一对上给不出结论，两个都行，但**两次必须取同一侧** |

:::problem id=4.3-02 level=易 source="本校检测题 4-3 一、2 同类"
计算 $\displaystyle\int x\sin x\,dx$。

:::ans
**拆。** 幂在三前，取 $u=x$，$dv=\sin x\,dx$。

**算。** $du=dx$，$v=\int\sin x\,dx=-\cos x$。

**代。**
$$\int x\sin x\,dx=x\cdot(-\cos x)-\int(-\cos x)dx=-x\cos x+\int\cos x\,dx=-x\cos x+\sin x+C .$$

**验算**：$(-x\cos x+\sin x)'=-\cos x+x\sin x+\cos x=x\sin x$，对上了。

:::trap
$v=\int\sin x\,dx=-\cos x$ 的**负号**是这道题唯一容易错的地方。代公式时 $uv$ 这一项是 $x\cdot(-\cos x)=-x\cos x$，而 $-\int v\,du$ 里 $v$ 也带负号，两个负号合成 $+\int\cos x\,dx$。**先把 $v$ 算准，再代公式，不要心算符号。**
:::
:::
:::

:::problem id=4.3-03 level=中 source="本校检测题 4-3 一、3 同类"
计算 $\displaystyle\int\ln x\,dx$。

:::ans
被积式只有一个 $\ln x$，看起来没有乘积。**把 $dx$ 当成 $dv$**：取 $u=\ln x$，$dv=dx$。

**算。** $du=\dfrac1x dx$，$v=x$。

**代。**
$$\int\ln x\,dx=x\ln x-\int x\cdot\frac1x dx=x\ln x-\int 1\,dx=x\ln x-x+C .$$

**验算**：$(x\ln x-x)'=\ln x+1-1=\ln x$，对上了。

:::key
只有一个因子时，$dv=dx$ 是默认选择，不是特例。同一个动作处理：$\int\arctan x\,dx$、$\int\arcsin x\,dx$ 都是取 $u=$ 那个函数、$dv=dx$。**"式子里只有一个函数"不等于"不能用分部"。**
:::
:::
:::

## 三、剩下的积分是分式：拆开再算

$x\ln x$、$x\arctan x$ 这类题，第一次分部之后剩下的积分里有个分式，还要再处理一次。套路是：**第一次把 $u$ 定在"反对"上，剩下的积分化成多项式加分式，拆项算完。**

:::problem id=4.3-04 level=中 source="本校检测题 4-3 一、3 同类"
计算 $\displaystyle\int x\ln x\,dx$（$x>0$）。

:::ans
**拆。** 对在幂前，取 $u=\ln x$，$dv=x\,dx$。

**算。** $du=\dfrac1x dx$，$v=\dfrac{x^{2}}{2}$。

**代。**
$$\int x\ln x\,dx=\frac{x^{2}}{2}\ln x-\int\frac{x^{2}}{2}\cdot\frac1x dx=\frac{x^{2}}{2}\ln x-\frac12\int x\,dx .$$

**算完最后的积分。**
$$\int x\ln x\,dx=\frac{x^{2}}{2}\ln x-\frac{x^{2}}{4}+C .$$

**验算**：$\left(\dfrac{x^{2}}{2}\ln x-\dfrac{x^{2}}{4}\right)'=x\ln x+\dfrac{x^{2}}{2}\cdot\dfrac1x-\dfrac{x}{2}=x\ln x$，对上了。

:::practice
$\int x\,dx=\dfrac{x^{2}}{2}$ 里的 $\dfrac12$ 要和前面 $v=\dfrac{x^{2}}{2}$ 带出来的系数一起算清。这类题错在系数上的比错在思路上的多——**每一步的系数单独写一行**，别连着心算。
:::
:::
:::

:::problem id=4.3-05 level=中 source="本校检测题 4-3 一、4 同类"
计算 $\displaystyle\int x\arctan x\,dx$。

:::ans
**拆。** 反在幂前，取 $u=\arctan x$，$dv=x\,dx$。

**算。** $du=\dfrac{dx}{1+x^{2}}$，$v=\dfrac{x^{2}}{2}$。

**代。**
$$\int x\arctan x\,dx=\frac{x^{2}}{2}\arctan x-\frac12\int\frac{x^{2}}{1+x^{2}}dx .$$

**处理剩下的积分。** 分子分母同次，先拆：
$$\frac{x^{2}}{1+x^{2}}=\frac{(1+x^{2})-1}{1+x^{2}}=1-\frac{1}{1+x^{2}} .$$
所以
$$\int\frac{x^{2}}{1+x^{2}}dx=x-\arctan x .$$

**合起来。**
$$\int x\arctan x\,dx=\frac{x^{2}}{2}\arctan x-\frac12(x-\arctan x)+C=\frac{x^{2}+1}{2}\arctan x-\frac x2+C .$$

**验算**：$\left(\dfrac{x^{2}+1}{2}\arctan x-\dfrac x2\right)'=x\arctan x+\dfrac{x^{2}+1}{2}\cdot\dfrac{1}{1+x^{2}}-\dfrac12=x\arctan x$，对上了。

:::trap
最后一步的合并容易停在 $\dfrac{x^{2}}{2}\arctan x-\dfrac x2+\dfrac12\arctan x$ 就不动了。这个写法**是对的**，只是没整理；而 $\dfrac{x^{2}}{2}\arctan x-\dfrac12\int\frac{x^{2}}{1+x^{2}}dx$ 这种留着积分号的写法**是错的**——没算完。分部积分的答案里不能剩积分号。
:::
:::
:::

## 四、循环型：两次之后回到原式，移项除 2

$e^{x}\sin x$、$e^{x}\cos x$ 这类，分部两次之后右边又出现原来的积分。这时**不要求出来，把它当成未知数解方程**。

:::problem id=4.3-06 level=难 source="本校检测题 4-3 一、5 同类"
计算 $\displaystyle\int e^{x}\sin x\,dx$。

:::ans
记 $I=\displaystyle\int e^{x}\sin x\,dx$。

**第一次。** 取 $u=\sin x$，$dv=e^{x}dx$。则 $du=\cos x\,dx$，$v=e^{x}$，
$$I=e^{x}\sin x-\int e^{x}\cos x\,dx .$$

**第二次。** 对 $\int e^{x}\cos x\,dx$ **继续用同样的取法**（这次 $u$ 仍取三角函数那一侧，$dv=e^{x}dx$）：$u=\cos x$，$dv=e^{x}dx$，$du=-\sin x\,dx$，$v=e^{x}$，于是
$$\int e^{x}\cos x\,dx=e^{x}\cos x+\int e^{x}\sin x\,dx=e^{x}\cos x+I .$$

**代回去。**
$$I=e^{x}\sin x-\left(e^{x}\cos x+I\right)=e^{x}\sin x-e^{x}\cos x-I .$$

**移项解 $I$。**
$$2I=e^{x}(\sin x-\cos x)\ \Longrightarrow\ I=\frac{e^{x}}{2}(\sin x-\cos x)+C .$$

**验算**：$\left(\dfrac{e^{x}}{2}(\sin x-\cos x)\right)'=\dfrac{e^{x}}{2}\left[(\sin x-\cos x)+(\cos x+\sin x)\right]=e^{x}\sin x$，对上了。

:::trap
循环型有两个必错点：

1. **两次分部必须朝同一个方向取**（都取三角函数为 $u$）。第二次如果改成 $u=e^{x}$，两次的 $\int v\,du$ 会互相抵消成 $0=0$，什么也算不出来。
2. **移项后要除 $2$**。$2I=e^{x}(\sin x-\cos x)$ 之后忘除 2，答案差一倍。

另外 $+C$ 是移项解出 $I$ 之后才加的，中间过程不要把 $C$ 混进去。
:::
:::
:::

## 速查

### 选 $u$ 的顺序：反对幂指三

| 顺序 | 类型 | 例子 | 为什么排这里 |
| --- | --- | --- | --- |
| 1 | 反三角 | $\arctan x$、$\arcsin x$ | 求导后变成代数式，彻底换掉 |
| 2 | 对数 | $\ln x$ | 求导后变成 $\frac1x$，非常有用 |
| 3 | 幂函数 | $x$、$x^{2}$ | 求导后次数降低一档 |
| 4 | 指数 | $e^{x}$、$a^{x}$ | 求导后形状不变，不划算 |
| 5 | 三角函数 | $\sin x$、$\cos x$ | 求导后只是换成另一个三角函数，不划算 |

**用法**：被积式里出现两类时，取排在前面的当 $u$，另一类连同 $dx$ 一起当 $dv$。

### 五类题的拆法

| 被积式 | $u$ | $dv$ | 结果 |
| --- | --- | --- | --- |
| $x e^{x}$ | $x$ | $e^{x}dx$ | $(x-1)e^{x}+C$ |
| $x\sin x$ | $x$ | $\sin x\,dx$ | $-x\cos x+\sin x+C$ |
| $\ln x$ | $\ln x$ | $dx$ | $x\ln x-x+C$ |
| $x\ln x$ | $\ln x$ | $x\,dx$ | $\dfrac{x^{2}}{2}\ln x-\dfrac{x^{2}}{4}+C$ |
| $x\arctan x$ | $\arctan x$ | $x\,dx$ | $\dfrac{x^{2}+1}{2}\arctan x-\dfrac x2+C$ |
| $e^{x}\sin x$ | $\sin x$（两次同向） | $e^{x}dx$ | $\dfrac{e^{x}}{2}(\sin x-\cos x)+C$ |

### 三步判断一道题该不该用分部

| 看到什么 | 判断 |
| --- | --- |
| 两个不同类型的函数相乘 | 用分部，先按"反对幂指三"定 $u$ |
| 只有一个 $\ln x$、$\arctan x$、$\arcsin x$ | 用分部，$dv=dx$ |
| 只剩一个多项式、或能凑微分 | 不用分部，回 4.1、4.2 |

## 作业对应

检测题 **4-3** 全做（五道，正好对应上面五类；本节多配了一道 $x\ln x$ 的同类题）。做完之后盖住速查表，把每道题的 $u$ 和 $dv$ 单独默写一遍——考场上先定 $u$，剩下的就是机械计算。

上一节：[4.2 换元积分法](/s/4-2-substitution)。第四章到此结束，下一章从 [5.1 定积分的概念与性质](/s/5-1-concept) 开始。
