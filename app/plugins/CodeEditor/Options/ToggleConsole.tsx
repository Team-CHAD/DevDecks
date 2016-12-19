import * as React from 'react';
import { remote } from 'electron';
import { Button, Intent } from '@blueprintjs/core';

interface ToggleConsoleProps {
  pluginState: any;
  updateCurrentPlugin: Function;
}

const ToggleConsole = ({ pluginState, updateCurrentPlugin }: ToggleConsoleProps) => {
  const webContents = remote.getCurrentWebContents();
  const isDevToolsOpened = webContents.isDevToolsOpened();
  return (
    <li>
      <Button
        text="Toggle Console"
        intent={ isDevToolsOpened ? Intent.SUCCESS : Intent.NONE }
        onClick={ () => webContents.toggleDevTools() } />
    </li>
  );
}

export default ToggleConsole;
