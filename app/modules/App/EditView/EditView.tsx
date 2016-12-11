import * as React from 'react';
import './edit-view.scss';

import {
  ControlPanel,
  MiniSlidesPanel,
  Slide,
  ToolBar,
} from 'modules';

import { Scale } from 'sharedComponents';

interface IDimensions {
  width: number;
  height: number;
}

interface EditViewProps {
  lastSavedSlideDimensions: IDimensions;
  slide: any;
  slidesDimension: IDimensions;
  thumbnailsDimension: IDimensions;
}

const EditView = ({ lastSavedSlideDimensions, slide, slidesDimension, thumbnailsDimension }: EditViewProps) => {
  const scale = Math.min( slidesDimension.width / window.screen.width, slidesDimension.height / window.screen.height);
  return (
    <div id="container">

      <MiniSlidesPanel />

      <div id="main-content-wrapper">
        
        <ToolBar />

        <div id="edit-slide-view" style={{ width: `calc(100vw - ${thumbnailsDimension.width + 1.25 * 100}px)`}}>
          <Scale isFullscreen={ false } scale={ scale }>
            <Slide
              scale={ scale }
              slide={ slide }
              slidesDimension={ slidesDimension }
              smart={ true } />
          </Scale>
        </div>

      </div>

      <ControlPanel />

    </div>
  );
};

export default EditView;
