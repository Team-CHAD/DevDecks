import * as React from 'react';
import { Button } from '@blueprintjs/core';

interface DuplicateSlideProps {
  maxSlides: number;
  slide: any;
  goToSlide: Function;
  duplicateSlide: Function;
}

const DuplicateSlide = ({ maxSlides, slide, duplicateSlide, goToSlide }: DuplicateSlideProps) => {
  return (
    <Button
      text="Duplicate Slide"
      onClick={() => {
        duplicateSlide(slide);
        goToSlide(maxSlides);
      }} />
  );
};

export default DuplicateSlide;
