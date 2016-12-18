import * as React from 'react';
import BackgroundColor from './Options/BackgroundColor';

interface DefaultOptionsProps {
  slide: any;
  updateCurrentSlide: Function;
}

const DefaultOptions = ({ slide, updateCurrentSlide }: DefaultOptionsProps) => {
  return (
    <div id="utilities-menu-default-options">
      <BackgroundColor
        slide={ slide }
        updateCurrentSlide={ updateCurrentSlide } />
    </div>
  );
};

export default DefaultOptions;
