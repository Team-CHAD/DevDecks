import * as React from 'react';
import { SketchPicker } from 'react-color'

interface FontColor {
  pluginState: any;
  updateCurrentPlugin?: any;
}

const FontColor = ({ pluginState, updateCurrentPlugin }: FontColor) => {
  return (
    <div style={ { marginTop: '10px'} }>
      <SketchPicker
        width='220px'
        color={ pluginState.fontColor || '#000' }
        onChange={ (color) => updateCurrentPlugin({fontColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`}) } />
    </div>
  );
};

export default FontColor;
