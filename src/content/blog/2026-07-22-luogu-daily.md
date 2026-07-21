---
title: 2026-07-22 洛谷刷题记录
description: 记录 2026-07-22 在洛谷完成的刷题内容、解题思路与复盘。
date: 2026-07-22 00:39
published: true
tags:
  - 洛谷刷题
  - 洛谷
  - 算法
media:
  images: []
  videos: []
  audios: []
codeProject:
  enabled: false
---

## 今日概览

今天记录了 1 道题。

<!-- LUOGU_DAILY_TABLE_START -->
| 题号 | 题目 | 状态 | 语言 | 标签 |
| --- | --- | --- | --- | --- |
| P1060 | [[NOIP 2006 普及组] 开心的金明](https://www.luogu.com.cn/problem/P1060) | AC | Python | 动态规划、背包DP |
<!-- LUOGU_DAILY_TABLE_END -->

## 刷题记录

<!-- LUOGU_DAILY_ENTRIES_START -->
<!-- LUOGU_DAILY_ITEM {"problemId":"P1060","title":"[NOIP 2006 普及组] 开心的金明","status":"AC","language":"Python","tags":["动态规划","背包DP"],"url":"https://www.luogu.com.cn/problem/P1060","idea":"","review":"","code":"v = []\r\nw = []\r\ns = []\r\nfor _ in range(m):\r\n    a,b = map(int,input().split())\r\n    v.append(a)\r\n    w.append(b)\r\n    s.append(a*b)\r\nmemo = {}\r\ndef satisfaction(v,s,n):\r\n    num = len(v)\r\n    dp = [0]*(n+1)\r\n    for i in range(num):\r\n        if v[i] <= n:\r\n            for j in range(n,v[i]-1,-1):\r\n                if j in memo:\r\n                    dp[j] = memo[j]\r\n\r\n                if j-v[i] in memo:\r\n                    dp[j-v[i]] = memo[j-v[i]]\r\n                dp[j] = max(\r\n                    dp[j],dp[j-v[i]]+s[i]\r\n                )\r\n\r\n                memo[j] = dp[j]\r\n\r\n\r\n    return dp[n]\r\n\r\nprint(satisfaction(v,s,n))","statementBase64":"IyMjIyDpopjnm67mj4/ov7AKCumHkeaYjuS7iuWkqeW+iOW8gOW/g++8jOWutumHjOi0ree9rueahOaWsOaIv+WwseimgemihumSpeWMmeS6hu+8jOaWsOaIv+mHjOacieS4gOmXtOS7luiHquW3seS4k+eUqOeahOW+iOWuveaVnueahOaIv+mXtOOAguabtOiuqeS7lumrmOWFtOeahOaYr++8jOWmiOWmiOaYqOWkqeWvueS7luivtO+8muKAnOS9oOeahOaIv+mXtOmcgOimgei0reS5sOWTquS6m+eJqeWTge+8jOaAjuS5iOW4g+e9ru+8jOS9oOivtOS6hueul++8jOWPquimgeS4jei2hei/hyAkTiQg5YWD6ZKx5bCx6KGM4oCd44CC5LuK5aSp5LiA5pep6YeR5piO5bCx5byA5aeL5YGa6aKE566X77yM5L2G5piv5LuW5oOz5Lmw55qE5Lic6KW/5aSq5aSa5LqG77yM6IKv5a6a5Lya6LaF6L+H5aaI5aaI6ZmQ5a6a55qEICROJCDlhYPjgILkuo7mmK/vvIzku5bmiormr4/ku7bnianlk4Hop4TlrprkuobkuIDkuKrph43opoHluqbvvIzliIbkuLogJDUkIOetie+8mueUqOaVtOaVsCAkMS01JCDooajnpLrvvIznrKwgJDUkIOetieacgOmHjeimgeOAguS7lui/mOS7juWboOeJuee9keS4iuafpeWIsOS6huavj+S7tueJqeWTgeeahOS7t+agvO+8iOmDveaYr+aVtOaVsOWFg++8ieOAguS7luW4jOacm+WcqOS4jei2hei/hyAkTiQg5YWD77yI5Y+v5Lul562J5LqOICROJCDlhYPvvInnmoTliY3mj5DkuIvvvIzkvb/mr4/ku7bnianlk4HnmoTku7fmoLzkuI7ph43opoHluqbnmoTkuZjnp6/nmoTmgLvlkozmnIDlpKfjgIIg6K6+56ysICRqJCDku7bnianlk4HnmoTku7fmoLzkuLogJHZfaiTvvIzph43opoHluqbkuLogJHdfaiTvvIzlhbHpgInkuK3kuoYgJGskIOS7tueJqeWTge+8jOe8luWPt+S+neasoeS4uiAkal8xLGpfMizigKYsal9rJO+8jOWImeaJgOaxgueahOaAu+WSjOS4uu+8miAkJHZfe2pfMX0gXHRpbWVzIHdfe2pfMX0rdl97al8yfSBcdGltZXMgd197al8yfSDigKYrdl97al9rfSBcdGltZXMgd197al9rfSQkIOivt+S9oOW4ruWKqemHkeaYjuiuvuiuoeS4gOS4qua7oei2s+imgeaxgueahOi0reeJqeWNleOAggoKIyMjIyDovpPlhaXmoLzlvI8KCuesrOS4gOihjO+8jOS4uiAkMiQg5Liq5q2j5pW05pWw77yM55So5LiA5Liq56m65qC86ZqU5byA77yaJG4sbSTvvIgkbgoKIyMjIyDovpPlh7rmoLzlvI8KCiQxJCDkuKrmraPmlbTmlbDvvIzkuLrkuI3otoXov4fmgLvpkrHmlbDnmoTnianlk4HnmoTku7fmoLzkuI7ph43opoHluqbkuZjnp6/nmoTmgLvlkoznmoTmnIDlpKflgLzvvIgkCgojIyMjIOivtOaYji/mj5DnpLoKCk5PSVAgMjAwNiDmma7lj4rnu4Qg56ys5LqM6aKY"} -->
### P1060 [NOIP 2006 普及组] 开心的金明

- 题目：[[NOIP 2006 普及组] 开心的金明](https://www.luogu.com.cn/problem/P1060)
- 状态：AC
- 语言：Python
- 标签：动态规划、背包DP

### 题目原文

#

#### 题目描述

金明今天很开心，家里购置的新房就要领钥匙了，新房里有一间他自己专用的很宽敞的房间。更让他高兴的是，妈妈昨天对他说：“你的房间需要购买哪些物品，怎么布置，你说了算，只要不超过 $N$ 元钱就行”。今天一早金明就开始做预算，但是他想买的东西太多了，肯定会超过妈妈限定的 $N$ 元。于是，他把每件物品规定了一个重要度，分为 $5$ 等：用整数 $1-5$ 表示，第 $5$ 等最重要。他还从因特网上查到了每件物品的价格（都是整数元）。他希望在不超过 $N$ 元（可以等于 $N$ 元）的前提下，使每件物品的价格与重要度的乘积的总和最大。 设第 $j$ 件物品的价格为 $v_j$，重要度为 $w_j$，共选中了 $k$ 件物品，编号依次为 $j_1,j_2,…,j_k$，则所求的总和为： $$v_{j_1} \times w_{j_1}+v_{j_2} \times w_{j_2} …+v_{j_k} \times w_{j_k}$$ 请你帮助金明设计一个满足要求的购物单。

#

#### 输入格式

第一行，为 $2$ 个正整数，用一个空格隔开：$n,m$（$n

#

#### 输出格式

$1$ 个正整数，为不超过总钱数的物品的价格与重要度乘积的总和的最大值（$

#

#### 说明/提示

NOIP 2006 普及组 第二题

### 代码

```python
n,m = map(int,input().split())
v = []
w = []
s = []
for _ in range(m):
    a,b = map(int,input().split())
    v.append(a)
    w.append(b)
    s.append(a*b)
memo = {}
def satisfaction(v,s,n):
    num = len(v)
    dp = [0]*(n+1)
    for i in range(num):
        if v[i] <= n:
            for j in range(n,v[i]-1,-1):
                if j in memo:
                    dp[j] = memo[j]

                if j-v[i] in memo:
                    dp[j-v[i]] = memo[j-v[i]]
                dp[j] = max(
                    dp[j],dp[j-v[i]]+s[i]
                )

                memo[j] = dp[j]


    return dp[n]

print(satisfaction(v,s,n))
```
<!-- LUOGU_DAILY_ENTRIES_END -->
