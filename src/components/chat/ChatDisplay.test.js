import {render, screen} from '@testing-library/react';
import ChatDisplay from './ChatDisplay';
import {COMMAND_DATA} from '../../constants/commands';

describe('ChatDisplay', () => {
  const MOCK_MESSAGES = [
    {
      body: 'My message 1',
      ownedByCurrentUser: true,
    },
    {
      body: 'My message 2',
      ownedByCurrentUser: true,
    },
    {
      body: 'My message 3',
      ownedByCurrentUser: true,
    },
    {
      body: 'My thought',
      command: 'think',
      ownedByCurrentUser: true,
    },
    {
      body: 'Their message',
      ownedByCurrentUser: false,
    },
    {
      body: 'Their thought',
      command: 'think',
      ownedByCurrentUser: false,
    },
  ];

  const setup = () => {
    render(<ChatDisplay messages={MOCK_MESSAGES} />);
  };

  beforeEach(() => setup());

  it('Displays messages and thoughts classified correctly', () => {
    const myMessages = screen.getAllByTestId('message-mine');
    const myThoughts = screen.getAllByTestId('thought-message-mine');
    const theirMessages = screen.getAllByTestId('message-theirs');
    const theirThoughts = screen.getAllByTestId('thought-message-theirs');

    const myMockMessages = MOCK_MESSAGES.filter((m) => m.ownedByCurrentUser && !m.command);
    const myMockThoughts = MOCK_MESSAGES.filter(
      (m) => m.ownedByCurrentUser && m.command === COMMAND_DATA.think.key
    );
    const theirMockMessages = MOCK_MESSAGES.filter((m) => !m.ownedByCurrentUser && !m.command);
    const theirMockThoughts = MOCK_MESSAGES.filter(
      (m) => !m.ownedByCurrentUser && m.command === COMMAND_DATA.think.key
    );

    expect(myMessages).toHaveLength(myMockMessages.length);
    expect(myThoughts).toHaveLength(myMockThoughts.length);
    expect(theirMessages).toHaveLength(theirMockMessages.length);
    expect(theirThoughts).toHaveLength(theirMockThoughts.length);
  });
});
