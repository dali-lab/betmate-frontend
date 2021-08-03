import React from 'react';
import { NavLink } from 'react-router-dom';
import { signOutUser as signOutUserType } from 'store/actionCreators/authActionCreators';

export interface SignOutPanelProps {
  signOutUser: typeof signOutUserType
}

const SignOutPanel: React.FC<SignOutPanelProps> = ({ signOutUser }) => {
  return (
    <div>
      <NavLink to="/" onClick={() => signOutUser()}>sign out</NavLink>
    </div>
  );
};

export default SignOutPanel;
