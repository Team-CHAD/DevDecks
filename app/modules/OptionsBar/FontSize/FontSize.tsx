import * as React from 'react';
import { Menu, MenuDivider, MenuItem, Popover, Position } from "@blueprintjs/core";

interface FontSizeProps {
  pluginState: any;
  updateCurrentPlugin: Function;
}

const FontSize = ({ pluginState, updateCurrentPlugin }: FontSizeProps) => {
  const DEFAULT_SIZE = 100;
  const MAGNIFIER = 3;

  const fontSizes = [50, 75, 90, 100, 125, 150, 175, 200, 250, 275, 300];
  const fontSelection = (
    <Menu>
        { 
          fontSizes.map((fontSize, key) => (
            <MenuItem 
              key={ key }
              text={`${fontSize}%`} 
              onClick={() => updateCurrentPlugin({ fontSize: fontSize * MAGNIFIER })} />
          ))
        }
    </Menu>
  );

  return (
    <Popover content={ fontSelection } position={ Position.RIGHT_TOP }>
      <button className="pt-button" type="button">
        { pluginState.fontSize ? `${ pluginState.fontSize / MAGNIFIER }%` : `${ DEFAULT_SIZE }%` }
      </button>
    </Popover>
  );
}

export default FontSize;