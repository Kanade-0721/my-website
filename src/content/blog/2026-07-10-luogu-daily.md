---
title: "2026-07-10 洛谷刷题记录"
description: "记录 2026-07-10 在洛谷完成的刷题内容、解题思路与复盘。"
date: 2026-07-10 00:58
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

今天记录了 3 道题。

<!-- LUOGU_DAILY_TABLE_START -->
| 题号 | 题目 | 状态 | 语言 | 标签 |
| --- | --- | --- | --- | --- |
| P1001 | [A+B Problem](https://www.luogu.com.cn/problem/P1001) | AC | Python | - |
| P1024 | [[NOIP 2001 提高组] 一元三次方程求解](https://www.luogu.com.cn/problem/P1024) | AC | Python | 二分 |
| P2678 | [[NOIP 2015 提高组] 跳石头](https://www.luogu.com.cn/problem/P2678) | AC | Python | 二分、贪心 |
<!-- LUOGU_DAILY_TABLE_END -->

## 刷题记录

<!-- LUOGU_DAILY_ENTRIES_START -->
<!-- LUOGU_DAILY_ITEM {"problemId":"P1001","title":"A+B Problem","status":"AC","language":"Python","tags":[],"url":"https://www.luogu.com.cn/problem/P1001","idea":"","review":"","code":"a,b = map(int,input().split())\r\nprint(a+b)","statementBase64":"IyMjIyDpopjnm67mj4/ov7AKCui+k+WFpeS4pOS4quaVtOaVsCAkYSxiJO+8jOi+k+WHuuWug+S7rOeahOWSjOOAgiDms6jmhI/vvJogMS4gUGFzY2FsIOS9v+eUqCBgaW50ZWdlcmAg5Lya54iG5o6J5ZOm77yBIDIuIOaciei0n+aVsOWTpu+8gSAzLiBDL0MrKyDnmoQgYG1haW5gIOWHveaVsOW/hemhu+aYryBgaW50YCDnsbvlnovjgILnqIvluo/mraPluLjnu5PmnZ/ml7bnmoTov5Tlm57lgLzlv4XpobvmmK8gYDBg44CC6L+Z5LiN5LuF5a+55rSb6LC35YW25LuW6aKY55uu5pyJ5pWI77yM6ICM5LiU5Lmf5pivIE5PSVAvQ1NQL05PSSDmr5TotZvnmoTopoHmsYLvvIEg5aW95ZCn77yM5ZCM5b+X5Lus77yM5oiR5Lus5bCx5LuO6L+Z5LiA6aKY5byA5aeL77yM5ZCR552A5aSn54mb55qE6Lev6L+b5Y+R44CCID4g5Lu75L2V5LiA5Liq5Lyf5aSn55qE5oCd5oOz77yM6YO95pyJ5LiA5Liq5b6u5LiN6Laz6YGT55qE5byA5aeL44CCCgojIyMjIOi+k+WFpeagvOW8jwoK6L6T5YWl5Lik5Liq5Lul56m65qC85YiG6ZqU55qE5pW05pWwICRhLGIk44CCCgojIyMjIOi+k+WHuuagvOW8jwoK6L6T5Ye65LiA5Liq5pW05pWw77yM6KGo56S6ICRhK2Ik44CCCgojIyMjIOivtOaYji/mj5DnpLoKCioq5pWw5o2u6IyD5Zu0Kiog5a+55LqO5omA5pyJ5rWL6K+V5pWw5o2u77yMJC17MTB9XjkgXGxlIGEsYiBcbGUgezEwfV45JOOAgiAqKuW5v+WRiioqIOa0m+iwt+WHuuWTgeeahOeul+azleaVmeadkO+8jOW4ruWKqeaCqOabtOeugOWNleWcsOWtpuS5oOWfuuehgOeul+azleOAglvjgJDlrpjmlrnnvZHlupfnu53otZ7ng63ljZbkuK3vvIHjgJE+Pj5dKGh0dHBzOi8vaXRlbS50YW9iYW8uY29tL2l0ZW0uaHRtP2lkPTYzNzczMDUxNDc4MykgWyFbXShodHRwczovL2Nkbi5sdW9ndS5jb20uY24vdXBsb2FkL2ltYWdlX2hvc3RpbmcvbmpjN2RsbmcucG5nKV0oaHR0cHM6Ly9pdGVtLnRhb2Jhby5jb20vaXRlbS5odG0/aWQ9NjM3NzMwNTE0NzgzKSAqKuacrOmimOWQhOenjeivreiogOeahOeoi+W6j+iMg+S+i++8mioqIEMgYGBgYyAjaW5jbHVkZSBpbnQgbWFpbigpIHsgaW50IGEsYjsgc2NhbmYoIiVkJWQiLCZhLCZiKTsgcHJpbnRmKCIlZFxuIiwgYStiKTsgcmV0dXJuIDA7IH0gYGBgIC0tLS0tLS0tLS0tLS0tLQotIEMrKyBgYGBjcHAgI2luY2x1ZGUgI2luY2x1ZGUgdXNpbmcgbmFtZXNwYWNlIHN0ZDsgaW50IG1haW4oKSB7IGludCBhLGI7IGNpbiA+PiBhID4+IGI7IGNvdXQgYSArIGIsIDApIGNvbnNvbGUubG9nKHJlc3VsdCkgcHJvY2Vzcy5leGl0KCkgLy8g6K+35rOo5oSP5b+F6aG75Zyo5Ye65Y+j54K55aSE5Yqg5YWl5q2k6KGMIGBgYCAtLS0tLS0tLS0tLS0tLS0tCi0gUnVieSBgYGBydWJ5IGEsIGIgPSBnZXRzLnNwbGl0Lm1hcCgmOnRvX2kpIHByaW50IGErYiBgYGAgLS0tLS0tLS0tLS0tLS0tLQotIFBIUCBgYGBwaHA="} -->
### P1001 A+B Problem

- 题目：[A+B Problem](https://www.luogu.com.cn/problem/P1001)
- 状态：AC
- 语言：Python

### 题目原文

#

#### 题目描述

输入两个整数 $a,b$，输出它们的和。 注意： 1. Pascal 使用 `integer` 会爆掉哦！ 2. 有负数哦！ 3. C/C++ 的 `main` 函数必须是 `int` 类型。程序正常结束时的返回值必须是 `0`。这不仅对洛谷其他题目有效，而且也是 NOIP/CSP/NOI 比赛的要求！ 好吧，同志们，我们就从这一题开始，向着大牛的路进发。 > 任何一个伟大的思想，都有一个微不足道的开始。

#

#### 输入格式

输入两个以空格分隔的整数 $a,b$。

#

#### 输出格式

输出一个整数，表示 $a+b$。

#

#### 说明/提示

**数据范围** 对于所有测试数据，$-{10}^9 \le a,b \le {10}^9$。 **广告** 洛谷出品的算法教材，帮助您更简单地学习基础算法。[【官方网店绝赞热卖中！】>>>](https://item.taobao.com/item.htm?id=637730514783) [![](https://cdn.luogu.com.cn/upload/image_hosting/njc7dlng.png)](https://item.taobao.com/item.htm?id=637730514783) **本题各种语言的程序范例：** C ```c #include int main() { int a,b; scanf("%d%d",&a,&b); printf("%d\n", a+b); return 0; } ``` --------------
-
- C++ ```cpp #include #include using namespace std; int main() { int a,b; cin >> a >> b; cout a + b, 0) console.log(result) process.exit() // 请注意必须在出口点处加入此行 ``` ---------------
-
- Ruby ```ruby a, b = gets.split.map(&:to_i) print a+b ``` ---------------
-
- PHP ```php

### 代码

```python
a,b = map(int,input().split())
print(a+b)
```

<!-- LUOGU_DAILY_ITEM {"problemId":"P1024","title":"[NOIP 2001 提高组] 一元三次方程求解","status":"AC","language":"Python","tags":["二分"],"url":"https://www.luogu.com.cn/problem/P1024","idea":"","review":"","code":"a,b,c,d = map(float,input().split())\r\ndef func(n):\r\n    return a*(n*n*n)+b*(n*n)+c*n+d\r\ninf = -100\r\nsup = 100\r\nmis = 0.01\r\ncount = 0\r\nres = []\r\ndef find(inf,sup):\r\n    global count,res\r\n    if sup-inf < mis:\r\n        if func(sup)*func(inf)<0:\r\n            res.append(float((sup+inf)/2))\r\n        return\r\n    mid = (inf+sup)/2\r\n    find(inf,mid)\r\n    find(mid,sup)\r\nfind(inf,sup)\r\nresult = [f\"{x:.2f}\" for x in res]\r\nprint(*result)","statementBase64":"IyMjIyDpopjnm67mj4/ov7AKCuacieW9ouWmgu+8miRhIHheMyArIGIgeF4yICsgYyB4ICsgZCA9IDAkIOi/meagt+eahOS4gOS4quS4gOWFg+S4ieasoeaWueeoi+OAgue7meWHuuivpeaWueeoi+S4reWQhOmhueeahOezu+aVsO+8iCRhLGIsYyxkJCDlnYfkuLrlrp7mlbDvvInvvIzlubbnuqblrpror6XmlrnnqIvlrZjlnKjkuInkuKrkuI3lkIzlrp7moLnvvIjmoLnnmoTojIPlm7TlnKggJC0xMDAkIOiHsyAkMTAwJCDkuYvpl7TvvInvvIzkuJTmoLnkuI7moLnkuYvlt67nmoTnu53lr7nlgLwgJFxnZSAxJOOAguimgeaxgueUseWwj+WIsOWkp+S+neasoeWcqOWQjOS4gOihjOi+k+WHuui/meS4ieS4quWunuaguSjmoLnkuI7moLnkuYvpl7TnlZnmnInnqbrmoLwp77yM5bm257K+56Gu5Yiw5bCP5pWw54K55ZCOICQyJCDkvY3jgIIg5o+Q56S677ya6K6w5pa556iLICRmKHgpID0gMCTvvIzoi6XlrZjlnKggJDIkIOS4quaVsCAkeF8xJCDlkowgJHhfMiTvvIzkuJQgJHhfMQoKIyMjIyDovpPlhaXmoLzlvI8KCuS4gOihjO+8jCQ0JCDkuKrlrp7mlbAgJGEsIGIsIGMsIGQk44CCCgojIyMjIOi+k+WHuuagvOW8jwoK5LiA6KGM77yMJDMkIOS4quWunuague+8jOS7juWwj+WIsOWkp+i+k+WHuu+8jOW5tueyvuehruWIsOWwj+aVsOeCueWQjiAkMiQg5L2N44CCCgojIyMjIOivtOaYji/mj5DnpLoKCioq44CQ6aKY55uu5p2l5rqQ44CRKiogTk9JUCAyMDAxIOaPkOmrmOe7hOesrOS4gOmimA=="} -->
### P1024 [NOIP 2001 提高组] 一元三次方程求解

- 题目：[[NOIP 2001 提高组] 一元三次方程求解](https://www.luogu.com.cn/problem/P1024)
- 状态：AC
- 语言：Python
- 标签：二分

### 题目原文

#

#### 题目描述

有形如：$a x^3 + b x^2 + c x + d = 0$ 这样的一个一元三次方程。给出该方程中各项的系数（$a,b,c,d$ 均为实数），并约定该方程存在三个不同实根（根的范围在 $-100$ 至 $100$ 之间），且根与根之差的绝对值 $\ge 1$。要求由小到大依次在同一行输出这三个实根(根与根之间留有空格)，并精确到小数点后 $2$ 位。 提示：记方程 $f(x) = 0$，若存在 $2$ 个数 $x_1$ 和 $x_2$，且 $x_1

#

#### 输入格式

一行，$4$ 个实数 $a, b, c, d$。

#

#### 输出格式

一行，$3$ 个实根，从小到大输出，并精确到小数点后 $2$ 位。

#

#### 说明/提示

**【题目来源】** NOIP 2001 提高组第一题

### 代码

```python
a,b,c,d = map(float,input().split())
def func(n):
    return a*(n*n*n)+b*(n*n)+c*n+d
inf = -100
sup = 100
mis = 0.01
count = 0
res = []
def find(inf,sup):
    global count,res
    if sup-inf < mis:
        if func(sup)*func(inf)<0:
            res.append(float((sup+inf)/2))
        return
    mid = (inf+sup)/2
    find(inf,mid)
    find(mid,sup)
find(inf,sup)
result = [f"{x:.2f}" for x in res]
print(*result)
```

<!-- LUOGU_DAILY_ITEM {"problemId":"P2678","title":"[NOIP 2015 提高组] 跳石头","status":"AC","language":"Python","tags":["二分","贪心"],"url":"https://www.luogu.com.cn/problem/P2678","idea":"最短距离的最大值，是典型的二分答案问题。我们假设该值为(L+1)//2，然后从左到右扫描，如果两个石头之间的距离小于该值，则移除石头i，最终得到一个remove，若小于M，则说明该假设值可行，尝试更大的left=mid+1，若大于M，则缩小范围，right = mid-1","review":"","code":"L, N, M = map(int, input().split())\r\nrocks = [0] * (N + 2)\r\nrocks[0] = 0\r\nrocks[N + 1] = L\r\nfor i in range(1, N + 1):\r\n    rocks[i] = int(input())\r\n\r\nleft, right = 1, L\r\nans = 0\r\n\r\nwhile left <= right:\r\n    mid = (left + right) // 2\r\n    removed = 0\r\n    prev = 0\r\n    for i in range(1, N + 2):\r\n        if rocks[i] - rocks[prev] < mid:\r\n            removed += 1\r\n        else:\r\n            prev = i\r\n    if removed <= M:\r\n        ans = mid\r\n        left = mid + 1\r\n    else:\r\n        right = mid - 1\r\n\r\nprint(ans)","statementBase64":"IyMjIyDpopjnm67mj4/ov7AKCuS4gOW5tOS4gOW6pueahOKAnOi3s+efs+WktOKAneavlOi1m+WPiOimgeW8gOWni+S6hu+8gSDov5npobnmr5TotZvlsIblnKjkuIDmnaHnrJTnm7TnmoTmsrPpgZPkuK3ov5vooYzvvIzmsrPpgZPkuK3liIbluIPnnYDkuIDkupvlt6jlpKflsqnnn7PjgILnu4Tlp5TkvJrlt7Lnu4/pgInmi6nlpb3kuobkuKTlnZflsqnnn7PkvZzkuLrmr5TotZvotbfngrnlkoznu4jngrnjgILlnKjotbfngrnlkoznu4jngrnkuYvpl7TvvIzmnIkgJE4kIOWdl+Wyqeefs++8iOS4jeWQq+i1t+eCueWSjOe7iOeCueeahOWyqeefs++8ieOAguWcqOavlOi1m+i/h+eoi+S4re+8jOmAieaJi+S7rOWwhuS7jui1t+eCueWHuuWPke+8jOavj+S4gOatpei3s+WQkeebuOmCu+eahOWyqeefs++8jOebtOiHs+WIsOi+vue7iOeCueOAgiDkuLrkuobmj5Dpq5jmr5TotZvpmr7luqbvvIznu4Tlp5TkvJrorqHliJLnp7votbDkuIDkupvlsqnnn7PvvIzkvb/lvpfpgInmiYvku6zlnKjmr5TotZvov4fnqIvkuK3nmoTmnIDnn63ot7Pot4Pot53nprvlsL3lj6/og73plb/jgILnlLHkuo7pooTnrpfpmZDliLbvvIznu4Tlp5TkvJroh7PlpJrku47otbfngrnlkoznu4jngrnkuYvpl7Tnp7votbAgJE0kIOWdl+Wyqeefs++8iOS4jeiDveenu+i1sOi1t+eCueWSjOe7iOeCueeahOWyqeefs++8ieOAggoKIyMjIyDovpPlhaXmoLzlvI8KCuesrOS4gOihjOWMheWQq+S4ieS4quaVtOaVsCAkTCxOLE0k77yM5YiG5Yir6KGo56S66LW354K55Yiw57uI54K555qE6Led56a777yM6LW354K55ZKM57uI54K55LmL6Ze055qE5bKp55+z5pWw77yM5Lul5Y+K57uE5aeU5Lya6Iez5aSa56e76LWw55qE5bKp55+z5pWw44CC5L+d6K+BICRMIFxnZXEgMSQg5LiUICROIFxnZXEgTSBcZ2VxIDAk44CCIOaOpeS4i+adpSAkTiQg6KGM77yM5q+P6KGM5LiA5Liq5pW05pWw77yM56ysICRpJCDooYznmoTmlbTmlbAgJERfaVwsKCAwCgojIyMjIOi+k+WHuuagvOW8jwoK5LiA5Liq5pW05pWw77yM5Y2z5pyA55+t6Lez6LeD6Led56a755qE5pyA5aSn5YC844CCCgojIyMjIOivtOaYji/mj5DnpLoKCiMjIyDovpPlhaXovpPlh7rmoLfkvosgMSDor7TmmI4g5bCG5LiO6LW354K56Led56a75Li6ICQyJCDlkowgJDE0JCDnmoTkuKTkuKrlsqnnn7Pnp7votbDlkI7vvIzmnIDnn63nmoTot7Pot4Pot53nprvkuLogJDQk77yI5LuO5LiO6LW354K56Led56a7ICQxNyQg55qE5bKp55+z6Lez5Yiw6Led56a7ICQyMSQg55qE5bKp55+z77yM5oiW6ICF5LuO6Led56a7ICQyMSQg55qE5bKp55+z6Lez5Yiw57uI54K577yJ44CCIAoKIyMjIOaVsOaNruinhOaooeS4jue6puWumiDlr7nkuo4gJDIwXCUk55qE5pWw5o2u77yMJDAgXGxlIE0gXGxlIE4gXGxlIDEwJOOAgiDlr7nkuo4gJDUwXCUkIOeahOaVsOaNru+8jCQwIFxsZSBNIFxsZSBOIFxsZSAxMDAk44CCIOWvueS6jiAkMTAwXCUkIOeahOaVsOaNru+8jCQwIFxsZSBNIFxsZSBOIFxsZSA1MDAwMCwxIFxsZSBMIFxsZSAxMF45JOOAgg=="} -->
### P2678 [NOIP 2015 提高组] 跳石头

- 题目：[[NOIP 2015 提高组] 跳石头](https://www.luogu.com.cn/problem/P2678)
- 状态：AC
- 语言：Python
- 标签：二分、贪心

### 题目原文

#

#### 题目描述

一年一度的“跳石头”比赛又要开始了！ 这项比赛将在一条笔直的河道中进行，河道中分布着一些巨大岩石。组委会已经选择好了两块岩石作为比赛起点和终点。在起点和终点之间，有 $N$ 块岩石（不含起点和终点的岩石）。在比赛过程中，选手们将从起点出发，每一步跳向相邻的岩石，直至到达终点。 为了提高比赛难度，组委会计划移走一些岩石，使得选手们在比赛过程中的最短跳跃距离尽可能长。由于预算限制，组委会至多从起点和终点之间移走 $M$ 块岩石（不能移走起点和终点的岩石）。

#

#### 输入格式

第一行包含三个整数 $L,N,M$，分别表示起点到终点的距离，起点和终点之间的岩石数，以及组委会至多移走的岩石数。保证 $L \geq 1$ 且 $N \geq M \geq 0$。 接下来 $N$ 行，每行一个整数，第 $i$ 行的整数 $D_i\,( 0

#

#### 输出格式

一个整数，即最短跳跃距离的最大值。

#

#### 说明/提示

### 输入输出样例 1 说明 将与起点距离为 $2$ 和 $14$ 的两个岩石移走后，最短的跳跃距离为 $4$（从与起点距离 $17$ 的岩石跳到距离 $21$ 的岩石，或者从距离 $21$ 的岩石跳到终点）。

### 数据规模与约定 对于 $20\%$的数据，$0 \le M \le N \le 10$。 对于 $50\%$ 的数据，$0 \le M \le N \le 100$。 对于 $100\%$ 的数据，$0 \le M \le N \le 50000,1 \le L \le 10^9$。

### 思路

最短距离的最大值，是典型的二分答案问题。我们假设该值为(L+1)//2，然后从左到右扫描，如果两个石头之间的距离小于该值，则移除石头i，最终得到一个remove，若小于M，则说明该假设值可行，尝试更大的left=mid+1，若大于M，则缩小范围，right = mid-1

### 代码

```python
L, N, M = map(int, input().split())
rocks = [0] * (N + 2)
rocks[0] = 0
rocks[N + 1] = L
for i in range(1, N + 1):
    rocks[i] = int(input())

left, right = 1, L
ans = 0

while left <= right:
    mid = (left + right) // 2
    removed = 0
    prev = 0
    for i in range(1, N + 2):
        if rocks[i] - rocks[prev] < mid:
            removed += 1
        else:
            prev = i
    if removed <= M:
        ans = mid
        left = mid + 1
    else:
        right = mid - 1

print(ans)
```
<!-- LUOGU_DAILY_ENTRIES_END -->
