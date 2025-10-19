import ScoreBoard from './ScoreBoard';
import TimerBar from './TimerBar';
import InputDisplay from './InputDisplay';
import './Game.css';
import { KEYS } from '../utils/generateScore';

type Props = {
  current: string[];
  next: string[];
  playerInput: string[];
  level: number;
  timeLeft: number;
  timeLimit: number;
  lastPressedKey: string;
  onBackToMenu: () => void;
  gameMode: 'challenge' | 'stages';
};

const PlayingView = ({
  current,
  next,
  playerInput,
  level,
  timeLeft,
  timeLimit,
  lastPressedKey,
  onBackToMenu,
  gameMode,
}: Props) => (
  <div className="game-container">
    <div className="game-header">
      <h2 className={level >= 20 ? 'level-gold' : level >= 10 ? 'level-red' : ''}>
        {gameMode === 'stages' ? `Stage: ${level}` : `Level: ${level}`}
      </h2>
      <TimerBar timeLeft={timeLeft} timeLimit={timeLimit} />
    </div>

    <ScoreBoard current={current} next={next} playerInput={playerInput} />

    <InputDisplay keys={KEYS} lastPressedKey={lastPressedKey} />

    <div style={{ marginTop: 18 }}>
      <button className="start-button" onClick={onBackToMenu}>
        モード選択に戻る
      </button>
    </div>
  </div>
);

export default PlayingView;
