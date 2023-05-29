import {
  resolve,
  dirname,
  fromFileUrl,
} from "https://deno.land/std@0.167.0/path/mod.ts";

export const getLines = <T extends string>(
  dir: ImportMeta["url"],
  options: { filterEmpty?: boolean; isTest?: boolean } = {
    filterEmpty: false,
    isTest: false,
  }
) => {
  const decoder = new TextDecoder();

  const fileName = options.isTest ? "test-input.txt" : "input.txt";

  const lines = decoder
    .decode(Deno.readFileSync(resolve(dirname(fromFileUrl(dir)), fileName)))
    .split("\n") as T[];

  return options.filterEmpty ? lines.filter((line) => line !== "") : lines;
};
