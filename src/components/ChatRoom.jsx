import React, {useState} from 'react';

import './ChatRoom.css';
import useChat from '../hooks/useChat';
import {useParams} from 'react-router-dom';

import ChatDisplay from './ChatDisplay';
import ChatBox from './ChatBox';

const ChatRoom = () => {
  const {roomId} = useParams();
  const [nickname, setNickname] = useState('');
  const {messages, sendMessage} = useChat(roomId);

  return (
    <div className="chat-room-container">
      <header className="header">
        <h1 className="room-name">Room: {roomId}</h1>
        {nickname && (
          <div className="nickname-header">
            Logged in as{' '}
            <b>
              <i>{nickname}</i>
            </b>
          </div>
        )}
      </header>
      <ChatDisplay messages={messages} />
      <ChatBox onSendMessage={sendMessage}></ChatBox>
    </div>
  );
};

export default ChatRoom;
