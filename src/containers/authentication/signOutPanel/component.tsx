import React from 'react';
import { NavLink } from 'react-router-dom';
import { ConnectedThunkCreator } from '../../../types/state';
import { signOutUser as signOutUserType } from '../../../actions/authActions';

export interface SignOutPanelProps {
  signOutUser: ConnectedThunkCreator<typeof signOutUserType>
}

const SignOutPanel: React.FC<SignOutPanelProps> = ({ signOutUser }) => {
  return (
    <div>
      <NavLink to="/" onClick={() => signOutUser()}>Sign Out</NavLink>
    </div>
  );
};

export default SignOutPanel;
