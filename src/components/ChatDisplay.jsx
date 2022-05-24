import React from 'react';

import './ChatDisplay.css';

const ChatDisplay = ({messages}) => {
  return (
    <div className="messages-container">
      <ol className="messages-list">
        {messages.map((message, i) => (
          <li
            key={i}
            className={`message-item ${
              message.ownedByCurrentUser ? 'my-message' : 'received-message'
            } ${message.command ? 'message-thought' : ''}`}
          >
            {message.body}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ChatDisplay;
