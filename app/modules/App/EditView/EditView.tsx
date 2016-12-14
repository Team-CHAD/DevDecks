import * as React from 'react';
import './edit-view.scss';

import {
  ControlPanel,
  MiniSlidesPanel,
  SmartSlide,
  ToolBar,
  UtilitiesMenu,
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
  const EDIT_VIEW_WIDTH = '100vw';
  const UTILITIES_MENU_WIDTH = 200;
  
  let scale = Math.min( slidesDimension.width / window.screen.width, slidesDimension.height / window.screen.height);
  
  return (
    <div id="container">

      <MiniSlidesPanel />

      <div id="main-content-wrapper">
        
        <ToolBar />

        <div
          id="edit-slide-view"
          style={{
            width: `calc(${EDIT_VIEW_WIDTH} - ${UTILITIES_MENU_WIDTH}px - ${thumbnailsDimension.width}px)`,
            paddingBottom: `${(window.screen.height / window.screen.width) * 100}%`
          }}>
          <Scale isFullScreen={ false } scale={ scale }>
            <SmartSlide scale={ scale } />
          </Scale>
        </div>

      </div>

      <UtilitiesMenu styles={{ width: UTILITIES_MENU_WIDTH }}/>

    </div>
  );
};

export default EditView;
