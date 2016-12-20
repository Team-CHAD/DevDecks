import * as React from 'react';
import { Button, Intent } from '@blueprintjs/core';

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
        intent={ Intent.WARNING }
        onClick={() => {
          const snippetEval: any = eval(snippet);
          updateCurrentPlugin({ snippetEval });
        }} />
    </li>
  );
};

export default CodeSubmit;
