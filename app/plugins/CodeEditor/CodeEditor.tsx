import * as React from 'react';
import { EditableText as TextBoxInput } from '@blueprintjs/core';
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

const CodeEditor = ({ height, width, pluginNumber, pluginState, slideNumber, updateCurrentSlide }: CodeEditorProps) => (
  <div>
    <AceEditor 
      mode='javascript'
      theme='monokai'
      tabSize={2}
      height={`${height}px`}
      width={`${width}px`}
      onChange={ (snippet: string) => updateCurrentSlide(pluginNumber, slideNumber, { snippet }) }
      value={ pluginState.snippet }
    />
    <button
      className="runButton"
      onClick={() => {
        const snippetEval: any = eval(pluginState.snippet);
        updateCurrentSlide(pluginNumber, slideNumber, { snippetEval })
      }}>
      run code
    </button>
    <div className="terminal">{pluginState.snippetEval}</div>
  </div>
);

export default CodeEditor;
