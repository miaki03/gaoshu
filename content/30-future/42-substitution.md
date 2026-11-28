---
title: 4.2 换元积分法：先凑微分，再三角代换
slug: 4-2-substitution
part: p3
chapter: c4
order: 2
type: section
stars: 3
minutes: 30
summary: 检测题 4-2(1) 是 8 空凑微分加 8 道计算，4-2(2) 是 6 道三角代换。套路只有两个：把 φ'(x)dx 凑成 dφ(x)，或用 x=a sin t 把根号换成三角函数。
concepts: [c-substitution]
---

## 这节怎么用

检测题 4-2 分两张卷子，共三类题。**先做，做不动再看下面的讲解。**

| 题号 | 题型 | 考什么 | 对照题 |
| --- | --- | --- | --- |
| 4-2(1) 一、1–8 | 填空 | 认出 $\varphi'(x)dx=d\varphi(x)$，把系数补齐 | 4.2-01 |
| 4-2(1) 二、1–8 | 计算 | 凑完微分直接套 4.1 的基本积分表 | 4.2-02、4.2-03 |
| 4-2(2) 一、1–6 | 计算 | 三角代换去掉根号，结果回代成 $x$ | 4.2-04、4.2-05、4.2-06 |

两类方法的名字要分清：**第一类换元法**（凑微分）改的是"微分的形式"，变量一直是 $x$；**第二类换元法**（三角代换）真的换掉了变量，最后必须换回来。

上一节：[4.1 不定积分](/s/4-1-antiderivative)给了表，这一节学怎么把式子变成表里的形状。

## 一、凑微分：把 $\varphi'(x)dx$ 看成 $d\varphi(x)$

起点是复合函数求导的逆运算。复合函数求导是
$$\frac{d}{dx}f(\varphi(x))=f'(\varphi(x))\,\varphi'(x).$$
两边同时乘 $dx$，就得到微分形式
$$d\,f(\varphi(x))=f'(\varphi(x))\,\varphi'(x)\,dx .$$
反过来用：**看到 $f'(\varphi(x))\varphi'(x)dx$，就等于看到复合函数 $f(\varphi(x))$ 的微分 $d\,f(\varphi(x))$。** 于是

$$\int f(\varphi(x))\,\varphi'(x)\,dx=\int f(u)\,du,\qquad u=\varphi(x).$$

右边直接查 4.1 的基本表。所以凑微分的全部工作只有一件：**认出 $\varphi$ 是谁，把 $\varphi'(x)dx$ 收成 $du$。**

:::key
怎么认 $\varphi$：把被积式里"最里面那一坨"拿出来求导，看它的导数（差一个常数倍）是不是剩下的因子。

| 被积式 | 拿谁求导 | 结果 |
| --- | --- | --- |
| $x\,e^{x^{2}}$ | $u=x^{2}$，$u'=2x$ | 剩下的 $x$ 正好差个 $2$ |
| $\dfrac{\ln x}{x}$ | $u=\ln x$，$u'=\dfrac1x$ | 剩下的 $\dfrac1x$ 正好 |
| $\cos 3x$ | $u=3x$，$u'=3$ | 只剩常数，补 $\dfrac13$ |

导数差一个常数，就把那个常数除过去；差的不是常数，这个方法用不了。
:::

:::problem id=4.2-01 level=易 source="本校检测题 4-2(1) 一、1 同类"
填空：$\displaystyle\int\cos 3x\,dx=$ ______。

:::ans
**答案：$\dfrac13\sin 3x+C$。**

因为是 $3x$ 而不是 $x$，先把 $3x$ 当成 $u$。由 $d(3x)=3\,dx$ 得 $dx=\dfrac13d(3x)$，所以

$$\int\cos 3x\,dx=\frac13\int\cos(3x)\,d(3x)=\frac13\int\cos u\,du=\frac13\sin u+C=\frac13\sin 3x+C .$$

**验算**：$\left(\dfrac13\sin 3x\right)'=\dfrac13\cos 3x\cdot 3=\cos 3x$，对上了。

