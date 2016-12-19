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

const FullScreenView = ({ deviceDimension, slide }: FullScreenViewProps) => {
  const { r, g, b, a } = slide.state.backgroundColor;
  return (
    <div id="fullscreen-view" style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}>
      <div style={{
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
        width: deviceDimension.width,
        height: deviceDimension.height,
        margin: '0 auto',
        transform: `translateY(${(window.screen.height - deviceDimension.height) / 2}px)`,
      }}>
        <DummySlide slide={ slide } />
      </div>
    </div>
  );
};

export default FullScreenView;
