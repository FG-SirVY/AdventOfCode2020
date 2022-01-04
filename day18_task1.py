###############################################################################
# Day x, Task y                                                               #
###############################################################################

import aoc_util


year = 2020
day = 18
data_str = """5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"""


class Tokenizer:
    def __init__(self, str):
        self.str = str
        self.index = -1

    def get_next(self):
        self.index += 1
        if self.index >= len(self.str):
            return ""
        elif self.str[self.index] == " ":
            return self.get_next()
        else:
            return self.str[self.index]


def eval(tokenizer):
    result = 0
    prev_op = "+"

    while 1:
        next_token = tokenizer.get_next()

        if next_token == ")" or next_token == "":
            return result

        if next_token == "(":
            if prev_op == "*":
                result *= eval(tokenizer)
            else:
                result += eval(tokenizer)
        elif next_token.isdigit():
            if prev_op == "*":
                result *= int(next_token)
            else:
                result += int(next_token)
        else:
            prev_op = next_token



def task(data_set: list[str]) -> int:
    acc = 0

    for r in data_set:
        acc += eval(Tokenizer(r))

    return acc


aoc_util.run_with_data_str(task, data_str)
aoc_util.run_with_data_set(task, year, day)
