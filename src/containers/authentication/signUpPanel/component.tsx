import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import { signUpUser as signUpUserType } from '../../../store/actionCreators/authActions';
import { setError as setErrorType } from '../../../store/actionCreators/requestActions';
import { ConnectedThunkCreator } from '../../../types/state';

export interface SignInPanelProps extends RouteComponentProps {
  isAuthenticated: boolean,
  isLoading: boolean,
  errorMessage: string,
  setError: typeof setErrorType,
  signUpUser: ConnectedThunkCreator<typeof signUpUserType>
}

const SignUpPanel: React.FC<SignInPanelProps> = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (props.isAuthenticated) {
      props.history.push('/admin');
    }
  });

  const handleFirstNameUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmailUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!firstName) {
      props.setError('AUTH_USER', 'Please enter your first name!');
    } else if (!lastName) {
      props.setError('AUTH_USER', 'Please enter your last name!');
    } else if (!email) {
      props.setError('AUTH_USER', 'Please enter an email address!');
    } else if (!password) {
      props.setError('AUTH_USER', 'Please enter a password!');
    } else {
      // Send only if all fields filled in
      props.signUpUser(email, password, firstName, lastName);
      props.history.push('/admin');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameUpdate} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameUpdate} />
        <input type="text" placeholder="Email" value={email} onChange={handleEmailUpdate} />
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordUpdate} />
        <input type="submit" value="Sign Up" />
      </form>
      {props.isLoading ? <div>Authenticating...</div> : props.errorMessage}
    </div>
  );
};

export default SignUpPanel;
