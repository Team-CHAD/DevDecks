import * as React from 'react';
import CodeLang from './CodeLang';
import CodeTheme from './CodeTheme';

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
      <ul id="codeeditor-options-container">
      {console.log('inside editor options')}
        <CodeLang
          pluginState={ pluginState }
          updateCurrentPlugin={ updateCurrentPlugin } />
        <CodeTheme
          pluginState={ pluginState }
          updateCurrentPlugin={ updateCurrentPlugin } />
      </ul>
    );
  };
}

export default OptionsMenu;
