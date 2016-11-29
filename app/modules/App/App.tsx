import * as React from 'react';
import '@blueprintjs/core/dist/blueprint.css';

import {
  ControlPanel,
  ToolBar,
} from '..';


class App extends React.Component<{}, {}> {
  render() {
    return (
      <main id="container">
        <div id="col-1">
          <div className="mini-slide-view">
            <ul>
              <a href='#'><li className="mini-slide">slide1</li></a>
              <a href='#'><li className="mini-slide">slide2</li></a>
              <a href='#'><li className="mini-slide">slide3</li></a>
              <a href='#'><li className="mini-slide">slide4</li></a>
              <a href='#'><li className="mini-slide">slide5</li></a>
              <a href='#'><li className="mini-slide">slide6</li></a>
              <a href='#'><li className="mini-slide">slide7</li></a>
              <a href='#'><li className="mini-slide">slide8</li></a>
              <a href='#'><li className="mini-slide">slide9</li></a>
              <a href='#'><li className="mini-slide">slide10</li></a>
            </ul>
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
            Edit Slide View
          </div>

          <div className="single-slide-views">
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
          </div>
        </div>
      </main>
    );
  }
}

export { App };
