import './Game.css';

type Props = {
  onStart: (mode: 'challenge' | 'stages') => void;
  stagesGoal: number;
};

const ModeSelection = ({ onStart, stagesGoal }: Props) => (
  <div className="game-container mode-selection">
    <h1>Select a Mode</h1>
    <button onClick={() => onStart('challenge')} className="mode-button">
      Challenge Mode
      <span>1回のミスで終了</span>
    </button>
    <button onClick={() => onStart('stages')} className="mode-button">
      Stages Mode
      <span>{stagesGoal}ステージクリアを目指す</span>
    </button>
  </div>
);

export default ModeSelection;
