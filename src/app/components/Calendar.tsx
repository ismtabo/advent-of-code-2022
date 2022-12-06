import * as solutions from "../../solutions/mod.ts";
import React from "../deps/react.ts";
import { isToday } from "../utils/date.ts";

interface CalendarProps {
  day?: number;
  onDaySelected: (day: number) => void;
  style?: React.CSSProperties;
}

export function Calendar({ day, onDaySelected, style }: CalendarProps) {
  const beginOfMonth = new Date("2022/12/01");
  const dowEndOfMonth = beginOfMonth.getDay();
  return (
    <fieldset
      className="tui-fieldset blue-168 white-255-text"
      style={{
        height: "inherit",
        width: "inherit",
        ...style,
      }}
    >
      <legend className="center">Advent Calendar</legend>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "grid",
          gridTemplateRows: "fit-content repeat(5, 1fr)",
          gridTemplateColumns: "repeat(7, 1fr)",
          justifyContent: "space-between",
          alignItems: "space-between",
        }}
      >
        <div style={{ fontSize: ".75em", textAlign: "center" }}>Mon</div>
        <div style={{ fontSize: ".75em", textAlign: "center" }}>Tue</div>
        <div style={{ fontSize: ".75em", textAlign: "center" }}>Wed</div>
        <div style={{ fontSize: ".75em", textAlign: "center" }}>Thu</div>
        <div style={{ fontSize: ".75em", textAlign: "center" }}>Fri</div>
        <div style={{ fontSize: ".75em", textAlign: "center" }}>Sat</div>
        <div style={{ fontSize: ".75em", textAlign: "center" }}>Sun</div>
        {new Array(7 - dowEndOfMonth).fill(null).map((_, i) => <div></div>)}
        {new Array(31).fill(null).map((_, i) => (
          `day${i + 1}` in solutions
            ? (
              <div
                className={`cursor-pointer ${
                  day === i
                    ? "green-255 blue-168-text disable"
                    : isToday(new Date(`2022/12/${i + 1}`))
                    ? "yellow-255 blue-168-text"
                    : i === 24
                    ? "red-255"
                    : "yellow-255-text"
                }`}
                style={{ textAlign: "end" }}
                onClick={() => onDaySelected(i)}
              >
                {i + 1}
              </div>
            )
            : (
              <div
                className={`white-168-text${
                  i === 24 ? " red-168 black-255-text" : ""
                }`}
                style={{ textAlign: "end" }}
              >
                {i + 1}
              </div>
            )
        ))}
      </div>
    </fieldset>
  );
}
