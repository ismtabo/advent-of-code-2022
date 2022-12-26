import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { parseSnafu, toSnafu } from "./mod.ts";

const baseCases: [number, string][] = [
  [1, "1"],
  [2, "2"],
  [3, "1="],
  [4, "1-"],
  [5, "10"],
  [6, "11"],
  [7, "12"],
  [8, "2="],
  [9, "2-"],
  [10, "20"],
  [15, "1=0"],
  [20, "1-0"],
  [2022, "1=11-2"],
  [12345, "1-0---0"],
  [314159265, "1121-1110-1=0"],
];

const extraCases: [string, number][] = [
  ["1=-0-2", 1747],
  ["12111", 906],
  ["2=0=", 198],
  ["21", 11],
  ["2=01", 201],
  ["111", 31],
  ["20012", 1257],
  ["112", 32],
  ["1=-1=", 353],
  ["1-12", 107],
  ["12", 7],
  ["1=", 3],
  ["122", 37],
];

Deno.test("test parseSnafu", async (t) => {
  for (const [expected, value] of baseCases) {
    await t.step(`${value} => ${expected}`, () => {
      assertEquals(parseSnafu(value), expected);
    });
  }
  for (const [value, expected] of extraCases) {
    await t.step(`${value} => ${expected}`, () => {
      assertEquals(parseSnafu(value), expected);
    });
  }
});

Deno.test("test toSnafu", async (t) => {
  for (const [value, expected] of baseCases) {
    await t.step(`${value} => ${expected}`, () => {
      assertEquals(toSnafu(value), expected);
    });
  }
  for (const [expected, value] of extraCases) {
    await t.step(`${value} => ${expected}`, () => {
      assertEquals(toSnafu(value), expected);
    });
  }
});
