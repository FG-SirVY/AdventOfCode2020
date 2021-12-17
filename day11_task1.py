###############################################################################
# Day x, Task y                                                               #
###############################################################################

import aoc_util


year = 2020
day = 11
data_str = """L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL"""


def count_occupied(seat_map, current_read, row, col):
    occupied = 0
    if row > 0 and col > 0 and seat_map[row - 1][col - 1][current_read] == "#":
        occupied += 1
    if row > 0 and seat_map[row - 1][col][current_read] == "#":
        occupied += 1
    if row > 0 and col < len(seat_map[0]) - 1 and seat_map[row - 1][col + 1][current_read] == "#":
        occupied += 1
    if col > 0 and seat_map[row][col - 1][current_read] == "#":
        occupied += 1
    if col < len(seat_map[0]) - 1 and seat_map[row][col + 1][current_read] == "#":
        occupied += 1
    if row < len(seat_map) - 1 and col > 0 and seat_map[row + 1][col - 1][current_read] == "#":
        occupied += 1
    if row < len(seat_map) - 1 and seat_map[row + 1][col][current_read] == "#":
        occupied += 1
    if row < len(seat_map) - 1 and col < len(seat_map[0]) - 1 and seat_map[row + 1][col + 1][current_read] == "#":
        occupied += 1

    return occupied


def count_total_occupied(seat_map, n):
    current_read = (n + 1) % 2
    occupied = 0

    for row in seat_map:
        for s in row:
            if s[current_read] == "#":
                occupied += 1

    return occupied


def simulate(seat_map, step):
    change = False
    current_read = step % 2
    current_write = (current_read + 1) % 2
    for row in range(len(seat_map)):
        for col in range(len(seat_map[0])):
            if seat_map[row][col][current_read] == "#" \
                and count_occupied(seat_map, current_read, row, col) >= 4:
                change = True
                seat_map[row][col][current_write] = "L"
            elif seat_map[row][col][current_read] == "L" \
                and count_occupied(seat_map, current_read, row, col) == 0:
                change = True
                seat_map[row][col][current_write] = "#"
            else:
                seat_map[row][col][current_write] = seat_map[row][col][current_read]

    return change


def task(data_set: list[str]) -> int:
    seat_map = []
    for row in data_set:
        seat_map.append([[s, "x"] for s in row])

    n = 0
    while simulate(seat_map, n):
        n += 1

    return count_total_occupied(seat_map, n)


aoc_util.run_with_data_str(task, data_str)
aoc_util.run_with_data_set(task, year, day)
