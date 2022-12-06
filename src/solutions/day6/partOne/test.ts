import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getStarterMarker } from "./mod.ts";

Deno.test("getStarterMarket tests", async (t) => {
  const cases = [
    ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 7],
    ["bvwbjplbgvbhsrlpgdmjqwftvncz", 5],
    ["nppdvjthqldpwncqszvftbrmjlhg", 6],
    ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10],
    ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 11],
  ] as const;
  for (const [value, expected] of cases) {
    await t.step(`${value} should have sm at ${expected}`, () => {
      const result = getStarterMarker(value);
      assertEquals(result, expected);
    });
  }
});
