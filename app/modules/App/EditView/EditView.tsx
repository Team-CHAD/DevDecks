import * as React from 'react';
import './edit-view.scss';

import {
  ControlPanel,
  CurrentSlideView,
  MiniSlidesPanel,
  ToolBar,
} from '../..';


const EditView = () => (
  <div>
    <div id="col-1">

      <div className="mini-slide-view">
        <MiniSlidesPanel />
      </div>

      <div className="slide-control-panel">
        <ControlPanel />
      </div>

    </div>

    <div id="col-2">

      <div id="toolbar">
        <ToolBar />
      </div>

      <div id="edit-slide-view">
        <CurrentSlideView />
      </div>

      {/*<div className="single-slide-views">

        <ul>
          <a href='#'><li className="mini-single-slide">slide1.0</li></a>
          <a href='#'><li className="mini-single-slide">slide1.1</li></a>
          <a href='#'><li className="mini-single-slide">slide1.2</li></a>
          <a href='#'><li className="mini-single-slide">slide1.3</li></a>
          <a href='#'><li className="mini-single-slide">slide1.4</li></a>
          <a href='#'><li className="mini-single-slide">slide1.5</li></a>
          <a href='#'><li className="mini-single-slide">slide1.6</li></a>
          <a href='#'><li className="mini-single-slide">slide1.7</li></a>
          <a href='#'><li className="mini-single-slide">slide1.8</li></a>
          <a href='#'><li className="mini-single-slide">slide1.9</li></a>
          <a href='#'><li className="mini-single-slide">slide1.10</li></a>
          <a href='#'><li className="mini-single-slide">slide1.11</li></a>
          <a href='#'><li className="mini-single-slide">slide1.12</li></a>
        </ul>>

      </div>*/}

    </div>
  </div>
);

export default EditView;
