import * as React from 'react';
import { connect } from 'react-redux';
import MiniSlide from './MiniSlide/MiniSlide';
import { goToSlide } from '../../actions/app.actions';
import './mini-slides-panel.scss';

interface MiniSlidesPanelProps {
  slides?: any;
  goToSlide?: Function;
}

class MiniSlidesPanelComponent extends React.Component<MiniSlidesPanelProps, {}> {
  render() {
    const { slides, goToSlide } = this.props;
    return (
      <ul className="mini-slides-panel">
        { slides.map((slide: any, key: number) => <MiniSlide slide={slides[key]} key={key} index={key} goToSlide={ goToSlide.bind(this, key) }/>)}
      </ul>
    );
  }
}

const mapStateToProps = (state: any) => ({ slides: state.slides });

const mapDispatchToProps = (dispatch: any) => ({
  goToSlide: (slideNumber: number) => dispatch(goToSlide(slideNumber))
});

const MiniSlidesPanel = connect(mapStateToProps, mapDispatchToProps)(MiniSlidesPanelComponent as any);

export { MiniSlidesPanel };
