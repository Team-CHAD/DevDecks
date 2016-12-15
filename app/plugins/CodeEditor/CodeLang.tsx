import * as React from 'react';
import { Menu, MenuItem, Popover, Position } from "@blueprintjs/core";

interface CodeLangProps {
  pluginState: any;
  updateCurrentPlugin: Function;
}

const CodeLang = ({ pluginState, updateCurrentPlugin }: CodeLangProps) => {
  const DEFAULT_LANGUAGE = 'JavaScript';

  const languages = ['C++', 'Clojure', 'django', 'Haskell', 'HTML', 'JavaScript', 'JSON', 'Perl', 'PHP', 'Python', 'Ruby', 'TypeScript'];

  const langSelection = (
    <Menu>
        {
          languages.map((language, key) => (
            <MenuItem
              key={ key }
              text={ language }
              onClick={() => updateCurrentPlugin({ language: language })} />
          ))
        }
    </Menu>
  );

  return (
    <Popover content={ langSelection } position={ Position.RIGHT_TOP }>
      <button className="pt-button" type="button">
        { pluginState.language ? pluginState.language : DEFAULT_LANGUAGE }
      </button>
    </Popover>
  );
}

export default CodeLang;
