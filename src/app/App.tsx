import * as solutions from "../solutions/mod.ts";
import React from "./deps/react.ts";
import { Welcome } from "./components/Welcome.tsx";
import { Day } from "./components/Day.tsx";

function App() {
  const daysKeys = React.useRef(Object.keys(solutions));
  const [selectedDay, setSelectedDay] = React.useState<number | undefined>();
  return (
    <>
      <link rel="stylesheet" href="./static/css/App.css" />
      <main className="App">
        <nav className="tui-nav">
          <ul>
            <li className="">
              <a href="#" onClick={() => setSelectedDay(undefined)}>
                Advent of Code 2022 <i className="glyphicon glyphicon-star"></i>
              </a>
            </li>
            {daysKeys.current.map((day, i) => (
              <li key={day} className={selectedDay === i ? "green-255" : ""}>
                <a
                  href="#"
                  onClick={() =>
                    setSelectedDay(i)}
                >
                  Day {i + 1}
                </a>
              </li>
            ))}
          </ul>
          <span className="tui-datetime" data-format="h:m:s a"></span>
        </nav>
        <article>
          {selectedDay == null ? <Welcome /> : <Day day={selectedDay} />}
        </article>
        <footer className="tui-nav">
          <span className="copy-left">©</span> Ismael Taboada, 2022
        </footer>
      </main>
    </>
  );
}

export default App;
