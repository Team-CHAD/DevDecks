import * as React from 'react';
import { DummySlide } from 'modules';
import { EDirection } from 'constants/slides.enums';
import './fullscreen-view.scss';

const ReactTransitions = require('react-transitions');
require('react-transitions/dist/animations.css');

interface FullScreenViewProps {
  deviceDimension: {
    width: number;
    height: number;
  };
  direction: EDirection;
  isFullscreen: boolean;
  slide: any;
}

const FullScreenView = ({
  deviceDimension,
  direction,
  isFullscreen,
  slide
}: FullScreenViewProps) => {
  const { r, g, b, a } = slide.state.backgroundColor;
  const { state: { transition } } = slide;
  return (
    <div id="fullscreen-view">
      <ReactTransitions
        width={deviceDimension.width}
        height={deviceDimension.height}
        transition={
          direction === EDirection.RIGHT
            ? transition.right
            : transition.left
        } >
        <div
          key={ Math.floor(Math.random() * 100) }
          style={{
            backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
            width: deviceDimension.width,
            height: deviceDimension.height,
        }}>
          <DummySlide
            isFullscreen={isFullscreen}
            slide={slide} />
        </div>
      </ReactTransitions>
    </div>
  );
};

export default FullScreenView;
