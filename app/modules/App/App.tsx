import * as React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { toggleFullScreen, updateDeviceDimension, updateSlidesDimension } from 'actions/app.actions';
import { throttle } from 'utils/helpers';
import '@blueprintjs/core/dist/blueprint.css';

import EditView from './EditView/EditView';
import FullScreenView from './FullScreenView/FullScreenView';

interface IDimensions {
  width: number;
  height: number;
}

interface AppComponentProps {
  deviceDimension: IDimensions;
  isFullScreen: boolean;
  lastSavedSlideDimensions: IDimensions;
  slide: any;
  slidesDimension: IDimensions;
  toggleFullScreen: any;
  updateDeviceDimension: Function;
  updateSlidesDimension: Function;
}

class AppComponent extends React.Component<AppComponentProps, {}> {
  public constructor() {
    super();
    this.handleResize = throttle(this.handleResize.bind(this), 300);
    this.handleWindowMoved = this.handleWindowMoved.bind(this);
  }
  
  private handleResize(): void {
    const slidesElement = document.getElementById('edit-slide-view');
    if (!slidesElement) return null;

    const { updateSlidesDimension } = this.props;
    const { clientWidth: width, clientHeight: height } = slidesElement;

    updateSlidesDimension({ width, height });
  }
  
  private handleWindowMoved() {
    const { deviceDimension: { width: _width, height: _height }, updateDeviceDimension } = this.props;
    const { width, height } = window.screen;

    if (width !== _width || height !== height) updateDeviceDimension({ width, height });
  }

  public componentWillMount() {
    const { toggleFullScreen } = this.props;
    ipcRenderer.on('moved', this.handleWindowMoved);
    ipcRenderer.on('toggleFullScreen', toggleFullScreen);
  }

  public componentDidMount(): void {
    const { updateSlidesDimension } = this.props;
    const slidesElement = document.getElementById('edit-slide-view');
    const { clientWidth, clientHeight } = slidesElement;

    window.addEventListener('resize', this.handleResize);

    updateSlidesDimension({ width: clientWidth, height: (window.screen.height * clientWidth) / window.screen.width });
  }

  public componentWillUnMount() {
    ipcRenderer.removeAllListeners();
    window.removeEventListener('resize', this.handleResize);
  }

  public render() {
    const { deviceDimension, isFullScreen, lastSavedSlideDimensions, slide, slidesDimension } = this.props;
    return (
      <main>
        { 
          isFullScreen ?
            <FullScreenView /> :
            <EditView
              lastSavedSlideDimensions={ lastSavedSlideDimensions }
              slide={ slide }
              slidesDimension={ slidesDimension }
              thumbnailsDimension = {{ width: deviceDimension.width / 10, height: deviceDimension.height/ 10 }} />
        }
      </main>
    );
  }
}

const mapStateToProps= (state: any) => ({
  deviceDimension: state.app.deviceDimension,
  isFullScreen: state.app.isFullScreen,
  lastSavedSlideDimensions: state.app.lastSavedSlideDimensions,
  slide: state.slides[state.app.currentSlide],
  slidesDimension: state.app.slidesDimension,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleFullScreen: () => dispatch(toggleFullScreen()),
  updateDeviceDimension: (newDeviceDimension: { width: number, height: number }) => dispatch(updateDeviceDimension(newDeviceDimension)),
  updateSlidesDimension: (slidesDimension: { width: number, height: number }) => dispatch(updateSlidesDimension(slidesDimension)),
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent as any);

export { App };
