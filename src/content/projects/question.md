---
section: 二维泊松方程求解器
title: Question
description: 题目描述
date: 2026-07-21 14:26
published: true
tags: []
media:
  images: []
  videos: []
  audios: []
codeProject:
  enabled: false
---
# 二维泊松方程问题说明

考虑二维矩形区域

\[
\Omega=\{(x,y)\mid 0\le x\le1,\ 0\le y\le1\}.
\]

区域内的稳态温度场满足

\[
-\nabla^2T=q(x,y),
\]

即

\[
-\left(\frac{\partial^2T}{\partial x^2}
+\frac{\partial^2T}{\partial y^2}\right)=q(x,y).
\]

内部采用高斯源项

\[
q(x,y)=1000\exp\left(
-\frac{(x-0.5)^2+(y-0.5)^2}{2(0.1)^2}
\right).
\]

四条边界采用齐次 Dirichlet 条件：

\[
T(0,y)=T(1,y)=T(x,0)=T(x,1)=0.
\]

## 数值任务

1. 在两个方向建立均匀网格，并使用二维五点有限差分格式离散方程。
2. 使用 Jacobi、Gauss–Seidel、SOR 和稀疏矩阵直接法求解。
3. 使用残差判断迭代是否收敛，目标为 \(\|r\|_\infty<10^{-8}\)。
4. 比较不同方法的迭代次数、计算时间、最终残差和数值解差异。
5. 绘制源项、温度场、等值线、中心线温度和残差收敛曲线。
6. 比较 \(51\times51\)、\(101\times101\) 和 \(201\times201\) 网格。
7. 比较 SOR 松弛因子 \(1.0,1.2,1.5,1.8,1.9\)。
8. 使用解析解
   \(T_{\mathrm{exact}}=\sin(\pi x)\sin(\pi y)\)
   构造源项并验证空间二阶收敛性。
