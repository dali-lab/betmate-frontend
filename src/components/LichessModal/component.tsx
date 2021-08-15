/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import './style.scss';

interface LichessModalProps {
  setShowLichessModal: React.Dispatch<React.SetStateAction<boolean>>
}

const LichessModal: React.FC<LichessModalProps> = (props) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="blur-background">
      <div className="lichess-modal-container">
        <div className="lichess-modal-padding">
          <div className='find-match'>
            <h1>1. Find a Lichess match</h1>
            <button className='find-button' type='button'>
              <a href='https://lichess.org/games' target='_blank' rel='noreferrer'>here</a>
            </button>

          </div>
          <h1>2. Copy and past a URL link below</h1>
          <form className="pregame-body-container" onSubmit={handleSubmit}>
            <input
              type="text"
              name='url'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder='https://lichess.com/id'
            />
            <input type='submit' value='Submit' />
          </form>
          <button
            className="exit-button"
            type="button"
            onClick={() => props.setShowLichessModal(false) }
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default LichessModal;
