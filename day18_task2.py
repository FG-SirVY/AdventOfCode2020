###############################################################################
# Day x, Task y                                                               #
###############################################################################

import aoc_util


year = 2020
day = 18
data_str = """1 + (2 * 3) + (4 * (5 + 6))"""
data_str_2 = """2 * 3 + (4 * 5)"""
data_str_3 = """5 + (8 * 3 + 9 + 3 * 4 * 3)"""
data_str_4 = """5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"""
data_str_5 = """((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"""


class Tokenizer:
    def __init__(self, str):
        self.str = str
        self.index = -1


    def consume(self):
        self.index += 1
        if self.index >= len(self.str):
            return ""
        elif self.str[self.index] == " ":
            return self.consume()
        else:
            return self.str[self.index]


    def peek(self):
        index = self.index + 1
        while 1:
            if index >= len(self.str):
                return ""
            elif self.str[index] == " ":
                index += 1
            else:
                return self.str[index]

    def has_tokens(self):
        return self.index < len(self.str) - 1


def value(tokenizer: Tokenizer):
    next_token = tokenizer.consume()

    if next_token == "(":
        val = expr(tokenizer)
        tokenizer.consume()
        return val
    elif next_token.isdigit():
        return int(next_token)


def add(tokenizer: Tokenizer, left_hand):
    tokenizer.consume()
    left_hand[0] += value(tokenizer)


def multiply(tokenizer: Tokenizer, left_hand):
    next_token = tokenizer.peek()

    if next_token == "*":
        tokenizer.consume()
        left_hand[0] *= expr(tokenizer)
    elif next_token == "+":
        add(tokenizer, left_hand)


def expr(tokenizer: Tokenizer):
    left_hand = [0]
    left_hand[0] = value(tokenizer)

    while 1:
        multiply(tokenizer, left_hand)

        next_token = tokenizer.peek()
        if next_token == ")" or next_token == "":
            return left_hand[0]


def eval(r):
    tokenizer = Tokenizer(r)

    return expr(tokenizer)


def task(data_set: list[str]) -> int:
    acc = 0

    for r in data_set:
        acc += eval(r)

    return acc


aoc_util.run_with_data_str(task, data_str)
aoc_util.run_with_data_str(task, data_str_2)
aoc_util.run_with_data_str(task, data_str_3)
aoc_util.run_with_data_str(task, data_str_4)
aoc_util.run_with_data_str(task, data_str_5)
aoc_util.run_with_data_set(task, year, day)
