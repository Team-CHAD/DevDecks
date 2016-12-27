import * as React from 'react';
import BackgroundColor from './Options/BackgroundColor';
import DuplicateSlide from './Options/DuplicateSlide';
import MoveSlide from './Options/MoveSlide';
import SelectTransitions from './Options/SelectTransitions';
import './options.scss';

interface DefaultOptionsProps {
  currentSlideNumber: number;
  maxSlides: number;
  slide: any;
  theme: Object;

  addThemeColor: Function;
  duplicateSlide: Function;
  goToSlide: Function;
  moveSlideDown: Function;
  moveSlideUp: Function;
  updateCurrentSlide: Function;
}

const DefaultOptions = ({
  currentSlideNumber,
  maxSlides,
  slide,
  theme,

  addThemeColor,
  duplicateSlide,
  goToSlide,
  moveSlideDown,
  moveSlideUp,
  updateCurrentSlide
}: DefaultOptionsProps) => (
  <div id="utilities-menu-default-options">
    <MoveSlide
      currentSlideNumber={currentSlideNumber}
      maxSlides={maxSlides}
      goToSlide={goToSlide}
      moveSlideDown={moveSlideDown}
      moveSlideUp={moveSlideUp} />
    <hr />
    <DuplicateSlide
      maxSlides={maxSlides}
      slide={slide}
      duplicateSlide={duplicateSlide}
      goToSlide={goToSlide} />
    <hr/>
    <BackgroundColor
      slide={ slide }
      theme={ theme }
      addThemeColor={ addThemeColor }
      updateCurrentSlide={ updateCurrentSlide } />
    <hr />
    <SelectTransitions
      slide={ slide }
      updateCurrentSlide={ updateCurrentSlide } />
  </div>
);

export default DefaultOptions;
