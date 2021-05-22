import React from 'react';
import { Wager, WagerStatus } from 'types/resources/wager';
import { getFeedMessage } from './constants';

import './style.scss';

export interface FeedWager extends Wager {
  time: Date
}

interface ChatWagerProps {
  wager: FeedWager
}

export const createFeedWager = (wager: Wager): FeedWager[] => ([
  { ...wager, time: wager.created_at, status: WagerStatus.PENDING },
  ...(wager.resolved
    ? [{ ...wager, time: wager.updated_at, odds: wager.wdl ? wager.odds : wager.winning_pool_share ?? 1 }]
    : []),
]);

const getBackgroundColor = (fw: FeedWager) => {
  switch (fw.status) {
    case WagerStatus.PENDING:
      return '#F8FFAB';
    case WagerStatus.WON:
      return '#CDFFBC';
    case WagerStatus.LOST:
      return '#FFCDC6';
    case WagerStatus.CANCELLED:
    default:
      return '#aaa';
  }
};

export const ChatWager: React.FC<ChatWagerProps> = ({ wager }) => (
  <div key={wager._id} className="chat-wager" style={{ backgroundColor: getBackgroundColor(wager) }}>
    {/* <p>Type: {wager.wdl ? 'WDL' : 'move'}</p>
    <p>Data: {wager.data}</p>
    <p>Amount: {wager.amount}</p>
    <p>Status: {wager.status}</p> */}
    <p>{getFeedMessage(wager.status, wager.data, wager.wdl, wager.amount, wager.odds)}</p>
  </div>
);
