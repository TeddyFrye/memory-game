import placeholderSVG from "../assets/icon.svg";

function Card({ imageUrl, name, onClick, isLoading }) {
  return (
    <div className="card" onClick={onClick}>
      {isLoading ? (
        <img src={placeholderSVG} alt="Loading" />
      ) : (
        <>
          <img src={imageUrl} alt={name} />
        </>
      )}
    </div>
  );
}

export default Card;
