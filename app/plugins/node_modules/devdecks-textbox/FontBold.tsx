import * as React from 'react';
import { Button, Intent } from "@blueprintjs/core";

interface FontBoldProps {
  pluginState: any;
  updateCurrentPlugin?: any;
}

const FontBold = ({ pluginState, updateCurrentPlugin }: FontBoldProps) => (
  <Button
    iconName="bold"
    intent={ pluginState.fontWeight ? Intent.SUCCESS : Intent.NONE }
    onClick={() => pluginState.fontWeight ? updateCurrentPlugin({ fontWeight: false }) : updateCurrentPlugin({ fontWeight: true })} />
);

export default FontBold;
