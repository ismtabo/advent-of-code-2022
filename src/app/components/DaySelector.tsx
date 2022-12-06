import React from "../deps/react.ts";
import { useWidth } from "../hooks/use-width.ts";
import * as solutions from "../../solutions/mod.ts";
import { ColoredCaps } from "./ColoredCaps.tsx";

interface DaySelectorProps {
  selectedDay: number | undefined;
  onDayChange: (day: number) => void;
}

export function DaySelector({ selectedDay, onDayChange }: DaySelectorProps) {
  const el = React.useRef<HTMLSpanElement>(null);
  const width = useWidth(el);
  if (width != null && width > 1000) {
    return (
      <span ref={el}>
        <DaysList selectedDay={selectedDay} onDayChange={onDayChange} />;
      </span>
    );
  }
  return (
    <span
      ref={el}
    >
      <li className="tui-dropdown">
        <span style={{ textAlign: "end" }}>
          <ColoredCaps>
            Days<span style={{ fontSize: "small" }}>⏷</span>
          </ColoredCaps>
        </span>
        <div className="tui-dropdown-content">
          <DaysList selectedDay={selectedDay} onDayChange={onDayChange} />
        </div>
      </li>
    </span>
  );
}

function DaysList({ selectedDay, onDayChange }: DaySelectorProps) {
  const daysKeys = React.useRef(Object.keys(solutions));
  return (
    <ul>
      {daysKeys.current.map((day, i) => (
        <li key={day} className={selectedDay === i ? "green-255" : ""}>
          <a
            href="#"
            onClick={() =>
              onDayChange(i)}
          >
            <ColoredCaps>Day {i + 1}</ColoredCaps>
          </a>
        </li>
      ))}
    </ul>
  );
}
