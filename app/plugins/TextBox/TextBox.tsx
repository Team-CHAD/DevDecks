import * as React from 'react';
import { connect } from 'react-redux';
import { EditableText as TextBoxInput } from '@blueprintjs/core';
import './textbox.scss';

import * as actions from './actions';

interface TextBoxProps {
  width: number;
  height: number;
  slides?: any;
  slideNumber: number;
  pluginNumber: number;
  pluginState: any;
  updateTextBoxText: any;
}

class TextBox extends React.Component<TextBoxProps, {}> {
  public render() {
    const { width, height, slides, slideNumber, pluginNumber, pluginState, updateTextBoxText } = this.props;

    return (
      <div style={{ fontSize: pluginState.fontSize || 20 }}>
        <TextBoxInput
          className="textbox"
          multiline
          onChange = { (text: string) => updateTextBoxText(text, pluginNumber) }
          value = { pluginState.value } />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Function) => ({
  updateTextBoxText: (text: string, pluginNumber: number) => dispatch(actions.updateTextBoxText(text, pluginNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextBox as any);
