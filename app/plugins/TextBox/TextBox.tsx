import * as React from 'react';
import { EditableText as TextBoxInput } from '@blueprintjs/core';

interface TextBoxProps {
  pluginNumber: number;
  pluginState: any;
  slideNumber: number;
  updateCurrentSlide: any;
}

const TextBox = ({ pluginNumber, pluginState, slideNumber, updateCurrentSlide }: TextBoxProps) => {
  console.log(pluginState.fontSize || 3);
  return (
    <div style={{ fontSize: pluginState.fontSize ? `${ pluginState.fontSize / 100 }em` : '3em' }}>
      <TextBoxInput
        multiline
        onChange = { (value: string) => updateCurrentSlide(pluginNumber, slideNumber, { value }) }
        value = { pluginState.value } />
    </div>
  );
}

export default TextBox;
