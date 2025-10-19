import './Game.css';

type Props = {
  missCount: number;
  onBack: () => void;
};

const GameWon = ({ missCount, onBack }: Props) => (
  <div className="game-container">
    <div className="game-won-screen">
      <h1>Congratulations!</h1>
      <p>全{10}ステージをクリア！</p>
      {missCount > 0 ? (
        <p className={'miss-count'}>ミス数: {missCount}</p>
      ) : (
        <p className={'miss-count'}>Perfect!</p>
      )}
      <button onClick={onBack} className="start-button">モード選択に戻る</button>
    </div>
  </div>
);

export default GameWon;
