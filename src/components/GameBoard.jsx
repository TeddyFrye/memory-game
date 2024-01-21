import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import { fetchPokemonData } from "../api";
import "../styles/Card.css";
import "../styles/Gameboard.css";

function Gameboard({ updateScore }) {
  const [cards, setCards] = useState([]); // Fetch these from an API
  const [currentCards, setCurrentCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // New state to track the index of the currently focused card
  const [focusedCardIndex, setFocusedCardIndex] = useState(0);
  const cardRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchPokemonData(151); // Fetch data for the first 151 Pokémon
      setCards(data);
      setIsLoading(false);
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

  // Effect for focusing the currently focused card
  useEffect(() => {
    if (cardRefs.current[focusedCardIndex]) {
      cardRefs.current[focusedCardIndex].focus();
    }
  }, [currentCards, focusedCardIndex]);

  // Arrow key navigation handler
  const handleKeyNavigation = (e) => {
    // Prevent the default action for navigation keys
    if (["w", "a", "s", "d", "Enter"].includes(e.key.toLowerCase())) {
      e.preventDefault();

      switch (e.key.toLowerCase()) {
        case "d": // Move right
          setFocusedCardIndex(
            (prevIndex) => (prevIndex + 1) % currentCards.length
          );
          break;
        case "a": // Move left
          setFocusedCardIndex(
            (prevIndex) =>
              (prevIndex - 1 + currentCards.length) % currentCards.length
          );
          break;
        case "w": // Move up
          setFocusedCardIndex(
            (prevIndex) =>
              (prevIndex - 3 + currentCards.length) % currentCards.length
          );
          break;
        case "s": // Move down
          setFocusedCardIndex(
            (prevIndex) =>
              (prevIndex + 3 + currentCards.length) % currentCards.length
          );
          break;

        case "enter": // Select the card
          handleCardClick(currentCards[focusedCardIndex].id);
          break;
        default:
          break;
      }
    }
  };

  const handleCardClick = (id) => {
    // Consolidate the logic for both click and keydown events
    if (clickedCards.includes(id)) {
      // Game Over. Reset everything.
      updateScore(0);
      setClickedCards([]);
    } else {
      const newScore = clickedCards.length + 1;
      updateScore(newScore);
      setClickedCards([...clickedCards, id]);
    }
    setCurrentCards(selectRandomCards(cards, 6));
  };

  return (
    <div className="gameboard" onKeyDown={handleKeyNavigation} tabIndex="0">
      {currentCards.map((card, index) => (
        <Card
          ref={(el) => (cardRefs.current[index] = el)} // Assign refs to each card
          key={card.id}
          imageUrl={card.imageUrl}
          name={card.name}
          onClick={() => handleCardClick(card.id)}
          isLoading={isLoading}
          tabIndex={index === focusedCardIndex ? 0 : -1} // Only the focused card is tabbable
        />
      ))}
    </div>
  );
}

export default Gameboard;
