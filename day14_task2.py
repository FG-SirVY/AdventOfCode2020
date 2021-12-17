###############################################################################
# Day x, Task y                                                               #
###############################################################################

import aoc_util


year = 2020
day = 14
data_str = """mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1"""


def task(data_set: list[str]) -> int:
    mem = {}
    mask_to_1 = []
    mask_floating = []
    for line in data_set:
        [instr, data] = line.split(" = ")
        if instr == "mask":
            mask_to_1 = []
            mask_floating = []
            for index, bit in enumerate(data):
                if bit == "1":
                    mask_to_1.append(35 - index)
                elif bit == "X":
                    mask_floating.append(35 - index)

        else:
            mem_index = int(instr[4:-1])
            number = int(data)
            for index in mask_to_1:
                mem_index |= (1 << index)


            n = 0
            iterations = (0b1 << (len(mask_floating)))
            while n < iterations:
                for position, index in enumerate(mask_floating):
                    if (n >> position) & 0b1:
                        mem_index |= 0b1 << index
                    else:
                        mem_index &= ~(0b1 << index)
                    
                mem[mem_index] = number
                n += 1
                
                

    return sum(mem.values())


aoc_util.run_with_data_str(task, data_str)
aoc_util.run_with_data_set(task, year, day)