:::trap
这类填空**几乎全部错在系数上**。规律是 $dx=\dfrac1a\,d(ax)$——里面乘了几倍，外面就除几倍。$\int\cos 3x\,dx$ 是 $\frac13$，$\int e^{2x}dx$ 是 $\frac12$，$\int\sin 5x\,dx$ 是 $-\frac15\cos 5x$。**先补系数，再积分，最后验算求导。**
:::
:::
:::

:::problem id=4.2-02 level=中 source="本校检测题 4-2(1) 二、1 同类"
计算 $\displaystyle\int x\,e^{x^{2}}dx$。

:::ans
**第一步：定 $u$。** 最里面的是 $x^{2}$，取 $u=x^{2}$，则 $du=2x\,dx$，即 $x\,dx=\dfrac12du$。

**第二步：换进去。**
$$\int x e^{x^{2}}dx=\int e^{x^{2}}\cdot x\,dx=\int e^{u}\cdot\frac12du=\frac12\int e^{u}du=\frac12e^{u}+C .$$

**第三步：换回 $x$。**
$$\int x e^{x^{2}}dx=\frac12e^{x^{2}}+C .$$

**验算**：$\left(\dfrac12e^{x^{2}}\right)'=\dfrac12e^{x^{2}}\cdot 2x=x e^{x^{2}}$，对上了。

:::key
这类题的写法固定成三行：**取 $u$ → 换完积分 → 换回 $x$**。第三步不能省：不定积分的答案必须是 $x$ 的函数，写成 $\frac12e^{u}+C$ 会被判错。
:::
:::
:::

:::problem id=4.2-03 level=中 source="本校检测题 4-2(1) 二、2 同类"
计算 $\displaystyle\int\frac{\ln x}{x}\,dx$。

:::ans
**第一步：定 $u$。** 取 $u=\ln x$，则 $du=\dfrac1x dx$。被积式里正好有一个 $\dfrac{dx}{x}$。

**第二步：换进去。**
$$\int\frac{\ln x}{x}dx=\int\ln x\cdot\frac{dx}{x}=\int u\,du=\frac{u^{2}}{2}+C .$$

**第三步：换回 $x$。**
$$\int\frac{\ln x}{x}dx=\frac12(\ln x)^{2}+C .$$

**验算**：$\left(\dfrac12(\ln x)^{2}\right)'=\dfrac12\cdot 2\ln x\cdot\dfrac1x=\dfrac{\ln x}{x}$，对上了。

:::practice
$\dfrac{dx}{x}=d(\ln x)$ 这一条要背成条件反射。凡是"分母有一个 $x$、分子是 $\ln x$ 的函数"，都先用它。同一招还能处理 $\int\dfrac{dx}{x\ln x}=\ln\lvert\ln x\rvert+C$、$\int\dfrac{\ln^{3}x}{x}dx=\dfrac{(\ln x)^4}{4}+C$。
:::
:::
:::

## 二、第二类换元：三角代换去根号

凑微分只能处理"导数已经藏在式子里"的情形。遇到 $\sqrt{a^{2}-x^{2}}$ 这种根号，式子里没有现成的导数可凑，这时换成**三角函数**，让根号整体变成单项式。

原理是三个恒等式：

$$1-\sin^{2}t=\cos^{2}t,\qquad 1+\tan^{2}t=\sec^{2}t,\qquad \sec^{2}t-1=\tan^{2}t .$$

| 根式 | 代换 | 代换后根号变成 | 规定范围 |
| --- | --- | --- | --- |
| $\sqrt{a^{2}-x^{2}}$ | $x=a\sin t$ | $\sqrt{a^{2}\cos^{2}t}=a\cos t$ | $t\in\left[-\frac\pi2,\frac\pi2\right]$ |
| $\sqrt{a^{2}+x^{2}}$ | $x=a\tan t$ | $\sqrt{a^{2}\sec^{2}t}=a\sec t$ | $t\in\left(-\frac\pi2,\frac\pi2\right)$ |
| $\sqrt{x^{2}-a^{2}}$ | $x=a\sec t$（只处理 $x>a$） | $\sqrt{a^{2}\tan^{2}t}=a\tan t$ | $t\in\left(0,\frac\pi2\right)$，此处 $\tan t>0$ |

