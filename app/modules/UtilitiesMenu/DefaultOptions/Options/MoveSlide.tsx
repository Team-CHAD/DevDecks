import * as React from 'react';
import { Button, Classes } from '@blueprintjs/core';

interface MoveSlideProps {
  currentSlideNumber: number;
  maxSlides: number;
  goToSlide: Function;
  moveSlideDown: Function;
  moveSlideUp: Function;
}

const MoveSlide = ({
  currentSlideNumber,
  maxSlides,
  goToSlide,
  moveSlideDown,
  moveSlideUp,
}: MoveSlideProps) => (
  <ul id="move-slide-container">
    <li>
      <Button
        className={ Classes.LARGE }
        iconName="double-chevron-down"
        onClick={() => {
          moveSlideUp();
          goToSlide(currentSlideNumber + 1, maxSlides);
        }} />
    </li>
    <li>
      <Button
        className={ Classes.LARGE }
        iconName="double-chevron-up"
        onClick={() => {
          moveSlideDown();
          goToSlide(currentSlideNumber - 1);
        }} />
    </li>
  </ul>
);

export default MoveSlide;
