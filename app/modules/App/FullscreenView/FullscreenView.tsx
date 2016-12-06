import * as React from 'react';
import { connect } from 'react-redux';
import { leftArrowPrev, rightArrowNext, toggleFullscreenMode } from '../../../actions/app.actions';
import { CurrentSlideView } from '../..';
import './fullscreen-view.scss';

interface FullscreenViewProps {
  currentSlide?: number,
  leftArrowPrev?: Function,
  rightArrowNext?: Function,
  slides?: any[],
  toggleFullscreenMode?: Function,
}

class FullscreenView extends React.Component<FullscreenViewProps, { }> {
  constructor() {
    super();
    this.handleKeyBindings = this.handleKeyBindings.bind(this);
  }

  handleKeyBindings(event: any) {
    const { currentSlide, leftArrowPrev, rightArrowNext, slides, toggleFullscreenMode } = this.props;
    const isBeginning = slides[currentSlide - 1] === undefined ? true : false;
    const isLast = slides[currentSlide + 1] === undefined ? true : false;

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
    const {leftArrowPrev, rightArrowNext, toggleFullscreenMode} = this.props;
    return (
      <div id="fullscreen-view">

        <div>
          <CurrentSlideView />
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({ 
  currentSlide: state.app.currentSlide,
  slides: state.slides,
});

const mapDispatchToProps = (dispatch: any) => ({
  leftArrowPrev: () => dispatch(leftArrowPrev()),
  rightArrowNext: () => dispatch(rightArrowNext()),
  toggleFullscreenMode: () => dispatch(toggleFullscreenMode()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FullscreenView as any);
