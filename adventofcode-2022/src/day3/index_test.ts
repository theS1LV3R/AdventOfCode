import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { part1, part2 } from "./index.ts";

Deno.test("Part 1", function part1test() {
  assertEquals(part1(true), 7990);
});

Deno.test("Part 2", function part2test() {
  assertEquals(part2(true), 2602);
});
