import * as React from 'react';
import { Button } from "@blueprintjs/core";

interface FontUnderlineProps {
  pluginState: any;
  updateCurrentPlugin?: any;
}

const FontUnderline = ({ pluginState, updateCurrentPlugin }: FontUnderlineProps) => {

  return (
    <Button
      className="pt-button"
      iconName="underline"
      type="button"
      style={ {textDecoration :'underline'} }
      onClick={() => pluginState.textDecoration  ? updateCurrentPlugin({ textDecoration: false }) : updateCurrentPlugin({ textDecoration: true })} />
  );
}

export default FontUnderline;
