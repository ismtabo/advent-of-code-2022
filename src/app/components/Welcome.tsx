import React from "../deps/react.ts";
import { Calendar } from "./Calendar.tsx";
import { ChristmasTree } from "./ChristmasTree.tsx";

interface WelcomeProps {
  onDaySelected: (day: number) => void;
}

export function Welcome({ onDaySelected }: WelcomeProps) {
  return (
    <>
      <style>
        {`.main {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 2em;
        }
        [data-christmas-tree] {
          display: none;
        }
        @media (min-width: 950px) {
          [data-christmas-tree] {
            display: inherit;
          }
        }
        `}
      </style>
      <div className="main">
        <div
          data-message
          className="tui-panel black-255-text"
        >
          <div className="tui-panel-header white-168">
            <p>
              <span className="yellow-255-text">*</span>{" "}
              Welcome to Advent of Code 2022{" "}
              <span className="yellow-255-text">*</span>
            </p>
          </div>
          <div className="tui-panel-content white-255-text">
            <p>
              This page contains an interactive web application with the
              solutions of AoC of this year
            </p>
            <p>
              To start testing the solutions just select a day in the nav bar
              and run with your input.
            </p>
            <p className="center" style={{ marginTop: "1em" }}>
              <a
                href="https://adventofcode.com/2022"
                target="_blank"
                className="tui-button white-255-text"
              >
                Learn More 🕭
              </a>
            </p>
          </div>
        </div>
        <div
          data-footer
          style={{ display: "flex", gap: "2em", height: "fit-content" }}
        >
          <span data-christmas-tree>
            <ChristmasTree data-christmas-tree height={12} />
          </span>
          <Calendar
            style={{ height: "15em", width: "15em" }}
            onDaySelected={onDaySelected}
          />
        </div>
      </div>
    </>
  );
}
