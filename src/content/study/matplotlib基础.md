---
section: 杂项
title: Matplotlib基础
description: 针对二位热传导建模项目补充的python基础
date: 2026-07-16 14:27
published: true
tags: []
media:
  images: []
  videos: []
  audios: []
---
## 绘制简单的曲线

假设有一组温度数据：

```python
import matplotlib.pyplot as plt

x = [0,1,2,3,4]
temperature = [100,80,60,40,20]

plt.plot(x,temperature)
plt.show()
```

`plt.plot()` 负责绘制曲线，`plt.show()` 负责显示图像。

还应当标明：

- 图像标题
- 横坐标名称
- 纵坐标名称
- 单位
- 图例

主要函数：

```python
plt.xlabel()
plt.ylabel()
plt.title()
plt.legend()
```

关于 `plt.legend()` ，用于添加图例，我们可以不传入参数，但在绘制曲线时就要导入 `label` ：

```python
plt.plot(x, temperature, label="Temperature")
plt.legend()
```

也可以添加 `plt.grid()` 来添加网格线，方便读取数值。

为了保存曲线到文件，我们用：

```python
plt.savafig('temperature.png')
plt.show()
```

建议保存时设置清晰度：

```python
plt.savefig(
    "temperature.png",
    dpi=300,#提高图片分辨率
    bbox_inches="tight",#减少图片周围多余空白
)
```

## 使用 `imshow` 创建二维温度场

假设温度场是一个二维数组：

```python
import numpy as np
import matplotlib.pyplot as plt

temperature = np.zeros((50, 50))

temperature[20:30, 20:30] = 100

plt.imshow(temperature)
plt.colorbar()
plt.show()
```

其中 `imshow()` 把二维数组的数值映射为图像。

**Tips**：默认情况下，`imshow()` 会把数组左上角作为坐标原点。但我们习惯把左下角作为原点，因此建议设置：

```
plt.imshow(temperature, origin="lower")
```

在真实的情况下，薄板范围可能
$$
0\leq x\leq 1 ,0\leq y \leq 1
$$
因此可以写：

因此可以写：

```python
plt.imshow(
    temperature,
    origin="lower",
    extent=[0, 1, 0, 1],
)
```

其中：

```python
extent=[x_min, x_max, y_min, y_max]
```

在动画或多张结果图中，颜色范围最好保持一致。

例如温度范围始终为 \(0\sim100^\circ\mathrm C\)：

```python
plt.imshow(
    temperature,
    origin="lower",
    extent=[0, 1, 0, 1],
    vmin=0,
    vmax=100,
)
```

其中：

- `vmin=0`：颜色对应的最小值
- `vmax=100`：颜色对应的最大值

如果不固定颜色范围，Matplotlib 会对每一张图自动重新缩放颜色。这样即使实际温度变化不大，颜色也可能看起来变化很明显，容易误判结果。

为了避免几何形状被拉伸，我们会使用 `aspect = "auto"` 

```python
plt.imshow(
    temperature,
    origin="lower",
    extent=[0, 1, 0, 1],
    aspect="equal",
)
```

## 更加规范的写法

简单练习中可以直接使用：

```python
plt.plot(...)
```

但正式项目中建议使用面向对象写法：

```python
fig, ax = plt.subplots()

ax.plot(x, temperature)
ax.set_xlabel("x (m)")
ax.set_ylabel("Temperature (°C)")
ax.set_title("Temperature Distribution")

plt.show()
```

其中：

- `fig`：整张画布
- `ax`：具体坐标系

二维温度场可以写成：

```python
fig, ax = plt.subplots()

image = ax.imshow(
    temperature,
    origin="lower",
    extent=[0, 1, 0, 1],
    vmin=0,
    vmax=100,
    aspect="equal",
)

fig.colorbar(image, ax=ax, label="Temperature (°C)")

ax.set_xlabel("x (m)")
ax.set_ylabel("y (m)")
ax.set_title("2D Temperature Field")

fig.save
plt.show()
```

## 绘制中心点温度随时间变化

我们定义了温度场

```python
temperature = np.zeros((nx,ny))
```

因此中心点温度：

```python
center_temperature = temperature[nx//2,ny//2]
```

我们在时间推进中记录温度：

假设：

```
dt = 0.01
```

第 `step` 步对应的物理时间为：

```
current_time = step * dt
```

在时间循环中记录：

```
times.append(current_time)
center_temperatures.append(
    temperature[center_y, center_x]
)
```

一个基础结构如下：

```python
times = []
center_temperatures = []

center_x = nx // 2
center_y = ny // 2

for step in range(total_steps):
    old_temperature = temperature.copy()

    # 更新内部网格点
    temperature[1:-1, 1:-1] = (
        old_temperature[1:-1, 1:-1]
        + rx
        * (
            old_temperature[1:-1, 2:]
            - 2.0 * old_temperature[1:-1, 1:-1]
            + old_temperature[1:-1, :-2]
        )
        + ry
        * (
            old_temperature[2:, 1:-1]
            - 2.0 * old_temperature[1:-1, 1:-1]
            + old_temperature[:-2, 1:-1]
        )
    )

    # 重新施加边界条件
    temperature[:, 0] = 100.0
    temperature[:, -1] = 0.0
    temperature[0, :] = 0.0
    temperature[-1, :] = 0.0

    # 记录当前物理时间和中心温度
    current_time = (step + 1) * dt

    times.append(current_time)
    center_temperatures.append(
        temperature[center_x, center_y]
    )
```
