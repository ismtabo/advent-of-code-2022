import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import {
  compareBothArrays,
  compareBothNumbers,
  comparePackets,
} from "./mod.ts";

Deno.test("test compare", async (t) => {
  await t.step("pair 1", () => {
    assertEquals(comparePackets([1, 1, 3, 1, 1], [1, 1, 5, 1, 1]), -1);
  });
  await t.step("pair 2", () => {
    assertEquals(comparePackets([[1], [2, 3, 4]], [[1], 4]), -1);
  });
  await t.step("pair 3", () => {
    assertEquals(comparePackets([9], [[8, 7, 6]]), 1);
  });
  await t.step("pair 4", () => {
    assertEquals(comparePackets([[4, 4], 4, 4], [[4, 4], 4, 4, 4]), -1);
  });
  await t.step("pair 5", () => {
    assertEquals(comparePackets([7, 7, 7, 7], [7, 7, 7]), 1);
  });
  await t.step("pair 6", () => {
    assertEquals(comparePackets([], [3]), -1);
  });
  await t.step("pair 7", () => {
    assertEquals(comparePackets([[[]]], [[]]), 1);
  });
  await t.step("pair 8", () => {
    assertEquals(
      comparePackets([1, [2, [3, [4, [5, 6, 7]]]], 8, 9], [
        1,
        [2, [3, [4, [5, 6, 0]]]],
        8,
        9,
      ]),
      1,
    );
  });
});

Deno.test("compare both numbers", async (t) => {
  await t.step("first lower", () => {
    assertEquals(compareBothNumbers(0, 1), -1);
  });
  await t.step("both equals", () => {
    assertEquals(compareBothNumbers(1, 1), 0);
  });
  await t.step("second lower", () => {
    assertEquals(compareBothNumbers(1, 0), 1);
  });
});

Deno.test("extra tests", () => {
  assertEquals(comparePackets([[1, 8, 8], [9]], [4]), -1);
  assertEquals(comparePackets([4, 3, 4], [[], [6]]), 1);
  assertEquals(comparePackets([[0, 0], 2], [[0, 0], 1]), 1);
});
