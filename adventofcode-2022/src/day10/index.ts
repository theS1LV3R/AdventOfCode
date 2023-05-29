import { getLines } from "../../util/index.ts";

type SplitLine = ["noop"] | ["addx", `${number}`];

const input = getLines<"noop" | `addx ${number}`>(import.meta.url, {
  filterEmpty: true,
  isTest: false,
});

export function part1(isTest = false) {
  const checkValuesAt = [20, 60, 100, 140, 180, 220];

  const _cycle = { value: 0 };
  const signalStrengths: number[] = [];
  let xRegister = 1;

  const cycle = new Proxy(_cycle, {
    set: (obj, prop: keyof typeof _cycle, value: typeof _cycle["value"]) => {
      if (checkValuesAt.includes(value)) {
        signalStrengths.push(value * xRegister);
      }

      obj[prop] = value;

      return true;
    },
  });

  input.forEach((line) => {
    const [op, val] = line.split(" ") as SplitLine;

    if (op === "noop") {
      cycle.value++;
      return;
    } else {
      cycle.value++;
      cycle.value++;
      xRegister += parseInt(val);
    }
  });

  const summedSignalStrengths = signalStrengths.reduce(
    (prev, cur) => prev + cur,
    0
  );

  // Your puzzle answer was `839`.
  if (!isTest) console.log(`Day 10.1: ${summedSignalStrengths}`);
  return summedSignalStrengths;
}

export function part2(isTest = false) {
  let spritePos = 1;
  const _cycle = { value: 0, crtCol: 0, crtRow: 0 };
  const crt: ("." | "#")[][] = [];

  const spritePositions = () => [spritePos - 1, spritePos, spritePos + 1];

  const cycle = new Proxy(_cycle, {
    set: (obj, prop: keyof typeof _cycle, value: typeof _cycle["value"]) => {
      obj[prop] = value;
      obj.crtCol = (value - 1) % 40;
      (value - 1) % 40 === 0 ? obj.crtRow++ : null;

      if (!crt[obj.crtRow]) {
        crt[obj.crtRow] = [];
      }

      crt[obj.crtRow][obj.crtCol] = spritePositions().includes(obj.crtCol)
        ? "#"
        : ".";

      return true;
    },
  });

  for (const line of input) {
    const [op, val] = line.split(" ") as SplitLine;

    if (op === "noop") {
      cycle.value++;
      continue;
    } else {
      cycle.value++;
      cycle.value++;
      spritePos += parseInt(val);
    }
  }

  const result = crt
    .filter((line) => line.length !== 0)
    .map((line) => line.join(""))
    .join("\n")
    .replaceAll(".", " ");

  if (!isTest) console.log(`Day 10.2:\n${result}`);
  return result;
}

if (import.meta.main) {
  part1();
  part2();
}
