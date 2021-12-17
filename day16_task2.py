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
            return False

    return True


def find_possible_field(tickets, ranges, col):
    acc = set()

    for i, r in enumerate(ranges):
        valid = True
        for ticket in tickets:
            value = ticket[col]
            if value < r[0][0] or value > r[1][1] or (value > r[0][1] and value < r[1][0]):
                valid = False
                break
        
        if valid:
            acc.add(i)

    return acc    


def eliminate_fields(possible_fields: list[set]):
    all_unique = False

    while not all_unique:
        all_unique = True
        for i, f in enumerate(possible_fields):
            if len(f) == 1:
                for j in range(len(possible_fields)):
                    if i == j:
                        continue
                    else:
                        possible_fields[j] = possible_fields[j].difference(f)
            else:
                all_unique = False


def task(data_set: list[str]) -> int:
    ranges = []
    ranges_alternate = []
    field_names = []

    i = 0
    while data_set[i] != "":        
        [field, numbers] = data_set[i].split(": ")
        [range_a, range_b] = numbers.split(" or ")
        range_a = tuple([int(x) for x in range_a.split("-")])
        range_b = tuple([int(x) for x in range_b.split("-")])

        ranges.append(range_a)
        ranges.append(range_b)

        ranges_alternate.append((range_a, range_b))
        field_names.append(field)

        i += 1

    while not data_set[i].startswith("your ticket:"):
        i += 1
    
    my_ticket = [int(x) for x in data_set[i + 1].split(",")]

    while not data_set[i].startswith("nearby tickets:"):
        i += 1

    valid_tickets = []
    for i in range(i + 1, len(data_set)):
        numbers = [int(x) for x in data_set[i].split(",")]

        if is_valid(numbers, ranges):
            valid_tickets.append(numbers)

    possible_fields = []
    for i in range(len(valid_tickets[0])):
        possible_fields.append(find_possible_field(valid_tickets, ranges_alternate, i))

    eliminate_fields(possible_fields)

    mult = 1
    for i, f in enumerate(possible_fields):
        field = f.pop()
        if field_names[field].startswith("departure"):
            mult *= my_ticket[i]

    return mult


#aoc_util.run_with_data_str(task, data_str)
aoc_util.run_with_data_set(task, year, day)
