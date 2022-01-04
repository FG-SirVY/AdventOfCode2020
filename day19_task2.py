###############################################################################
# Day x, Task y                                                               #
###############################################################################

import aoc_util


year = 2020
day = 19
data_str = """0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb"""

data_str_2 = """42: 9 14 | 10 1
9: 14 27 | 1 26
10: 23 14 | 28 1
1: "a"
11: 42 31
5: 1 14 | 15 1
19: 14 1 | 14 14
12: 24 14 | 19 1
16: 15 1 | 14 14
31: 14 17 | 1 13
6: 14 14 | 1 14
2: 1 24 | 14 4
0: 8 11
13: 14 3 | 1 12
15: 1 | 14
17: 14 2 | 1 7
23: 25 1 | 22 14
28: 16 1
4: 1 1
20: 14 14 | 1 15
3: 5 14 | 16 1
27: 1 6 | 14 18
14: "b"
21: 14 1 | 1 14
25: 1 1 | 1 14
22: 14 14
8: 42
26: 14 22 | 1 20
18: 15 15
7: 14 5 | 1 21
24: 14 1

abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa
bbabbbbaabaabba
babbbbaabbbbbabbbbbbaabaaabaaa
aaabbbbbbaaaabaababaabababbabaaabbababababaaa
bbbbbbbaaaabbbbaaabbabaaa
bbbababbbbaaaaaaaabbababaaababaabab
ababaaaaaabaaab
ababaaaaabbbaba
baabbaaaabbaaaababbaababb
abbbbabbbbaaaababbbbbbaaaababb
aaaaabbaabaaaaababaa
aaaabbaaaabbaaa
aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
babaaabbbaaabaababbaabababaaab
aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba"""


def match(string, index, rule_no, rules):
    if index >= len(string):
        return -1

    subrules = rules[rule_no]
    mod_index = index

    if subrules[0] == 0:
        return mod_index + 1 if string[mod_index] == subrules[1] else -1
    else:
        go_over_other_rule = False

        for r in subrules[1]:
            mod_index = match(string, mod_index, r, rules)
            if mod_index == -1:
                if subrules[0] == 1:
                    return -1
                else:
                    go_over_other_rule = True
                    break
                    
        if go_over_other_rule:
            mod_index = index
            for r in subrules[2]:
                mod_index = match(string, mod_index, r, rules)
                if mod_index == -1:
                    return -1
        
        return mod_index


def task(data_set: list[str]) -> int:
    i = 0
    rules = {}

    while data_set[i] != "":
        [rule_no, rule] = data_set[i].split(": ")
        rule_no = int(rule_no)

        if rule_no == 8:
            rule = "42 | 42 8"
        if rule_no == 11:
            rule = "42 31 | 42 11 31"

        if rule[0] == "\"":
            rules[rule_no] = (0, rule[1])
        else:
            subrules = rule.split(" | ")
            if len(subrules) == 1:
                rules[rule_no] = (1, tuple([int(x) for x in subrules[0].split(" ")]))
            else:
                first_set = tuple([int(x) for x in subrules[0].split(" ")])
                second_set = tuple([int(x) for x in subrules[1].split(" ")])

                rules[rule_no] = (2, first_set, second_set)

        i += 1

    count_valid = 0
    for x in data_set[i + 1:]:
        if match(x, 0, 0, rules) >= len(x):
            count_valid += 1
            print(x)

    return count_valid


aoc_util.run_with_data_str(task, data_str)
aoc_util.run_with_data_str(task, data_str_2)
aoc_util.run_with_data_set(task, year, day)
