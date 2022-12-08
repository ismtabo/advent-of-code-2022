import { ChangeEvent } from "https://deno.land/std@0.37.0/types/react.d.ts";
import React from "../deps/react.ts";
import { useDay } from "../hooks/use-day.ts";
import { Calendar } from "./Calendar.tsx";
import { ColoredCaps } from "./ColoredCaps.tsx";

declare const config: { log: boolean; result: number | string | bigint };

interface DayProps {
  day: number;
  onDaySelected: (day: number) => void;
}

export function Day({ day: dayKey, onDaySelected }: DayProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const [dialogContent, setDialogContent] = React.useState(
    <InvalidInputDialogContent day={dayKey} />,
  );
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
  const [runtime, setRuntime] = React.useState<number | undefined>(undefined);
  React.useEffect(() => {
    setInput("");
    setPart("part1");
    setExpectedOutput(undefined);
    setTestOk(undefined);
    setRuntime(undefined);
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
    // deno-lint-ignore no-explicit-any
    setPart(event.target.value as any);
    setTestOk(undefined);
    setRuntime(undefined);
  }
  function handleOutputChange(event: ChangeEvent<HTMLInputElement>) {
    setExpectedOutput(event.target.value);
  }
  function handleRun() {
    if (input == null || input === "" || !validate(input)) {
      setDialogContent(<InvalidInputDialogContent day={dayKey} />);
      dialogRef.current?.showModal();
      return;
    }
    if (
      expectedOutput == null ||
      expectedOutput === ""
    ) {
      setDialogContent(<MissingOutputDialogContent />);
      dialogRef.current?.showModal();
      return;
    }
    setLoading(true);
    const parsedInput = preprocess(input);
    const start = performance.now();
    const output = part === "part1"
      // deno-lint-ignore no-explicit-any
      ? partOne(parsedInput as any)
      // deno-lint-ignore no-explicit-any
      : partTwo(parsedInput as any);
    const runtime = performance.now() - start;
    setTestOk(output == expectedOutput);
    setRuntime(runtime);
    setLoading(false);
    if (config.log === true) {
      console.log(output);
      config.result = output;
    }
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
                <div className="input-group">
                  <label>Runtime (ms).............:</label>
                  <span
                    className={`tui-input`}
                    style={{ width: 200 }}
                  >
                    {runtime != null ? <>{runtime.toFixed(4)}</> : <>...</>}
                  </span>
                </div>
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
            <legend className="yellow-255-text">Alert</legend>
            {dialogContent}
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

function InvalidInputDialogContent({ day }: { day: number }) {
  return (
    <>
      <h3>Invalid input.</h3>
      <p>
        For more information read{" "}
        <a
          href={`https://adventofcode.com/2022/day/${day + 1}`}
          className="blue-255-text cyan-168-text-hover"
        >
          day {day + 1} page
        </a>.
      </p>
    </>
  );
}

function MissingOutputDialogContent() {
  return (
    <>
      <h3>Missing expected output.</h3>
      <p>
        Introduce an expected output.
      </p>
    </>
  );
}
