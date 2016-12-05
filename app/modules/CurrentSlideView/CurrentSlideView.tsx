// this file will render the current slide react component

// NOTE: There is no built-in method to stop drag so leaving it right now

import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';
import * as actions from './actions';
import './current-slide-view.scss';

const Rnd = require('react-rnd');

interface CurrentSlideProps {
  isInPresenterMode?: boolean;
  currentSlide?: any;
  slideNumber?: number;
  updateCurrentSlide?: Function;
}

// RND RESIZE
interface IDimension {
  width: number;
  height: number;
}

// Line 18: TODO: Dymically produce plugin types
class CurrentSlideViewComponent extends React.Component<CurrentSlideProps, { editSlideViewEl: any }> {
  rnd: any = {};

  public constructor() {
    super();
    this.state = {
      editSlideViewEl: null,
    };
  }
  
  // NOTE: This state is neeeded because we cannot access the DOM until the render method
  // Perhaps there is a better way
  public componentDidMount() {
    this.setState({ editSlideViewEl: document.getElementById('edit-slide-view') });
  }

  public render() {
    const { isInPresenterMode, currentSlide, slideNumber, updateCurrentSlide } = this.props;
    return (
      <div>
        {
          currentSlide.components.map((plugin: any, key: number) => {
            const { component: Component, state: { width, height, left: x, top: y } } = plugin;
            const { editSlideViewEl } = this.state;

            return (
              <Rnd
                key={ key }
                className='rnd'
                ref={ (c: any) => { this.rnd = c } }
                initial={ {
                  width,
                  height,
                  x: x ? x : 0,
                  y: y ? y : 0
                } }
                // Ensure the DOM is ready when switching views so have access
                // to the edit-slide-view div
                bounds={ editSlideViewEl ? {
                  left: 0,
                  top: 0,
                  right: isInPresenterMode ? y : editSlideViewEl.clientWidth - width,
                  bottom: isInPresenterMode ? x : editSlideViewEl.clientHeight - height
                } : { } }
                isResizable= { isInPresenterMode ? {
                  top: false,
                  right: false,
                  bottom: false,
                  left: false,
                  topRight: false,
                  bottomRight: false,
                  bottomLeft: false,
                  topLeft: false
                } : {
                  top: true,
                  right: true,
                  bottom: true,
                  left: true,
                  topRight: true,
                  bottomRight: true,
                  bottomLeft: true,
                  topLeft: true
                } }
                onResizeStop={ (direction: string, styleSize: Object, clientSize: Object) => updateCurrentSlide(key, clientSize) }
                onDragStop={ (e: any, { position }: { position: Object }) => updateCurrentSlide(key, position) }
              >
                <Component width={ width } height={ height } slideNumber={ slideNumber } pluginNumber={ key } />
              </Rnd>
            );
        })}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  isInPresenterMode: state.app.isFullscreen,
  currentSlide: state.app.slides[state.app.currentSlide],
  slideNumber: state.app.currentSlide,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateCurrentSlide: (pluginNumber: number, changes: Object) => dispatch(actions.updateCurrentSlide(pluginNumber, changes)),
});

// Connected Component
const CurrentSlideView = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentSlideViewComponent as any);

export { CurrentSlideView };
