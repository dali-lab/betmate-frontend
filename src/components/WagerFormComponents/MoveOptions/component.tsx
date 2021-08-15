import React, { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router';
import { VerticalBar } from 'components/WagerPanel/helper_components';
import { onMoveHover, onMoveUnhover } from 'store/actionCreators/chessgroundActionCreators';
import { Game } from 'types/resources/game';
import { moveOptionColors } from 'utils/config';
import { createWager } from 'store/actionCreators/wagerActionCreators';

interface MoveOptionsProps {
  setPanelLoading: Dispatch<SetStateAction<boolean>>
  wagerAmount: number
  wagersLoading: boolean
  games: Record<string, Game>
  isAuthenticated: boolean
  onMoveHover: typeof onMoveHover
  onMoveUnhover: typeof onMoveUnhover
  createWager: typeof createWager
}

const MoveOptions: React.FC<MoveOptionsProps> = (props) => {
  const { id: gameId } = useParams<{ id: string }>();

  const handleSubmit = (wager: string) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (props.wagerAmount && props.isAuthenticated) {
      props.createWager(
        gameId,
        wager,
        props.wagerAmount,
        false,
        1,
        props.games[gameId].move_hist.length + 1,
      );
      props.setPanelLoading(true);
    }
  };

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

    return Object.entries(poolPerMove)
      .map(([move, movePool], i) => (
        <div
          key={move}
          className={`move-option ${props.isAuthenticated ? 'move-auth' : ''}`}
          style={{ borderColor: props.isAuthenticated ? moveOptionColors[i] : 'grey' }}
          onMouseEnter={() => props.onMoveHover(props.games[gameId].state, move)}
          onMouseLeave={props.onMoveUnhover}
          onClick={handleSubmit(move)}
        >
          <VerticalBar
            color={moveOptionColors[i]}
            maxPercentage={Number(maxPercentage)}
            percentage={movePool / totalPool}
          />
          <p>{move}</p>
        </div>
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
