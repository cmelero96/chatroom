import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import useChat from '../../hooks/useChat';
import {COMMAND_DATA} from '../../constants/commands';

import ChatDisplay from '../chat/ChatDisplay';
import ChatBox from '../chat/ChatBox';
import './ChatRoom.css';

const ChatRoom = () => {
  const {roomId} = useParams();
  const [ownNickname, setOwnNickname] = useState('');
  const [otherNickname, setOtherNickname] = useState('');
  const {messages, sendMessage} = useChat(roomId);

  const [textMessages, setTextMessages] = useState(messages.filter((msg) => !msg.command));

  useEffect(() => {
    const [lastMessage] = messages.slice(-1);

    if (lastMessage && (!lastMessage.command || lastMessage.command === COMMAND_DATA.think.key)) {
      setTextMessages((prev) => [...prev, lastMessage]);
    } else if (lastMessage && lastMessage.command) {
      const {command, body, ownedByCurrentUser: ownMsg} = lastMessage;
      if (command === COMMAND_DATA.nick.key) {
        ownMsg ? setOwnNickname(body) : setOtherNickname(body);
      }
      if (command === COMMAND_DATA.oops.key) {
        const removeIndex = textMessages.map((msg) => msg.ownedByCurrentUser).lastIndexOf(ownMsg);
        if (removeIndex !== -1) {
          setTextMessages((prev) => [
            ...prev.slice(0, removeIndex),
            ...prev.slice(removeIndex + 1),
          ]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <div className="chat-room-container">
      <header className="header">
        <h1 className="room-name">Room: {roomId}</h1>
        {otherNickname && (
          <div className="nickname-header">
            Chat with&nbsp;
            <b>
              <i>{otherNickname}</i>
            </b>
          </div>
        )}
        {ownNickname && (
          <div className="nickname-header">
            Logged in as&nbsp;
            <b>
              <i>{ownNickname}</i>
            </b>
          </div>
        )}
      </header>
      <ChatDisplay messages={textMessages} />
      <ChatBox onSendMessage={sendMessage}></ChatBox>
    </div>
  );
};

export default ChatRoom;
