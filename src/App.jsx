import { useState } from "react";
import Gameboard from "./components/GameBoard.jsx";
import Scoreboard from "./components/Scoreboard.jsx";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const updateScore = (newScore) => {
    setCurrentScore(newScore);
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  };

  return (
    <>
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      <Gameboard updateScore={updateScore} />
    </>
  );
}

export default App;
