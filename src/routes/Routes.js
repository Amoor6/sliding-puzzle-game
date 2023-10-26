import { Route, Routes as Switch } from "react-router-dom";
import StartGame from "../pages/StartGame";
import GameBoard from "../pages/GameBoard";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<StartGame />} />
      <Route path="/gameBoard" element={<GameBoard />} />
    </Switch>
  );
};

export default Routes;
