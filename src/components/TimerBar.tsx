import './TimerBar.css';

type Props = {
  timeLeft: number;
  timeLimit: number;
}

const TimerBar = ({ timeLeft, timeLimit }: Props) => {
  const percentage = (timeLeft / timeLimit) * 100;

  return (
    <div className="timer-container">
      <div 
        className="timer-bar" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default TimerBar;