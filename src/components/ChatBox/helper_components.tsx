import React from 'react';

import { FeedWager, WagerStatus } from 'types/resources/wager';
import { FeedChat, GameChat } from 'types/resources/game';
import playerIcon from 'assets/wager_panel/wdl/white_win.svg';
import { getFeedMessage } from './utils';

import './style.scss';

interface ChatWagerProps {
  wager: FeedWager
}

interface ChatMessageProps {
  chat: GameChat
}

interface ChatItemProps {
  item: FeedChat | FeedWager
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

export const ChatMessage: React.FC<ChatMessageProps> = ({ chat }) => {
  const [firstName, lastName] = chat.userName.split(' ').slice(0, 2);
  return (
    <div className="chat-message" key={`${chat.userId}_${chat.time}`}>
      <img className="user-icon" src={playerIcon} />
      <div className="chat-data">
        <p className="user-name">{firstName} {lastName ? `${lastName[0]}.` : ''}</p>
        <p className="chat-text">{chat.chat}</p>
      </div>
    </div>
  );
};

export const ChatItem: React.FC<ChatItemProps> = ({ item }) => {
  switch (item.type) {
    case 'message':
      return <ChatMessage chat={item} />;
    case 'wager':
      return <ChatWager wager={item} />;
    default:
      return <div />;
  }
};
