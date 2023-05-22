import { BaseButton } from "./BaseButton";

import "./App.css";

export function App() {
  const die = [
    { value: 1, backgroundColor: "green" },
    {
      value: 2,
      backgroundColor: "white",
    },
    {
      value: 1,
      backgroundColor: "green",
    },
    {
      value: 4,
      backgroundColor: "white",
    },
    {
      value: 5,
      backgroundColor: "white",
    },
    { value: 3, backgroundColor: "white" },
    { value: 3, backgroundColor: "white" },
    {
      value: 6,
      backgroundColor: "white",
    },
    {
      value: 5,
      backgroundColor: "white",
    },
    {
      value: 1,
      backgroundColor: "green",
    },
  ];

  return (
    <div className="main-wrapper">
      <main className="main">
        <h1 className="main__heading">Tenzies</h1>
        <p className="main__instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">
          {die.map((die, index) => (
            <BaseButton
              key={index}
              backgroundColor={die.backgroundColor}
              label={die.value.toString()}
            />
          ))}
        </div>

        <div className="roll-wrapper">
          <BaseButton label={"Roll"} backgroundColor={"blue"} />
        </div>
      </main>
    </div>
  );
}
