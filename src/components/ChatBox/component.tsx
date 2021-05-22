import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Wager } from 'types/resources/wager';
import { fetchWagers } from 'store/actionCreators/wagerActionCreators';

import './style.scss';
import { ChatWager } from './helper_components';

interface ChatBoxProps {
  resolvedWagers: Wager[]
  fetchWagers: typeof fetchWagers
}

const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const { id: gameId } = useParams<{ id: string }>();
  const resolvedWagers = props.resolvedWagers
    .filter((w) => w.game_id === gameId)
    .sort((wA, wB) => new Date(wA.updated_at).getTime() - new Date(wB.updated_at).getTime());

  useEffect(() => {
    props.fetchWagers();
  }, []);

  return (
    <div className="chat-container">
      <h1>Betting Chat 💬</h1>
      <ScrollToBottom className="chat-box">
        {resolvedWagers.map((w) => <ChatWager wager={w} key={w._id} />)}
      </ScrollToBottom>
    </div>
  );
};

export default ChatBox;
