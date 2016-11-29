import * as React from 'react';
import './mini-slide.scss';


const MiniSlide = ({ index }: { index: number }) => (
  <div>
    <span className="mini-slide-counter">{ index }</span>
    <div className="mini-slide">Hello</div>
  </div>
);

export default MiniSlide;
