import React, { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router';
import { VerticalBar } from 'components/WagerPanel/helper_components';
import {
  onMoveSelect, onMoveUnselect, onMoveHover, onMoveUnhover,
} from 'store/actionCreators/chessgroundActionCreators';
import { Game } from 'types/resources/game';
import { moveOptionColors } from 'utils/config';

interface MoveOptionsProps {
  setWager: Dispatch<SetStateAction<string>>
  wager: string,
  games: Record<string, Game>,
  wagersLoading: boolean,
  onMoveSelect: typeof onMoveSelect
  onMoveUnselect: typeof onMoveUnselect
  onMoveHover: typeof onMoveHover
  onMoveUnhover: typeof onMoveUnhover
}

const MoveOptions: React.FC<MoveOptionsProps> = (props) => {
  const { id: gameId } = useParams<{ id: string }>();

  const renderMoveOptions = () => {
    const { options: moveOptions, wagers } = props.games[gameId]?.pool_wagers?.move;

    const totalPool = wagers.reduce((acc, w) => acc + w.amount, 0);

    const poolPerMove: Record<string, number> = wagers.reduce((currObj, { amount, data }) => {
      const field = moveOptions.includes(data) ? data : 'Other';
      return {
        ...currObj,
        [field]: currObj[field] + amount,
      };
    }, {
      ...moveOptions.reduce((obj, move) => ({ ...obj, [move]: 0 }), {}),
      Other: 0,
    });

    const maxPercentage = (
      Object
        .values(poolPerMove)
        .reduce((currMax, movePool) => Math.max(currMax, movePool / totalPool), 0)
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.setWager(e.currentTarget.value);
      props.onMoveSelect(props.games[gameId].state, e.currentTarget.value);
    };

    return Object.entries(poolPerMove)
      .map(([move, movePool], i) => (
        <label
          htmlFor={`move-option-${i}`}
          key={move}
          onMouseEnter={() => props.onMoveHover(props.games[gameId].state, move)}
          onMouseLeave={props.onMoveUnhover}
        >
          <VerticalBar
            color={moveOptionColors[i]}
            maxPercentage={Number(maxPercentage)}
            percentage={movePool / totalPool}
          />
          <p>{move}</p>
          <input
            id={`move-option-${i}`}
            name="moves"
            type="radio"
            value={move}
            checked={props.wager === move}
            onChange={handleChange}
          />
        </label>
      ));
  };

  return (
    <div className="options-container move-options">
      {props.wagersLoading
        ? <p>Loading...</p>
        : renderMoveOptions()}
    </div>
  );
};

export default MoveOptions;
