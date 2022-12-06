import React from "./deps/react.ts";
import { Welcome } from "./components/Welcome.tsx";
import { Day } from "./components/Day.tsx";
import { DaySelector } from "./components/DaySelector.tsx";
import { ColoredCaps } from "./components/ColoredCaps.tsx";

function App() {
  const [selectedDay, setSelectedDay] = React.useState<number | undefined>();
  return (
    <>
      <link rel="stylesheet" href="./static/css/App.css" />
      <main className="App">
        <nav className="tui-nav">
          <span>
            <a href="#" onClick={() => setSelectedDay(undefined)}>
              <ColoredCaps>Advent of Code 2022</ColoredCaps>
            </a>
          </span>
          <DaySelector
            selectedDay={selectedDay}
            onDayChange={(day) => setSelectedDay(day)}
          />
          <span className="tui-datetime" data-format="h:m:s a"></span>
        </nav>
        <article>
          {selectedDay == null
            ? <Welcome onDaySelected={(day) => setSelectedDay(day)} />
            : (
              <Day
                day={selectedDay}
                onDaySelected={(day) => setSelectedDay(day)}
              />
            )}
        </article>
        <footer className="tui-nav">
          <span className="copy-left">©</span> Ismael Taboada, 2022
        </footer>
      </main>
    </>
  );
}

export default App;
