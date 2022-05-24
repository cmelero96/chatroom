export const COMMANDS = ['nick', 'think', 'oops'];

export const COMMAND_DATA = {
  nick: {
    key: 'nick',
    parameterized: true,
    tooltip: 'Change your nickname.',
  },
  think: {
    key: 'think',
    parameterized: true,
    tooltip: 'Display a thought, with less visibility than a standard message.',
  },
  oops: {
    key: 'oops',
    parameterized: false,
    tooltip: 'Remove your last message.',
  },
};
