import React from 'react';
import { NavLink } from 'react-router-dom';
import { signOutUser as signOutUserType } from '../../../store/actionCreators/authActions';

export interface SignOutPanelProps {
  signOutUser: typeof signOutUserType
}

const SignOutPanel: React.FC<SignOutPanelProps> = ({ signOutUser }) => {
  return (
    <div>
      <NavLink to="/" onClick={() => signOutUser()}>Sign Out</NavLink>
    </div>
  );
};

export default SignOutPanel;
