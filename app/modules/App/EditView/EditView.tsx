import * as React from 'react';
import './edit-view.scss';

import {
  ControlPanel,
  MiniSlidesPanel,
  Slide,
  ToolBar,
} from '../..';

import { Scale } from '../../../sharedComponents';

interface IDimensions {
  width: number;
  height: number;
}

interface EditViewProps {
  lastSavedSlideDimensions: IDimensions;
  slide: any;
  slidesDimension: IDimensions;
  thumbnailsDimension: IDimensions;
  updateSlidesDimension: Function;
}

const EditView = ({ lastSavedSlideDimensions, slide, slidesDimension, thumbnailsDimension, updateSlidesDimension }: EditViewProps) => {
  const scale = Math.min( slidesDimension.width / window.screen.width, slidesDimension.height / window.screen.height);

  return (
    <div id="container">

      <div id="mini-slide-panel">
        <MiniSlidesPanel />
      </div>

      <div id="slide">

        <div id="toolbar">
          <ToolBar />
        </div>

        <div id="edit-slide-view">
          <Scale isFullscreen={ false } scale={ scale }>
            <Slide
              scale={ scale }
              slide={ slide }
              slidesDimension={ slidesDimension }
              smart={ true } />
          </Scale>
        </div>

      </div>

      <div id="control-panel">
        <ControlPanel />
      </div>

    </div>
  );
};

export default EditView;
