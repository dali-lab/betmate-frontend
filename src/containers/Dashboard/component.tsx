import React, { useEffect } from 'react';
import { fetchGamesByStatus } from 'store/actionCreators/gameActionCreators';
import { Game } from 'types/resources/game';
import { RouteComponentProps } from 'react-router';
import GameCard from './GameCard/gameCard';
import './style.scss';

export interface DashboardProps extends RouteComponentProps{
  fetchGamesByStatus: typeof fetchGamesByStatus
  games: Record<string, Game>;
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  useEffect(() => {
    props.fetchGamesByStatus('not_started');
  }, []);

  return (
    <div>
      <div className='main-dashboard'>
        <input
          className='searchBar'
          placeholder= 'search for a game, player, or type of chess'
        />
        <div className='browse-button'>
          <button>Browse</button>
        </div>
      </div>
      <h3 className='betting-header'>Continue Betting</h3>
      {Object.keys(props.games).map((id) => {
        const game = props.games[id];
        return (
          <div key={id} className='card-box' onClick={() => props.history.push(`/chess/${id}`)}>
            <GameCard
              gameID={id}
              player1={game.player_black.name}
              player2={game.player_white.name}
              player1Rating={game.player_black.elo}
              player2Rating= {game.player_black.elo}
              playerFavor={game.game_status === 'white_win' ? 'white' : 'black'}
              earnings={10.9}/>
          </div>
        );
      })}
      <h3 className='betting-header'>Matches</h3>
      {Object.keys(props.games).map((id) => {
        const game = props.games[id];
        return (
          <div key={id} className='card-box'>
            <GameCard
              gameID={id}
              player1={game.player_black.name}
              player2={game.player_white.name}
              player1Rating={game.player_black.elo}
              player2Rating= {game.player_black.elo}
              playerFavor={game.game_status === 'white_win' ? 'white' : 'black'}
              earnings={10.9}/>
          </div>
        );
      })}
    </div>

  );
};

export default Dashboard;
