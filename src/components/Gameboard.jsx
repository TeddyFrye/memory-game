import { useState, useEffect } from "react";
import Card from "./Card";
import { fetchPokemonData } from "../api";

function Gameboard() {
  const [cards, setCards] = useState([]); // Fetch these from an API
  const [currentCards, setCurrentCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemonData(151); // Fetch data for the first 151 Pokémon
      setCards(data);
    };
    fetchData();
  }, []);

  const selectRandomCards = (allCards, num) => {
    const randomCards = [];
    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * allCards.length);
      randomCards.push(allCards[randomIndex]);
    }
    return randomCards;
  };

  useEffect(() => {
    if (cards.length > 0) {
      setCurrentCards(selectRandomCards(cards, 6));
    }
  }, [cards]);

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
      {currentCards.map((card) => (
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
