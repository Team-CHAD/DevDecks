import * as React from 'react';
import './mini-slide.scss';


const MiniSlide = ({ index, goToSlide }: { index: number, goToSlide: any }) => {
  return (
    <div onClick={ goToSlide }>
      <span className="mini-slide-counter">{ index }</span>
      <div className="mini-slide">Hello</div>
    </div>
  );
};

export default MiniSlide;
