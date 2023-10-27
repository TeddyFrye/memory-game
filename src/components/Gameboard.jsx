import { useState, useEffect } from "react";
import Card from "./Card";
import { fetchPokemonData } from "../api";

function Gameboard({ updateScore }) {
  const [cards, setCards] = useState([]); // Fetch these from an API
  const [currentCards, setCurrentCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemonData(151); // Fetch data for the first 151 Pokémon
      setCards(data);
    };
    fetchData();
  }, []);

  const selectRandomCards = (allCards, num) => {
    const randomCards = [];
    const tempCards = [...allCards];
    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * tempCards.length);
      const chosenCard = tempCards[randomIndex];
      randomCards.push(chosenCard);
      tempCards.splice(randomIndex, 1); // Remove the chosen card
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
      updateScore(0); // <-- Using the passed updateScore function
      setClickedCards([]);
    } else {
      const newScore = clickedCards.length + 1;
      updateScore(newScore); // <-- Using the passed updateScore function
      setClickedCards([...clickedCards, id]);
    }
    setCurrentCards(selectRandomCards(cards, 6));
  };

  return (
    <div className="gameboard">
      {currentCards.length === 0
        ? // Display 6 placeholder cards
          Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="card-placeholder"></div>
          ))
        : // Display the actual cards
          currentCards.map((card) => (
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
