import * as React from 'react';
import FontSize from './FontSize';
import FontBold from './FontBold';
import FontItalics from './FontItalics';
import FontUnderline from './FontUnderline';

interface OptionsMenuProps {
  moduleName: string;
  pluginNumber: number;
  pluginState: any;
  slideNumber: number;
  updateCurrentPlugin: Function;
}

class OptionsMenu extends React.Component<OptionsMenuProps, {}> {
  render() {
    const {
      moduleName,
      pluginNumber,
      pluginState,
      slideNumber,
      updateCurrentPlugin
    } = this.props;

    return (
      <ul id="font-size-options-container">
        <FontSize
          pluginState={ pluginState }
          updateCurrentPlugin={ updateCurrentPlugin } />
        <FontBold
          pluginState={ pluginState }
          updateCurrentPlugin={ updateCurrentPlugin } />
        <FontItalics
          pluginState={ pluginState }
          updateCurrentPlugin={ updateCurrentPlugin } />
        <FontUnderline
          pluginState={ pluginState }
          updateCurrentPlugin={ updateCurrentPlugin } />
      </ul>
    );
  };
}

export default OptionsMenu;
