import * as React from 'react';
import { connect } from 'react-redux';
import { leftArrowPrev, rightArrowNext, toggleFullScreen } from 'actions/app.actions';
import { Slide } from 'modules';
import './fullscreen-view.scss';

interface IDimension {
  width: number;
  height: number;
}

interface FullScreenViewProps {
  currentSlideNumber?: number;
  leftArrowPrev?: Function;
  rightArrowNext?: Function;
  slide?: any;
  slides?: any[];
  slideNumber?: number;
  toggleFullScreen?: Function;
}

class FullScreenView extends React.Component<FullScreenViewProps, { }> {
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
      toggleFullScreen
    } = this.props;

    const isBeginning = slides[currentSlideNumber - 1] === undefined ? true : false;
    const isLast = slides[currentSlideNumber + 1] === undefined ? true : false;

    if (event.keyCode === 37 && !isBeginning) leftArrowPrev();
    else if (event.keyCode === 39 && !isLast) rightArrowNext();
    else if (event.keyCode === 27) toggleFullScreen();
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
      <div id="fullscreen-view">
        <Slide 
          scale={ 1 }
          slide={ slide }
          smart={ false } />
      </div>
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
  toggleFullScreen: () => dispatch(toggleFullScreen()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenView as any);
