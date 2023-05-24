import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import moment from "moment";

import { BaseButton } from "./BaseButton";

import "./App.css";

export function App() {
  const [dice, setDice] = useState(allNewdice());
  const [tenzies, setTenzies] = useState(false);
  const { width, height } = useWindowSize();
  const [numberOfRolls, setNumberOfRolls] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const formattedTime = moment.utc(timeElapsed * 1000).format("HH:mm:ss");
  console.log(formattedTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(timeElapsed + 1);
    }, 1000);

    if (tenzies) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [tenzies, timeElapsed]);

  useEffect(() => {
    localStorage.setItem("numberOfRolls", numberOfRolls);
  }, [numberOfRolls]);

  useEffect(() => {
    const isTenzies = dice.every(
      (die) => die.value === dice[0].value && die.isHeld
    );

    if (isTenzies) {
      setTenzies(true);
    } else {
      setTenzies(false);
    }
  }, [dice]);

  function holdDice(id) {
    const newDice = dice.map((die) => ({
      ...die,
      isHeld: die.id === id ? !die.isHeld : die.isHeld,
    }));

    setDice(newDice);
  }

  function randomNumber() {
    return Math.floor(Math.random() * 6 + 1);
  }

  function allNewdice() {
    const dice = [];

    for (let i = 0; i < 10; i++) {
      dice.push({
        value: randomNumber(),
        isHeld: false,
        id: nanoid(),
      });
    }

    return dice;
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewdice());
      setTenzies(false);
      setNumberOfRolls(0);
      setTimeElapsed(0);
      return;
    } else {
      const newDice = dice.map((die) => ({
        ...die,
        value: die.isHeld ? die.value : randomNumber(),
      }));

      setDice(newDice);
    }
    setNumberOfRolls(numberOfRolls + 1);
  }

  const diceElements = dice.map((die) => (
    <BaseButton
      key={die.id}
      label={die.value}
      isHeld={die.isHeld}
      onClick={() => holdDice(die.id)}
    />
  ));

  return (
    <>
      <p className="time">Time Elapsed: {formattedTime}</p>
      <div className="main-wrapper">
        <main className="main">
          <h1 className="main__heading">Tenzies</h1>
          <p className="main__instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="dice-container">{diceElements}</div>
          <div className="roll-wrapper">
            <BaseButton
              onClick={rollDice}
              label={tenzies ? "New Game" : "Roll"}
              size="large"
            />
          </div>
        </main>
        {tenzies && (
          <Confetti width={width} height={height} numberOfPieces={1000} />
        )}
      </div>
      <p className="won">Current number of rolls: {numberOfRolls} rolls</p>
    </>
  );
}
