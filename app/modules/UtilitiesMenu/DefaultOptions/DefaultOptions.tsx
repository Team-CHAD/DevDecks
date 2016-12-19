import * as React from 'react';
import BackgroundColor from './Options/BackgroundColor';
import MoveSlide from './Options/MoveSlide';
import './options.scss';

interface DefaultOptionsProps {
  currentSlideNumber: number;
  maxSlides: number;
  slide: any;
  goToSlide: Function;
  moveSlideDown: Function;
  moveSlideUp: Function;
  updateCurrentSlide: Function;
}

const DefaultOptions = ({
  currentSlideNumber,
  maxSlides,
  slide,
  goToSlide,
  moveSlideDown,
  moveSlideUp,
  updateCurrentSlide
}: DefaultOptionsProps) => (
  <div id="utilities-menu-default-options">
    <MoveSlide
      currentSlideNumber={ currentSlideNumber }
      maxSlides={ maxSlides }
      goToSlide={ goToSlide }
      moveSlideDown={ moveSlideDown }
      moveSlideUp={ moveSlideUp } />
    <hr />
    <BackgroundColor
      slide={ slide }
      updateCurrentSlide={ updateCurrentSlide } />
  </div>
);

export default DefaultOptions;
