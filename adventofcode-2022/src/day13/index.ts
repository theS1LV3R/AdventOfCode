import { getLines } from "../../util/index.ts";

const lines = getLines(import.meta.url, { isTest: true, filterEmpty: true });

type Thing = (number | Thing[])[];

let pairs: [Thing, Thing][] = [];
let pairsRightOrder: boolean[] = [];

lines.forEach((line, index) => {
  const groupno = (index - (index % 2)) / 2;

  // @ts-expect-error because shit
  if (!pairs[groupno]?.length) pairs[groupno] = [];

  pairs[groupno].push(JSON.parse(line));
});

export function part1(isTest = false) {
  function checkPair(a: Thing | number, b: Thing | number): boolean {
    if (typeof a === "number")
  }

  pairs.forEach((pair, index) => {
    pairsRightOrder[index] = checkPair(pair[0], pair[1]);
  });
}
