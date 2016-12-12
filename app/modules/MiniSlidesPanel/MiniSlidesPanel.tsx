import * as React from 'react';
import { connect } from 'react-redux';
import { goToSlide } from 'actions/app.actions';
import './mini-slide-panel.scss';

import { Slide } from 'modules';
import { Scale } from 'sharedComponents';

interface MiniSlidesPanelProps {
  currentSlideNumber?: number;
  deviceDimension?: {
    width: number;
    height: number;
  };
  goToSlide?: Function;
  slides?: any;
}

class MiniSlidesPanelComponent extends React.Component<MiniSlidesPanelProps, {}> {
  render() {
    const { currentSlideNumber, deviceDimension, goToSlide, slides } = this.props;

    const thumbnailsDimension = {
      width: deviceDimension.width / 10,
      height: deviceDimension.height / 10
    };

    const scale = Math.min(
      thumbnailsDimension.width / window.screen.width,
      thumbnailsDimension.height / window.screen.height
    );

    return (
      <ul id="mini-slide-panel" style={{ minWidth: thumbnailsDimension.width + 100 }}>
        { 
          slides.map((slide: any, key: number) => (
            <li key={ key }>
              <span className="mini-slide-counter">{ key }</span>
              <div
                style={{ width: thumbnailsDimension.width, height: thumbnailsDimension.height }}
                className={ currentSlideNumber === key? "mini-slide current-mini-slide" : "mini-slide" }
                onClick={ goToSlide.bind(this, key) }>
                <Scale isFullScreen={ false } scale={ scale }>
                  <Slide
                    scale={ scale }
                    slide={ slide }
                    smart={ false } />
                </Scale>
              </div>
            </li>
          ))
        }
      </ul>
    );
  }
}

const mapStateToProps = (state: any, props: any) => ({
  currentSlideNumber: state.app.currentSlide,
  deviceDimension: state.app.deviceDimension,
  slides: state.slides,
});

const mapDispatchToProps = (dispatch: any) => ({
  goToSlide: (slideNumber: number) => dispatch(goToSlide(slideNumber))
});

const MiniSlidesPanel = connect(mapStateToProps, mapDispatchToProps)(MiniSlidesPanelComponent as any);

export { MiniSlidesPanel };
