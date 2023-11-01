import "../styles/Professor.css";
import professorImg from "../assets/professor.png";

const Professor = ({ score, bestScore }) => {
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
  return (
    <div className="professor-container">
      <img src={professorImg} alt="Professor" className="professor-img" />
      <div className="speech-bubble">{message}</div>
    </div>
  );
};

export default Professor;
