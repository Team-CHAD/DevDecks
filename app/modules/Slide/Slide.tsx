import * as React from "react";
import { connect } from 'react-redux';
import { updateCurrentSlide } from 'actions/slides.actions';
import { setActivePlugin } from 'actions/app.actions';
import './slide.scss';

import DummySlide from './DummySlide/DummySlide';
import SmartSlide from './SmartSlide/SmartSlide';

const Rnd = require('react-rnd');

interface SlideProps {
  currentSelectedPlugin?: any;
  deviceDimension: {
    width: number;
    height: number;
  };
  isInPresenterMode?: boolean;
  scale: number;
  setActivePlugin?: Function;
  slide: any;
  slidesDimension: {
    width: number;
    height: number;
  };
  slideNumber?: number;
  smart: boolean;
  updateCurrentSlide?: Function;
}

class SlideComponent extends React.Component<SlideProps, {}> {

  public render() {
    const {
      currentSelectedPlugin,
      deviceDimension,
      isInPresenterMode,
      scale,
      setActivePlugin,
      slide,
      slidesDimension,
      slideNumber,
      smart,
      updateCurrentSlide,
    } = this.props;

    return (
      smart ?
        <SmartSlide
          currentSelectedPlugin={ currentSelectedPlugin }
          isInPresenterMode={ isInPresenterMode }
          scale={ scale }
          setActivePlugin={ setActivePlugin }
          slide={ slide }
          slidesDimension={ slidesDimension }
          slideNumber={ slideNumber }
          updateCurrentSlide={ updateCurrentSlide } /> :
        <DummySlide slide={ slide } />
    );
  }
}

const mapStateToProps = (state: any, props: any) => ({
  currentSelectedPlugin: state.app.currentSelectedPlugin,
  deviceDimension: state.app.deviceDimension,
  isInPresenterMode: state.app.isFullscreen,
  slidesDimension: state.app.slidesDimension,
  slideNumber: state.app.currentSlide,
});

const mapDispatchToProps = (dispatch: any) => ({
  setActivePlugin: (pluginNumber: number, slideNumber: number) => dispatch(setActivePlugin(pluginNumber, slideNumber)),
  updateCurrentSlide: (pluginNumber: number, slideNumber: number, changes: Object) => dispatch(updateCurrentSlide(pluginNumber, slideNumber, changes)),
});

const Slide = connect(
  mapStateToProps,
  mapDispatchToProps
)(SlideComponent as any);

export { Slide };
