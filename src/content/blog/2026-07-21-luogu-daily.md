---
title: "2026-07-21 洛谷刷题记录"
description: "记录 2026-07-21 在洛谷完成的刷题内容、解题思路与复盘。"
date: 2026-07-21 23:57
published: true
tags:
  - 洛谷刷题
  - 洛谷
  - 算法
media:
  images: []
  videos: []
  audios: []
---

## 今日概览

今天记录了 1 道题。

<!-- LUOGU_DAILY_TABLE_START -->
| 题号 | 题目 | 状态 | 语言 | 标签 |
| --- | --- | --- | --- | --- |
| P1359 | [租用游艇](https://www.luogu.com.cn/problem/P1359) | AC | Python | 动态规划、最短路 |
<!-- LUOGU_DAILY_TABLE_END -->

## 刷题记录

<!-- LUOGU_DAILY_ENTRIES_START -->
<!-- LUOGU_DAILY_ITEM {"problemId":"P1359","title":"租用游艇","status":"AC","language":"Python","tags":["动态规划","最短路"],"url":"https://www.luogu.com.cn/problem/P1359","idea":"","review":"","code":"graph = [[0]*(n+1) for _ in range(n+1)]\r\nfor i in range(1,n):\r\n     nlist = list(map(int,input().split()))\r\n     j = n\r\n     while j>i:\r\n          num = nlist.pop()\r\n          graph[i][j] = num\r\n          graph[j][i] = num\r\n          j-=1\r\n          \r\nmemo = {}\r\ndef min_rent(graph,i):\r\n     if i == 1:\r\n          return 0\r\n     if i in memo:\r\n          return memo[i]\r\n     rent = min(\r\n          (min_rent(graph,j) + graph[j][i]) for j in range(1,i)\r\n     )\r\n\r\n     memo[i] = rent\r\n    \r\n     return rent\r\n\r\nprint(min_rent(graph,n))","statementBase64":"IyMjIyDpopjnm67mj4/ov7AKCumVv+axn+a4uOiJh+S/seS5kOmDqOWcqOmVv+axn+S4iuiuvue9ruS6hiAkbiQg5Liq5ri46ImH5Ye656ef56uZICQxLDIsXGRvdHMsbiTjgILmuLjlrqLlj6/lnKjov5nkupvmuLjoiYflh7rnp5/nq5nnp5/nlKjmuLjoiYfvvIzlubblnKjkuIvmuLjnmoTku7vkvZXkuIDkuKrmuLjoiYflh7rnp5/nq5nlvZLov5jmuLjoiYfjgILmuLjoiYflh7rnp5/nq5kgJGkkIOWIsOa4uOiJh+WHuuenn+ermSAkaiQg5LmL6Ze055qE56ef6YeR5Li6ICRyX3tpLGp9JO+8iCQxXGxlIGlcbHQgalxsZSBuJO+8ieOAguivleiuvuiuoeS4gOS4queul+azle+8jOiuoeeul+WHuuS7jua4uOiJh+WHuuenn+ermSAkMSQg5Yiw5ri46ImH5Ye656ef56uZICRuJCDmiYDpnIDnmoTmnIDlsJHnp5/ph5HjgIIKCiMjIyMg6L6T5YWl5qC85byPCgrnrKzkuIDooYzkuK3mnInkuIDkuKrmraPmlbTmlbAgJG4k77yM6KGo56S65pyJICRuJCDkuKrmuLjoiYflh7rnp5/nq5njgILmjqXkuIvmnaXnmoQgJG4tMSQg6KGM5piv5LiA5Liq5Y2K55+p6Zi1ICRyX3tpLGp9JO+8iCQxXGxlIGkKCiMjIyMg6L6T5Ye65qC85byPCgrovpPlh7rorqHnrpflh7rnmoTku47muLjoiYflh7rnp5/nq5kgJDEkIOWIsOa4uOiJh+WHuuenn+ermSAkbiQg5omA6ZyA55qE5pyA5bCR56ef6YeR44CCCgojIyMjIOivtOaYji/mj5DnpLoKCiQxXGxlIG5cbGUgMjAwJO+8jOS/neivgeiuoeeul+i/h+eoi+S4reS7u+S9leaXtuWIu+aVsOWAvOmDveS4jei2hei/hyAkMTBeNiTjgII="} -->
### P1359 租用游艇

- 题目：[租用游艇](https://www.luogu.com.cn/problem/P1359)
- 状态：AC
- 语言：Python
- 标签：动态规划、最短路

### 题目原文

#

#### 题目描述

长江游艇俱乐部在长江上设置了 $n$ 个游艇出租站 $1,2,\dots,n$。游客可在这些游艇出租站租用游艇，并在下游的任何一个游艇出租站归还游艇。游艇出租站 $i$ 到游艇出租站 $j$ 之间的租金为 $r_{i,j}$（$1\le i\lt j\le n$）。试设计一个算法，计算出从游艇出租站 $1$ 到游艇出租站 $n$ 所需的最少租金。

#

#### 输入格式

第一行中有一个正整数 $n$，表示有 $n$ 个游艇出租站。接下来的 $n-1$ 行是一个半矩阵 $r_{i,j}$（$1\le i

#

#### 输出格式

输出计算出的从游艇出租站 $1$ 到游艇出租站 $n$ 所需的最少租金。

#

#### 说明/提示

$1\le n\le 200$，保证计算过程中任何时刻数值都不超过 $10^6$。

### 代码

```python
graph = [[0]*(n+1) for _ in range(n+1)]
for i in range(1,n):
     nlist = list(map(int,input().split()))
     j = n
     while j>i:
          num = nlist.pop()
          graph[i][j] = num
          graph[j][i] = num
          j-=1
          
memo = {}
def min_rent(graph,i):
     if i == 1:
          return 0
     if i in memo:
          return memo[i]
     rent = min(
          (min_rent(graph,j) + graph[j][i]) for j in range(1,i)
     )

     memo[i] = rent
    
     return rent

print(min_rent(graph,n))
```
<!-- LUOGU_DAILY_ENTRIES_END -->
