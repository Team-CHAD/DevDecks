import * as React from 'react';
import { connect } from 'react-redux';
import MiniSlide from './MiniSlide/MiniSlide';
import './mini-slides-panel.scss';


// TODO: find ways to import interfaces efficiently
// like with array of slides
class MiniSlidesPanelComponent extends React.Component<{ slides?: any }, {}> {
  render() {
    const { slides } = this.props;
    return (
      <ul className="mini-slides-panel">
        { slides.map((slide: any, key: number) => <MiniSlide key={key} index={key + 1}/>)}
      </ul>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    slides: state.app.slides,
  };
}

const MiniSlidesPanel = connect(mapStateToProps)(MiniSlidesPanelComponent as any);

export { MiniSlidesPanel };
