import { ChangeEvent } from "https://deno.land/std@0.37.0/types/react.d.ts";
import React from "../deps/react.ts";
import { useDay } from "../hooks/use-day.ts";
import { Calendar } from "./Calendar.tsx";
import { ColoredCaps } from "./ColoredCaps.tsx";

declare var config: { log: boolean; result: any };

interface DayProps {
  day: number;
  onDaySelected: (day: number) => void;
}

export function Day({ day: dayKey, onDaySelected }: DayProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { validate, preprocess, partOne, partTwo, main } = useDay(
    dayKey,
  );
  const [input, setInput] = React.useState("");
  const [part, setPart] = React.useState<"part1" | "part2">("part1");
  const [expectedOutput, setExpectedOutput] = React.useState<
    string | undefined
  >(
    undefined,
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [testOk, setTestOk] = React.useState<boolean | undefined>(undefined);
  React.useEffect(() => {
    setInput("");
    setPart("part1");
    setExpectedOutput(undefined);
    setTestOk(undefined);
  }, [dayKey]);
  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setInput(event.target.value);
  }
  function handleScrollInputTop() {
    if (inputRef.current != null) {
      inputRef.current.scroll({ top: 0, left: 0 });
      inputRef.current.setSelectionRange(0, 0);
    }
  }
  function handleInputClear() {
    setInput("");
  }
  function handlePartChange(event: ChangeEvent<HTMLSelectElement>) {
    setPart(event.target.value as any);
  }
  function handleOutputChange(event: ChangeEvent<HTMLInputElement>) {
    setExpectedOutput(event.target.value);
  }
  function handleRun() {
    if (input == null || input === "") {
      return;
    }
    if (!validate(input)) {
      dialogRef.current?.showModal();
      return;
    }
    setLoading(true);
    const parsedInput = preprocess(input);
    const output = part === "part1"
      ? partOne(parsedInput as any)
      : partTwo(parsedInput as any);
    if (config.log) {
      console.log(output);
    }
    if (expectedOutput != null) {
      setTestOk(output == expectedOutput);
    } else {
      setTestOk(undefined);
    }
    setLoading(false);
    config.result = output;
  }
  return (
    <>
      <style>
        {`
        .main {
          height: 100%;
          width: 100%;
        }

        .problem-container {
          height: 100%;
          width: 100%;
          display: grid;
          grid-template-rows: min-content 1.25fr 1fr;
          grid-template-areas: 'info' 'input' 'output';
          overflow: auto;
        }
        [data-calendar] {
          display: none;
        }

        @media (min-width: 1000px) {
          .problem-container {
            grid-template-rows: unset;
            grid-template-columns: 1.5fr 1fr;
            grid-template-areas: 'input calendar' 'input output';
          }
          [data-info] {
            display: none;
          }
          [data-calendar] {
            display: inherit;
          }
        }

        .problem-container .tui-window {
          box-shadow: unset;
        }

        .input-group {
          display: flex;
          justify-content: space-between;
        }
        
        @media (max-width: 420px) {
          .input-group {
            flex-direction: column;
          }
        }
        `}
      </style>
      <div className="main">
        <div className="problem-container">
          <div
            data-info
            className="center blue-168 white-255-text"
            style={{ gridArea: "info", padding: "0.25em" }}
          >
            <ColoredCaps>
              Day {dayKey + 1}
            </ColoredCaps>
          </div>
          <div
            data-input
            className="tui-window"
            style={{ height: "100%", width: "100%", gridArea: "input" }}
          >
            <fieldset
              className="tui-fieldset"
              style={{ height: "inherit", width: "inherit" }}
            >
              <legend className="center">Input</legend>
              <textarea
                ref={inputRef}
                className="tui-textarea"
                rows={4}
                style={{ height: "100%", width: "100%", resize: "none" }}
                placeholder="..."
                value={input}
                onChange={handleInputChange}
                onPaste={handleScrollInputTop}
                spellCheck={false}
              >
              </textarea>
              <div
                style={{
                  position: "absolute",
                  bottom: "10%",
                  right: "10%",
                  display: "flex",
                  gap: "1em",
                }}
              >
                <button
                  className="tui-button orange-168"
                  onClick={handleScrollInputTop}
                >
                  Top ^
                </button>
                <button
                  className="tui-button red-168"
                  onClick={handleInputClear}
                >
                  Clear
                </button>
              </div>
            </fieldset>
          </div>
          <div
            data-calendar
            className="tui-window"
            style={{ height: "100%", width: "100%", gridArea: "calendar" }}
          >
            <Calendar day={dayKey} onDaySelected={onDaySelected} />
          </div>
          <div
            data-output
            className="tui-window"
            style={{
              height: "100%",
              width: "100%",
              gridArea: "output",
            }}
          >
            <fieldset
              className="tui-fieldset"
              style={{
                height: "inherit",
                width: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: "1em",
              }}
            >
              <legend className="center">Output</legend>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1em",
                }}
              >
                <div className="input-group">
                  <label htmlFor="part">Select Part..............:</label>
                  <select
                    name="part"
                    className="tui-input"
                    value={part}
                    onChange={handlePartChange}
                  >
                    <option value="part1">Part 1</option>
                    <option value="part2">Part 2</option>
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="output">Expected output value....:</label>
                  <input
                    name="output"
                    className="tui-input"
                    type="text"
                    value={expectedOutput}
                    onChange={handleOutputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Test result..............:</label>
                  <span
                    className={`tui-input${
                      testOk === true
                        ? " green-168"
                        : testOk === false
                        ? " red-255"
                        : ""
                    }`}
                    style={{ width: 200 }}
                  >
                    {testOk === true
                      ? <>Ok</>
                      : testOk === false
                      ? <>Fail</>
                      : <>...</>}
                  </span>
                </div>
                {config.log
                  ? (
                    <div className="input-group">
                      <label>Test result....:</label>
                      <span
                        className={`tui-input${
                          testOk === true
                            ? " green-168"
                            : testOk === false
                            ? " red-255"
                            : ""
                        }`}
                        style={{ width: 200 }}
                      >
                        {testOk === true
                          ? <>Ok</>
                          : testOk === false
                          ? <>Fail</>
                          : <>...</>}
                      </span>
                    </div>
                  )
                  : null}
              </div>
              <div className="tui-divider" />
              <button
                className="tui-button"
                type="button"
                onClick={handleRun}
                disabled={loading}
              >
                {loading ? <>...</> : <>Test output for solution</>}
              </button>
              <a
                className="tui-button cyan-255"
                target="_blank"
                href={`https://adventofcode.com/2022/day/${dayKey + 1}`}
              >
                Advent of Code day page
              </a>
            </fieldset>
          </div>
        </div>
        <dialog ref={dialogRef} className="tui-window red-168">
          <fieldset className="tui-fieldset">
            <legend className="red-255 yellow-255-text">Alert</legend>
            <h3>Invalid input.</h3>
            <p>
              For more information read{" "}
              <a
                href={`https://adventofcode.com/2022/day/${dayKey + 1}`}
                className="blue-255-text cyan-168-text-hover"
              >
                day {dayKey + 1} page
              </a>.
            </p>
            <button
              className="tui-button tui-modal-close-button right"
              data-modal="modal"
              onClick={() => dialogRef.current?.close()}
            >
              close
            </button>
          </fieldset>
        </dialog>
      </div>
    </>
  );
}
