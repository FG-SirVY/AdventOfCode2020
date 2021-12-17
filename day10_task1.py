###############################################################################
# Day x, Task y                                                               #
###############################################################################

import aoc_util


year = 2020
day = 10
data_str = """1
2
3
4
7
8
9
10
11
14
17
18
19
20
23"""


def choose_next(ints, index):
    if index == 0:
        return 1
    
    count = 0
    threshold = ints[index] - 3
    index -= 1
    while index >= 0 and ints[index] >= threshold:
        count += choose_next(ints, index)
        index -= 1

    return count


def task(data_set: list[str]) -> int:
    ints = [int(x) for x in data_set]
    ints.sort()

    ints.insert(0, 0)

    return choose_next(ints, len(ints) - 1)


aoc_util.run_with_data_str(task, data_str)
aoc_util.run_with_data_set(task, year, day)
