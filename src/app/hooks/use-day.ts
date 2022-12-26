import * as solutions from "../../solutions/mod.ts";
import React from "../deps/react.ts";

interface DaySolution<Input = unknown, Output = any> {
  partTwoAvailable: boolean;
  validate: (_: string) => boolean;
  preprocess: (_: string) => Input;
  partOne: (_: Input) => Output;
  partTwo: (_: Input) => Output;
}

export function useDay(dayKey: number) {
  return React.useMemo(() => {
    return Object.fromEntries(
      Object.entries(solutions),
    )[`day${dayKey + 1}`] as DaySolution;
  }, [dayKey]);
}
