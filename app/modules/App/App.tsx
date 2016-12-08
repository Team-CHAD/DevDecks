import * as React from 'react';
import { connect } from 'react-redux';
import { updateSlidesDimension } from '../../actions/app.actions';
import '@blueprintjs/core/dist/blueprint.css';

import EditView from './EditView/EditView';
import FullscreenView from './FullscreenView/FullscreenView';

interface IDimension {
  width: number;
  height: number;
}

interface AppComponentProps {
  isFullscreen: boolean;
  deviceDimension: IDimension;
  slidesDimension: IDimension;
  updateSlidesDimension: any;
}

class AppComponent extends React.Component<AppComponentProps, {}> {

  private handleResize({ clientWidth: width, clientHeight: height }: HTMLElement) {
    this.props.updateSlidesDimension({ width, height });
  }

  public componentDidMount() {
    const { deviceDimension: { width: deviceWidth, height: deviceHeight }, updateSlidesDimension } = this.props;
    const slidesEl = document.getElementById('edit-slide-view');
    const miniSlidesPanelEl = document.getElementById('mini-slide-panel');
    const { clientWidth, clientHeight } = slidesEl;
    window.addEventListener('resize', this.handleResize.bind(this, slidesEl));
    updateSlidesDimension({ width: clientWidth - 250, height: (deviceHeight * (clientWidth - 250)) / deviceWidth });
  }

  public render() {
    const { deviceDimension, isFullscreen } = this.props;
    return (
      <main>
        { isFullscreen ? <FullscreenView /> : <EditView deviceDimension={ deviceDimension } /> }
      </main>
    );
  }
}

const mapStateToProps= (state: any) => ({
  isFullscreen: state.app.isFullscreen,
  deviceDimension: state.app.deviceDimension,
  slidesDimension: state.app.slidesDimension,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateSlidesDimension: (slidesDimension: { width: number, height: number }) => dispatch(updateSlidesDimension(slidesDimension)),
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent as any);

export { App };
