import { getLines } from "../../util/index.ts";

const lines = getLines(import.meta.url, {
  filterEmpty: true,
  isTest: true,
});

class Monkey {
  id!: number;
  items!: number[];
  operation!: (old: number) => number;
  test!: (item: number) => boolean;
  targetTestTrue!: number;
  targetTestFalse!: number;
  inspections = 0;
  testNumber!: number;
}

const monkeys: Monkey[] = [];

const lineGroups: string[][] = [];
lines.forEach((line, index) => {
  const group = (index - (index % 6)) / 6;
  if (!lineGroups[group]) lineGroups[group] = [];

  lineGroups[group].push(line.trim());
});

for (const group of lineGroups) {
  const monkey = new Monkey();

  monkey.id = parseInt(group[0].replace("Monkey ", "").substring(0, 1));
  monkey.items = group[1]
    .replace("Starting items: ", "")
    .split(", ")
    .map((no) => parseInt(no));

  monkey.operation = (old) => {
    const operationLine = group[2].replace("Operation: new = old ", "");
    let [operation, number] = operationLine.split(" ") as [
      "+" | "*",
      `${number}` | "old" | number
    ];

    if (number === "old") number = old;
    else number = parseInt(number as string, 10);

    if (operation === "*") return old * number;
    else return old + number;
  };

  monkey.testNumber = parseInt(group[3].replace("Test: divisible by ", ""), 10);
  monkey.test = (item) => item % monkey.testNumber === 0;

  monkey.targetTestTrue = parseInt(
    group[4].replace("If true: throw to monkey ", ""),
    10
  );
  monkey.targetTestFalse = parseInt(
    group[5].replace("If false: throw to monkey ", ""),
    10
  );

  monkeys.push(monkey);
}

export function part1(isTest = false) {
  for (let round = 1; round <= 20; round++) {
    for (const monkey of monkeys) {
      while (monkey.items.length > 0) {
        let item = monkey.items.shift()!;
        monkey.inspections++;

        item = monkey.operation(item);
        item = Math.floor(item / 3);
        if (monkey.test(item)) monkeys[monkey.targetTestTrue].items.push(item);
        else monkeys[monkey.targetTestFalse].items.push(item);
      }
    }
  }

  let monkeyBusinessLevel: Monkey[] | number = monkeys
    .slice()
    .sort((a, b) => b.inspections - a.inspections)
    .slice(0, 2);

  monkeyBusinessLevel =
    monkeyBusinessLevel[0].inspections * monkeyBusinessLevel[1].inspections;

  if (!isTest) console.log(`Day 11.1: ${monkeyBusinessLevel}`);
  return monkeyBusinessLevel;
}

export function part2(isTest = false) {
  const modulus = monkeys.map((m) => m.testNumber).reduce((a, b) => a * b, 1);

  for (let round = 1; round <= 10000; round++) {
    for (const monkey of monkeys) {
      while (monkey.items.length > 0) {
        let item = monkey.items.shift()!;
        monkey.inspections++;

        item = monkey.operation(item);
        item = item % modulus;
        if (monkey.test(item)) monkeys[monkey.targetTestTrue].items.push(item);
        else monkeys[monkey.targetTestFalse].items.push(item);
      }
    }
    console.log("e");
  }

  let monkeyBusinessLevel: Monkey[] | number = monkeys
    .slice()
    .sort((a, b) => b.inspections - a.inspections)
    .slice(0, 2);

  monkeyBusinessLevel =
    monkeyBusinessLevel[0].inspections * monkeyBusinessLevel[1].inspections;

  if (!isTest) console.log(`Day 11.2: ${monkeyBusinessLevel}`);
  return monkeyBusinessLevel;
}

if (import.meta.main) {
  part1();
  part2();
}
