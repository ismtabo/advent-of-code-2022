import * as solutions from "../../solutions/mod.ts";
import React from "../deps/react.ts";

export function useDay(dayKey: number) {
  return React.useMemo(() => {
    return Object.values(solutions)[dayKey];
  }, [dayKey]);
}
