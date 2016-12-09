import * as React from 'react';
import { connect } from 'react-redux';
import './codeEditor.scss';

const brace = require('brace');
const AceEditor = require('react-ace').default;

require('brace/mode/javascript');
require('brace/theme/monokai');

interface CodeEditorProps {
  height: number;
  width: number;
  pluginNumber: number;
  pluginState: any;
  slideNumber: number;
  updateCurrentSlide: Function;
}

const CodeEditor = ({ height, width, pluginNumber, pluginState, slideNumber, updateCurrentSlide }: CodeEditorProps) => {
  const DEFAULT_FONT_SIZE = 8;

  const { fontSize, snippet, snippetEval } = pluginState;

  return (
    <div>
      <AceEditor 
        mode='javascript'
        theme='monokai'
        tabSize={2}
        fontSize={ fontSize ? DEFAULT_FONT_SIZE * (fontSize / 100) : DEFAULT_FONT_SIZE * 3 }
        height={`${height-30}px`}
        width={`${width}px`}
        onChange={ (snippet: string) => updateCurrentSlide(pluginNumber, slideNumber, { snippet }) }
        value={ snippet }
      />
      <div className="spanwrap">
        <button
        className="runButton"
        onClick={() => {
          const snippetEval: any = eval(snippet);
          updateCurrentSlide(pluginNumber, slideNumber, { snippetEval })
        }}>
        submit
        </button>
        <div className="terminal">{snippetEval}</div>
      </div>  
    </div>
  );
}

export default CodeEditor;
