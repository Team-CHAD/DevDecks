import * as React from 'react';
import { SketchPicker } from 'react-color';

interface BackgroundColorProps {
  slide: any;
  updateCurrentSlide: Function;
}

const BackgroundColor = ({ slide, updateCurrentSlide }: BackgroundColorProps) => {
  return (
    <label className="pt-label">
      Background Color
      <SketchPicker
        width="220px"
        color={ slide.state.backgroundColor }
        onChangeComplete={ (color: any) => updateCurrentSlide({ backgroundColor: color.rgb })} />
    </label>
  );
};

export default BackgroundColor;
