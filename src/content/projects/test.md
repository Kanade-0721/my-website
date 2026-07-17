---
section: 二维热传导的数值模拟
title: test
description: a
date: 2026-07-18 00:16
published: true
tags: []
media:
  images: []
  videos: []
  audios: []
---
### 题目：

考虑一块长为 \(1\,\mathrm{m}\)、宽为 \(1\,\mathrm{m}\) 的均匀薄板。假设温度在薄板厚度方向上保持一致，薄板材料的热扩散率为

$$
\alpha = 0.01\,\mathrm{m^2/s}.
$$

计算区域为

$$
\Omega = \left\{(x,y)\mid 0\leq x\leq 1,\ 0\leq y\leq 1\right\}.
$$

薄板内部无热源，温度场 \(T(x,y,t)\) 满足二维非稳态热传导方程

$$
\frac{\partial T}{\partial t}
=
\alpha
\left(
\frac{\partial^2 T}{\partial x^2}
+
\frac{\partial^2 T}{\partial y^2}
\right).
$$

初始时刻，薄板背景温度为 \(20\,^\circ\mathrm{C}\)，中心存在一个局部高温区域，初始温度分布为

$$
T(x,y,0)
=
20
+
80\exp\left(
-\frac{(x-0.5)^2+(y-0.5)^2}
{2(0.1)^2}
\right).
$$

薄板四条边始终保持在 \(20\,^\circ\mathrm{C}\)，即

$$
T(0,y,t)=20,
\qquad
T(1,y,t)=20,
$$

$$
T(x,0,t)=20,
\qquad
T(x,1,t)=20.
$$

## 要求

1. 建立该问题的数学模型，说明控制方程、初始条件和边界条件。

2. 在 \(x\) 和 \(y\) 方向分别划分均匀网格，采用显式有限差分方法离散控制方程。

3. 推导内部网格点的温度更新公式。

4. 给出显式差分格式的稳定性条件。

5. 取

$$
n_x=n_y=101
$$

进行数值计算，并选择满足稳定性条件的时间步长。

6. 计算时间区间

$$
0\leq t\leq 5\,\mathrm{s}
$$

内的温度场变化。

7. 绘制以下结果：

- \(t=0,\ 0.5,\ 1,\ 2,\ 5\,\mathrm{s}\) 时的温度云图；
- \(t=1\,\mathrm{s}\) 时的等温线；
- 薄板中心点 \((0.5,0.5)\) 的温度随时间变化曲线；
- 不同时刻沿水平中心线 \(y=0.5\) 的温度分布。

8. 分析热点最高温度和高温区域范围随时间的变化规律。

9. 分别采用

$$
51\times 51,\qquad
101\times 101,\qquad
201\times 201
$$

的网格进行计算，比较中心点温度并分析网格收敛性。

10. 将时间步长设置为超过稳定性限制的数值，观察并解释数值解出现的异常现象。

### 解答

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

#网格初始化
x_lenth = 1
y_lenth = 1
nx = 101
ny = 101

x = np.linspace(0,x_lenth,nx)
y = np.linspace(0,y_lenth,ny)

X , Y = np.meshgrid(x,y)
#设定参数
alpha = 0.001
sigma = 0.1
dx = x[1] - x[0]
dy = y[1] - y[0]

dt_limit = 1.0 / (               #找满足稳定性的最大dt
    2.0
    * alpha
    * (
        1.0 / dx**2
        + 1.0 / dy**2
    )
)

dt = 0.8*dt_limit

times = np.linspace(0,5,50)
#初始温度设定
T = (
    20+80*np.exp(
        -(
            (
                (X-0.5)**2+(Y-0.5)**2
            )/(2*sigma**2)
        )
    )
)
T[:, 0] = 20
T[:, -1] = 20
T[0, :] = 20
T[-1, :] = 20


temperature = []
temperature.append(T.copy())
#将每一个时间点的温度存入数组
current_time = 0.0

for i in range(1, len(times)):
    target_time = times[i]

    while current_time < target_time:

        current_dt = min(
            dt,
            target_time - current_time,
        )                                  #dt不能大于时间跨度

        rx = alpha * current_dt / dx**2
        ry = alpha * current_dt / dy**2    #实时计算符合条件的rx，ry

        T_new = T.copy()

        T_new[1:-1, 1:-1] = (
            T[1:-1, 1:-1]
            +
            rx * (
                T[1:-1, 2:]
                - 2 * T[1:-1, 1:-1]
                + T[1:-1, :-2]
            )
            +
            ry * (
                T[2:, 1:-1]
                - 2 * T[1:-1, 1:-1]
                + T[:-2, 1:-1]
            )
        )

        T_new[:, 0] = 20
        T_new[:, -1] = 20
        T_new[0, :] = 20
        T_new[-1, :] = 20

        T = T_new
        current_time += current_dt

    temperature.append(T.copy())

#创建画布
fig , ax = plt.subplots()
#画出第一帧
current_t = temperature[0]

image = ax.imshow(
    current_t,
    origin="lower",
    extent = [0.0,1.0,0.0,1.0],
    vmin = 20.0,
    vmax = 100.0,
)

fig.colorbar(
    image,
    ax=ax,
    label = "Temperature(°C)",
)

ax.set_xlabel("x (m)")
ax.set_ylabel("y (m)")
ax.set_aspect("equal")

title = ax.set_title(
    f"Temperature Field, t = {times[0]:.2f} s"
)
#更新函数
def update(frame):
    time = times[frame]
    new_temperature = temperature[frame]
    image.set_data(new_temperature)
    title.set_text(
        f"Temperature Field, t = {time:.2f} s"
    )
    return image,title

animation = FuncAnimation(
    fig,
    update,
    frames = len(times),#帧数
    interval = 50,#50ms一帧
    repeat=True,
    repeat_delay=1000,#允许播放完后1000ms重播
)

plt.show()
```

