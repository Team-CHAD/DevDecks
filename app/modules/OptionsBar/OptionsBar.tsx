import * as React from 'react';
import { connect } from 'react-redux';
import { Menu, MenuDivider, MenuItem, Popover, Position } from "@blueprintjs/core";


interface OptionsBarProps {
  currentSelectedPlugin: any;
  isInPresenterMode: boolean;
  pluginNumber: number;
  pluginState: any;
  slideNumber: number;
  updateCurrentSlide: Function;
}

const OptionsBar = ({ currentSelectedPlugin, isInPresenterMode, pluginNumber, pluginState, slideNumber, updateCurrentSlide }: OptionsBarProps) => {
  const shouldBeHidden: boolean = currentSelectedPlugin.slideNumber !== slideNumber || currentSelectedPlugin.pluginNumber !== pluginNumber || isInPresenterMode ? true : false;
  
  const fontSizes = [16, 18, 20, 22, 24, 26, 28, 30];
  const defaultSize = 20;
  const fontSelection = (
    <Menu>
        { 
          fontSizes.map((fontSize, key) => (
            <MenuItem 
              key={ key } 
              text={`${fontSize}px`} 
              onClick={() => updateCurrentSlide(pluginNumber, { fontSize }) } />
          ))
        }
    </Menu>
  );

  return (
    <div style={{ display: shouldBeHidden ? 'none' : 'initial', position: 'absolute', top: -30, left: 0 }}>
        <Popover content={ fontSelection } position={ Position.RIGHT_TOP }>
          <button className="pt-button" type="button">{ pluginState.fontSize ? `${pluginState.fontSize}px` : `${defaultSize}px` }</button>
        </Popover>
    </div>
  );
};

export { OptionsBar };
