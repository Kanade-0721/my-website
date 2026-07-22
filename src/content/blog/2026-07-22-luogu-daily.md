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

今天记录了 6 道题。

<!-- LUOGU_DAILY_TABLE_START -->
| 题号 | 题目 | 状态 | 语言 | 标签 |
| --- | --- | --- | --- | --- |
| P1060 | [[NOIP 2006 普及组] 开心的金明](https://www.luogu.com.cn/problem/P1060) | AC | Python | 动态规划、背包DP |
| P1802 | [5 倍经验日](https://www.luogu.com.cn/problem/P1802) | AC | Python | 动态规划、背包DP |
| P1049 | [[NOIP 2001 普及组] 装箱问题](https://www.luogu.com.cn/problem/P1049) | AC | Python | 动态规划 |
| P1048 | [[NOIP 2005 普及组] 采药](https://www.luogu.com.cn/problem/P1048) | AC | Python | - |
| P1470 | [[IOI 1996 / USACO2.3] 最长前缀 Longest Prefix](https://www.luogu.com.cn/problem/P1470) | AC | Python | 动态规划 |
| P2858 | [[USACO06FEB] Treats for the Cows G/S](https://www.luogu.com.cn/problem/P2858) | AC | Python | 区间DP |
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

<!-- LUOGU_DAILY_ITEM {"problemId":"P1802","title":"5 倍经验日","status":"AC","language":"Python","tags":["动态规划","背包DP"],"url":"https://www.luogu.com.cn/problem/P1802","idea":"","review":"注意药水不够可以选择输，输也会获得经验。另外，本题中dp数组本身就起到记忆的作用，所以不需要memo，meo一般用于递归函数中。","code":"n,x = map(int,input().split())\r\nlose = []\r\nwin = []\r\nuse = []\r\nfor _ in range(n):\r\n    l,w,u = map(int,input().split())\r\n    lose.append(l)\r\n    win.append(w)\r\n    use.append(u)\r\n\r\ndef max_s(lose,win,use,n,x):\r\n    dp = [0]*(x+1)\r\n    for i in range(n):\r\n        if use[i] <= x:\r\n            for j in range(x,use[i]-1,-1):\r\n                \r\n                dp[j] = max(\r\n                    dp[j]+lose[i],dp[j-use[i]]+win[i]\r\n                )\r\n        else:\r\n            dp[j] = dp[j] + lose[i]\r\n    \r\n    s = dp[x]\r\n    return s\r\n\r\nprint(5*max_s(lose,win,use,n,x))","statementBase64":"IyMjIyDpopjnm67mj4/ov7AKCueOsOWcqCBhYnNpMjAxMSDmi7/lh7rkuoYgJHgkIOS4qui/t+S9oOijheiNr+eJqe+8iOWXkeiNr+aJk+S6uuWPr+iAu+KApu+8ie+8jOWHhuWkh+W8gOWni+S4jumCo+S6m+S6uuaJk+S6huOAgiDnlLHkuo7ov7fkvaDoo4Xoja/nianmr4/kuKrlj6rog73nlKjkuIDmrKHvvIzmiYDku6UgYWJzaTIwMTEg6KaB6LCo5oWO55qE5L2/55So6L+Z5Lqb6I2v44CC5oKy5Ymn55qE5piv77yM55So6I2v6YeP5rKh6L6+5Yiw5pyA5bCR5omT6LSl6K+l5Lq65omA6ZyA55qE5bGe5oCn6I2v6I2v6YeP77yM5YiZ5omT6L+Z5Liq5Lq65b+F6L6T44CC5L6L5aaC5LuW55SoICQyJCDkuKroja/ljrvmiZPliKvkurrvvIzliKvkurrljbTooajmmI4gJDMkIOS4quiNr+aJjeiDveaJk+i/h++8jOmCo+S5iOebuOW9k+S6juS9oOi+k+S6huW5tuS4lOi/meS4pOS4quWxnuaAp+iNr+a1qui0ueS6huOAgiDnjrDlnKjmnIkgJG4kIOS4quWlveWPi++8jOe7meWumuWksei0peaXtuWPr+iOt+W+l+eahOe7j+mqjOOAgeiDnOWIqeaXtuWPr+iOt+W+l+eahOe7j+mqjO+8jOaJk+i0peS7luiHs+WwkemcgOimgeeahOiNr+mHj+OAgiDopoHmsYLmsYLlh7rmnIDlpKfnu4/pqowgJHMk77yM6L6T5Ye6ICQ1cyTjgIIKCiMjIyMg6L6T5YWl5qC85byPCgrnrKzkuIDooYzkuKTkuKrmlbDvvIwkbiQg5ZKMICR4JOOAgiDlkI7pnaIgJG4kIOihjOavj+ihjOS4ieS4quaVsO+8jOWIhuWIq+ihqOekuuWksei0peaXtuiOt+W+l+eahOe7j+mqjCAkXG1hdGhpdHtsb3NlfV9pJO+8jOiDnOWIqeaXtuiOt+W+l+eahOe7j+mqjCAkXG1hdGhpdHt3aW59X2kkIOWSjOaJk+i/h+imgeiHs+WwkeS9v+eUqOeahOiNr+aVsOmHjyAkXG1hdGhpdHt1c2V9X2kk44CCCgojIyMjIOi+k+WHuuagvOW8jwoK5LiA5Liq5pW05pWw77yM5pyA5aSa6I635b6X55qE57uP6aqM55qE5LqU5YCN44CCCgojIyMjIOivtOaYji/mj5DnpLoKCioq44CQSGludOOAkSoqIOS6lOWAjee7j+mqjOa0u+WKqOeahOaXtuWAme+8jGFic2kyMDExIOaAu+aYr+WQg+S9k+WKm+iNr+awtOiAjOS4jeaYr+i/meenjeWxnuaAp+iNr+OAgiAqKuOAkOaVsOaNruiMg+WbtOOAkSoqIAotIOWvueS6jiAkMTBcJSQg55qE5pWw5o2u77yM5L+d6K+BICR4PTAk44CCIAotIOWvueS6jiAkMzBcJSQg55qE5pWw5o2u77yM5L+d6K+BICQwXGxlIG5cbGUgMTAk77yMJDBcbGUgeFxsZSAyMCTjgIIgCi0g5a+55LqOICQ2MFwlJCDnmoTmlbDmja7vvIzkv53or4EgJDBcbGUgbix4XGxlIDEwMCTvvIwgJDEw"} -->
### P1802 5 倍经验日

- 题目：[5 倍经验日](https://www.luogu.com.cn/problem/P1802)
- 状态：AC
- 语言：Python
- 标签：动态规划、背包DP

### 题目原文

#

#### 题目描述

现在 absi2011 拿出了 $x$ 个迷你装药物（嗑药打人可耻…），准备开始与那些人打了。 由于迷你装药物每个只能用一次，所以 absi2011 要谨慎的使用这些药。悲剧的是，用药量没达到最少打败该人所需的属性药药量，则打这个人必输。例如他用 $2$ 个药去打别人，别人却表明 $3$ 个药才能打过，那么相当于你输了并且这两个属性药浪费了。 现在有 $n$ 个好友，给定失败时可获得的经验、胜利时可获得的经验，打败他至少需要的药量。 要求求出最大经验 $s$，输出 $5s$。

#

#### 输入格式

第一行两个数，$n$ 和 $x$。 后面 $n$ 行每行三个数，分别表示失败时获得的经验 $\mathit{lose}_i$，胜利时获得的经验 $\mathit{win}_i$ 和打过要至少使用的药数量 $\mathit{use}_i$。

#

#### 输出格式

一个整数，最多获得的经验的五倍。

#

#### 说明/提示

**【Hint】** 五倍经验活动的时候，absi2011 总是吃体力药水而不是这种属性药。 **【数据范围】**

- 对于 $10\%$ 的数据，保证 $x=0$。

- 对于 $30\%$ 的数据，保证 $0\le n\le 10$，$0\le x\le 20$。

- 对于 $60\%$ 的数据，保证 $0\le n,x\le 100$， $10

### 代码

```python
n,x = map(int,input().split())
lose = []
win = []
use = []
for _ in range(n):
    l,w,u = map(int,input().split())
    lose.append(l)
    win.append(w)
    use.append(u)

def max_s(lose,win,use,n,x):
    dp = [0]*(x+1)
    for i in range(n):
        if use[i] <= x:
            for j in range(x,use[i]-1,-1):
                
                dp[j] = max(
                    dp[j]+lose[i],dp[j-use[i]]+win[i]
                )
        else:
            dp[j] = dp[j] + lose[i]
    
    s = dp[x]
    return s

print(5*max_s(lose,win,use,n,x))
```

### 复盘

注意药水不够可以选择输，输也会获得经验。另外，本题中dp数组本身就起到记忆的作用，所以不需要memo，meo一般用于递归函数中。

<!-- LUOGU_DAILY_ITEM {"problemId":"P1049","title":"[NOIP 2001 普及组] 装箱问题","status":"AC","language":"Python","tags":["动态规划"],"url":"https://www.luogu.com.cn/problem/P1049","idea":"","review":"","code":"V = int(input())\r\nn = int(input())\r\nv = []\r\nfor _ in range(n):\r\n    v.append(int(input()))\r\n\r\ndef max_v(V,n,v):\r\n    dp = [0]*(V+1)\r\n    for i in range(n):\r\n        for j in range(V,v[i]-1,-1):\r\n            dp[j]=max(\r\n                dp[j],dp[j-v[i]]+v[i]\r\n            )\r\n\r\n    return dp[V]\r\n\r\nprint(V-max_v(V,n,v))","statementBase64":"IyMjIyDpopjnm67mj4/ov7AKCuacieS4gOS4queuseWtkOWuuemHj+S4uiAkViTvvIzlkIzml7bmnIkgJG4kIOS4queJqeWTge+8jOavj+S4queJqeWTgeacieS4gOS4quS9k+enr+OAgiDnjrDlnKjku44gJG4kIOS4queJqeWTgeS4re+8jOS7u+WPluiLpeW5suS4quijheWFpeeuseWGhe+8iOS5n+WPr+S7peS4jeWPlu+8ie+8jOS9v+euseWtkOeahOWJqeS9meepuumXtOacgOWwj+OAgui+k+WHuui/meS4quacgOWwj+WAvOOAggoKIyMjIyDovpPlhaXmoLzlvI8KCuesrOS4gOihjOWFseS4gOS4quaVtOaVsCAkViTvvIzooajnpLrnrrHlrZDlrrnph4/jgIIg56ys5LqM6KGM5YWx5LiA5Liq5pW05pWwICRuJO+8jOihqOekuueJqeWTgeaAu+aVsOOAgiDmjqXkuIvmnaUgJG4kIOihjO+8jOavj+ihjOacieS4gOS4quato+aVtOaVsO+8jOihqOekuuesrCAkaSQg5Liq54mp5ZOB55qE5L2T56ev44CCCgojIyMjIOi+k+WHuuagvOW8jwoKLSDlhbHkuIDooYzkuIDkuKrmlbTmlbDvvIzooajnpLrnrrHlrZDmnIDlsI/liankvZnnqbrpl7TjgIIKCiMjIyMg6K+05piOL+aPkOekugoK5a+55LqOICQxMDBcJSQg5pWw5o2u77yM5ruh6LazICQw"} -->
### P1049 [NOIP 2001 普及组] 装箱问题

- 题目：[[NOIP 2001 普及组] 装箱问题](https://www.luogu.com.cn/problem/P1049)
- 状态：AC
- 语言：Python
- 标签：动态规划

### 题目原文

#

#### 题目描述

有一个箱子容量为 $V$，同时有 $n$ 个物品，每个物品有一个体积。 现在从 $n$ 个物品中，任取若干个装入箱内（也可以不取），使箱子的剩余空间最小。输出这个最小值。

#

#### 输入格式

第一行共一个整数 $V$，表示箱子容量。 第二行共一个整数 $n$，表示物品总数。 接下来 $n$ 行，每行有一个正整数，表示第 $i$ 个物品的体积。

#

#### 输出格式

- 共一行一个整数，表示箱子最小剩余空间。

#

#### 说明/提示

对于 $100\%$ 数据，满足 $0

### 代码

```python
V = int(input())
n = int(input())
v = []
for _ in range(n):
    v.append(int(input()))

def max_v(V,n,v):
    dp = [0]*(V+1)
    for i in range(n):
        for j in range(V,v[i]-1,-1):
            dp[j]=max(
                dp[j],dp[j-v[i]]+v[i]
            )

    return dp[V]

print(V-max_v(V,n,v))
```

<!-- LUOGU_DAILY_ITEM {"problemId":"P1048","title":"[NOIP 2005 普及组] 采药","status":"AC","language":"Python","tags":[],"url":"https://www.luogu.com.cn/problem/P1048","idea":"","review":"","code":"T,M = map(int,input().split())\r\nt = []\r\nv = []\r\nfor _ in range(M):\r\n    a,b = map(int,input().split())\r\n    t.append(a)\r\n    v.append(b)\r\n\r\ndef max_value(T,M,t,v):\r\n    dp = [0]*(T+1)\r\n    for i in range(M):\r\n        for j in range(T,t[i]-1,-1):\r\n            dp[j] = max(\r\n                dp[j],dp[j-t[i]]+v[i]\r\n            )\r\n\r\n    return dp[T]\r\n\r\nprint(max_value(T,M,t,v))","statementBase64":"IyMjIyDpopjnm67mj4/ov7AKCui+sOi+sOaYr+S4quWkqei1hOiBqumilueahOWtqeWtkO+8jOS7lueahOaipuaDs+aYr+aIkOS4uuS4lueVjOS4iuacgOS8n+Wkp+eahOWMu+W4iOOAguS4uuatpO+8jOS7luaDs+aLnOmZhOi/keacgOacieWogeacm+eahOWMu+W4iOS4uuW4iOOAguWMu+W4iOS4uuS6huWIpOaWreS7lueahOi1hOi0qO+8jOe7meS7luWHuuS6huS4gOS4qumavumimOOAguWMu+W4iOaKiuS7luW4puWIsOS4gOS4quWIsOWkhOmDveaYr+iNieiNr+eahOWxsea0numHjOWvueS7luivtO+8muKAnOWtqeWtkO+8jOi/meS4quWxsea0numHjOacieS4gOS6m+S4jeWQjOeahOiNieiNr++8jOmHh+avj+S4gOagqumDvemcgOimgeS4gOS6m+aXtumXtO+8jOavj+S4gOagquS5n+acieWug+iHqui6q+eahOS7t+WAvOOAguaIkeS8mue7meS9oOS4gOauteaXtumXtO+8jOWcqOi/meauteaXtumXtOmHjO+8jOS9oOWPr+S7pemHh+WIsOS4gOS6m+iNieiNr+OAguWmguaenOS9oOaYr+S4gOS4quiBquaYjueahOWtqeWtkO+8jOS9oOW6lOivpeWPr+S7peiuqemHh+WIsOeahOiNieiNr+eahOaAu+S7t+WAvOacgOWkp+OAguKAnSDlpoLmnpzkvaDmmK/ovrDovrDvvIzkvaDog73lrozmiJDov5nkuKrku7vliqHlkJfvvJ8KCiMjIyMg6L6T5YWl5qC85byPCgrnrKzkuIDooYzmnIkgJDIkIOS4quaVtOaVsCAkVCTvvIgkMSBcbGUgVCBcbGUgMTAwMCTvvInlkowgJE0k77yIJDEgXGxlIE0gXGxlIDEwMCTvvInvvIznlKjkuIDkuKrnqbrmoLzpmpTlvIDvvIwkVCQg5Luj6KGo5oC75YWx6IO95aSf55So5p2l6YeH6I2v55qE5pe26Ze077yMJE0kIOS7o+ihqOWxsea0numHjOeahOiNieiNr+eahOaVsOebruOAgiDmjqXkuIvmnaXnmoQgJE0kIOihjOavj+ihjOWMheaLrOS4pOS4quWcqCAkMSQg5YiwICQxMDAkIOS5i+mXtO+8iOWMheaLrCAkMSQg5ZKMICQxMDAk77yJ55qE5pW05pWw77yM5YiG5Yir6KGo56S66YeH5pGY5p+Q5qCq6I2J6I2v55qE5pe26Ze05ZKM6L+Z5qCq6I2J6I2v55qE5Lu35YC844CCCgojIyMjIOi+k+WHuuagvOW8jwoK6L6T5Ye65Zyo6KeE5a6a55qE5pe26Ze05YaF5Y+v5Lul6YeH5Yiw55qE6I2J6I2v55qE5pyA5aSn5oC75Lu35YC844CCCgojIyMjIOivtOaYji/mj5DnpLoKCioq44CQ5pWw5o2u6IyD5Zu044CRKiogCi0g5a+55LqOICQzMFwlJCDnmoTmlbDmja7vvIwkTSBcbGUgMTAk77ybIAotIOWvueS6juWFqOmDqOeahOaVsOaNru+8jCRNIFxsZSAxMDAk44CCICoq44CQ6aKY55uu5p2l5rqQ44CRKiogTk9JUCAyMDA1IOaZruWPiue7hOesrOS4iemimA=="} -->
### P1048 [NOIP 2005 普及组] 采药

- 题目：[[NOIP 2005 普及组] 采药](https://www.luogu.com.cn/problem/P1048)
- 状态：AC
- 语言：Python

### 题目原文

#

#### 题目描述

辰辰是个天资聪颖的孩子，他的梦想是成为世界上最伟大的医师。为此，他想拜附近最有威望的医师为师。医师为了判断他的资质，给他出了一个难题。医师把他带到一个到处都是草药的山洞里对他说：“孩子，这个山洞里有一些不同的草药，采每一株都需要一些时间，每一株也有它自身的价值。我会给你一段时间，在这段时间里，你可以采到一些草药。如果你是一个聪明的孩子，你应该可以让采到的草药的总价值最大。” 如果你是辰辰，你能完成这个任务吗？

#

#### 输入格式

第一行有 $2$ 个整数 $T$（$1 \le T \le 1000$）和 $M$（$1 \le M \le 100$），用一个空格隔开，$T$ 代表总共能够用来采药的时间，$M$ 代表山洞里的草药的数目。 接下来的 $M$ 行每行包括两个在 $1$ 到 $100$ 之间（包括 $1$ 和 $100$）的整数，分别表示采摘某株草药的时间和这株草药的价值。

#

#### 输出格式

输出在规定的时间内可以采到的草药的最大总价值。

#

#### 说明/提示

**【数据范围】**

- 对于 $30\%$ 的数据，$M \le 10$；

- 对于全部的数据，$M \le 100$。 **【题目来源】** NOIP 2005 普及组第三题

### 代码

```python
T,M = map(int,input().split())
t = []
v = []
for _ in range(M):
    a,b = map(int,input().split())
    t.append(a)
    v.append(b)

def max_value(T,M,t,v):
    dp = [0]*(T+1)
    for i in range(M):
        for j in range(T,t[i]-1,-1):
            dp[j] = max(
                dp[j],dp[j-t[i]]+v[i]
            )

    return dp[T]

print(max_value(T,M,t,v))
```

<!-- LUOGU_DAILY_ITEM {"problemId":"P1470","title":"[IOI 1996 / USACO2.3] 最长前缀 Longest Prefix","status":"AC","language":"Python","tags":["动态规划"],"url":"https://www.luogu.com.cn/problem/P1470","idea":"用dp数组储存第i位是否能用P凑出。","review":"","code":"import sys\r\nP = []\r\nS = ''\r\nwhile True:\r\n    line = sys.stdin.readline().split()\r\n    if line == ['.']:\r\n        break\r\n    P += line\r\n\r\nwhile True:\r\n    line = sys.stdin.readline().strip()\r\n    if line == '':\r\n        break\r\n    S += line\r\n\r\ndef max_len(P,S):\r\n    dp = [False]*(len(S)+1)\r\n    dp[0] = True\r\n\r\n    for i in range(len(S)+1):\r\n        if dp[i] == True:\r\n\r\n            for p in P:\r\n                if S[i:i+len(p)] == p:\r\n                    dp[i+len(p)] = True\r\n    \r\n    j = len(S)\r\n    while dp[j] == False:\r\n        j-=1\r\n    return j\r\n\r\nprint(max_len(P,S))","statementBase64":"IyMjIyDpopjnm67mj4/ov7AKCuWcqOeUn+eJqeWtpuS4re+8jOS4gOS6m+eUn+eJqeeahOe7k+aehOaYr+eUqOWMheWQq+WFtuimgee0oOeahOWkp+WGmeWtl+avjeW6j+WIl+adpeihqOekuueahOOAgueUn+eJqeWtpuWutuWvueS6juaKiumVv+eahOW6j+WIl+WIhuino+aIkOi+g+efreeahOW6j+WIl++8iOWNs+WFg+e0oO+8ieW+iOaEn+WFtOi2o+OAgiDlpoLmnpzkuIDkuKrpm4blkIggJFAkIOS4reeahOWFg+e0oOWPr+S7peS4sui1t+adpe+8iOWFg+e0oOWPr+S7pemHjeWkjeS9v+eUqO+8iee7hOaIkOS4gOS4quW6j+WIlyAkUyTvvIzpgqPkuYjmiJHku6zorqTkuLrluo/liJcgJFMkIOWPr+S7peWIhuino+S4uiAkUCQg5Lit55qE5YWD57Sg44CC5YWD57Sg5LiN5LiA5a6a6KaB5YWo6YOo5Ye6546w77yI5aaC5LiL5L6L5LitIGBCQkNgIOWwseayoeacieWHuueOsO+8ieOAguS4vuS4quS+i+WtkO+8jOW6j+WIlyBgQUJBQkFDQUJBQUJgIOWPr+S7peWIhuino+S4uuS4i+mdoumbhuWQiOS4reeahOWFg+e0oO+8mmB7QSxBQixCQSxDQSxCQkN9YOOAgiDluo/liJcgJFMkIOeahOWJjemdoiAkayQg5Liq5a2X56ym56ew5L2cICRTJCDkuK3plb/luqbkuLogJGskIOeahOWJjee8gOOAguiuvuiuoeS4gOS4queoi+W6j++8jOi+k+WFpeS4gOS4quWFg+e0oOmbhuWQiOS7peWPiuS4gOS4quWkp+WGmeWtl+avjeW6j+WIl++8jOiuviAkUyckIOaYr+W6j+WIlyAkUyQg55qE5YmN57yA77yM5L2/5YW25Y+v5Lul5YiG6Kej5Li657uZ5Ye655qE6ZuG5ZCIICRQJCDkuK3nmoTlhYPntKDvvIzmsYIgJFMnJCDnmoTplb/luqYgJGskIOeahOacgOWkp+WAvOOAggoKIyMjIyDovpPlhaXmoLzlvI8KCui+k+WFpeaVsOaNrueahOW8gOWktOWMheaLrOiLpeW5suS4quWFg+e0oOe7hOaIkOeahOmbhuWQiCAkUCTvvIznlKjov57nu63nmoTku6XnqbrmoLzliIblvIDnmoTlrZfnrKbkuLLooajnpLrjgILlrZfmr43lhajpg6jmmK/lpKflhpnvvIzmlbDmja7lj6/og73kuI3mraLkuIDooYzjgILlhYPntKDpm4blkIjnu5PmnZ/nmoTmoIflv5fmmK/kuIDkuKrlj6rljIXlkKvkuIDkuKogYC5gIOeahOihjO+8jOmbhuWQiOS4reeahOWFg+e0oOayoeaciemHjeWkjeOAgiDmjqXnnYDmmK/lpKflhpnlrZfmr43luo/liJcgJFMk77yM55So5a2X56ym5Liy6KGo56S677yM5q+PICQ3NiQg5Liq5a2X56ym5o2i5LiA6KGM44CCCgojIyMjIOi+k+WHuuagvOW8jwoK5Y+q5pyJ5LiA6KGM77yM6L6T5Ye65LiA5Liq5pW05pWw77yM6KGo56S6ICRTJCDnrKblkIjmnaHku7bnmoTliY3nvIDnmoTmnIDlpKfplb/luqbjgIIKCiMjIyMg6K+05piOL+aPkOekugoKKirjgJDmlbDmja7ojIPlm7TjgJEqKiDlr7nkuo4gJDEwMFwlJCDnmoTmlbDmja7vvIwkMVxsZSBcdGV4dHtjYXJkfShQKSBcbGUgMjAwJO+8jCQxXGxlIHxTfCBcbGUgMlx0aW1lcyAxMF41JO+8jCRQJCDkuK3nmoTlhYPntKDplb/luqblnYfkuI3otoXov4cgJDEwJOOAgiDnv7vor5HmnaXoh6ogTk9DT1fjgII="} -->
### P1470 [IOI 1996 / USACO2.3] 最长前缀 Longest Prefix

- 题目：[[IOI 1996 / USACO2.3] 最长前缀 Longest Prefix](https://www.luogu.com.cn/problem/P1470)
- 状态：AC
- 语言：Python
- 标签：动态规划

### 题目原文

#

#### 题目描述

在生物学中，一些生物的结构是用包含其要素的大写字母序列来表示的。生物学家对于把长的序列分解成较短的序列（即元素）很感兴趣。 如果一个集合 $P$ 中的元素可以串起来（元素可以重复使用）组成一个序列 $S$，那么我们认为序列 $S$ 可以分解为 $P$ 中的元素。元素不一定要全部出现（如下例中 `BBC` 就没有出现）。举个例子，序列 `ABABACABAAB` 可以分解为下面集合中的元素：`{A,AB,BA,CA,BBC}`。 序列 $S$ 的前面 $k$ 个字符称作 $S$ 中长度为 $k$ 的前缀。设计一个程序，输入一个元素集合以及一个大写字母序列，设 $S'$ 是序列 $S$ 的前缀，使其可以分解为给出的集合 $P$ 中的元素，求 $S'$ 的长度 $k$ 的最大值。

#

#### 输入格式

输入数据的开头包括若干个元素组成的集合 $P$，用连续的以空格分开的字符串表示。字母全部是大写，数据可能不止一行。元素集合结束的标志是一个只包含一个 `.` 的行，集合中的元素没有重复。 接着是大写字母序列 $S$，用字符串表示，每 $76$ 个字符换一行。

#

#### 输出格式

只有一行，输出一个整数，表示 $S$ 符合条件的前缀的最大长度。

#

#### 说明/提示

**【数据范围】** 对于 $100\%$ 的数据，$1\le \text{card}(P) \le 200$，$1\le |S| \le 2\times 10^5$，$P$ 中的元素长度均不超过 $10$。 翻译来自 NOCOW。

### 思路

用dp数组储存第i位是否能用P凑出。

### 代码

```python
import sys
P = []
S = ''
while True:
    line = sys.stdin.readline().split()
    if line == ['.']:
        break
    P += line

while True:
    line = sys.stdin.readline().strip()
    if line == '':
        break
    S += line

def max_len(P,S):
    dp = [False]*(len(S)+1)
    dp[0] = True

    for i in range(len(S)+1):
        if dp[i] == True:

            for p in P:
                if S[i:i+len(p)] == p:
                    dp[i+len(p)] = True
    
    j = len(S)
    while dp[j] == False:
        j-=1
    return j

print(max_len(P,S))
```

<!-- LUOGU_DAILY_ITEM {"problemId":"P2858","title":"[USACO06FEB] Treats for the Cows G/S","status":"AC","language":"Python","tags":["区间DP"],"url":"https://www.luogu.com.cn/problem/P2858","idea":"区间DP本质是小区间->大区间，所以一般需要按区间长度从小到大进行枚举","review":"","code":"v = []\r\nN = int(input())\r\nfor _ in range(N):\r\n    v.append(int(input()))\r\n\r\ndef day(N,l,r) :\r\n    return N - r + l\r\n\r\ndef most(v,N):\r\n    dp = [[0]*(N) for _ in range(N)]\r\n\r\n    l = 0\r\n    r = N-1\r\n\r\n    for length in range(1, N + 1):\r\n        for l in range(0, N - length + 1):\r\n            r = l + length - 1\r\n            if l == r:\r\n                dp[l][r] = v[l] * N\r\n            else:\r\n                d = day(N, l, r)\r\n                dp[l][r] = max(\r\n                    dp[l + 1][r] + v[l] * d,\r\n                    dp[l][r - 1] + v[r] * d\r\n                )\r\n    return dp[0][N-1]\r\n\r\nprint(most(v,N))","statementBase64":"IyMjIyDpopjnm67mj4/ov7AKCue6pue/sOe7j+W4uOe7meS6p+WltumHj+mrmOeahOWltueJm+WPkeeJueauiua0pei0tO+8jOS6juaYr+W+iOW/q+WltueJm+S7rOaLpeacieS6huWkp+eslOS4jeefpeivpeaAjuS5iOiKseeahOmSseOAguS4uuatpO+8jOe6pue/sOi0ree9ruS6hiAkTiTvvIgkMSBcbGVxIE4gXGxlcSAyMDAwJO+8ieS7vee+juWRs+eahOmbtumjn+adpeWNlue7meWltueJm+S7rOOAguavj+Wkqee6pue/sOWUruWHuuS4gOS7vembtumjn+OAguW9k+eEtue6pue/sOW4jOacm+i/meS6m+mbtumjn+WFqOmDqOWUruWHuuWQjuiDveW+l+WIsOacgOWkp+eahOaUtuebiu+8jOi/meS6m+mbtumjn+acieS7peS4i+i/meS6m+aciei2o+eahOeJueaAp++8miArIOmbtumjn+aMieeFpyAkMSwgXGxkb3RzLCBOJCDnvJblj7fvvIzlroPku6zooqvmjpLmiJDkuIDliJfmlL7lnKjkuIDkuKrlvojplb/nmoTnm5LlrZDph4zjgILnm5LlrZDnmoTkuKTnq6/pg73mnInlvIDlj6PvvIznuqbnv7Dmr4/lpKnlj6/ku6Xku47nm5LlrZDnmoTku7vkuIDnq6/lj5blh7rmnIDlpJbpnaLnmoTkuIDkuKrjgIIgKyDkuI7nvo7phZLkuI7lpb3lkIPnmoTlpbbpharnm7jkvLzvvIzov5nkupvpm7bpo5/lgqjlrZjlvpfotorkuYXlsLHotorlpb3lkIPjgILlvZPnhLbvvIzov5nmoLfnuqbnv7DlsLHlj6/ku6XmiorlroPku6zljZblh7rmm7Tpq5jnmoTku7fpkrHjgIIgKyDmr4/ku73pm7bpo5/nmoTliJ3lp4vku7flgLzkuI3kuIDlrprnm7jlkIzjgILnuqbnv7Dov5votKfml7bvvIznrKwgJGkkIOS7vembtumjn+eahOWIneWni+S7t+WAvOS4uiAkVl9pJO+8iCQxIFxsZXEgViBcbGVxIDEwMDAk77yJ44CCICsg56ysICRpJCDku73pm7bpo5/lpoLmnpzlnKjooqvkubDov5vlkI7nmoTnrKwgJGEkIOWkqeWHuuWUru+8jOWImeWug+eahOWUruS7t+aYryAkVl9pIFx0aW1lcyBhJOOAgiAkVl9pJCDooajnpLrnmoTmmK/ku47nm5LlrZDpobbnq6/lvoDkuIvnmoTnrKwgJGkkIOS7vembtumjn+eahOWIneWni+S7t+WAvOOAgue6pue/sOWRiuivieS6huS9oOaJgOaciembtumjn+eahOWIneWni+S7t+WAvO+8jOW5tuW4jOacm+S9oOiDveW4ruS7luiuoeeul+S4gOS4i++8jOWcqOi/meS6m+mbtumjn+WFqOiiq+WNluWHuuWQju+8jOS7luacgOWkmuiDveW+l+WIsOWkmuWwkemSseOAggoKIyMjIyDovpPlhaXmoLzlvI8KCuesrOS4gOihjOS4gOS4quato+aVtOaVsCAkTiTjgIIg5o6l5LiL5p2lICQyIFxzaW0gTisxJCDooYzvvIznrKwgJGkrMSQg6KGM5Li65LiA5Liq5q2j5pW05pWwICRWX2kk44CCCgojIyMjIOi+k+WHuuagvOW8jwoK5LiA6KGM5LiA5Liq5pW05pWw6KGo56S6562U5qGI44CCCgojIyMjIOivtOaYji/mj5DnpLoKCuagt+S+i+eahOacgOS8mOino+aYr++8muaMiSAkMSBcdG8gNSBcdG8gMiBcdG8gMyBcdG8gNCQg55qE6aG65bqP5Y2W6Zu26aOf77yM5b6X5Yiw55qE6ZKx5pWw5pivICQxIFx0aW1lcyAxICsgMiBcdGltZXMgMiArIDMgXHRpbWVzIDMgKyA0IFx0aW1lcyAxICsgNSBcdGltZXMgNSA9IDQzJOOAgg=="} -->
### P2858 [USACO06FEB] Treats for the Cows G/S

- 题目：[[USACO06FEB] Treats for the Cows G/S](https://www.luogu.com.cn/problem/P2858)
- 状态：AC
- 语言：Python
- 标签：区间DP

### 题目原文

#

#### 题目描述

约翰经常给产奶量高的奶牛发特殊津贴，于是很快奶牛们拥有了大笔不知该怎么花的钱。为此，约翰购置了 $N$（$1 \leq N \leq 2000$）份美味的零食来卖给奶牛们。每天约翰售出一份零食。当然约翰希望这些零食全部售出后能得到最大的收益，这些零食有以下这些有趣的特性： + 零食按照 $1, \ldots, N$ 编号，它们被排成一列放在一个很长的盒子里。盒子的两端都有开口，约翰每天可以从盒子的任一端取出最外面的一个。 + 与美酒与好吃的奶酪相似，这些零食储存得越久就越好吃。当然，这样约翰就可以把它们卖出更高的价钱。 + 每份零食的初始价值不一定相同。约翰进货时，第 $i$ 份零食的初始价值为 $V_i$（$1 \leq V \leq 1000$）。 + 第 $i$ 份零食如果在被买进后的第 $a$ 天出售，则它的售价是 $V_i \times a$。 $V_i$ 表示的是从盒子顶端往下的第 $i$ 份零食的初始价值。约翰告诉了你所有零食的初始价值，并希望你能帮他计算一下，在这些零食全被卖出后，他最多能得到多少钱。

#

#### 输入格式

第一行一个正整数 $N$。 接下来 $2 \sim N+1$ 行，第 $i+1$ 行为一个正整数 $V_i$。

#

#### 输出格式

一行一个整数表示答案。

#

#### 说明/提示

样例的最优解是：按 $1 \to 5 \to 2 \to 3 \to 4$ 的顺序卖零食，得到的钱数是 $1 \times 1 + 2 \times 2 + 3 \times 3 + 4 \times 1 + 5 \times 5 = 43$。

### 思路

区间DP本质是小区间->大区间，所以一般需要按区间长度从小到大进行枚举

### 代码

```python
v = []
N = int(input())
for _ in range(N):
    v.append(int(input()))

def day(N,l,r) :
    return N - r + l

def most(v,N):
    dp = [[0]*(N) for _ in range(N)]

    l = 0
    r = N-1

    for length in range(1, N + 1):
        for l in range(0, N - length + 1):
            r = l + length - 1
            if l == r:
                dp[l][r] = v[l] * N
            else:
                d = day(N, l, r)
                dp[l][r] = max(
                    dp[l + 1][r] + v[l] * d,
                    dp[l][r - 1] + v[r] * d
                )
    return dp[0][N-1]

print(most(v,N))
```
<!-- LUOGU_DAILY_ENTRIES_END -->
