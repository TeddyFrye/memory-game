import { useState } from "react";
import Gameboard from "./components/GameBoard.jsx";
import Scoreboard from "./components/Scoreboard.jsx";
import Professor from "./components/Professor.jsx";
import "./styles/App.css";
import "./styles/Gameboard.css";
import "./styles/Card.css";
import "./styles/Scoreboard.css";

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
      <div className="scoreboard-container">
        <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      </div>
      <div className="main-container">
        <div className="gameboard-container">
          <Gameboard updateScore={updateScore} />
        </div>
        <div className="professor-container">
          <Professor score={currentScore} bestScore={bestScore} />
        </div>
      </div>
    </>
  );
}

export default App;
