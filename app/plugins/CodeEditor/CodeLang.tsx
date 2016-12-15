import * as React from 'react';
import { Menu, MenuItem, Button } from "@blueprintjs/core";

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
      <Button className="pt-button" type="button">
        { pluginState.language ? pluginState.language : DEFAULT_LANGUAGE }
      </Button>
  );
}

export default CodeLang;
