import * as React from 'react';
import { connect } from 'react-redux';
import { leftArrowPrev, rightArrowNext, toggleFullscreenMode } from '../../../actions/app.actions';
import { CurrentSlideView } from '../..';
import './fullscreen-view.scss';

interface IDimension {
  width: number;
  height: number;
}

interface FullscreenViewProps {
  currentSlideNumber?: number;
  currentSlide?: any;
  deviceDimension: IDimension;
  leftArrowPrev?: Function;
  rightArrowNext?: Function;
  slides?: any[];
  slidesDimension: IDimension;
  slideNumber?: number;
  toggleFullscreenMode?: Function;
}

class FullscreenView extends React.Component<FullscreenViewProps, { }> {
  constructor() {
    super();
    this.handleKeyBindings = this.handleKeyBindings.bind(this);
  }

  handleKeyBindings(event: any) {
    const { currentSlideNumber, leftArrowPrev, rightArrowNext, slides, toggleFullscreenMode } = this.props;
    const isBeginning = slides[currentSlideNumber - 1] === undefined ? true : false;
    const isLast = slides[currentSlideNumber + 1] === undefined ? true : false;

    if (event.keyCode === 37 && !isBeginning) leftArrowPrev();
    else if (event.keyCode === 39 && !isLast) rightArrowNext();
    else if (event.keyCode === 27) toggleFullscreenMode();
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyBindings);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyBindings);
  }
  

  render() {
    const { currentSlide, deviceDimension, leftArrowPrev, rightArrowNext, toggleFullscreenMode, slidesDimension, slideNumber } = this.props;
    console.log(deviceDimension);
    const scale = Math.min(
      deviceDimension.width / slidesDimension.width,
      deviceDimension.height / slidesDimension.height
    );

    return (
      <div>
        {
          currentSlide.plugins.map((plugin: any, key: number) => {
            const { component: Plugin, state: { width, height, left, top } } = plugin;
            const pluginPosition = {
              left: left ? left * scale : 0,
              top: top ? top * scale : 0
            };
            return (
              <div key={ key } style={{ position: 'absolute', ...pluginPosition }}>
                <div style={{ width, height, transform: `scale(${ scale })`, transformOrigin: '0 0' }}>
                  <Plugin
                    width={ width }
                    height={ height }
                    currentSlide={ currentSlide }
                    pluginNumber={ key }
                    pluginState={ currentSlide.plugins[key].state }
                    slideNumber={ slideNumber } />
                </div>
              </div>
            );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({ 
  currentSlideNumber: state.app.currentSlide,
  currentSlide: state.slides[state.app.currentSlide],
  deviceDimension: state.app.deviceDimension,
  slides: state.slides,
  slidesDimension: state.app.slidesDimension,
  slideNumber: state.app.currentSlide,
});

const mapDispatchToProps = (dispatch: any) => ({
  leftArrowPrev: () => dispatch(leftArrowPrev()),
  rightArrowNext: () => dispatch(rightArrowNext()),
  toggleFullscreenMode: () => dispatch(toggleFullscreenMode()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FullscreenView as any);
