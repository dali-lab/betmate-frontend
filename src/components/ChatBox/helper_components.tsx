import React from 'react';
import { Wager } from 'types/resources/wager';
import { getFeedMessage } from './constants';

import './style.scss';

interface ChatWagerProps {
  wager: Wager
}

export const ChatWager: React.FC<ChatWagerProps> = ({ wager }) => (
  <div key={wager._id} className="chat-wager">
    {/* <p>Type: {wager.wdl ? 'WDL' : 'move'}</p>
    <p>Data: {wager.data}</p>
    <p>Amount: {wager.amount}</p>
    <p>Status: {wager.status}</p> */}
    <p>{getFeedMessage(wager.status, wager.data, wager.wdl, wager.amount, wager.odds)}</p>
  </div>
);
