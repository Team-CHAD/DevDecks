import * as React from 'react';
import { connect } from 'react-redux';
import MiniSlide from './MiniSlide/MiniSlide';
import * as actions from './actions';
import './mini-slides-panel.scss';


// TODO: find ways to import interfaces efficiently
// like with array of slides

interface MiniSlidesPanelProps {
  slides?: any,
  goToSlide?: Function,
}

class MiniSlidesPanelComponent extends React.Component<MiniSlidesPanelProps, {}> {
  render() {
    const { slides, goToSlide } = this.props;
    return (
      <ul className="mini-slides-panel">
        { slides.map((slide: any, key: number) => <MiniSlide key={key} index={key} goToSlide={ goToSlide.bind(this, key) }/>)}
      </ul>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    slides: state.app.slides,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    goToSlide: (miniSlideIndex: number) => dispatch(actions.goToSlide(miniSlideIndex)),
  };
}

const MiniSlidesPanel = connect(mapStateToProps, mapDispatchToProps)(MiniSlidesPanelComponent as any);

export { MiniSlidesPanel };
