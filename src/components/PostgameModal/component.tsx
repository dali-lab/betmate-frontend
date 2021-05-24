import { ChatWager } from 'components/ChatBox/helper_components';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { Game } from 'types/resources/game';
import { Wager, WagerStatus } from 'types/resources/wager';
import { GameStatus } from 'utils/chess';
import './style.scss';

interface PostgameModalProps {
  games: Record<string, Game>
  resolvedWagers: Wager[],
}

const PostgameModal: React.FC<PostgameModalProps> = (props) => {
  const { id: gameId } = useParams<{ id: string }>();
  const history = useHistory();

  const calcWinnings = () => {
    return props
      .resolvedWagers
      .filter((wager) => wager.game_id === gameId && wager.status === WagerStatus.WON)
      .reduce((winnings, wager) => {
        return winnings
        + (
          wager.wdl
            ? wager.amount * wager.odds
            : wager.amount * wager.winning_pool_share
        );
      }, 0)
      .toFixed(2);
  };

  const calcLosses = () => (
    props.resolvedWagers
      .filter((wager) => wager.game_id === gameId && wager.status === WagerStatus.LOST)
      .reduce((loss, wager) => loss + wager.amount, 0)
      .toFixed(2)
  );

  const getGameResult = () => {
    switch (props.games[gameId].game_status) {
      case GameStatus.WHITE_WIN:
        return 'White wins!';
        break;
      case GameStatus.BLACK_WIN:
        return 'Black wins!';
        break;
      case GameStatus.DRAW:
        return 'It\'s a draw!';
        break;
      default:
        return '';
        break;
    }
  };

  const resolvedWagers = props.resolvedWagers
    .filter((w) => w.game_id === gameId)
    .map((wager) => (
      wager.resolved
        ? [{ ...wager, time: wager.updated_at, odds: wager.wdl ? wager.odds : wager.winning_pool_share }]
        : []
    ))
    .flat()
    .sort((fwA, fwB) => new Date(fwA.time).getTime() - new Date(fwB.time).getTime())
    .map((fw) => <ChatWager wager={fw} key={`${fw._id}_${fw.time}`} />);

  const winnings = calcWinnings();
  const losses = calcLosses();
  const profit = Number(winnings) - Number(losses);

  if (!props.games[gameId]) return <div />;
  return (
    <div className="blur-background">
      <div className="postgame-modal-container">
        <div className="postgame-padding-container">
          <h1>White ({props.games[gameId].player_white.elo}) vs. Black ({props.games[gameId].player_black.elo})</h1>
          <h4>{getGameResult()} Here’s a summary of your bets.</h4>
          <div className="postgame-box-container">
            <div className="postgame-box blue-border">
              <div className="postgame-box-padding-container">
                <h4>Your bets</h4>
                {resolvedWagers}
              </div>
            </div>
            <div className="postgame-box orange-border">
              <div className="postgame-box-padding-container">
                <h4>Stats</h4>
                <div className="postgame-stats-container">
                  <div className="stat-line">
                    <p className="stat-line-left">Bets won</p>
                    <div className="stat-line-right">
                      <p className="green-text">
                        {props.resolvedWagers.filter((wager) => wager.game_id === gameId && wager.status === WagerStatus.WON).length}
                        /
                        {props.resolvedWagers.filter((wager) => wager.game_id === gameId).length}
                      </p>
                      <p className="green-text">+${winnings}</p>
                    </div>
                  </div>
                  <div className="stat-line">
                    <p className="stat-line-left">Bets lost</p>
                    <div className="stat-line-right">
                      <p className="red-text">
                        {props.resolvedWagers.filter((wager) => wager.game_id === gameId && wager.status === WagerStatus.LOST).length}
                        /
                        {props.resolvedWagers.filter((wager) => wager.game_id === gameId).length}
                      </p>
                      <p className="red-text">-${losses}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="stat-line">
                    <p className="stat-line-left">Total</p>
                    <div className="stat-line-right">
                      <div />
                      <p className={profit >= 0 ? 'green-text' : 'red-text'}>{profit >= 0 ? '+' : '-'}${Math.abs(profit).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => history.push('/')}
          >
            back to dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostgameModal;
