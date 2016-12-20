import * as React from 'react';
import { Button, Dialog, EditableText, Intent } from '@blueprintjs/core';
import { throttle } from 'utils/helpers';

interface CodeEditProps {
  pluginState: any;
  updateCurrentPlugin: Function;
}

const CodeEdit = ({ pluginState, updateCurrentPlugin }: CodeEditProps) => {
  const { fontSize, language, isOpen, snippet, snippetEval, theme } = pluginState;
  const updateSnippetDebounce = throttle(updateCurrentPlugin, 500);

  return (
    <li>
      <Button
        text="Edit Code"
        intent={ Intent.PRIMARY }
        onClick={ updateCurrentPlugin.bind(this, { isOpen: true }) } />

      <Dialog
        title={ language || 'Javascript' }
        isOpen={ isOpen }
        onClose={ updateCurrentPlugin.bind(this, { isOpen: !isOpen }) } >
        <div className="pt-dialog-body">
          <EditableText
            maxLines={12}
            minLines={3}
            multiline
            placeholder="Edit code..."
            value={ snippet }
            onChange={ (snippet: string) => updateSnippetDebounce({ snippet }) }
            onConfirm={ updateCurrentPlugin.bind(this, { isOpen: false }) } />
        </div>
      </Dialog>
    </li>
  );
};

export default CodeEdit;
