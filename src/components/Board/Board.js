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

  const isNeighbor = (index) => {
    const emptyIndex = numbers.find(
      (n) => n.value === boardSize * boardSize
    )?.index;
    const neighborArr = [emptyIndex - boardSize, emptyIndex + boardSize];

    if (index % boardSize !== 0) neighborArr.push(emptyIndex + 1);
    if (emptyIndex % boardSize !== 0) neighborArr.push(emptyIndex - 1);
    if (neighborArr.includes(index) ) return true;
    return false;
  };


  const moveTile = (tile) => {
    if (!tile) return;

    setNumbers((prevNumbers) => {
      const emptyIndex = prevNumbers.find(
        (n) => n.value === boardSize * boardSize
      ).index;
      const newNumbers = [...prevNumbers].map((number) => {
        if (number.index !== emptyIndex && number.index !== tile.index)
          return number;
        else if (number.value === boardSize * boardSize)
          return { value: boardSize * boardSize, index: tile.index };
        return { value: tile.value, index: emptyIndex };
      });

      const emptyTileIndex = newNumbers.findIndex(
        (n) => n.value === boardSize * boardSize
      );
      const tileOneIndex = newNumbers.findIndex((n) => n.value === tile.value);

      newNumbers[emptyTileIndex] = { value: tile.value, index: emptyIndex };
      newNumbers[tileOneIndex] = {
        value: boardSize * boardSize,
        index: tile.index,
      };

;

      return newNumbers;
    });
  };

  const isInEmptyIndexRow = (tileindex) => {
    const rowIndex = Math.floor(tileindex / boardSize);
    const indices = [];
    for (let i = 0; i < boardSize; i++)
      indices.push(getTile(rowIndex * boardSize + i));

    if (indices.find((i) => i.value === boardSize * boardSize)) return true;
    return false;
  };

  const getTile = (index) => numbers.find((n) => n.index === index);

  const moveRow = (tile) => {
    const emptyTile = numbers.find((n) => n.value === boardSize * boardSize);
    if (tile.index > emptyTile.index)
      for (let i = emptyTile.index + 1; i <= tile.index; i++)
        moveTile(getTile(i));
    else
      for (let i = emptyTile.index - 1; i >= tile.index; i--)
        moveTile(getTile(i));
  };

  const moveColumn = (tile) => {
    const emptyTile = numbers.find((n) => n.value === boardSize * boardSize);
    if (tile.index > emptyTile.index)
      for (let i = emptyTile.index + boardSize; i <= tile.index; i += boardSize)
        moveTile(getTile(i));
    else
      for (let i = emptyTile.index - boardSize; i >= tile.index; i -= boardSize)
        moveTile(getTile(i));
  };

  const isInSameColumn = (tileIndex) => {
    const colIndex = tileIndex % boardSize;
    const indices = [];
    for (let i = 0; i < boardSize; i++)
      indices.push(getTile(i * boardSize + colIndex));
    if (indices.find((i) => i.value === boardSize * boardSize)) return true;
    return false;
  };
  console.log(numbers);
  const tileClickHandler = (tile) => {
    if (isNeighbor(tile.index)) moveTile(tile);
    else if (isInEmptyIndexRow(tile.index)) moveRow(tile);
    else if (isInSameColumn(tile.index)) moveColumn(tile);
  };

  useEffect(reset, []);
  function checkWin() {
    if (!numbers.every((n) => n.value === n.index + 1)) return false;
    return true;
  }
  return (
    <div className="game">
      {!checkWin() ? (
        <div
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
                moveTile={tileClickHandler}
                emptyIndex={boardSize * boardSize}
              />
            );
          })}
        </div>
      ) : (
        "You Win "
      )}
      <NewGame reset={reset} />
      <div className="button-wrapper" onClick={() => navigate("/")}>
        <button>Main Menu</button>
      </div>
    </div>
  );
};

export default Board;
