import { useState, useEffect } from "react";
import Card from "./Card";

function Gameboard() {
  const [cards, setCards] = useState([]); // Fetch these from an API
  const [currrentCards, setCurrentCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    fetch("someAPIEndpoint")
      .then((response) => response.json())
      .then((data) => setCards(data));
  }, []);

  const selectRandomCards = (allCards, num) => {
    const randomCards = [];
    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * allCards.length);
      randomCards.push(allCards[randomIndex]);
    }
    return randomCards;
  };

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      // Game Over. Reset everything.
      updateScore(currentScore); // Update the best score if needed
      setClickedCards([]);
      setCurrentScore(0);
    } else {
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      setClickedCards([...clickedCards, id]);
    }
    setCurrentCards(selectRandomCards(cards, 6));
  };

  const updateScore = (newScore) => {
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  };

  return (
    <div className="gameboard">
      {cards.map((card) => (
        <Card
          key={card.id}
          imageUrl={card.imageUrl}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
}

export default Gameboard;
