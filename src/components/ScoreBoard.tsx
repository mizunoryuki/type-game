import './ScoreBoard.css';

type Props = {
  current: string[];
  next: string[];
  playerInput: string[];
}

const ScoreBoard = ({ current, next, playerInput }: Props) => {
  return (
    <div className="scoreboard-container">
      <div className="score-section">
        <h3>CURRENT</h3>
        <div className="score-display">
          {current.map((key, index) => {
            let className = 'key-box';
            
            // 1. 入力済みのキー
            if (index < playerInput.length) {
              className += ' correct';
            } 
            // 2. ★次に押すべきキー★
            else if (index === playerInput.length) {
              className += ' next-to-press';
            }
            // 3. これから押すキー
            // (特別なクラスは不要)

            return <div key={index} className={className}>{key}</div>;
          })}
        </div>
      </div>
      <div className="score-section next">
        <h3>NEXT</h3>
        <div className="score-display">
          {next.map((key, index) => (
            <div key={index} className="key-box future">{key}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;