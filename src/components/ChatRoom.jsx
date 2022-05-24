import React, { useState } from "react";

import "./ChatRoom.css";
import useChat from "../hooks/useChat";
import { useParams } from 'react-router-dom'

import { COMMANDS, TOOLTIPS } from "../constants/commands";

const ChatRoom = (props) => {
  const { roomId } = useParams();
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");

  const [nickname, setNickname] = useState("");
  const [validCommands, setValidCommands] = useState([]);

  const handleNewMessageChange = (event) => {
    const message = event.target.value;

    if (message.startsWith("/")) {
      setValidCommands(COMMANDS.filter(c => c.startsWith(message.slice(1))));
    } else {
      setValidCommands([]);
    }

    setNewMessage(message);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <header className="header">
        <h1 className="room-name">Room: {roomId}</h1>
        {nickname && <div className="nickname-header">
          Logged in as <b><i>{nickname}</i></b>
        </div>}
      </header>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message or type '/' for commands"
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default ChatRoom;