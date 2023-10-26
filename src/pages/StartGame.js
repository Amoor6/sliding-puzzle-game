import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartGame = () => {
  const navigate = useNavigate();

  
  const [boardSize,setBoardSize]=useState(0)
  
  const clickHandler = () => {
    navigate("/gameBoard", { state: { boardSize: boardSize } });
  };
  return (
    <div>
      <input type="number" onChange={(e)=>setBoardSize(e.target.value)} />
      <button onClick={clickHandler}>go to game board</button>
    </div>
  );
};

export default StartGame;
