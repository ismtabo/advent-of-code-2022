import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getStarterMarker } from "../partOne/mod.ts";

Deno.test("getStarterMarket tests", async (t) => {
  const cases = [
    ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 19],
    ["bvwbjplbgvbhsrlpgdmjqwftvncz", 23],
    ["nppdvjthqldpwncqszvftbrmjlhg", 23],
    ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 29],
    ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 26],
  ] as const;
  for (const [value, expected] of cases) {
    await t.step(`${value} should have sm at ${expected}`, () => {
      const result = getStarterMarker(value, 14);
      assertEquals(result, expected);
    });
  }
});
