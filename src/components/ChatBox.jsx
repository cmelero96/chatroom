import React, {useRef, useState} from 'react';
import {COMMANDS} from '../constants/commands';

import './ChatBox.css';
import CommandTooltip from './CommandTooltip';

const ChatBox = ({onSendMessage}) => {
  const [newMessage, setNewMessage] = useState('');
  const [validCommands, setValidCommands] = useState([]);
  const textareaRef = useRef(null);

  const handleNewMessageChange = (event) => {
    const message = event.target.value;

    if (message.startsWith('/')) {
      setValidCommands(COMMANDS.filter((c) => c.startsWith(message.slice(1))));
    } else {
      setValidCommands([]);
    }

    setNewMessage(message);
  };

  const handleSendMessage = () => {
    onSendMessage(newMessage);
    setNewMessage('');
  };

  const handlePickCommand = (command) => {
    setNewMessage(command + ' ');
    setValidCommands([]);
    textareaRef.current.focus();
  };

  const handleKeyboardEvent = (event) => {
    const key = event.code;

    if (key === 'Enter' && !event.shiftKey) {
      handleSendMessage();
      event.preventDefault()
    }

    if (key === 'Escape') {
      setValidCommands([]);
      event.preventDefault()
    }
  };

  return (
    <div className="chatbox-wrapper">
      {!!validCommands.length && (
        <CommandTooltip commands={validCommands} onPickCommand={handlePickCommand} />
      )}
      <textarea
        ref={textareaRef}
        value={newMessage}
        onChange={handleNewMessageChange}
        onKeyDown={handleKeyboardEvent}
        placeholder="Write message or type '/' for commands"
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default ChatBox;
