import React, { useEffect, useState } from 'react';
import { fetchGamesByStatus, clearGames } from 'store/actionCreators/gameActionCreators';
import { Game } from 'types/resources/game';
import GameCard from './GameCard/component';
import Leaderboard from './Leaderboard';
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
  const [topGame, setTopGame] = useState<Game>();

  useEffect(() => {
    props.clearGames();
    props.fetchGamesByStatus(['not_started', 'in_progress']);
  }, []);

  const gameRating = (game: Game) => game.player_black.elo + game.player_white.elo;

  useEffect(() => {
    if (props.games.length === 0) return;
    const newTopGame = props.games.reduce((top, game) => (
      gameRating(top) > gameRating(game) ? top : game
    ));

    setTopGame(newTopGame);
  }, [props.games]);

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
      <div className="top-section">
        {topGame && (
          <div className="featured-section">
            <h2 className="featured-title">Featured Match 🔥</h2>
            <div className="card-box top-game">
              <GameCard
                gameID={topGame._id}
                player1={'Black'}
                player2={'White'}
                player1Rating={topGame.player_black.elo}
                player2Rating={topGame.player_white.elo}
                playerFavor={getFavoredPlayer(topGame.odds)}
                gameOdds={topGame.odds}
                topGame
              />
            </div>
          </div>
        )}
        <Leaderboard />
      </div>
      <h3 className='betting-header'>Current Matches 👀</h3>
      <div className="match-container">
        {props.games
          .filter((g) => g !== topGame)
          .sort((gameA, gameB) => new Date(gameB.created_at).getTime() - new Date(gameA.created_at).getTime())
          .map((game, i) => {
            const id = game._id;
            return (
              <div key={id} className={`card-box ${i % 2 ? 'pink' : 'orange'}`}>
                <GameCard
                  gameID={id}
                  player1={'Black'}
                  player2={'White'}
                  player1Rating={game.player_black.elo}
                  player2Rating={game.player_white.elo}
                  playerFavor={getFavoredPlayer(game.odds)}
                  gameOdds={game.odds}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
