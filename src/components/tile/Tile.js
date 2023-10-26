import "./Tile.css";

const Tile = ({ number, moveTile, emptyIndex }) => (
  <div
    onClick={() => moveTile(number)}
    className={`number ${number.value === number.index + 1 ? "correct" : ""} ${
      number.value === emptyIndex ? "disabled" : ""
    } slot--${number.index}`}
  >
    {number.value === emptyIndex ? "" : number.value}
  </div>
);

export default Tile;
