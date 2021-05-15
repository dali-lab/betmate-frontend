import React, {
  useEffect, useState,
} from 'react';
import { useHistory, useParams } from 'react-router';
import { jwtSignIn } from 'store/actionCreators/authActionCreators';
import { createWager } from 'store/actionCreators/wagerActionCreators';
import { Game } from 'types/resources/game';

interface SubmitWagerProps {
  isAuthenticated: boolean,
  jwtSignIn: typeof jwtSignIn,
  createWager: typeof createWager,
  isLoading: boolean,
  errorMessages: string[],
  wager: string,
  wagerAmount: number,
  games: Record<string, Game>,
}

const SubmitWager: React.FC<SubmitWagerProps> = (props) => {
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [panelLoading, setPanelLoading] = useState(false);

  const { id: gameId } = useParams<{ id: string }>();
  const history = useHistory();

  useEffect(() => {
    // loading
    if (props.isLoading === true && panelLoading) {
      setSubmissionStatus('loading');

    // finished loading
    } else if (props.isLoading === false && panelLoading) {
      // error
      if (props.errorMessages.length !== 0) {
        setSubmissionStatus('error');
      } else { // successful submission occurred
        setSubmissionStatus('success');
      }
      setPanelLoading(false);
      if (props.isAuthenticated) props.jwtSignIn(); // updates the user balance post-bet
    }
  }, [props.isLoading, props.errorMessages.length, panelLoading]);

  useEffect(() => {
    setSubmissionStatus('');
  }, []);

  useEffect(() => {
    setPanelLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPanelLoading(true);
    if (props.wager && props.wagerAmount) {
      props.createWager(
        gameId,
        props.wager,
        props.wagerAmount,
        true,
        1 / props.games[gameId].odds[props.wager], // TODO: don't hardcode move odds
        props.games[gameId].move_hist.length + 1,
      );
    }
  };

  const goToSignUp = (e) => {
    e.preventDefault();
    history.push('/signup');
  };

  return (
    <>
      <input
        type="submit"
        value={props.isAuthenticated ? 'Submit' : 'Sign up to submit'}
        onClick={props.isAuthenticated ? handleSubmit : goToSignUp }
      />
      {props.isLoading && submissionStatus === 'loading' ? <p className="status-text">Submitting bet...</p> : null}
      {props.errorMessages && submissionStatus === 'error' ? <p className="status-text">{props.errorMessages[0]}</p> : null}
      {!props.isLoading && submissionStatus === 'success' ? <p className="status-text">Wager successfully submitted!</p> : null}
    </>
  );
};

export default SubmitWager;
