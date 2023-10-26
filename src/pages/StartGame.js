import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartGame = () => {
  const navigate = useNavigate();

  const [boardSize, setBoardSize] = useState(0);
const [isError,setIsError]=useState(false)
  const clickHandler = () => {
    if (!parseInt(boardSize)||parseInt(boardSize)===1) return setIsError(true);
    navigate("/gameBoard", { state: { boardSize } });
  };
  return (
    <div className="startgame-box">
      <input
        type="number"
        onChange={(e) => setBoardSize(e.target.value)}
        placeholder="board size"
      />
      {isError? <div className="error">
        Please enter valid number !
      </div>  :<></>}
      <button onClick={clickHandler}>go to game board</button>
    </div>
  );
};

export default StartGame;
