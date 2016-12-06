import * as React from 'react';
import { connect } from 'react-redux';
import { EditableText as TextBoxInput } from '@blueprintjs/core';
import './textbox.scss';

interface TextBoxProps {
  pluginNumber: number;
  pluginState: any;
  slideNumber: number;
  updateCurrentSlide: any;
}

const TextBox = ({ pluginNumber, pluginState, slideNumber, updateCurrentSlide }: TextBoxProps) => {
  return (
    <div style={{ fontSize: pluginState.fontSize || 20 }}>
      <TextBoxInput
        className="textbox"
        multiline
        onChange = { (value: string) => updateCurrentSlide(pluginNumber, slideNumber, { value }) }
        value = { pluginState.value } />
    </div>
  );
}

export default TextBox;
