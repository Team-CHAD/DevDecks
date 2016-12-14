import * as React from 'react';
import { connect } from 'react-redux';

import FontBold from './FontBold/FontBold';
import FontItalics from './FontItalics/FontItalics';
import FontSize from './FontSize/FontSize';
import FontUnderline from './FontUnderline/FontUnderline';
import CodeLang from './CodeOptions/CodeLang';
import CodeTheme from './CodeOptions/CodeTheme';
import DeletePlugin from './DeletePlugin/DeletePlugin';

interface OptionsBarProps {
  currentSelectedPlugin: any;
  deleteCurrentPlugin: any;
  pluginNumber: number;
  pluginState: any;
  slideNumber: number;
  updateCurrentPlugin: Function;
}

const OptionsBar = ({ currentSelectedPlugin, deleteCurrentPlugin, pluginNumber, pluginState, slideNumber, updateCurrentPlugin }: OptionsBarProps) => {
  const shouldBeHidden: boolean = currentSelectedPlugin.slideNumber !== slideNumber || currentSelectedPlugin.pluginNumber !== pluginNumber ? true : false;

  return (
    <div style={{ display: shouldBeHidden ? 'none' : 'initial', position: 'absolute', top: -30, left: 0 }}>
        <FontSize
          pluginState={ pluginState }
          updateCurrentPlugin={ updateCurrentPlugin.bind(this, pluginNumber, slideNumber) } />
        <FontBold
          pluginState={ pluginState }
          updateCurrentPlugin={ updateCurrentPlugin.bind(this, pluginNumber, slideNumber) } />
        <FontItalics
          pluginState={ pluginState }
          updateCurrentPlugin={ updateCurrentPlugin.bind(this, pluginNumber, slideNumber) } />
        <FontUnderline
          pluginState={ pluginState }
          updateCurrentPlugin={ updateCurrentPlugin.bind(this, pluginNumber, slideNumber) } />
        <CodeLang
          pluginState={ pluginState }
          updateCurrentPlugin={ updateCurrentPlugin.bind(this, pluginNumber, slideNumber) } />
        <CodeTheme
          pluginState={ pluginState }
          updateCurrentPlugin={ updateCurrentPlugin.bind(this, pluginNumber, slideNumber) } />
        <DeletePlugin
          deleteCurrentPlugin={ deleteCurrentPlugin.bind(this, pluginNumber, slideNumber) } />
    </div>
  );
};

export { OptionsBar };
