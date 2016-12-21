import * as React from 'react';
import { Button, Intent } from "@blueprintjs/core";

interface FontItalicsProps {
  pluginState: any;
  updateCurrentPlugin?: any;
}

const FontItalics = ({ pluginState, updateCurrentPlugin }: FontItalicsProps) => {

  return (
    <Button
      iconName="italic"
      intent={ pluginState.fontStyle ? Intent.SUCCESS : Intent.NONE }
      onClick={() => pluginState.fontStyle  ? updateCurrentPlugin({ fontStyle: false }) : updateCurrentPlugin({ fontStyle: true })} />
  );
}

export default FontItalics;
