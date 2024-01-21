import placeholderSVG from "../assets/icon.svg";

function Card({ imageUrl, name, onClick, isLoading, id }) {
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(id);
    }
  };

  return (
    <div
      className="card"
      tabIndex="0"
      onClick={() => onClick(id)}
      onKeyDown={onKeyDown}
    >
      {isLoading ? (
        <img src={placeholderSVG} alt="Loading" />
      ) : (
        <img src={imageUrl} alt={name} />
      )}
    </div>
  );
}

export default Card;
