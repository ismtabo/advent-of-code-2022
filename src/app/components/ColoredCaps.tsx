import React from "../deps/react.ts";

export function ColoredCaps(
  { children }: { children: React.ReactNode },
) {
  const elements = Array.isArray(children) ? children : [children];
  return (
    <>
      {elements.flat().map((element) =>
        typeof element === "string"
          ? Array.from(element).map((char, i) => {
            if (/[A-Z]/.test(char)) {
              return <span className="red-255-text">{char}</span>;
            }
            return <>{char}</>;
          })
          : element
      )}
    </>
  );
}
