import {fireEvent, render, screen} from '@testing-library/react';
import CommandTooltip from './CommandTooltip';
import {COMMAND_DATA} from '../constants/commands';

describe('CommandTooltip', () => {
  const MOCK_VALID_COMMANDS = ['think', 'oops'];
  const MOCK_INVALID_COMMANDS = ['asdf', 'foo'];

  const mockPickCommand = jest.fn();

  beforeEach(() => {
    mockPickCommand.mockClear();
  });

  it('Renders list of valid commands in order', () => {
    render(<CommandTooltip commands={MOCK_VALID_COMMANDS} onPickCommand={mockPickCommand} />);

    const commands = screen.getAllByTestId('command-tooltip');

    expect(commands).toHaveLength(MOCK_VALID_COMMANDS.length);
    commands.forEach((command, i) => {
      const commandKey = MOCK_VALID_COMMANDS[i];
      expect(command).toHaveTextContent(COMMAND_DATA[commandKey].textString);
      expect(command).toHaveTextContent(COMMAND_DATA[commandKey].tooltip);
    });
  });

  it('Does not render invalid commands', () => {
    render(<CommandTooltip commands={MOCK_INVALID_COMMANDS} onPickCommand={mockPickCommand} />);

    const commands = screen.queryAllByTestId('command-tooltip');
    expect(commands).toHaveLength(0);
  });

  it('Handles clicking on an item', () => {
    render(<CommandTooltip commands={MOCK_VALID_COMMANDS} onPickCommand={mockPickCommand} />);

    const commands = screen.getAllByTestId('command-tooltip');
    commands.forEach((command, i) => {
      const commandKey = MOCK_VALID_COMMANDS[i];
      fireEvent.click(command);
      expect(mockPickCommand).toHaveBeenLastCalledWith(COMMAND_DATA[commandKey].textString);
    });
  });
});
