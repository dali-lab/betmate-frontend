import React, { useEffect, useState } from 'react';
import { fetchGamesByStatus, clearGames } from 'store/actionCreators/gameActionCreators';
import { Game, GameSource } from 'types/resources/game';
import Leaderboard from 'components/Leaderboard';
import GameCard from 'components/GameCard/component';
// import magnifier from 'assets/dashboard/magnifier.svg';
import './style.scss';

export interface DashboardProps{
  fetchGamesByStatus: typeof fetchGamesByStatus
  clearGames: typeof clearGames
  games: Game[];
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const [topGame, setTopGame] = useState<Game>();
  const [showLichessModal, setShowLichessModal] = useState(false);

  const gameRating = (game: Game) => game.player_black.elo + game.player_white.elo;
  const getTime = (game: Game) => new Date(game.created_at).getTime();

  useEffect(() => {
    props.clearGames();
    props.fetchGamesByStatus(['not_started', 'in_progress']);
  }, []);

  useEffect(() => {
    if (props.games.length === 0) return;
    const newTopGame = props.games.reduce((top, game) => (
      gameRating(top) > gameRating(game) ? top : game
    ));

    setTopGame(newTopGame);
  }, [props.games]);

  const games = props.games
    .filter((g) => g !== topGame && g.source === GameSource.STATIC)
    .sort((gameA, gameB) => getTime(gameB) - getTime(gameA));

  const liveGames = props.games
    .filter((g) => g.source === GameSource.LICHESS)
    .sort((gameA, gameB) => getTime(gameB) - getTime(gameA));

  return props.games.length === 0
    ? <div>Loading...</div>
    : (
      <div className='main-page'>
        {/* {showLichessModal && <} */}
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
                <GameCard game={topGame} topGame />
              </div>
            </div>
          )}
          <Leaderboard />
        </div>
        <h3 className='betting-header'>Live Matches 🔎</h3>
        <div className='match-container'>
          <div className='card-box add-game'>
            <div className='add-card'>
              <p className='add-head'>+ add match from Lichess</p>
              <p className='add-status'>{liveGames.length}/8 matches being used</p>
              <button className='add-button' onClick={() => setShowLichessModal(true)}>add match</button>
            </div>
          </div>
        </div>
        <h3 className='betting-header'>Current Matches 👀</h3>
        <div className="match-container">
          {games.map((game, i) => (
            <div key={game._id} className={`card-box ${i % 2 ? 'pink' : 'orange'}`}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>
    );
};

export default Dashboard;
