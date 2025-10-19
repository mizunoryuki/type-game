import React from 'react';
import './InputDisplay.css';

type Props = {
  keys: string[];
  lastPressedKey: string;
}

const InputDisplay = ({ keys, lastPressedKey }: Props) => {
  return (
    <div className="input-display-container">
      {keys.map(key => (
        <div 
          key={key} 
          className={`key-indicator ${lastPressedKey === key ? 'pressed' : ''}`}
        >
          {key}
        </div>
      ))}
    </div>
  );
};

export default React.memo(InputDisplay);