import * as React from 'react';
import { connect } from 'react-redux';
import { debounce } from '../../utils/helpers';
import './codeEditor.scss';

const brace = require('brace');
const AceEditor = require('react-ace').default;

//languages
require('brace/mode/c_cpp');
require('brace/mode/clojure');
require('brace/mode/django');
require('brace/mode/haskell');
require('brace/mode/html');
require('brace/mode/javascript');
require('brace/mode/json');
require('brace/mode/perl');
require('brace/mode/php');
require('brace/mode/python');
require('brace/mode/ruby');
require('brace/mode/typescript');

//themes
require('brace/theme/ambiance');
require('brace/theme/chaos');
require('brace/theme/chrome');
require('brace/theme/clouds');
require('brace/theme/cobalt');
require('brace/theme/eclipse');
require('brace/theme/iplastic');
require('brace/theme/monokai');
require('brace/theme/textmate');
require('brace/theme/tomorrow');
require('brace/theme/twilight');
require('brace/theme/xcode');

interface CodeEditorProps {
  height: number;
  width: number;
  pluginNumber: number;
  pluginState: any;
  scale: number;
  slideNumber: number;
  updateCurrentSlide: Function;
}

const CodeEditor = ({ height, width, pluginNumber, pluginState, scale, slideNumber, updateCurrentSlide }: CodeEditorProps) => {
  const DEFAULT_FONT_SIZE = 8;
  const DEFAULT_LANGUAGE = 'javascript';
  const DEFAULT_THEME = 'monokai';

  const { fontSize, snippet, snippetEval, theme } = pluginState;
  let { language } = pluginState;

  if (language === 'C++') language = 'c_cpp';

  let updateSnippetDebounce: any;
  if (updateCurrentSlide) updateSnippetDebounce = debounce(updateCurrentSlide, 50);

  return (
    <div style={{ backgroundColor:"rgba(50, 50, 50, .2)"}}>
      <AceEditor
        mode={ language ? language.toLowerCase() : DEFAULT_LANGUAGE }
        theme={ theme ? theme.toLowerCase() : DEFAULT_THEME }
        tabSize={ 2 }
        fontSize={ fontSize ? DEFAULT_FONT_SIZE * (fontSize / 100) : DEFAULT_FONT_SIZE * 3 }
        height={ `${ height - 50 }px` }
        width={ `${ width - 1 }px` }
        onChange={ (snippet: string) => updateSnippetDebounce(pluginNumber, slideNumber, { snippet }) }
        value={ snippet }
      />
      <button
        className="runButton"
        onClick={() => {
          const snippetEval: any = eval(snippet);
          updateCurrentSlide(pluginNumber, slideNumber, { snippetEval })
      }}>
        submit
      </button>
      <div className="terminal">{ snippetEval }</div>
    </div>
  );
}

export default CodeEditor;
