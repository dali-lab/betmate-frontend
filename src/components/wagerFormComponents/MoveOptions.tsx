import { VerticalBar } from 'components/WagerPanel/helper_components';
import React, { Dispatch, SetStateAction } from 'react';
import './style.scss';

const moveOptions = {
  d4: [40, '#8CCDBD'],
  e4: [30, '#E527AF'],
  d3: [20, '#FADF9B'],
  Other: [10, '#C4C4C4'],
};

interface MoveOptionsProps {
  setWager: Dispatch<SetStateAction<string>>
  wager: string
}

const MoveOptions: React.FC<MoveOptionsProps> = (props) => {
  const renderMoveOptions = () => {
    const maxPercentage = Object.values(moveOptions).reduce((currMax, [probability]) => (
      currMax > probability ? currMax : probability
    ), 0);
    return Object.keys(moveOptions).map((move, i) => {
      const [probability, color] = moveOptions[move];
      return (
        <label htmlFor={`move-option-${i}`} key={move}>
          <VerticalBar color={color} maxPercentage={Number(maxPercentage)} percentage={probability} />
          <p>{move}</p>
          <input
            id={`move-option-${i}`}
            name="moves"
            type="radio"
            value={move}
            checked={props.wager === move}
            onChange={(e) => { props.setWager(e.currentTarget.value); }}
          />
        </label>
      );
    });
  };

  return (
    <div className="options-container">
      {renderMoveOptions()}
    </div>
  );
};

export default MoveOptions;
