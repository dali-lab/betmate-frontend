import SignOutPanel from 'containers/authentication/signOutPanel';
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export interface NavBarProps {
  isAuthenticated: boolean,
  firstName: string,
}

const NavBar: React.FC<NavBarProps> = (props) => {
  return (
    <div className="nav-container">
      <div className="left-side">
        <NavLink to="/"><img src={logo} alt="logo" /></NavLink>
        <h1>BetMate</h1>
      </div>
      <div className="right-side">
        <button>
          <NavLink to="/">home</NavLink>
        </button>
        {props.isAuthenticated
          ? (
            <>
              {/* <button>
                <NavLink to="/user">Account</NavLink>
              </button> */}
              <button>
                <SignOutPanel />
              </button>
            </>
          ) : (
            <>
              <button>
                <NavLink to="/signin">sign in</NavLink>
              </button>
              <button>
                <NavLink to="/signup">sign up</NavLink>
              </button>
            </>
          )}
      </div>
    </div>
  );
};

export default NavBar;
