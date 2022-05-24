import React, {useState} from 'react';
import {COMMANDS} from '../constants/commands';

import './ChatBox.css';
import CommandTooltip from './CommandTooltip';

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
    onSendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <>
      {!!validCommands.length && <CommandTooltip commands={validCommands} />}
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
