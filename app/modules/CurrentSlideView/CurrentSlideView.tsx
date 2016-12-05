// this file will render the current slide react component

// NOTE: There is no built-in method to stop drag so leaving it right now

import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { updateCurrentSlide } from '../App/actions';
import * as actions from './actions';
import './current-slide-view.scss';

const Rnd = require('react-rnd');

import {
  OptionsBar,
} from '..';

interface CurrentSlideProps {
  currentSlide?: any;
  currentSelectedPlugin?: any,
  isInPresenterMode?: boolean;
  updateCurrentSlide?: Function;
  setNewActivePlugin?: Function;
  slideNumber?: number;
}

// RND RESIZE
interface IDimension {
  width: number;
  height: number;
}

// Line 18: TODO: Dymically produce plugin types
class CurrentSlideViewComponent extends React.Component<CurrentSlideProps, { editSlideViewEl: any }> {
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
    const { currentSelectedPlugin, currentSlide, isInPresenterMode, updateCurrentSlide, setNewActivePlugin, slideNumber } = this.props;
    const { editSlideViewEl } = this.state;
    return (
      <div>
        {
          currentSlide.components.map((plugin: any, key: number) => {
            const { component: Component, state: { width, height, left: x, top: y } } = plugin;
            return (
              <Rnd
                key={ key }
                className='rnd'
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
                  top: false,
                  right: true,
                  bottom: true,
                  left: false,
                  topRight: false,
                  bottomRight: true,
                  bottomLeft: false,
                  topLeft: false
                } }
                onClick={ () => setNewActivePlugin(key, slideNumber) }
                onResizeStop={ (direction: string, styleSize: Object, clientSize: Object) => updateCurrentSlide(key, clientSize) }
                onDragStop={ (e: any, { position }: { position: Object }) => updateCurrentSlide(key, position) }
              >
                <OptionsBar 
                  currentSelectedPlugin={ currentSelectedPlugin }
                  isInPresenterMode={ isInPresenterMode }
                  pluginNumber={ key }
                  pluginState={ currentSlide.components[key].state } 
                  slideNumber={ slideNumber } 
                  updateCurrentSlide={ updateCurrentSlide } />
                <Component 
                  width={ width }
                  height={ height }
                  pluginNumber={ key }
                  pluginState={ currentSlide.components[key].state }
                  slideNumber={ slideNumber } />
              </Rnd>
            );
        })}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  currentSlide: state.app.slides[state.app.currentSlide],
  currentSelectedPlugin: state.app.currentSelectedPlugin,
  isInPresenterMode: state.app.isFullscreen,
  slideNumber: state.app.currentSlide,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateCurrentSlide: (pluginNumber: number, changes: Object) => dispatch(updateCurrentSlide(pluginNumber, changes)),
  setNewActivePlugin: (pluginNumber: number, slideNumber: number) => dispatch(actions.setNewActivePlugin(pluginNumber, slideNumber)),
});

const CurrentSlideView = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentSlideViewComponent as any);

export { CurrentSlideView };
