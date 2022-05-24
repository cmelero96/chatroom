import {useEffect, useRef, useState} from 'react';
import socketIOClient from 'socket.io-client';
import {COMMAND_DATA} from '../constants/commands';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'; // Name of the event
const SOCKET_SERVER_URL = 'http://localhost:4000';

const getCommandInfo = (messageBody) => {
  if (!messageBody.startsWith('/')) return;

  const words = messageBody.slice(1).split(' ');
  const [command, parameter] = [words.shift(), words.join(' ')];

  if (command === COMMAND_DATA.nick.key) {
    return {command: 'nick', body: parameter};
  }
  if (command === COMMAND_DATA.think.key) {
    return {command: 'think', body: parameter};
  }
  if (command === COMMAND_DATA.oops.key) {
    return {command: 'oops'};
  }
};

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: {roomId},
    });

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      ...getCommandInfo(messageBody),
    });
  };

  return {messages, sendMessage};
};

export default useChat;
