import * as React from 'react';
import { Button } from "@blueprintjs/core";

interface FontItalicsProps {
  pluginState: any;
  updateCurrentPlugin?: any;
}

const FontItalics = ({ pluginState, updateCurrentPlugin }: FontItalicsProps) => {

  return (
    <Button className="pt-button" type="button" style={{fontStyle : 'italic'}} onClick={() => pluginState.fontStyle  ? updateCurrentPlugin({ fontStyle: false }) : updateCurrentPlugin({ fontStyle: true })}>
      Italic
    </Button>
  );
}

export default FontItalics;
