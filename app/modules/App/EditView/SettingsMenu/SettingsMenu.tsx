import * as React from 'react';
import { Button, Menu, MenuItem, Popover, Position } from '@blueprintjs/core';
import './settings-menu.scss';

interface SettingsMenu {
  deviceDimension: {
    width: number;
    height: number;
  };
  updateDeviceDimension: Function;
}

const SettingsMenu = ({ deviceDimension, updateDeviceDimension }: SettingsMenu) => {
  const screenSizes = [[1920, 1080], [1366, 768], [1280, 1024], [1280, 800], [1024, 768]];

  const screenSizeSelection = (
    <Menu>
      {
        screenSizes.map((screenSize, key) => (
          <MenuItem
            key={ key }
            text={ `${screenSize[0]}x${screenSize[1]}` }
            onClick={ () => updateDeviceDimension({ width: screenSize[0], height: screenSize[1] }) }/>
        ))
      }
    </Menu>
  );

  return (
    <div id="settings-menu-container">
      <Popover
        content={ screenSizeSelection }
        position={ Position.BOTTOM_RIGHT } >
        <Button
          className="pt-intent-primary"
          iconName="desktop"
          text={ `${deviceDimension.width}x${deviceDimension.height}` } />
      </Popover>
    </div>
  );
};

export default SettingsMenu;
