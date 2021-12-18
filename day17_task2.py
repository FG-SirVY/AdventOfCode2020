###############################################################################
# Day x, Task y                                                               #
###############################################################################

import aoc_util, sys


year = 2020
day = 17
data_str = """.#.
..#
###"""


def count_active(cubes, cube):
    acc = 0
    for x in range(-1, 2):
        for y in range(-1, 2):
            for z in range(-1, 2):
                for w in range(-1, 2):
                    if x == y == z == w == 0:
                        continue
                    if (cube[0] + x, cube[1] + y, cube[2] + z, cube[3] + w) in cubes:
                        acc += 1

    return acc



def task(data_set: list[str]) -> int:
    active_cubes = set()
    min_x = sys.maxsize
    max_x = 0
    min_y = sys.maxsize
    max_y = 0
    min_z = 0
    max_z = 0
    min_w = 0
    max_w = 0

    for x in range(len(data_set)):
        for y in range(len(data_set[0])):
            if data_set[x][y] == "#":
                if x > max_x:
                    max_x = x
                if x < min_x:
                    min_x = x
                if y > max_y:
                    max_y = y
                if y < min_y:
                    min_y = y
                
                active_cubes.add((x, y, 0, 0))

    for _ in range(6):
        new_cubes = set()

        for x in range(min_x - 1, max_x + 2):
            for y in range(min_y - 1, max_y + 2):
                for z in range(min_z - 1, max_z + 2):
                    for w in range(min_w - 1, max_w + 2):
                        cube = (x, y, z, w)
                        active_count = count_active(active_cubes, cube)
                        if cube in active_cubes:
                            if active_count == 2 or active_count == 3:
                                new_cubes.add(cube)
                        else:
                            if active_count == 3:
                                new_cubes.add(cube)
                                if x > max_x:
                                    max_x = x
                                if x < min_x:
                                    min_x = x
                                if y > max_y:
                                    max_y = y
                                if y < min_y:
                                    min_y = y
                                if z > max_z:
                                    max_z = z
                                if z < min_z:
                                    min_z = z
                                if w > max_w:
                                    max_w = w
                                if w < min_w:
                                    min_w = w

        active_cubes = new_cubes


    return len(active_cubes)
        


aoc_util.run_with_data_str(task, data_str)
aoc_util.run_with_data_set(task, year, day)
