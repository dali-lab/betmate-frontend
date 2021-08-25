import React, {
  useEffect, useState,
} from 'react';
import { useHistory } from 'react-router';
import { jwtSignIn } from 'store/actionCreators/authActionCreators';

interface WagerMessagesProps {
  panelLoading: boolean
  setPanelLoading: React.Dispatch<React.SetStateAction<boolean>>
  isAuthenticated: boolean,
  jwtSignIn: typeof jwtSignIn,
  isLoading: boolean,
  errorMessages: string[],
}

const WagerMessages: React.FC<WagerMessagesProps> = (props) => {
  const [submissionStatus, setSubmissionStatus] = useState('');

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
      }
      setTimeout(() => setSubmissionStatus(''), 5000);
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

  const goToSignUp = (e) => {
    e.preventDefault();
    history.push('/signup');
  };

  return (
    <>
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
    </>
  );
};

export default WagerMessages;
