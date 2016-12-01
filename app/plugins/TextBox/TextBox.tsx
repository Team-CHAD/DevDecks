import * as React from 'react';
import { connect } from 'react-redux';
import { EditableText as TextBoxInput } from '@blueprintjs/core';
import './textbox.scss';

import * as actions from './actions';

interface TextBoxProps {
  pluginIndex: number, 
  slideNumber: number,
  slides?: any,
  updateTextBoxText: any,
}

class TextBox extends React.Component<TextBoxProps, {}> {
  public render() {
    const { pluginIndex, slideNumber, slides, updateTextBoxText } = this.props;
    const plugin = slides[slideNumber].components[pluginIndex];
    return (
      <TextBoxInput
        className="textbox"
        multiline
        onChange = { (text: string) => updateTextBoxText(text, pluginIndex) }
        value = { plugin.value } />
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    slides: state.app.slides,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    updateTextBoxText: (text: string, pluginIndex: number) => dispatch(actions.updateTextBoxText(text, pluginIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextBox as any);
