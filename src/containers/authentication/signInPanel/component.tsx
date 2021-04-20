import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { signInUser as signInUserType } from '../../../store/actionCreators/authActionCreators';

export interface SignInPanelProps extends RouteComponentProps {
  isAuthenticated: boolean,
  isLoading: boolean,
  errorMessages: string[],
  signInUser: typeof signInUserType
}

const SignInPanel: React.FC<SignInPanelProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (props.isAuthenticated) {
      props.history.push('/admin');
    }
  });

  const handleEmailUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!email) {
      console.warn('Please enter an email address!');
    } else if (!password) {
      console.warn('Please enter a password!');
    } else {
      // Send only if all fields filled in
      await props.signInUser(email, password);
      props.history.push('/admin');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={handleEmailUpdate} />
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordUpdate} />
        <input type="submit" value="Sign In" />
      </form>
      {props.isLoading ? <div>Authenticating...</div> : props.errorMessages[0]}
    </div>
  );
};

export default SignInPanel;
