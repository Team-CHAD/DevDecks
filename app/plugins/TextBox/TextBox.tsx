import * as React from 'react';
import { EditableText as TextBoxInput } from '@blueprintjs/core';

class TextBox extends React.Component<{}, {}> {
  render() {
    return <TextBoxInput multiline />;
  }
}

export default TextBox;
