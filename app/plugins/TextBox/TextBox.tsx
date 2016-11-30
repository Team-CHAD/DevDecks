import * as React from 'react';
import { EditableText as TextBoxInput } from '@blueprintjs/core';

class TextBox extends React.Component<{}, { value: string }> {
  constructor() {
    super();
    this.state = {
      value: ''
    }
  }

  updateValue(inputStr: string) {
    this.setState({ value: inputStr });
  }

  render() {
    return (
      <TextBoxInput
        multiline
        onChange={ this.updateValue.bind(this) }
        value={ this.state.value } />
    );
  }
}

export default TextBox;
