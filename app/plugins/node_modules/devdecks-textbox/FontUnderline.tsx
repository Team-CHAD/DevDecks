import * as React from 'react';
import { Button, Intent } from "@blueprintjs/core";

interface FontUnderlineProps {
  pluginState: any;
  updateCurrentPlugin?: any;
}

const FontUnderline = ({ pluginState, updateCurrentPlugin }: FontUnderlineProps) => {

  return (
    <Button
      iconName="underline"
      intent={ pluginState.textDecoration ? Intent.SUCCESS : Intent.NONE }
      onClick={() => pluginState.textDecoration  ? updateCurrentPlugin({ textDecoration: false }) : updateCurrentPlugin({ textDecoration: true })} />
  );
}

export default FontUnderline;
