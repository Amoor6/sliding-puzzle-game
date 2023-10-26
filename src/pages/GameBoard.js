import React from "react";
import { useLocation } from "react-router-dom";
import Board from "../components/Board/Board";

const GameBoard = () => {
  const location = useLocation();

  return <Board boardSize={location.state.boardSize} />;
};

export default GameBoard;
