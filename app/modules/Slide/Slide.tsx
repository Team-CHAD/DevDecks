import * as React from "react";
import './slide.scss';

import DummySlide from './DummySlide/DummySlide';
import SmartSlide from './SmartSlide/SmartSlide';

interface SlideProps {
  scale: number;
  slide: any;
  smart: boolean;
}

const Slide = ({ scale, slide, smart }: SlideProps) => (
  smart
    ? <SmartSlide scale={ scale } />
    : <DummySlide slide={ slide } />
);

export { Slide };
