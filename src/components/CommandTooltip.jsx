import React, {useEffect, useState} from 'react';
import {COMMAND_DATA} from '../constants/commands';

import './CommandTooltip.css';

const CommandTooltip = ({commands, onPickCommand}) => {
  const [commandsData, setCommandsData] = useState([]);

  useEffect(() => {
    const data = commands.map((command) => COMMAND_DATA[command]);

    setCommandsData(data);
  }, [commands]);

  return (
    <ul className="command-tooltip-container">
      {commandsData.map((command) => (
        <li
          className="command-tooltip"
          key={command.key}
          onClick={() => onPickCommand(command.textString)}
        >
          <span className="command-name">
            <code>{command.textString}</code>
          </span>
          {command.parameterized && (
            <span className="command-parameter">
              <code>{'<some_text>'}</code>
            </span>
          )}
          <span className="command-tooltip-description">{command.tooltip}</span>
        </li>
      ))}
    </ul>
  );
};

export default CommandTooltip;
