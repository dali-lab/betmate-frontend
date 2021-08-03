import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ScrollToBottom from 'react-scroll-to-bottom';
import { FeedWager, Wager } from 'types/resources/wager';
import { fetchWagers } from 'store/actionCreators/wagerActionCreators';

import './style.scss';
import { FeedChat } from 'types/resources/game';
import { sendGameChat } from 'store/actionCreators/gameActionCreators';
import { ChatItem } from './helper_components';
import { createFeedWager } from './utils';

interface ChatBoxProps {
  resolvedWagers: Wager[]
  chats: FeedChat[]
  fetchWagers: typeof fetchWagers
  sendGameChat: typeof sendGameChat
}

const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const { id: gameId } = useParams<{ id: string }>();
  const [chat, setChat] = useState('');

  useEffect(() => {
    props.fetchWagers();
  }, []);

  const wagerFeed: FeedWager[] = props.resolvedWagers
    .filter((w) => w.game_id === gameId)
    .map(createFeedWager)
    .flat();

  const feed = (wagerFeed as (FeedWager | FeedChat)[])
    .concat(props.chats)
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  const handleChatUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChat(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (chat.trim() === '') return;
    props.sendGameChat(gameId, chat.trim());
    setChat('');
  };

  return (
    <div className="chat-container">
      <h1>Betting Chat 💬</h1>
      <ScrollToBottom className="chat-box" followButtonClassName="follow-button">
        {feed.map((f) => <ChatItem item={f} key={`${f.time}`} />)}
      </ScrollToBottom>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="send a message" value={chat} onChange={handleChatUpdate} />
        <div className="chat-send" onClick={handleSubmit}>send</div>
      </form>
    </div>
  );
};

export default ChatBox;