三件事必须做全：**换 $x$、换 $dx$、最后换回 $x$**。

答题时那句"设 $x=a\sin t$"要**把范围一起写出来**：设 $x=a\sin t$，$t\in\left[-\frac\pi2,\frac\pi2\right]$。范围不只是为了让代换可逆，更关键的是它保证 $\cos t\ge0$，开根号时才能直接写 $\sqrt{a^{2}-x^{2}}=a\cos t$ 而不带绝对值。只写"设 $x=a\sin t$"、不写范围，这一步就没有依据。

:::trap
三个最常见的错：① 换了 $x$ 忘了换 $dx$（$dx=a\cos t\,dt$ 不能丢）；② 结果停在 $t$ 上，没换回 $x$；③ 回代时把 $\sin t=x$ 直接写成 $t=x$。回代的正确做法是用恒等式反解：$\sin t=\dfrac xa$ 得 $t=\arcsin\dfrac xa$，$\cos t=\dfrac{\sqrt{a^{2}-x^{2}}}{a}$。
:::

:::problem id=4.2-04 level=难 source="本校检测题 4-2(2) 一、1 同类"
计算 $\displaystyle\int\frac{x^{2}}{\sqrt{1-x^{2}}}\,dx$。

:::ans
**第一步：代换。** 出现 $\sqrt{1-x^{2}}$，取 $x=\sin t$，则 $dx=\cos t\,dt$，且 $\sqrt{1-x^{2}}=\cos t$。

**第二步：换进去并化简。**
$$\int\frac{x^{2}}{\sqrt{1-x^{2}}}dx=\int\frac{\sin^{2}t}{\cos t}\cdot\cos t\,dt=\int\sin^{2}t\,dt .$$

**第三步：降次。** 用 $\sin^{2}t=\dfrac{1-\cos 2t}{2}$：
$$\int\sin^{2}t\,dt=\frac12\int(1-\cos 2t)dt=\frac t2-\frac{\sin 2t}{4}+C .$$

**第四步：回代。** 用倍角公式 $\sin 2t=2\sin t\cos t$，把 $\dfrac{\sin 2t}{4}$ 写回 $x$：
$$\frac{\sin 2t}{4}=\frac{2\sin t\cos t}{4}=\frac12 x\sqrt{1-x^{2}} .$$
再由 $\sin t=x$ 得 $t=\arcsin x$，于是
$$\int\frac{x^{2}}{\sqrt{1-x^{2}}}dx=\frac12\arcsin x-\frac12x\sqrt{1-x^{2}}+C .$$

**验算**：对上式求导，
$$\frac{1}{2\sqrt{1-x^{2}}}-\frac12\left(\sqrt{1-x^{2}}-\frac{x^{2}}{\sqrt{1-x^{2}}}\right)=\frac{1}{2\sqrt{1-x^{2}}}-\frac{1-2x^{2}}{2\sqrt{1-x^{2}}}=\frac{x^{2}}{\sqrt{1-x^{2}}} .$$
对上了。

:::key
回代的固定动作：**先算 $\sin t$、$\cos t$、$\tan t$ 各等于 $x$ 的什么，再代进结果。** 这里是 $\sin t=x$、$\cos t=\sqrt{1-x^{2}}$、$t=\arcsin x$。三个一起列出来，就不会漏。
:::
:::
:::

:::problem id=4.2-05 level=中 source="本校检测题 4-2(2) 一、2 同类"
计算 $\displaystyle\int\frac{dx}{(1+x^{2})^{3/2}}$。

:::ans
**第一步：代换。** 出现 $\sqrt{1+x^{2}}$ 的幂，取 $x=\tan t$，则 $dx=\sec^{2}t\,dt$，且 $(1+x^{2})^{3/2}=\sec^{3}t$。

**第二步：换进去。**
$$\int\frac{dx}{(1+x^{2})^{3/2}}=\int\frac{\sec^{2}t}{\sec^{3}t}dt=\int\frac{1}{\sec t}dt=\int\cos t\,dt=\sin t+C .$$

根号的 $3$ 次幂和 $dx$ 带来的 $\sec^{2}t$ 刚好约掉两层，只剩 $\cos t$。

