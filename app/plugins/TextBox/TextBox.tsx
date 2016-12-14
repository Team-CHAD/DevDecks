import * as React from 'react';
import { EditableText as TextBoxInput } from '@blueprintjs/core';

interface TextBoxProps {
  pluginNumber: number;
  pluginState: any;
  slideNumber: number;
  updateCurrentPlugin: any;
}

const TextBox = ({ pluginNumber, pluginState, slideNumber, updateCurrentPlugin }: TextBoxProps) => {
  return (
    <div style={{ fontSize: pluginState.fontSize ? `${ pluginState.fontSize / 100 }em` : '3em' }}>
      <TextBoxInput
        multiline
        onChange = { (value: string) => updateCurrentPlugin({ value }) }
        value = { pluginState.value } />
    </div>
  );
}

export default TextBox;
