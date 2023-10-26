import "./Tile.css";

const Tile = ({ number, moveTile, emptyIndex }) => (
  <div
    onClick={() => moveTile(number)}
    className={`number ${number.value === number.index + 1 ? "correct" : ""} ${
      number.value === emptyIndex ? "disabled" : ""
    } slot--${number.index}`}
  >
    <div className="inner-number">{number.value === emptyIndex ? "" : number.value}</div>
  </div>
);

export default Tile;
