/* eslint-disable no-unused-vars */
import React, {
  useEffect, useState,
} from 'react';
import { useHistory } from 'react-router';
import { jwtSignIn } from 'store/actionCreators/authActionCreators';
import { createWager } from 'store/actionCreators/wagerActionCreators';
import { Game } from 'types/resources/game';

interface SubmitWagerProps {
  panelLoading: boolean
  setPanelLoading: React.Dispatch<React.SetStateAction<boolean>>
  isAuthenticated: boolean,
  jwtSignIn: typeof jwtSignIn,
  createWager: typeof createWager,
  isLoading: boolean,
  errorMessages: string[],
  wager: string,
  wagerAmount: number,
  games: Record<string, Game>,
  betType: 'wdl' | 'move',
}

const SubmitWager: React.FC<SubmitWagerProps> = (props) => {
  const [submissionStatus, setSubmissionStatus] = useState('');
  // const [panelLoading, setPanelLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    // loading
    if (props.isLoading === true && props.panelLoading) {
      setSubmissionStatus('loading');

    // finished loading
    } else if (props.isLoading === false && props.panelLoading) {
      // error
      if (props.errorMessages.length !== 0) {
        setSubmissionStatus('error');
      } else { // successful submission occurred
        setSubmissionStatus('success');
        setTimeout(() => setSubmissionStatus(''), 5000);
      }
      props.setPanelLoading(false);
      if (props.isAuthenticated) props.jwtSignIn(); // updates the user balance post-bet
    }
  }, [props.isLoading, props.errorMessages.length, props.panelLoading]);

  useEffect(() => {
    setSubmissionStatus('');
  }, []);

  useEffect(() => {
    props.setPanelLoading(false);
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (props.wager && props.wagerAmount) {
  //     props.createWager(
  //       gameId,
  //       props.wager,
  //       props.wagerAmount,
  //       props.betType === 'wdl',
  //       props.betType === 'wdl' ? 1 / props.games[gameId].odds[props.wager] : 3, // TODO: don't hardcode move odds
  //       props.games[gameId].move_hist.length + 1,
  //     );
  //     setPanelLoading(true);
  //   }
  // };

  const goToSignUp = (e) => {
    e.preventDefault();
    history.push('/signup');
  };

  return (
    <div className='message-container'>
      {!props.isAuthenticated && (
        <input
          type="submit"
          value='Sign up to submit'
          onClick={goToSignUp}
        />
      )}
      {props.isLoading && submissionStatus === 'loading' ? <p className="status-text">Submitting bet...</p> : null}
      {props.errorMessages && submissionStatus === 'error' ? <p className="status-text">{props.errorMessages[0]}</p> : null}
      {!props.isLoading && submissionStatus === 'success' ? <p className="status-text">Wager successfully submitted!</p> : null}
    </div>
  );
};

export default SubmitWager;
