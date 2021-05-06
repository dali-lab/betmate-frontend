import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import './style.scss';
import WagerPanel from 'components/WagerPanel';
import NavBar from 'components/NavBar';
import { useParams } from 'react-router';
import { fetchGameById } from 'store/actionCreators/gameActionCreators';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Chess = require('chess.js');

const chess = new Chess();

interface ChessMatchProps {
  fetchGameById: typeof fetchGameById,
}

interface ParamTypes {
  id: string,
}

const ChessMatch: React.FC<ChessMatchProps> = (props) => {
  const [fen, updateFen] = useState(chess.fen());

  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    props.fetchGameById(id);
  }, []);

  const clicky = () => {
    const moves = chess.moves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
    updateFen(chess.fen());
  };

  return (
    <>
      <NavBar />
      <div className='chess-match-container'>
        <div className="chat-container">
          <div className="chat-box">
            <h1>Chat</h1>
          </div>
        </div>
        <div>
          <button onClick={() => clicky()}/>
          <Chessboard position={fen} width={450}/>
        </div>
        <WagerPanel gameId={id}/>
      </div>
    </>
  );
};

export default ChessMatch;
