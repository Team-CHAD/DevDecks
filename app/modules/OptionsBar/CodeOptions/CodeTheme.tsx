import * as React from 'react';
import { Menu, MenuItem, Popover, Position } from "@blueprintjs/core";

interface CodeThemeProps {
  pluginState: any;
  updateCurrentPlugin: Function;
}

const CodeTheme = ({ pluginState, updateCurrentPlugin }: CodeThemeProps) => {
  const DEFAULT_THEME = 'Monokai';

  const themes = ['Ambiance', 'Chaos', 'Chrome', 'Clouds', 'Cobalt', 'Eclipse', 'iPlastic', 'Monokai', 'Textmate', 'Tomorrow', 'Twilight', 'XCode'];

  const themeSelection = (
    <Menu>
        {
          themes.map((theme, key) => (
            <MenuItem
              key={ key }
              text={ theme }
              onClick={() => updateCurrentPlugin({ theme: theme })} />
          ))
        }
    </Menu>
  );

  return (
    <Popover content={ themeSelection } position={ Position.RIGHT_TOP }>
      <button className="pt-button" type="button">
        { pluginState.theme ? pluginState.theme : DEFAULT_THEME }
      </button>
    </Popover>
  );
}

export default CodeTheme;
