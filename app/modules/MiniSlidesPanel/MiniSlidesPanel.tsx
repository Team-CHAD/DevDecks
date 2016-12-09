import * as React from 'react';
import { connect } from 'react-redux';
import MiniSlide from './MiniSlide/MiniSlide';
import { goToSlide } from '../../actions/app.actions';

interface IDimensions {
  width: number;
  height: number;
}

interface MiniSlidesPanelProps {
  currentSlide?: number;
  deviceDimension?: IDimensions;
  goToSlide?: Function;
  slides?: any;
  slidesDimension?: IDimensions;
  thumbnailsDimension?: IDimensions;
  
}

class MiniSlidesPanelComponent extends React.Component<MiniSlidesPanelProps, {}> {
  render() {
    const { goToSlide, slides, deviceDimension, slidesDimension, thumbnailsDimension, currentSlide } = this.props;

    const scale = Math.min(
      thumbnailsDimension.width / slidesDimension.width,
      thumbnailsDimension.height / slidesDimension.height
    );

    return (
      <ul>
        { 
          slides.map((slide: any, key: number) => (
            <MiniSlide
              currentSlide={ currentSlide }
              key={ key }
              index={ key }
              goToSlide={ goToSlide.bind(this, key) }
              scale={ scale }
              slide={ slides[key] } />
          ))
        }
      </ul>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentSlide: state.app.currentSlide,
  deviceDimension: state.app.deviceDimension,
  slides: state.slides,
  slidesDimension: state.app.slidesDimension,
  thumbnailsDimension: state.app.thumbnailsDimension,
});

const mapDispatchToProps = (dispatch: any) => ({
  goToSlide: (slideNumber: number) => dispatch(goToSlide(slideNumber))
});

const MiniSlidesPanel = connect(mapStateToProps, mapDispatchToProps)(MiniSlidesPanelComponent as any);

export { MiniSlidesPanel };
