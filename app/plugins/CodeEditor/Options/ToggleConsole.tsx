import * as React from 'react';
import { remote } from 'electron';
import { Button } from '@blueprintjs/core';

interface ToggleConsoleProps {
  pluginState: any;
  updateCurrentPlugin: Function;
}

const ToggleConsole = ({ pluginState, updateCurrentPlugin }: ToggleConsoleProps) => {
  const webContents = remote.getCurrentWebContents();
  return (
    <li>
      <Button
        text="Toggle Console"
        onClick={ () => webContents.toggleDevTools() } />
    </li>
  );
};

export default ToggleConsole;
