import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { signUpUser as signUpUserType } from 'store/actionCreators/authActionCreators';
import logo from '../../../assets/logo.svg';

export interface SignUpPanelProps {
  isAuthenticated: boolean,
  isLoading: boolean,
  errorMessages: string[],
  signUpUser: typeof signUpUserType
}

const SignUpPanel: React.FC<SignUpPanelProps> = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formValidationErrors, setFormValidationErrors] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (props.isAuthenticated) {
      history.push('/');
    }
  }, [props.isAuthenticated]);

  const handleInputUpdate = (setValue: React.Dispatch<React.SetStateAction<string>>) => (
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setFormValidationErrors('');
    if (!firstName) {
      setFormValidationErrors('Please enter your first name!');
    } else if (!lastName) {
      setFormValidationErrors('Please enter your last name!');
    } else if (!email) {
      setFormValidationErrors('Please enter an email address!');
    } else if (!password) {
      setFormValidationErrors('Please enter a password!');
    } else if (!confirmPassword) {
      setFormValidationErrors('Please confirm your password!');
    } else if (confirmPassword !== password) {
      setFormValidationErrors('Please make sure your passwords match!');
    } else {
      // Send only if all fields filled in
      props.signUpUser(email, password, firstName, lastName);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-padding-container">
          <div className="title-container">
            <h1>Betmate</h1>
            <img src={logo} alt="logo"/>
          </div>
          <form className="form-container" onSubmit={handleSubmit}>
            <p>First Name</p>
            <input type="text" value={firstName} onChange={handleInputUpdate(setFirstName)} />
            <p>Last Name</p>
            <input type="text" value={lastName} onChange={handleInputUpdate(setLastName)} />
            <p>Email</p>
            <input type="email" value={email} onChange={handleInputUpdate(setEmail)} />
            <p>Password</p>
            <input type="password" value={password} onChange={handleInputUpdate(setPassword)} />
            <p>Confirm Password</p>
            <input type="password" value={confirmPassword} onChange={handleInputUpdate(setConfirmPassword)} />
            <input type="submit" value="create account" />
          </form>
          <div className="auth-status-message-container">
            {props.isLoading ? <div>Authenticating...</div> : <div>{props.errorMessages[0]}</div>}
            {formValidationErrors && <div>{formValidationErrors}</div>}
          </div>
          <div className="auth-redirect-links">
            <p
              className="auth-redirect-link"
              onClick={() => history.push('/')}
            >
              dashboard
            </p>
            <p className="auth-redirect-link"> | </p>
            <p
              className="auth-redirect-link"
              onClick={() => history.push('/signin')}
            >
              sign in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPanel;
