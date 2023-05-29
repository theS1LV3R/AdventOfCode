import { getLines } from "../../util/index.ts";

const lines = getLines<`${number}`>(import.meta.url, { filterEmpty: true });

type Tree = { visible: boolean; height: number; scenicScore: number };
type Forest = Tree[][];

let initialMap: Forest = lines.map((line) =>
  line
    // Turn line into array of chars
    .split("")
    // Create tree from char
    .map(
      (tree): Tree => ({
        visible: false,
        height: parseInt(tree, 10),
        scenicScore: 0,
      })
    )
);
initialMap = initialMap.map((line, lineNo) =>
  line.map(
    (tree, index): Tree =>
      // If the tree is on the edge
      index === 0 ||
      index === line.length - 1 ||
      // Or on the top or bottom
      lineNo === 0 ||
      lineNo === initialMap.length - 1
        ? // Set it to visible
          { ...tree, visible: true }
        : tree
  )
);

export function part1(isTest = false) {
  const map = initialMap;

  function isTallest(x: number, y: number, tree: Tree) {
    const colToLeft = map[y].filter((t, checkX) => checkX < x);
    const colToRight = map[y].filter((t, checkX) => checkX > x);
    const rowAbove = map.map((row) => row[x]).filter((t, checkY) => checkY < y);
    const rowBelow = map.map((row) => row[x]).filter((t, checkY) => checkY > y);

    const isSmaller = (checkTree: Tree) => checkTree.height < tree.height;

    return (
      colToLeft.every(isSmaller) ||
      colToRight.every(isSmaller) ||
      rowAbove.every(isSmaller) ||
      rowBelow.every(isSmaller)
    );
  }

  for (const [y, row] of map.entries()) {
    // Skip first and last row, as they are already processed
    if (y === 0 || y === map.length - 1) continue;

    for (const [x, tree] of row.entries()) {
      // Skip first and last column, as they are already processed
      if (x === 0 || x === row.length - 1) continue;

      map[y][x].visible = isTallest(x, y, tree);
    }
  }

  const trees: Tree[] = map.flat();

  const visible = trees.filter((tree) => tree.visible).length;

  if (!isTest) console.log(`Day 8.1: ${visible}`);
  return visible;
}

export function part2(isTest = false) {
  const map = initialMap;

  function getScenicScore(x: number, y: number, tree: Tree): number {
    const colToLeft = map[y].filter((t, checkX) => checkX < x).reverse();
    const colToRight = map[y].filter((t, checkX) => checkX > x);
    const rowAbove = map
      .map((row) => row[x])
      .filter((t, checkY) => checkY < y)
      .reverse();
    const rowBelow = map.map((row) => row[x]).filter((t, checkY) => checkY > y);

    let countToLeft = 0;
    for (const checkedTree of colToLeft) {
      if (checkedTree.height <= tree.height) countToLeft++;
      if (checkedTree.height === tree.height) break;
    }

    let countToRight = 0;
    for (const checkedTree of colToRight) {
      if (checkedTree.height <= tree.height) countToRight++;
      if (checkedTree.height === tree.height) break;
    }

    let countAbove = 0;
    for (const checkedTree of rowAbove) {
      if (checkedTree.height <= tree.height) countAbove++;
      if (checkedTree.height === tree.height) break;
    }

    let countBelow = 0;
    for (const checkedTree of rowBelow) {
      if (checkedTree.height <= tree.height) countBelow++;
      if (checkedTree.height === tree.height) break;
    }

    return countToLeft * countToRight * countAbove * countBelow;
  }

  for (const [y, row] of map.entries()) {
    // Skip first and last row, as they are already processed
    if (y === 0 || y === map.length - 1) continue;

    for (const [x, tree] of row.entries()) {
      // Skip first and last column, as they are already processed
      if (x === 0 || x === row.length - 1) continue;

      map[y][x].scenicScore = getScenicScore(x, y, tree);
    }
  }

  const highest = map.flat().sort((a, b) => b.scenicScore - a.scenicScore)[0].scenicScore


  if (!isTest) console.log(`Day 8.2: ${highest}`);
  return highest;
}

if (import.meta.main) {
  part1();
  part2();
}
