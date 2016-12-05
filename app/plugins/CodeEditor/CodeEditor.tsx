import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

const brace = require('brace');
const AceEditor = require('react-ace').default;

require('brace/mode/javascript');
require('brace/theme/monokai');


interface ICodeEditorProps {
  height: number;
  width: number;
  slides?: any;
  pluginNumber: number;
  slideNumber: number;
  updateCodeEditorCode: Function;
}

class CodeEditor extends React.Component<ICodeEditorProps, {}> {
  render() {
    const { height, width, slides, pluginNumber, slideNumber, updateCodeEditorCode } = this.props;
    const codeSnippet = slides[slideNumber].components[pluginNumber].state.value;
    return (
      <AceEditor 
        mode='javascript'
        theme='monokai'
        tabSize={2}
        height={`${height}px`}
        width={`${width}px`}
        onChange={ (snippet: string) => updateCodeEditorCode(snippet, pluginNumber) }
        value={ codeSnippet }
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    slides: state.app.slides
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    updateCodeEditorCode: (snippet: string, pluginNumber: number) => dispatch(actions.updateCodeEditorCode(snippet, pluginNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor as any);