import React, { useEffect } from 'react';
import { fetchWagers } from 'store/actionCreators/wagerActionCreators';
import { User } from 'types/resources/user';
import { Wager } from 'types/resources/wager';

import './style.scss';

interface UserProps {
  user: User | null
  wagers: Record<string, Wager>
  fetchWagers: typeof fetchWagers
}

const UserPage: React.FC<UserProps> = (props) => {
  useEffect(() => {
    props.fetchWagers();
  }, []);

  return (
    <div className="background">
      <div>Account: {props.user?.account}</div>
      <div>
        {Object.values(props.wagers)
          .sort((wA, wB) => new Date(wB.updated_at).getTime() - new Date(wA.updated_at).getTime())
          .map((wager) => (
            <div key={wager._id} className="user-wager">
              <div>
                <p>Type: {wager.wdl ? 'WDL' : 'move'}</p>
                <p>Data: {wager.data}</p>
                <p>Amount: {wager.amount}</p>
              </div>
              <div>
                <p>Status: {wager.status}</p>
                <p>Created: {new Date(wager.created_at).toUTCString()}</p>
                <p>Updated: {new Date(wager.updated_at).toUTCString()}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserPage;
