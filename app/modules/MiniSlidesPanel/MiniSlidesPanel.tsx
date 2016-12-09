import * as React from 'react';
import { connect } from 'react-redux';
import { goToSlide } from '../../actions/app.actions';
import './mini-slide-panel.scss';

import { Slide } from '..';
import { Scale } from '../../sharedComponents';

interface IDimensions {
  width: number;
  height: number;
}

interface MiniSlidesPanelProps {
  currentSlideNumber?: number;
  goToSlide?: Function;
  slides?: any;
  thumbnailsDimension?: IDimensions;
}

class MiniSlidesPanelComponent extends React.Component<MiniSlidesPanelProps, {}> {
  render() {
    const { currentSlideNumber, goToSlide, slides, thumbnailsDimension } = this.props;

    const scale = Math.min(
      thumbnailsDimension.width / window.screen.width,
      thumbnailsDimension.height / window.screen.height
    );

    return (
      <ul id="mini-slide-panel">
        { 
          slides.map((slide: any, key: number) => (
            <div key={ key }>
              <span className="mini-slide-counter">{ key }</span>
              <div
                className={ currentSlideNumber === key? "mini-slide current-mini-slide" : "mini-slide" }
                onClick={ goToSlide.bind(this, key) }>
                <Scale isFullscreen={ false } scale={ scale }>
                  <Slide
                    scale={ scale }
                    slide={ slide }
                    smart={ false } />
                </Scale>
              </div>
            </div>
          ))
        }
      </ul>
    );
  }
}

const mapStateToProps = (state: any, props: any) => ({
  currentSlideNumber: state.app.currentSlide,
  slides: state.slides,
  thumbnailsDimension: state.app.thumbnailsDimension,
});

const mapDispatchToProps = (dispatch: any) => ({
  goToSlide: (slideNumber: number) => dispatch(goToSlide(slideNumber))
});

const MiniSlidesPanel = connect(mapStateToProps, mapDispatchToProps)(MiniSlidesPanelComponent as any);

export { MiniSlidesPanel };
