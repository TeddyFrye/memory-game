import { useEffect, useState } from "react";
import "../styles/Professor.css";
import professorImg from "../assets/professor.png";

const Professor = ({ score, bestScore }) => {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [index, setIndex] = useState(0);

  let message;

  if (score === 0) {
    message = "Click on a Pokemon you haven't clicked yet!";
  } else if (score === 3) {
    message = "Good job!";
  } else if (score > bestScore) {
    message = "Wow! New high score!";
  } else if (score === bestScore) {
    message = "New High Score! Keep it up!";
  } else {
    message = "Click on a Pokemon you haven't clicked yet!";
  }

  useEffect(() => {
    // Reset the typing animation when the message changes
    setDisplayedMessage("");
    setIndex(0);
  }, [message]);

  useEffect(() => {
    if (index < message.length) {
      // Wait for a bit and then display the next character
      const timerId = setTimeout(() => {
        setDisplayedMessage((prev) => prev + message[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 50); // This sets the typing speed. Adjust as needed.

      // Clean up the timer
      return () => clearTimeout(timerId);
    } else {
      // After typing is done, add the cursor blink effect
      const cursor = document.querySelector(".speech-bubble .cursor");
      if (cursor) cursor.style.display = "inline";
    }
  }, [index, message]);

  return (
    <div className="professor-container">
      <div className="speech-bubble">
        {displayedMessage}
        <span className="cursor"></span>
      </div>
      <img
        src={professorImg}
        alt="Professor Sada giving instructions"
        className="professor-img"
      />
    </div>
  );
};

export default Professor;
