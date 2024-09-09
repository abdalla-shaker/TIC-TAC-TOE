import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

import { WINNING_COMBINATIONS } from "./winning_combinations.js";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "player 1",
  O: "player 2",
};

function derivedActivePlayer(logPlayer) {
  let curPlayer = "X";

  if (logPlayer.length > 0 && logPlayer[0].player === "X") {
    curPlayer = "O";
  }

  return curPlayer;
}

function derivingWinner(gameBoard, playerName) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerName[firstSquareSymbol];
    }
  }
  return winner;
}

function gameBoarding(logPlayer) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];

  for (const setLog of logPlayer) {
    const { square, player } = setLog;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [playerName, setPlayerName] = useState(PLAYERS);
  const [logPlayer, setLogPlayer] = useState([]);

  const gameBoard = gameBoarding(logPlayer);

  const activePlayer = derivedActivePlayer(logPlayer);

  const winner = derivingWinner(gameBoard, playerName);
  const itsDraw = logPlayer.length === 9 && !winner;

  function handlePlayerChange(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setLogPlayer((curLogPlayer) => {
      const curPlayer = derivedActivePlayer(curLogPlayer);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: curPlayer,
        },
        ...curLogPlayer,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setLogPlayer([]);
  }

  function handlePlayerNameChange(symbol, name) {
    setPlayerName((prevName) => {
      return {
        ...prevName,
        [symbol]: name,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={playerName.X}
            symbol="X"
            isActive={activePlayer === "X"}
            handlePlayerNameChange={handlePlayerNameChange}
          />
          <Player
            initialName={playerName.O}
            symbol="O"
            isActive={activePlayer === "O"}
            handlePlayerNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || itsDraw) && (
          <GameOver winner={winner} onClick={handleRestart} />
        )}
        <GameBoard setSquareHandle={handlePlayerChange} board={gameBoard} />
      </div>
      <Log turns={logPlayer} />
    </main>
  );
}

export default App;
