import * as React from 'react';
import { connect } from 'react-redux';

import FontSize from './FontSize/FontSize';
import CodeLang from './CodeOptions/CodeLang';
import CodeTheme from './CodeOptions/CodeTheme';

interface OptionsBarProps {
  currentSelectedPlugin: any;
  pluginNumber: number;
  pluginState: any;
  slideNumber: number;
  updateCurrentSlide: Function;
}

const OptionsBar = ({ currentSelectedPlugin, pluginNumber, pluginState, slideNumber, updateCurrentSlide }: OptionsBarProps) => {
  const shouldBeHidden: boolean = currentSelectedPlugin.slideNumber !== slideNumber || currentSelectedPlugin.pluginNumber !== pluginNumber ? true : false;

  return (
    <div style={{ display: shouldBeHidden ? 'none' : 'initial', position: 'absolute', top: -30, left: 0 }}>
        <FontSize
          pluginState={ pluginState }
          updateCurrentPlugin={ updateCurrentSlide.bind(this, pluginNumber, slideNumber) } />
        <CodeLang
          pluginState={ pluginState }
          updateCurrentPlugin={ updateCurrentSlide.bind(this, pluginNumber, slideNumber) } />
        <CodeTheme
          pluginState={ pluginState }
          updateCurrentPlugin={ updateCurrentSlide.bind(this, pluginNumber, slideNumber) } />
    </div>
  );
};

export { OptionsBar };
