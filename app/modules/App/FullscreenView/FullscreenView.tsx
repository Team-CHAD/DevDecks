import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './fullscreen-view.scss';
const CurrentSlide = require('../../CurrentSlideView/currentSlide');

import Controls from './Controls/Controls';

const actions = require('../actions');


interface FullscreenViewProps {
  toggleFullscreenMode?: React.MouseEventHandler<HTMLElement>,
  rightArrowNext?: Function,
  leftArrowPrev?: Function,
}

class FullscreenViewComponent extends React.Component<FullscreenViewProps, {}> {
  nextPrev(event:any) {
    if(event.keyCode == 39){
      this.props.rightArrowNext();
    }
    else if(event.keyCode == 37){
      this.props.leftArrowPrev();
    }
  }
  render() {
    const { toggleFullscreenMode, rightArrowNext, leftArrowPrev} = this.props;
    return (
      <div id="fullscreen-view" onKeyDown={this.nextPrev}>

        <div className="fullscreen-controls">
          <Controls toggleFullscreenMode={ toggleFullscreenMode }/>
        </div>

        <div>
          Edit Slide View
          {/*<CurrentSlide />*/}
        </div>

      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {};
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
