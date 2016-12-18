import * as React from 'react';
import { DummySlide } from 'modules';
import './fullscreen-view.scss';

interface FullScreenViewProps {
  deviceDimension: {
    width: number;
    height: number;
  };
  slide: any;
}

const FullScreenView = ({ deviceDimension, slide }: FullScreenViewProps) => (
  <div id="fullscreen-view" style={{ backgroundColor: slide.state.backgroundColor }}>
    <div style={{
      backgroundColor: slide.state.backgroundColor,
      width: deviceDimension.width,
      height: deviceDimension.height,
      margin: '0 auto',
      transform: `translateY(${(window.screen.height - deviceDimension.height) / 2}px)`,
    }}>
      <DummySlide slide={ slide } />
    </div>
  </div>
);

export default FullScreenView;
