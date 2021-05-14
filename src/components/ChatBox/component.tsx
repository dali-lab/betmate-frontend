import React, { useEffect } from 'react';
import { useParams } from 'react-router';
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
      <div className="chat-box">
        <h1>Chat</h1>
        {resolvedWagers.map((w) => <ChatWager wager={w} key={w._id} />)}
      </div>
    </div>
  );
};

export default ChatBox;
