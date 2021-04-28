import React from 'react';
import './dashboard.scss';
import GameCard from './gameCard';
import filler from './currentGamesDummy';

const Dashboard = () => {
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
      <h3 className='betting-header'>continue betting</h3>
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
