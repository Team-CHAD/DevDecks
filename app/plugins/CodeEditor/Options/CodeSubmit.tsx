import * as React from 'react';
import { Button } from '@blueprintjs/core';

interface CodeSubmitProps {
  pluginState: any;
  updateCurrentPlugin: Function;
}

const CodeSubmit = ({ pluginState, updateCurrentPlugin }: CodeSubmitProps) => {
  const { snippet } = pluginState;
  return (
    <li>
      <Button
        text="Run Code"
        onClick={() => {
          const snippetEval: any = eval(snippet);
          updateCurrentPlugin({ snippetEval });
        }} />
    </li>
  );
};

export default CodeSubmit;
