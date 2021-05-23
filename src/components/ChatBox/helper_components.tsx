import React from 'react';
import { FeedWager, WagerStatus } from 'types/resources/wager';
import { getFeedMessage } from './utils';

import './style.scss';

interface ChatWagerProps {
  wager: FeedWager
}

const bgColor = {
  [WagerStatus.PENDING]: '#F8FFAB',
  [WagerStatus.WON]: '#CDFFBC',
  [WagerStatus.LOST]: '#FFCDC6',
  [WagerStatus.CANCELLED]: '#aaa',
};

export const ChatWager: React.FC<ChatWagerProps> = ({ wager }) => (
  <div key={wager._id} className="chat-wager" style={{ backgroundColor: bgColor[wager.status] ?? '#aaa' }}>
    <p>{getFeedMessage(wager.status, wager.data, wager.wdl, wager.amount, wager.odds)}</p>
  </div>
);
