###############################################################################
# Day x, Task y                                                               #
###############################################################################

import aoc_util


year = 2020
day = 10
data_str_1 = """16
10
15
5
1
11
7
19
6
12
4"""

data_str_2 = """28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3"""


def task(data_set: list[str]) -> int:
    ints = [int(x) for x in data_set]
    ints.sort()

    ints.insert(0, 0)
    ints.append(ints[len(ints) - 1] + 3)

    variants = [1, 1, 1]
    for i in range(2, len(ints)):
        new_r = 0
        threshold = ints[i] - 3
        d = 0
        while i - d > 0 and ints[i - d - 1] >= threshold:
            d += 1
        if d == 1:
            new_r = variants[2]
        elif d == 2:
            new_r = variants[1] * 2
        elif d == 3:
            new_r = variants[0] + variants[1] + variants[2]
        for r in range(1, len(variants)):
            variants[r - 1] = variants[r]

        variants[2] = new_r

    return variants[2]


aoc_util.run_with_data_str(task, data_str_1)
aoc_util.run_with_data_str(task, data_str_2)
aoc_util.run_with_data_set(task, year, day)
