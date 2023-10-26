import { useEffect, useState } from "react";
import "./Board.css";
import Tile from "../tile/Tile";
import NewGame from "../new-game/NewGame";
import { useNavigate } from "react-router-dom";

const Board = ({ boardSize }) => {
  const shuffle = () =>
    new Array(boardSize * boardSize)
      .fill()
      .map((_, i) => i + 1)
      .sort(() => Math.random() - 0.5)
      .map((x, i) => ({ value: x, index: i }));
  const navigate = useNavigate();
  const [numbers, setNumbers] = useState([]);

  const reset = () => setNumbers(shuffle());

  const checkIsValid = (emptyIndex, tileIndex) => {
    const size = parseInt(boardSize);
    if (emptyIndex === tileIndex) return false;
    if (emptyIndex % size === 0) {
      //check left corners
      if (emptyIndex - 1 === tileIndex) return false;
      if (emptyIndex + 1 === tileIndex) return true;
    }
    if (emptyIndex % size === size - 1) {
      //check right corners
      if (emptyIndex - 1 === tileIndex) return true;
      if (emptyIndex + 1 === tileIndex) return false;
    }

    if (Math.abs(emptyIndex - tileIndex) === size) return true; //check vertical

    if (Math.abs(emptyIndex - tileIndex) === 1) return true; //check horizontal

    return false;
  };

  const moveTile = (tile) => {
    const emptyTile = numbers.find((n) => n.value === boardSize * boardSize);
    const emptyIndex = emptyTile.index;

    if (!checkIsValid(emptyIndex, tile.index)) return;
    console.log("valida");
    const clone = [...numbers];
    console.log({ before: clone });
    const temp = numbers[emptyIndex];
    clone[emptyIndex] = {
      value: clone[tile.index].value,
      index: clone[emptyIndex].index,
    }; // clone[tile.index];
    clone[tile.index] = { value: temp.value, index: clone[tile.index].index }; //temp;
    console.log({ after: clone });
    setNumbers(clone);
  };

  const handleKeyDown = (e) => {
    const emptyIndex = numbers.find(
      (n) => n.value === boardSize * boardSize
    ).index;
    if (e.keyCode === 37 && !(emptyIndex % boardSize === boardSize - 1))
      moveTile(numbers.find((n) => n.index === emptyIndex + 1));
    else if (e.keyCode === 38 && !(emptyIndex > 11))
      moveTile(numbers.find((n) => n.index === emptyIndex + boardSize));
    else if (e.keyCode === 39 && !(emptyIndex % boardSize === 0))
      moveTile(numbers.find((n) => n.index === emptyIndex - 1));
    else if (e.keyCode === 40 && !(emptyIndex < boardSize))
      moveTile(numbers.find((n) => n.index === emptyIndex - boardSize));
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(reset, []);
  function checkWin() {
    if (!numbers.every((n) => n.value === n.index + 1)) return false;
    return true;
  }
  return (
    <div className="game">
      {!checkWin() ? <div
        className="board"
        style={{
          width: boardSize * 100,
          height: boardSize * 100,
          gridTemplateColumns: `repeat(${boardSize},var(--size))`,
          gridTemplateRows: `repeat(${boardSize},var(--size))`,
        }}
      >
        {/* <OverLay /> */}
        {numbers.map((x, i) => {
          return (
            <Tile
              key={i}
              number={x}
              moveTile={moveTile}
              emptyIndex={boardSize * boardSize}
            />
          );
        })}
      </div> : "You Win "}
      <NewGame reset={reset} />
      <div className="button-wrapper" onClick={() => navigate("/")}>
        <button>Main Menu</button>
      </div>
    </div>
  );
};

export default Board;
