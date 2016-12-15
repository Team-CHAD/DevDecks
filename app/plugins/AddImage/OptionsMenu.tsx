import * as React from 'react';

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
      </ul>
    );
  };
}

export default OptionsMenu;
