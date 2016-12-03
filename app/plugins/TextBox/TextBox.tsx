import * as React from 'react';
import { connect } from 'react-redux';
import { EditableText as TextBoxInput } from '@blueprintjs/core';
import './textbox.scss';

import * as actions from './actions';

interface TextBoxProps {
  slides?: any;
  slideNumber: number;
  pluginNumber: number;
  updateTextBoxText: any;
}

class TextBox extends React.Component<TextBoxProps, {}> {
  public render() {
    const { slides, slideNumber, pluginNumber, updateTextBoxText } = this.props;
    const plugin = slides[slideNumber].components[pluginNumber];
    return (
      <TextBoxInput
        className="textbox"
        multiline
        onChange = { (text: string) => updateTextBoxText(text, pluginNumber) }
        value = { plugin.state.value } />
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
    updateTextBoxText: (text: string, pluginNumber: number) => dispatch(actions.updateTextBoxText(text, pluginNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextBox as any);
