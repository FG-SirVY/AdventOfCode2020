###############################################################################
# Day x, Task y                                                               #
###############################################################################

import aoc_util


year = 2020
day = 16
data_str = """class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12"""


def is_valid(numbers, ranges):
    for n in numbers:
        valid = False
        for r in ranges:
            if n >= r[0] and n <= r[1]:
                valid = True
                break

        if not valid:
            return n

    return 0


def task(data_set: list[str]) -> int:
    ranges = []

    i = 0
    while data_set[i] != "":        
        [_, numbers] = data_set[i].split(": ")
        [range_a, range_b] = numbers.split(" or ")
        range_a = [int(x) for x in range_a.split("-")]
        range_b = [int(x) for x in range_b.split("-")]

        ranges.append(range_a)
        ranges.append(range_b)

        i += 1

    while not data_set[i].startswith("nearby tickets:"):
        i += 1

    count = 0
    for i in range(i + 1, len(data_set)):
        numbers = [int(x) for x in data_set[i].split(",")]

        count += is_valid(numbers, ranges)


    return count


aoc_util.run_with_data_str(task, data_str)
aoc_util.run_with_data_set(task, year, day)
