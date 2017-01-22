import * as React from 'react';
import { Button } from '@blueprintjs/core';

interface DuplicateSlideProps {
  currentSlideNumber: number;
  maxSlides: number;
  goToSlide: Function;
  duplicateSlide: Function;
}

const DuplicateSlide = ({ currentSlideNumber, maxSlides, duplicateSlide, goToSlide }: DuplicateSlideProps) => {
  return (
    <Button
      text="Duplicate Slide"
      onClick={() => {
        duplicateSlide(currentSlideNumber);
        goToSlide(currentSlideNumber + 1);
      }} />
  );
};

export default DuplicateSlide;
