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
  toggleFullscreenMode?: React.MouseEventHandler<HTMLElement>,
  rightArrowNext?: Function,
  leftArrowPrev?: Function,
}

class FullscreenViewComponent extends React.Component<FullscreenViewProps, {}> {
  constructor() {
    super();
    this.nextPrev = this.nextPrev.bind(this);
  }

  nextPrev(event:any) {
    if(event.keyCode == 39 && this.props.slides[this.props.currentSlide + 1] !== undefined){
      console.log('right arrow pressed')
      this.props.rightArrowNext();
    }
    else if(event.keyCode == 37 && this.props.slides[this.props.currentSlide - 1] !== undefined ){
      console.log('left arrow pressed')
      this.props.leftArrowPrev();
    }
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

        <div className="fullscreen-controls">
          <Controls toggleFullscreenMode={ toggleFullscreenMode }/>
        </div>

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
