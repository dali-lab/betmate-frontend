/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { createLichessGame } from 'store/requests/lichessRequests';
import { getErrorPayload } from 'utils/error';

import './style.scss';

interface LichessModalProps {
  setShowLichessModal: React.Dispatch<React.SetStateAction<boolean>>
}

const LichessModal: React.FC<LichessModalProps> = (props) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data: { gameId } } = await createLichessGame(url);
      history.push(`/chess/${gameId}`);
    } catch (error) {
      setErrorMessage(getErrorPayload(error).message);
      setTimeout(() => setErrorMessage(''), 5000);
    }
    setIsLoading(false);
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
          <h1>2. Copy and paste a URL link below</h1>
          <form className="pregame-body-container" onSubmit={handleSubmit}>
            <input
              type="text"
              name='url'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder='https://lichess.com/id'
            />
            <input type='submit' value={`${isLoading ? 'Loading...' : 'Submit'}`} />
            <p className='lichess-error-message'>{errorMessage}</p>
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
