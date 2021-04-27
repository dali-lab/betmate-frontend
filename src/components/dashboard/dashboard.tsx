import React from 'react';
import './dashboard.scss';

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
      <div>
        <h3 className='betting-header'>continue betting</h3>
      </div>
    </div>

  );
};

export default Dashboard;
