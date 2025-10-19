import './Game.css';

type Props = {
  level: number;
  gameMode: 'challenge' | 'stages';
  onBack: () => void;
};

const GameOver = ({ level, gameMode, onBack }: Props) => (
  <div className="game-container">
    <div className="game-over-screen">
      <h1>Game Over</h1>
      <p>{gameMode === 'challenge' ? `Level: ${level}` : `Reached Stage: ${level}`}</p>
      <button onClick={onBack} className="start-button">モード選択に戻る</button>
    </div>
  </div>
);

export default GameOver;
