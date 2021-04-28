import React from 'react';

const GameCard = (props) => {
  return (
    <div>
      <p>Game {props.gameID}: {props.player1}({props.player1Rating}) vs {props.player2}({props.player2Rating})</p>
      <p>{props.playerFavor} to win</p>
      <p> Your earnings: ${props.earnings}</p>
    </div>
  );
};

export default GameCard;
