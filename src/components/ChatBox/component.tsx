import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Wager } from 'types/resources/wager';
import { fetchWagers } from 'store/actionCreators/wagerActionCreators';

import './style.scss';
import { ChatWager } from './helper_components';
import { createFeedWager } from './utils';

interface ChatBoxProps {
  resolvedWagers: Wager[]
  fetchWagers: typeof fetchWagers
}

const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const { id: gameId } = useParams<{ id: string }>();

  const resolvedWagers = props.resolvedWagers
    .filter((w) => w.game_id === gameId)
    .map(createFeedWager)
    .flat()
    .sort((fwA, fwB) => new Date(fwA.time).getTime() - new Date(fwB.time).getTime())
    .map((fw) => <ChatWager wager={fw} key={`${fw._id}_${fw.time}`} />);

  useEffect(() => {
    props.fetchWagers();
  }, []);

  return (
    <div className="chat-container">
      <h1>Betting Chat 💬</h1>
      <ScrollToBottom className="chat-box" followButtonClassName="follow-button">
        {resolvedWagers}
      </ScrollToBottom>
    </div>
  );
};

export default ChatBox;
