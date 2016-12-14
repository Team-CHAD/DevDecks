import * as React from 'react';
import './edit-view.scss';

import {
  ControlPanel,
  MiniSlidesPanel,
  SmartSlide,
  ToolBar,
} from 'modules';

import { Scale } from 'sharedComponents';

interface IDimensions {
  width: number;
  height: number;
}

interface EditViewProps {
  isDragging: boolean;
  lastSavedSlideDimensions: IDimensions;
  slide: any;
  slidesDimension: IDimensions;
  thumbnailsDimension: IDimensions;
}

const EditView = ({ isDragging, lastSavedSlideDimensions, slide, slidesDimension, thumbnailsDimension }: EditViewProps) => {
  const scale = Math.min( slidesDimension.width / window.screen.width, slidesDimension.height / window.screen.height);
  return (
    <div id="container">

      <MiniSlidesPanel />

      <div id="main-content-wrapper">
        
        <ToolBar />

        <div
          id="edit-slide-view"
          style={{
            width: `calc(100vw - ${thumbnailsDimension.width + 1.25 * 100}px)`,
            paddingBottom: `${(window.screen.height / window.screen.width) * 100}%`,
          }}>
          <Scale isFullScreen={ false } scale={ scale }>
            <SmartSlide scale={ scale } />
          </Scale>
          <div
            className={ isDragging ? 'vertical-guideline' : null }
            style={ isDragging ? { height: slidesDimension.height } : null }></div>
          <div
            className={ isDragging ? 'horizontal-guideline' : null }
            style={ isDragging ? { width: '100%' } : null }></div>
        </div>

      </div>

      <ControlPanel />

    </div>
  );
};

export default EditView;
