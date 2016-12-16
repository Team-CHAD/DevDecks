import * as React from 'react';

import CodeEdit from './Options/CodeEdit';
import CodeLang from './Options/CodeLang';
import CodeSubmit from './Options/CodeSubmit';
import CodeTheme from './Options/CodeTheme';
import CodeImportExport from './Options/CodeImportExport';
import ToggleConsole from './Options/ToggleConsole';

interface OptionsMenuProps {
  moduleName: string;
  pluginNumber: number;
  pluginState: any;
  slideNumber: number;
  updateCurrentPlugin: Function;
}

const OptionsMenu = ({
  moduleName,
  pluginNumber,
  pluginState,
  slideNumber,
  updateCurrentPlugin
}: OptionsMenuProps) => (
  <ul id="codeeditor-options-container">
    <CodeLang
      pluginState={ pluginState }
      updateCurrentPlugin={ updateCurrentPlugin } />
    <CodeTheme
      pluginState={ pluginState }
      updateCurrentPlugin={ updateCurrentPlugin } />
    
    <hr />

    <ul>
      <CodeImportExport
        pluginState={ pluginState }
        updateCurrentPlugin={ updateCurrentPlugin } />
    </ul>

    <hr />

    <ul style={{ marginTop: '10px', maxWidth: '200px' }}>
      <CodeEdit
        pluginState={ pluginState }
        updateCurrentPlugin={ updateCurrentPlugin } />
      <CodeSubmit
        pluginState={ pluginState }
        updateCurrentPlugin={ updateCurrentPlugin } />
      <ToggleConsole
        pluginState={ pluginState }
        updateCurrentPlugin={ updateCurrentPlugin } />
    </ul>
  </ul>
);

export default OptionsMenu;
