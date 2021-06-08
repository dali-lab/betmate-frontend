import { ChatWager } from 'components/ChatBox/helper_components';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Game } from 'types/resources/game';
import { Wager, WagerStatus } from 'types/resources/wager';
import { GameStatus } from 'utils/chess';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatLine } from './helperComponents';
import './style.scss';

interface PostgameModalProps {
  games: Record<string, Game>
  resolvedWagers: Wager[],
}

const PostgameModal: React.FC<PostgameModalProps> = (props) => {
  const [hide, setHide] = useState(false);

  const { id: gameId } = useParams<{ id: string }>();
  const history = useHistory();

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

  const winnings = props.resolvedWagers
    .filter((wager) => wager.game_id === gameId && wager.status === WagerStatus.WON)
    .reduce((currWinnings, wager) => (
      currWinnings
        + (wager.amount
          * (
            (wager.wdl
              ? wager.odds
              : wager.winning_pool_share)
            - 1
          ))
    ), 0)
    .toFixed(2);

  const losses = props.resolvedWagers
    .filter((wager) => wager.game_id === gameId && wager.status === WagerStatus.LOST)
    .reduce((loss, wager) => loss + wager.amount, 0)
    .toFixed(2);

  const resolvedWagers = props.resolvedWagers
    .filter((w) => w.game_id === gameId && w.resolved)
    .map((wager) => (
      { ...wager, time: wager.updated_at, odds: wager.wdl ? wager.odds : wager.winning_pool_share }
    ))
    .sort((fwA, fwB) => new Date(fwA.time).getTime() - new Date(fwB.time).getTime())
    .map((fw) => <ChatWager wager={fw} key={`${fw._id}_${fw.time}`} />);

  const profit = Number(winnings) - Number(losses);

  return (
    (!props.games[gameId] || hide)
      ? null
      : <div className="blur-background">
        <div className="postgame-modal-container">
          <FontAwesomeIcon
            className="postgame-x-icon"
            icon={faTimes}
            size="2x"
            onClick={() => setHide(true)}
          />
          <div className="postgame-padding-container">
            <h1>White ({props.games[gameId].player_white.elo}) vs. Black ({props.games[gameId].player_black.elo})</h1>
            <h4>{getGameResult()} Here’s a summary of your bets.</h4>
            <div className="postgame-box-container">
              <div className="postgame-box blue-border">
                <div className="postgame-box-padding-container">
                  <h4>Your bets</h4>
                  {resolvedWagers.length
                    ? resolvedWagers
                    : <p className="no-bets-text">Looks like you didn&apos;t place any bets 😢 Theres always next game!</p>
                  }
                </div>
              </div>
              <div className="postgame-box orange-border">
                <div className="postgame-box-padding-container">
                  <h4>Stats</h4>
                  <div className="postgame-stats-container">
                    <StatLine winnings={winnings} losses={losses} betType='win' resolvedWagers={props.resolvedWagers} />
                    <StatLine winnings={winnings} losses={losses} betType='loss' resolvedWagers={props.resolvedWagers} />
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
