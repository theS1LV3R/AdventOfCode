import { getLines } from '../base';

type Instruction = 'forward' | 'down' | 'up';

const lines = getLines<`${Instruction} ${number}`>(import.meta.url, true);

let depth = 0;
let horiz = 0;

lines.forEach((line) => {
  const splitLine = line.split(' ');

  const instr = <Instruction>splitLine[0];
  const amount = parseInt(splitLine[1]);

  switch (instr) {
    case 'down':
      depth += amount;
      break;
    case 'up':
      depth -= amount;
      break;
    case 'forward':
      horiz += amount;
      break;
  }
});

console.log(depth * horiz);

let aim = 0;
depth = 0;
horiz = 0;

lines.forEach((line) => {
  const splitLine = line.split(' ');

  const instr = <Instruction>splitLine[0];
  const amount = parseInt(splitLine[1]);

  switch (instr) {
    case 'down':
      aim += amount;
      break;
    case 'up':
      aim -= amount;
      break;
    case 'forward':
      horiz += amount;
      depth += aim * amount;
      break;
  }
});

console.log(depth * horiz);
