import sys
import re
from dataclasses import dataclass
from typing import Union, List
from collections import defaultdict
from functools import reduce
from tqdm import tqdm


@dataclass
class Operation:
    op: str
    left: Union[str, int]
    right: Union[str, int]


@dataclass
class Test:
    module: int
    true: str
    false: str


@dataclass
class Monkey:
    id: str
    items: List[int]
    operation: Operation
    test: Test


monkeys = {}

input_ = sys.stdin.read()
for monkey in input_.split('\n\n'):
    if match := re.search(r'Monkey (?P<id>\d+):', monkey):
        id = match.group('id')
    else:
        id = None
    if match := re.search(r'Starting items: (?P<items>(?:\d+)(?:, \d+)*)', monkey):
        items = [int(item)
                 for item in match.group('items').split(', ')]
    else:
        items = []
    if match := re.search(r'new = (?P<left>old|\d+) (?P<op>[+*]) (?P<right>old|\d+)', monkey):
        op = match.group('op')
        left = int(
            match.group('left')) if match.group('left').isdigit() else match.group('left')
        right = int(
            match.group('right')) if match.group('right').isdigit() else match.group('right')
        operation = Operation(op, left, right)
    else:
        operation = None
    if match := re.search(r'divisible by (?P<number>\d+)', monkey):
        module = int(match.group('number'))
    else:
        module = None
    if match := re.search(r'If true: throw to monkey (?P<id>\d+)', monkey):
        true = match.group('id')
    else:
        true = None
    if match := re.search(r'If false: throw to monkey (?P<id>\d+)', monkey):
        false = match.group('id')
    else:
        false = None
    test = Test(module, true, false)
    monkey = Monkey(id, items, operation, test)
    monkeys[monkey.id] = monkey


def evaluate_operation(operation: Operation, item: int) -> int:
    left = item if operation.left == 'old' else operation.left
    right = item if operation.right == 'old' else operation.right
    if operation.op == '+':
        return left + right
    return left * right


def evaluate_test(test: Test, worry_level: int) -> str:
    if worry_level % test.module == 0:
        return test.true
    return test.false


inspections = defaultdict(lambda: 0)
for round in tqdm(range(10_000)):
    for [monkey_id, monkey] in monkeys.items():
        items_to_push = defaultdict(lambda: list())
        for item in monkey.items:
            inspections[monkey_id] += 1
            worry_level = evaluate_operation(monkey.operation, item)
            target_monkey = evaluate_test(monkey.test, worry_level)
            items_to_push[target_monkey].append(worry_level)
        monkey.items = []
        for k, v in items_to_push.items():
            monkeys[k].items.extend(v)

print(list(inspections.values()), file=sys.stderr)
print(reduce(lambda a, b: a * b,
      sorted(inspections.values(), reverse=True)[0:2]))
