import React from "../deps/react.ts";

export function Welcome() {
  return (
    <>
      <link rel="stylesheet" href="../static/css/Welcome.css" />
      <div className="main">
        <div className="tui-panel center-align black-255-text">
          <div className="tui-panel-header white-168">
            <h1>Welcome to Advent of Code 2022</h1>
          </div>
          <div className="tui-panel-content white-255-text">
            <h2>
              This page contains an interactive web application with the
              solutions of AoC of this year
            </h2>
            <p>
              To start testing the solutions just select a day in the nav bar
              and run with your input.
            </p>
            <p>
              <a
                href="https://adventofcode.com/2022"
                className="tui-button"
              >
                Learn More
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
