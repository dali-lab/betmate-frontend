import React, { useEffect } from 'react';
import { fetchGamesByStatus } from 'store/actionCreators/gameActionCreators';
import { Game } from 'types/resources/game';
import magnifier from 'assets/dashboard/magnifier.svg';
import GameCard from './GameCard/component';
import './style.scss';

export interface DashboardProps{
  fetchGamesByStatus: typeof fetchGamesByStatus
  games: Record<string, Game>;
}

interface OddsInterface {
  black_win: number,
  draw: number,
  white_win: number
}

function getFavoredPlayer(odds: OddsInterface) {
  if (odds.draw > odds.black_win && odds.draw > odds.white_win) {
    return 'draw';
  } else if (odds.black_win > odds.white_win) {
    return 'black';
  } else {
    return 'white';
  }
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  useEffect(() => {
    props.fetchGamesByStatus(['not_started', 'in_progress']);
  }, []);

  return (
    <div className='main-page'>
      <div className='main-dashboard'>
        <img src={magnifier} />
        <input
          className='searchBar'
          placeholder= 'search for a game, player, or type of chess'
        />
        <div >
          <button className='browse-button'>Browse</button>
        </div>
      </div>
      <h3 className='betting-header'>Popular Matches 🔥</h3>
      {Object
        .values(props.games)
        .sort((gameA, gameB) => new Date(gameB.updated_at).getTime() - new Date(gameA.updated_at).getTime())
        .map((game) => {
          const id = game._id;
          return (
            <div key={id} className='card-box'>
              <GameCard
                gameID={id}
                player1={game.player_black.name}
                player2={game.player_white.name}
                player1Rating={game.player_black.elo}
                player2Rating= {game.player_white.elo}
                playerFavor={getFavoredPlayer(game.odds)}
                gameOdds = {game.odds}
                earnings={10.9}/>
            </div>
          );
        })}
      <h3 className='betting-header'>Continue Watching 👀</h3>
      {Object.keys(props.games).map((id) => {
        const game = props.games[id];
        return (
          <div key={id} className='card-box'>
            <GameCard
              gameID={id}
              player1={game.player_black.name}
              player2={game.player_white.name}
              player1Rating={game.player_black.elo}
              player2Rating= {game.player_white.elo}
              playerFavor={getFavoredPlayer(game.odds)}
              gameOdds = {game.odds}
              earnings={10.9}/>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
