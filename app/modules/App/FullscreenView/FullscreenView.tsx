import * as React from 'react';
import { connect } from 'react-redux';
import { leftArrowPrev, rightArrowNext, toggleFullscreenMode } from '../../../actions/app.actions';
import { Slide } from '../..';
import './fullscreen-view.scss';

interface IDimension {
  width: number;
  height: number;
}

interface FullscreenViewProps {
  currentSlideNumber?: number;
  leftArrowPrev?: Function;
  rightArrowNext?: Function;
  slide?: any;
  slides?: any[];
  slideNumber?: number;
  toggleFullscreenMode?: Function;
}

class FullscreenView extends React.Component<FullscreenViewProps, { }> {
  constructor() {
    super();
    this.handleKeyBindings = this.handleKeyBindings.bind(this);
  }

  handleKeyBindings(event: any) {
    const { 
      currentSlideNumber,
      leftArrowPrev,
      rightArrowNext,
      slides,
      toggleFullscreenMode
    } = this.props;

    const isBeginning = slides[currentSlideNumber - 1] === undefined ? true : false;
    const isLast = slides[currentSlideNumber + 1] === undefined ? true : false;

    if (event.keyCode === 37 && !isBeginning) leftArrowPrev();
    else if (event.keyCode === 39 && !isLast) rightArrowNext();
    else if (event.keyCode === 27) toggleFullscreenMode();
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyBindings);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyBindings);
  }

  render() {
    const { slide } = this.props;
    return (
      <Slide 
        isFullscreen={ true }
        scale={ 1 }
        slide={ slide }
        smart={ false } />
    );
  }
}

const mapStateToProps = (state: any, props: any) => ({ 
  currentSlideNumber: state.app.currentSlide,
  slide: state.slides[state.app.currentSlide],
  slides: state.slides,
  slideNumber: state.app.currentSlide,
});

const mapDispatchToProps = (dispatch: any) => ({
  leftArrowPrev: () => dispatch(leftArrowPrev()),
  rightArrowNext: () => dispatch(rightArrowNext()),
  toggleFullscreenMode: () => dispatch(toggleFullscreenMode()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FullscreenView as any);
