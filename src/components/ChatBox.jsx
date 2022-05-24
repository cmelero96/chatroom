import React, { useState } from 'react';
import {COMMANDS, TOOLTIPS} from '../constants/commands';

import "./ChatBox.css";

const ChatBox = ({onSendMessage}) => {
  const [newMessage, setNewMessage] = useState('');
  const [validCommands, setValidCommands] = useState([]);

  const handleNewMessageChange = (event) => {
    const message = event.target.value;

    if (message.startsWith('/')) {
      setValidCommands(COMMANDS.filter((c) => c.startsWith(message.slice(1))));
    } else {
      setValidCommands([]);
    }

    setNewMessage(message);
  };

  const handleSendMessage = (event) => {
    console.log(event);
    onSendMessage(newMessage);
    setNewMessage('');
  }

  return (
    <>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message or type '/' for commands"
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </>
  );
};

export default ChatBox;
