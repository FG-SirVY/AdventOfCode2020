###############################################################################
# Day x, Task y                                                               #
###############################################################################

import aoc_util


year = 2020
day = 14
data_str = """mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0"""


def task(data_set: list[str]) -> int:
    mem = {}
    mask_ops = []
    for line in data_set:
        [instr, data] = line.split(" = ")
        if instr == "mask":
            mask_ops = []
            for index, bit in enumerate(data):
                if bit == "1":
                    mask_ops.append((35 - index, 1))
                elif bit == "0":
                    mask_ops.append((35 - index, 0))

        else:
            mem_index = int(instr[4:-1])
            number = int(data)
            for index, operation in mask_ops:
                if operation == 0:
                    number &= ~(1 << index)
                elif operation == 1:
                    number |= (1 << index)

            mem[mem_index] = number


    return sum(mem.values())


aoc_util.run_with_data_str(task, data_str)
aoc_util.run_with_data_set(task, year, day)
