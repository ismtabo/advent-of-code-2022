import React from "../deps/react.ts";

interface ChristmasTreeProps {
  height: number;
}

export function ChristmasTree(
  { height }: ChristmasTreeProps,
) {
  const tree: string[][] = [];
  for (let i = 0; i < height; i++) {
    let line = Array.from(" ".repeat(height - (i + 1)));
    line = line.concat(Array.from("*".repeat(i * 2 + 1)));
    line = line.concat(Array.from(" ".repeat(height - (i + 1))));
    tree.push(line);
  }
  const line = Array.from(" ".repeat(height * 2 - 1));
  line.splice(height - 1, 1, "#");
  tree.push(line);
  tree.push(line);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${height * 2 - 1}, 1fr)`,
        gridTemplateRows: `repeat(${height + 2}, 1fr)`,
      }}
    >
      {tree.flatMap((line) => Array.from(line)).map((item, i) => (
        <div
          className={item === "*"
            ? i < height * 2 - 1
              ? `yellow-255-text`
              : Math.random() < 0.2
              ? `red-255-text`
              : `green-168-text`
            : item === "#"
            ? `orange-168-text`
            : ""}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
