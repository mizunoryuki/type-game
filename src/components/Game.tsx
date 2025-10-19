import { useState, useEffect, useCallback, useRef } from 'react';
import ModeSelection from './ModeSelection';
import PlayingView from './PlayingView';
import GameOver from './GameOver';
import GameWon from './GameWon';
import { generateScore, KEYS } from '../utils/generateScore';
import './Game.css';

const INITIAL_TIME_LIMIT = 5000;
const TIME_DECREMENT = 200;
const MIN_TIME_LIMIT = 1500;
const STAGES_GOAL = 10; // ステージモードのクリア目標

const Game = () => {
  const [gameMode, setGameMode] = useState<'challenge' | 'stages' | null>(null);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'gameOver' | 'gameWon'>('waiting');
  
  const [currentScore, setCurrentScore] = useState<string[]>([]);
  const [nextScore, setNextScore] = useState<string[]>([]);
  const [playerInput, setPlayerInput] = useState<string[]>([]);
  
  const [level, setLevel] = useState<number>(1); 
  const [timeLimit, setTimeLimit] = useState<number>(INITIAL_TIME_LIMIT);
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME_LIMIT);
  
  const [lastPressedKey, setLastPressedKey] = useState<string>('');

  const [missCount, setMissCount] = useState<number>(0);

  const currentScoreRef = useRef<string[]>(currentScore);
  const playerInputRef = useRef<string[]>(playerInput);
  const gameStateRef = useRef<typeof gameState>(gameState);
  const gameModeRef = useRef<typeof gameMode>(gameMode);
  const advanceLevelRef = useRef<() => void>(() => {});

  const startGame = (mode: 'challenge' | 'stages') => {
    setGameMode(mode);
    setLevel(1);
    setMissCount(0);
    const newTimeLimit = INITIAL_TIME_LIMIT;
    setTimeLimit(newTimeLimit);
    setTimeLeft(newTimeLimit);
    setPlayerInput([]);
    setCurrentScore(generateScore());
    setNextScore(generateScore());
    setGameState('playing');
  };

  const advanceLevel = useCallback(() => {
    if (gameMode === 'stages' && level >= STAGES_GOAL) {
      setGameState('gameWon');
      setPlayerInput([]);
      return;
    }

    const nextLevel = level + 1;
    setLevel(nextLevel);
    const newTimeLimit = Math.max(MIN_TIME_LIMIT, INITIAL_TIME_LIMIT - ((nextLevel - 1) * TIME_DECREMENT));
    setTimeLimit(newTimeLimit);
    setTimeLeft(newTimeLimit);
    setPlayerInput([]);
    setCurrentScore(nextScore);
    setNextScore(generateScore());
  }, [level, nextScore, gameMode]);

  // タイマー処理
  useEffect(() => {
    if (gameState !== 'playing' || gameMode !== 'challenge') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 10) {
          clearInterval(timer);
          setGameState('gameOver');
          return 0;
        }
        return prev - 10;
      });
    }, 10);
    return () => clearInterval(timer);
  }, [gameState, gameMode]);

  useEffect(() => {
    currentScoreRef.current = currentScore;
  }, [currentScore]);

  useEffect(() => {
    playerInputRef.current = playerInput;
  }, [playerInput]);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    gameModeRef.current = gameMode;
  }, [gameMode]);

  useEffect(() => {
    advanceLevelRef.current = advanceLevel;
  }, [advanceLevel]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStateRef.current !== 'playing') return;
      const key = e.key.toUpperCase();
      if (!KEYS.includes(key)) return;

      setLastPressedKey(key);
      setTimeout(() => setLastPressedKey(''), 200);

      const prevInput = playerInputRef.current;
      const newPlayerInput = [...prevInput, key];

      const currScore = currentScoreRef.current;
      // check correctness
      if (currScore[newPlayerInput.length - 1] !== key) {
        if (gameModeRef.current === 'challenge') {
          setGameState('gameOver');
        } else {
          setPlayerInput([]);
          setMissCount(prev => prev + 1);
        }
        return;
      }

      setPlayerInput(newPlayerInput);

      if (newPlayerInput.length === currScore.length) {
        advanceLevelRef.current();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!gameMode) {
    return <ModeSelection onStart={startGame} stagesGoal={STAGES_GOAL} />;
  }

  if (gameState === 'gameOver') {
    return <GameOver level={level} gameMode={gameMode} onBack={() => setGameMode(null)} />;
  }

  if (gameState === 'gameWon') {
    return <GameWon missCount={missCount} onBack={() => setGameMode(null)} />;
  }

  return (
    <PlayingView
      current={currentScore}
      next={nextScore}
      playerInput={playerInput}
      level={level}
      timeLeft={timeLeft}
      timeLimit={timeLimit}
      lastPressedKey={lastPressedKey}
      onBackToMenu={() => setGameMode(null)}
      gameMode={gameMode}
    />
  );
};

export default Game;