import * as React from 'react';
import { SketchPicker } from 'react-color';
import { Button } from '@blueprintjs/core';

interface BackgroundColorProps {
  slide: any;
  theme: any;
  addThemeColor: Function;
  updateCurrentSlide: Function;
}

const BackgroundColor = ({ slide, theme, addThemeColor, updateCurrentSlide }: BackgroundColorProps) => {
  const { colors } = theme;
  return (
    <label className="pt-label">
      Background Color
      <SketchPicker
        width="220px"
        color={ slide.state.backgroundColor }
        presetColors={ colors }
        onChangeComplete={(color: any) =>
          updateCurrentSlide({
            backgroundColor: color.rgb,
            backgroundHexColor: color.hex
          })} />
      <Button
        style={{ marginTop: 10 }}
        text="Save Color To Palette"
        onClick={() => addThemeColor(slide.state.backgroundHexColor || '#fff')} />
    </label>
  );
};

export default BackgroundColor;
