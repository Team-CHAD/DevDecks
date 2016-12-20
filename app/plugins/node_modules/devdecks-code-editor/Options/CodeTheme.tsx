import * as React from 'react';
import { DEFAULT_THEME } from '../constants';

interface CodeThemeProps {
  pluginState: any;
  updateCurrentPlugin: Function;
}

const CodeTheme = ({ pluginState, updateCurrentPlugin }: CodeThemeProps) => {
  const themes = ['Ambiance', 'Chaos', 'Chrome', 'Clouds', 'Cobalt', 'Eclipse', 'iPlastic', 'Monokai', 'Textmate', 'Tomorrow', 'Twilight', 'XCode'];

  const themeSelection = (
    <select
      value={ pluginState.theme || DEFAULT_THEME }
      onChange={(e: any) => updateCurrentPlugin({ theme: e.target.value })}>
        {
          themes.map((theme, key) => (
            <option
              key={ key }
              value={ theme } >
              { theme }
            </option>
          ))
        }
    </select>
  );

  return (
    <li>
      <label className="pt-label">
        Theme
        <div className="pt-select">
          { themeSelection }
        </div>
      </label>
    </li>
  );
}

export default CodeTheme;
