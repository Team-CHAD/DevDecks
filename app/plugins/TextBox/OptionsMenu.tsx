import * as React from 'react';
import FontSize from './FontSize';

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
      <FontSize
        pluginState={ pluginState }
        fontSize= { pluginState.fontSize }
        updateCurrentPlugin={ updateCurrentPlugin } />
    );
  };
}

export default OptionsMenu;