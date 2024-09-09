export default function ({ winner, onClick }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>player {winner} won!</p>}
      {!winner && <p>It's A draw</p>}
      <p>
        <button onClick={onClick}>Rematch!</button>
      </p>
    </div>
  );
}