**第三步：回代。** $\tan t=x$，画直角三角形（对边 $x$、邻边 $1$、斜边 $\sqrt{1+x^{2}}$），得 $\sin t=\dfrac{x}{\sqrt{1+x^{2}}}$。所以
$$\int\frac{dx}{(1+x^{2})^{3/2}}=\frac{x}{\sqrt{1+x^{2}}}+C .$$

**验算**：$\left(\dfrac{x}{\sqrt{1+x^{2}}}\right)'=\dfrac{\sqrt{1+x^{2}}-x\cdot\frac{x}{\sqrt{1+x^{2}}}}{1+x^{2}}=\dfrac{1}{(1+x^{2})^{3/2}}$，对上了。

:::key
含 $1+x^{2}$ 的题用 $x=\tan t$，原因是 $1+\tan^{2}t=\sec^{2}t$ 能把"$1+$ 平方"直接压成一项，而 $\sec$ 的倒数就是 $\cos$，好积。看到 $\dfrac{1}{(1+x^{2})^{n}}$ 或 $\sqrt{1+x^{2}}$，就是这条路。
:::
:::
:::

:::problem id=4.2-06 level=难 source="本校检测题 4-2(2) 一、3 同类"
计算 $\displaystyle\int\frac{\sqrt{x^{2}-4}}{x}\,dx$（$x>2$）。

:::ans
**第一步：代换。** 出现 $\sqrt{x^{2}-4}$，$a=2$，取 $x=2\sec t$，则 $dx=2\sec t\tan t\,dt$，且 $\sqrt{x^{2}-4}=2\tan t$。

**第二步：换进去。**
$$\int\frac{\sqrt{x^{2}-4}}{x}dx=\int\frac{2\tan t}{2\sec t}\cdot 2\sec t\tan t\,dt=2\int\tan^{2}t\,dt .$$

**第三步：用 $\tan^{2}t=\sec^{2}t-1$，再查表。**
$$2\int\tan^{2}t\,dt=2\int(\sec^{2}t-1)dt=2(\tan t-t)+C .$$

**第四步：回代。** $\tan t=\dfrac{\sqrt{x^{2}-4}}{2}$，所以 $2\tan t=\sqrt{x^{2}-4}$；又 $\sec t=\dfrac x2$ 得 $t=\arccos\dfrac2x$。于是
$$\int\frac{\sqrt{x^{2}-4}}{x}dx=\sqrt{x^{2}-4}-2\arccos\frac2x+C .$$

**验算**：在 $x=3$ 处，结果求导为 $\dfrac{3}{\sqrt5}-\dfrac{4}{3\sqrt5}=\dfrac{5}{3\sqrt5}=\dfrac{\sqrt5}{3}$，而被积函数 $\dfrac{\sqrt{9-4}}{3}=\dfrac{\sqrt5}{3}$，对上了。

:::trap
在 $x>2$ 的范围内，$t=\operatorname{arcsec}\dfrac x2$ 和 $t=\arccos\dfrac2x$ 是同一个角，写哪个都对；若题目允许 $x<-2$，答案要分两支（这是 sec 代换最容易漏的地方），但**要保证定义域写得出来**：$\arccos\dfrac2x$ 只要求 $\left\lvert\dfrac2x\right\rvert\le1$，比 $\operatorname{arcsec}$ 好讨论。

回代的顺序固定：先由 $\tan t=\dfrac{\sqrt{x^{2}-4}}{2}$ 把 $2\tan t$ 换回 $\sqrt{x^{2}-4}$，再由 $\sec t=\dfrac x2$ 把 $t$ 换回 $\arccos\dfrac2x$。**先换函数值，再换角**，顺序反了容易把两个混在一起。
:::
:::
:::

## 速查

### 常见凑微分对照表

