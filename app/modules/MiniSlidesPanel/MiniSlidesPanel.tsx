import * as React from 'react';
import { connect } from 'react-redux';
import MiniSlide from './MiniSlide/MiniSlide';
import './mini-slides-panel.scss';


@connect(
  state => ({
    slides: state.app.slides
  })
)

// TODO: find ways to import interfaces efficiently
// like with array of slides
class MiniSlidesPanel extends React.Component<{ slides?: any }, {}> {
  render() {
    const { slides } = this.props;
    return (
      <ul className="mini-slides-panel">
        { slides.map((slide: any, key: number) => <MiniSlide key={key} index={key + 1}/>)}
      </ul>
    );
  }
} 

export { MiniSlidesPanel };
