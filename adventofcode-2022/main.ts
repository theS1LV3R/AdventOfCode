const days = [...Deno.readDirSync("./src")].sort((a, b) =>
  a.name.localeCompare(b.name)
);

for (const { name } of days) {
  console.log(`===== Running ${name} =====`);
  const { part1, part2 } = await import(`./src/${name}/index.ts`);

  part1();
  part2();

  console.log("");
}
