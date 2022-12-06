import { ChangeEvent } from "https://deno.land/std@0.37.0/types/react.d.ts";
import React from "../deps/react.ts";
import { useDay } from "../hooks/use-day.ts";

declare var config: { log: boolean; result: any };

export function Day({ day: dayKey }: { day: number }) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { validate, preprocess, partOne, partTwo, main } = useDay(
    dayKey,
  );
  const [input, setInput] = React.useState("");
  const [part, setPart] = React.useState<"part1" | "part2">("part1");
  const [expectedOutput, setExpectedOutput] = React.useState<
    ReturnType<typeof main> | ""
  >(
    "",
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [testOk, setTestOk] = React.useState<boolean | undefined>(undefined);
  React.useEffect(() => {
    setInput("");
    setPart("part1");
    setExpectedOutput("");
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
    setTestOk(output == expectedOutput);
    setLoading(false);
    config.result = output;
  }
  return (
    <>
      <style>
        {`.main {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .input-group {
          display: flex;
          justify-content: space-between;
        }`}
      </style>
      <div className="main">
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gridTemplateAreas: "'input description' 'input output'",
          }}
        >
          <div
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
                style={{ height: "100%", width: "100%" }}
                placeholder="..."
                value={input}
                onChange={handleInputChange}
                onPaste={handleScrollInputTop}
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
            className="tui-window"
            style={{ height: "100%", width: "100%", gridArea: "description" }}
          >
            <fieldset
              className="tui-fieldset"
              style={{
                height: "inherit",
                width: "inherit",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <legend className="center">Description</legend>
              <p>This is the day {dayKey + 1}</p>
              <a
                className="tui-button cyan-255"
                href={`https://adventofcode.com/2022/day/${dayKey + 1}`}
              >
                Day problem doc
              </a>
            </fieldset>
          </div>
          <div
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
                  <label htmlFor="part">Select Part.....:</label>
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
            </fieldset>
          </div>
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
    </>
  );
}