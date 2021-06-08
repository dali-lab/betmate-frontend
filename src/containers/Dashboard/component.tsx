import React, { useEffect } from 'react';
import { fetchGamesByStatus, clearGames } from 'store/actionCreators/gameActionCreators';
import { Game } from 'types/resources/game';
import GameCard from './GameCard/component';
// import magnifier from 'assets/dashboard/magnifier.svg';
import './style.scss';

export interface DashboardProps{
  fetchGamesByStatus: typeof fetchGamesByStatus
  clearGames: typeof clearGames
  games: Game[];
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
    props.clearGames();
    props.fetchGamesByStatus(['not_started', 'in_progress']);
  }, []);

  return (
    <div className='main-page'>
      {/* Commented out for Technigala */}
      {/* <div className='main-dashboard'>
        <img src={magnifier} />
        <input
          className='searchBar'
          placeholder= 'search for a game, player, or type of chess'
        />
        <div >
          <button className='browse-button'>Browse</button>
        </div>
      </div> */}
      <h3 className='betting-header'>Popular Matches 🔥</h3>
      {props.games
        .sort((gameA, gameB) => new Date(gameB.created_at).getTime() - new Date(gameA.created_at).getTime())
        .map((game) => {
          const id = game._id;
          return (
            <div key={id} className='card-box'>
              <GameCard
                gameID={id}
                player1={'Black'}
                player2={'White'}
                player1Rating={game.player_black.elo}
                player2Rating= {game.player_white.elo}
                playerFavor={getFavoredPlayer(game.odds)}
                gameOdds = {game.odds}
                earnings={10.9}/>
            </div>
          );
        })}
      {/* <h3 className='betting-header'>Continue Watching 👀</h3>
      {props.games.map((game) => {
        return (
          <div key={game._id} className='card-box'>
            <GameCard
              gameID={game._id}
              player1={'Black'}
              player2={'White'}
              player1Rating={game.player_black.elo}
              player2Rating= {game.player_white.elo}
              playerFavor={getFavoredPlayer(game.odds)}
              gameOdds = {game.odds}
              earnings={10.9}/>
          </div>
        );
      })} */}
    </div>
  );
};

export default Dashboard;
