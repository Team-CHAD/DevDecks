import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './fullscreen-view.scss';

import { CurrentSlideView } from '../..';

import Controls from './Controls/Controls';

const actions = require('../actions');


interface FullscreenViewProps {
  slides?: any[],
  currentSlide?: number,
  toggleFullscreenMode?: Function,
  rightArrowNext?: Function,
  leftArrowPrev?: Function,
}

class FullscreenViewComponent extends React.Component<FullscreenViewProps, {}> {
  constructor() {
    super();
    this.nextPrev = this.nextPrev.bind(this);
  }

  nextPrev(event: any) {
    const { currentSlide, slides, leftArrowPrev, rightArrowNext, toggleFullscreenMode } = this.props;
    const isBeginning = slides[currentSlide - 1] === undefined ? true : false;
    const isLast = slides[currentSlide + 1] === undefined ? true : false;

    if (event.keyCode === 39 && !isLast) rightArrowNext();
    else if (event.keyCode === 37 && !isBeginning) leftArrowPrev();
    else if (event.keyCode === 27) toggleFullscreenMode();
  }

  componentDidMount() {
    window.addEventListener('keydown', this.nextPrev);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.nextPrev);
  }
  

  render() {
    const { toggleFullscreenMode, rightArrowNext, leftArrowPrev} = this.props;
    return (
      <div id="fullscreen-view">

        <div>
          <CurrentSlideView />
        </div>

      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return { slides:state.app.slides, currentSlide:state.app.currentSlide };
}

function mapDispatchToProps(dispatch: any) {
  return {
    toggleFullscreenMode: () => dispatch(actions.toggleFullscreenMode()),
    rightArrowNext: () => dispatch(actions.rightArrowNext()),
    leftArrowPrev: () => dispatch(actions.leftArrowPrev()),
  };
}

const FullscreenView = connect(mapStateToProps, mapDispatchToProps)(FullscreenViewComponent as any);

export default FullscreenView;
