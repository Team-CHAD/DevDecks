import * as React from 'react';

interface CodeLangProps {
  pluginState: any;
  updateCurrentPlugin: Function;
}

const CodeLang = ({ pluginState, updateCurrentPlugin }: CodeLangProps) => {
  const DEFAULT_LANGUAGE = 'JavaScript';

  const languages = ['C++', 'Clojure', 'django', 'Haskell', 'HTML', 'JavaScript', 'JSON', 'Perl', 'PHP', 'Python', 'Ruby', 'TypeScript'];

  const langSelection = (
    <select
      value={ pluginState.language || DEFAULT_LANGUAGE }
      onChange={(e: any) => updateCurrentPlugin({ language: e.target.value })}>
        {
          languages.map((language, key) => (
            <option
              key={ key }
              value={ language } >
              { language }
            </option>
          ))
        }
    </select>
  );

  return (
    <li>
      <label className="pt-label">
        Language
        <div className="pt-select">
          { langSelection }
        </div>
      </label>
    </li>
  );
}

export default CodeLang;
