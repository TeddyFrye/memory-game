function Card({ imageUrl, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={imageUrl} alt="Memory card" />
    </div>
  );
}

export default Card;