| 遇到这个 | 凑成 | 典型题 |
| --- | --- | --- |
| $dx$ | $\dfrac1a\,d(ax+b)$ | $\int\cos 3x\,dx$、$\int e^{2x}dx$ |
| $x\,dx$ | $\dfrac12d(x^{2})$ | $\int x e^{x^{2}}dx$ |
| $x^{2}dx$ | $\dfrac13d(x^{3})$ | $\int x^{2}e^{x^{3}}dx$ |
| $\dfrac{dx}{x}$ | $d(\ln\lvert x\rvert)$ | $\int\dfrac{\ln x}{x}dx$ |
| $\dfrac{dx}{x^{2}}$ | $-d\left(\dfrac1x\right)$ | $\int e^{1/x}\dfrac{dx}{x^{2}}$ |
| $\dfrac{dx}{\sqrt{x}}$ | $2\,d(\sqrt{x})$ | $\int\dfrac{e^{\sqrt x}}{\sqrt x}dx$ |
| $e^{x}dx$ | $d(e^{x})$ | $\int\dfrac{e^{x}}{1+e^{x}}dx$ |
| $\cos x\,dx$ | $d(\sin x)$ | $\int\sin^{3}x\cos x\,dx$ |
| $\sin x\,dx$ | $-d(\cos x)$ | $\int\cos^{3}x\sin x\,dx$ |
| $\sec^{2}x\,dx$ | $d(\tan x)$ | $\int e^{\tan x}\sec^{2}x\,dx$ |
| $\dfrac{dx}{1+x^{2}}$ | $d(\arctan x)$ | $\int\dfrac{\arctan x}{1+x^{2}}dx$ |
| $\dfrac{dx}{\sqrt{1-x^{2}}}$ | $d(\arcsin x)$ | $\int\dfrac{\arcsin x}{\sqrt{1-x^{2}}}dx$ |

### 三种三角代换与回代

| 根式 | 代换 | $dx$ | 根号化简成 | 回代三件 |
| --- | --- | --- | --- | --- |
| $\sqrt{a^{2}-x^{2}}$ | $x=a\sin t$ | $a\cos t\,dt$ | $a\cos t$ | $\sin t=\dfrac xa$，$\cos t=\dfrac{\sqrt{a^{2}-x^{2}}}{a}$，$t=\arcsin\dfrac xa$ |
| $\sqrt{a^{2}+x^{2}}$ | $x=a\tan t$ | $a\sec^{2}t\,dt$ | $a\sec t$ | $\tan t=\dfrac xa$，$\sec t=\dfrac{\sqrt{a^{2}+x^{2}}}{a}$，$t=\arctan\dfrac xa$ |
| $\sqrt{x^{2}-a^{2}}$ | $x=a\sec t$（只处理 $x>a$） | $a\sec t\tan t\,dt$ | $a\tan t$ | $\sec t=\dfrac xa$，$\tan t=\dfrac{\sqrt{x^{2}-a^{2}}}{a}$，$t=\arccos\dfrac ax$（$x>a$ 时成立） |

### 两种换元法怎么选

| 被积式里有什么 | 用哪种 | 第一步 |
| --- | --- | --- |
| 某一坨的导数也在式子里（$x e^{x^{2}}$、$\frac{\ln x}{x}$） | 第一类：凑微分 | 取最里面那一坨为 $u$，算 $du$ |
| 只有常数因子差一点（$\cos 3x$） | 第一类：凑微分 | 补系数 $\dfrac1a$ |
| $\sqrt{a^{2}-x^{2}}$ | 第二类：$x=a\sin t$ | 换 $x$、换 $dx$、去根号 |
| $\sqrt{a^{2}+x^{2}}$ 或 $1+x^{2}$ 的幂 | 第二类：$x=a\tan t$ | 同上 |
| $\sqrt{x^{2}-a^{2}}$ | 第二类：$x=a\sec t$ | 同上 |

## 作业对应

检测题 **4-2(1)** 的 8 空与 8 道计算全做，**4-2(2)** 的 6 道三角代换全做。

练习顺序：先做 4-2(1) 的填空（练"补系数"），再做计算（练"三行写法"），最后做 4-2(2)（练"换、积、回代"）。回代那一步单独拿一张纸，把每题的 $\sin t$、$\cos t$、$\tan t$、$t$ 都写出来一遍。

上一节：[4.1 不定积分](/s/4-1-antiderivative)。下一节：[4.3 分部积分法](/s/4-3-parts)。
