###############################################################################
# Day x, Task y                                                               #
###############################################################################

import aoc_util


year = 2020
day = 15
data_str = """0,3,6"""


def task(data_set: list[str]) -> int:
    numbers_spoken = {}
    numbers_to_speak = [int(x) for x in data_set[0].split(",")]
    last_number_spoken = 0
    next_pair_to_add = False
    for i in range(1, 2021):
        if i < len(numbers_to_speak) + 1:
            last_number_spoken = numbers_to_speak[i - 1]
        else:
            if last_number_spoken in numbers_spoken:
                last_number_spoken = next_pair_to_add[1] - numbers_spoken[last_number_spoken]
            else:
                last_number_spoken = 0
        if next_pair_to_add:
            numbers_spoken[next_pair_to_add[0]] = next_pair_to_add[1]
        next_pair_to_add = (last_number_spoken, i)
    return last_number_spoken


aoc_util.run_with_data_str(task, data_str)
aoc_util.run_with_data_set(task, year, day)
