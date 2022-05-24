import React, { useEffect, useState } from "react";
import { COMMAND_DATA } from "../constants/commands";

import "./CommandTooltip.css";

const CommandTooltip = ({commands}) => {
  const [commandsData, setCommandsData] = useState([]);

  useEffect(() => {
    const data = commands.map((command) => COMMAND_DATA[command]);

    setCommandsData(data);
  }, [commands])

  return (
    <ul className="command-tooltip-container">
      {commandsData.map(command => (
        <li className="command-tooltip" key={command.key}>
          <div className="command-wrapper">
            <span className="command-name">{"/" + command.key}</span>
            {command.parameterized && <span className="command-parameter">{"<some_text>"}</span>}
            <span className="command-tooltip">{command.tooltip}</span>
          </div>
        </li>
      ))}
    </ul>
  )
};

export default CommandTooltip;