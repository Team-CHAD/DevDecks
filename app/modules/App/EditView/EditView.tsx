import * as React from 'react';
import './edit-view.scss';

import {
  ControlPanel,
  CurrentSlideView,
  MiniSlidesPanel,
  ToolBar,
} from '../..';

const Rnd = require('react-rnd');

interface EditViewProps {
  deviceDimension: {
    width: number;
    height: number;
  };
}

const EditView = ({ deviceDimension }: EditViewProps) => (
  <div id="container">

    <div id="mini-slide-panel">
      <MiniSlidesPanel />
    </div>

    <div id="slide">

      <div id="toolbar">
        <ToolBar />
      </div>

      <div id="edit-slide-view" style={{ width: deviceDimension.width, height: deviceDimension.height }}>
        <CurrentSlideView />
      </div>

    </div>

    <div id="control-panel">
      <Rnd
        isResizable={{
          top: false,
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false
        }}
        bounds={{
          right: 0,
          left: 0
        }} >
        <ControlPanel />
      </Rnd>
    </div>

    {
      /*<div id="single-slide-views">
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
      </div>*/
    }

  </div>
);

export default EditView;
