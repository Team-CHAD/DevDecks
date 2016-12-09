import * as React from 'react';
import { connect } from 'react-redux';
import { updateSlidesDimension } from '../../actions/app.actions';
import { throttle } from '../../utils/helpers';
import '@blueprintjs/core/dist/blueprint.css';

import EditView from './EditView/EditView';
import FullscreenView from './FullscreenView/FullscreenView';

interface IDimensions {
  width: number;
  height: number;
}

interface AppComponentProps {
  isFullscreen: boolean;
  lastSavedSlideDimensions: IDimensions;
  slide: any;
  slidesDimension: IDimensions;
  thumbnailsDimension: IDimensions;
  updateSlidesDimension: Function;
}

class AppComponent extends React.Component<AppComponentProps, {}> {
  
  private handleResize() {
    const slidesElement = document.getElementById('edit-slide-view');
    const { clientWidth: width, clientHeight: height } = slidesElement;
    this.props.updateSlidesDimension({ width, height });
  }

  public componentDidMount() {
    const { updateSlidesDimension } = this.props;
    const slidesElement = document.getElementById('edit-slide-view');
    const { clientWidth, clientHeight } = slidesElement;
    this.handleResize = throttle(this.handleResize, 300);
    window.addEventListener('resize', this.handleResize.bind(this));
    updateSlidesDimension({ width: clientWidth - 250, height: (window.screen.height * (clientWidth - 250)) / window.screen.width });
  }

  public render() {
    const { isFullscreen, lastSavedSlideDimensions, slide, slidesDimension, thumbnailsDimension, updateSlidesDimension } = this.props;
    return (
      <main>
        { 
          isFullscreen ?
            <FullscreenView /> :
            <EditView
              lastSavedSlideDimensions={ lastSavedSlideDimensions }
              slide={ slide }
              slidesDimension={ slidesDimension }
              thumbnailsDimension={ thumbnailsDimension }
              updateSlidesDimension={ updateSlidesDimension } />
        }
      </main>
    );
  }
}

const mapStateToProps= (state: any) => ({
  isFullscreen: state.app.isFullscreen,
  lastSavedSlideDimensions: state.app.lastSavedSlideDimensions,
  slide: state.slides[state.app.currentSlide],
  slidesDimension: state.app.slidesDimension,
  thumbnailsDimension: state.app.thumbnailsDimension,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateSlidesDimension: (slidesDimension: { width: number, height: number }) => dispatch(updateSlidesDimension(slidesDimension)),
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent as any);

export { App };
