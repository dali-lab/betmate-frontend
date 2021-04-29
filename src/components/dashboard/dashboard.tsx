import React, { useEffect } from 'react';
import './dashboard.scss';
import { fetchGameById } from 'store/actionCreators/gameActionCreators';
import GameCard from './gameCard/gameCard';
import filler from './currentGamesDummy';

export interface DashboardProps {
  fetchGameById: typeof fetchGameById
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  useEffect(() => {
    props.fetchGameById('6089db6dbc142e14a0672f82');
  });

  return (
    <div>
      <div className='main-dashboard'>
        <h1 className='welcome-message'>Welcome, Ben</h1>
        <input
          className='searchBar'
          placeholder= 'search for a game, player, or type of chess'
        />
        <div className='browse-button'>
          <button>Browse</button>
        </div>
      </div>
      {console.log(props.fetchGameById('6089db6dbc142e14a0672f82'))}
      <h3 className='betting-header'>Continue Betting</h3>
      {filler.map((i) => (
        <div key='key' className='card-box'>
          <GameCard
            gameID={i.gameID}
            player1={i.player1}
            player2={i.player2}
            player1Rating={i.player1Rating}
            player2Rating= {i.player2Rating}
            playerFavor={i.playerFavor}
            earnings={i.earnings}/>
        </div>
      ))}
      <h3 className='betting-header'>Matches</h3>
      {filler.map((i) => (
        <div key='key' className='card-box'>
          <GameCard
            gameID={i.gameID}
            player1={i.player1}
            player2={i.player2}
            player1Rating={i.player1Rating}
            player2Rating= {i.player2Rating}
            playerFavor={i.playerFavor}
            earnings={i.earnings}/>
        </div>
      ))}
    </div>

  );
};

export default Dashboard;
