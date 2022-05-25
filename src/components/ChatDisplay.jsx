import React from 'react';
import { COMMAND_DATA } from '../constants/commands';

import './ChatDisplay.css';

const getDataTestId = (msg) => {
  if (msg.command === COMMAND_DATA.think.key) {
    if (msg.ownedByCurrentUser) return 'thought-message-mine';
    else return 'thought-message-theirs';
  } else {
    if (msg.ownedByCurrentUser) return 'message-mine';
    else return 'message-theirs';
  }
}

const ChatDisplay = ({messages}) => {
  return (
    <div className="messages-container">
      <ol className="messages-list">
        {messages.map((message, i) => (
          <li
            key={i}
            data-testid={getDataTestId(message)}
            className={`message-item ${
              message.ownedByCurrentUser ? 'my-message' : 'received-message'
            } ${message.command === COMMAND_DATA.think.key ? 'message-thought' : ''}`}
          >
            {message.body}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ChatDisplay;
