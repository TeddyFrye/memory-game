import placeholderSVG from "../assets/icon.svg";

function Card({ imageUrl, onClick, isLoading }) {
  return (
    <div className="card" onClick={onClick}>
      {isLoading ? (
        <img src={placeholderSVG} alt="Loading" />
      ) : (
        <img src={imageUrl} alt="Memory card" />
      )}
    </div>
  );
}

export default Card;
