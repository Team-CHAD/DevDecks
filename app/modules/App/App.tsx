import * as fs from 'fs';
import * as React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer, remote } from 'electron';
import { throttle } from 'utils/helpers';
import '@blueprintjs/core/dist/blueprint.css';
import { openFile } from 'actions/slides.actions';

import {
  goToSlide,
  leftArrowPrev,
  rightArrowNext,
  toggleFullScreen,
  updateDeviceDimension,
  updateSlidesDimension
} from 'actions/app.actions';

import EditView from './EditView/EditView';
import FullScreenView from './FullScreenView/FullScreenView';

const PLATFORM = process.platform;
const TITLE = 'DevDecks';

interface IDimensions {
  width: number;
  height: number;
}

interface AppComponentProps {
  deviceDimension: IDimensions;
  goToSlide: Function;
  isDragging: boolean;
  isFullScreen: boolean;
  lastSavedSlideDimensions: IDimensions;
  leftArrowPrev: Function;
  openFile: Function;
  rightArrowNext: Function;
  slide: any;
  slideNumber: number;
  slides: Array<any>;
  slidesDimension: IDimensions;
  toggleFullScreen: any;
  updateDeviceDimension: Function;
  updateSlidesDimension: Function;
}

interface AppComponentStates {
  representedFilename: string;
}

class AppComponent extends React.Component<AppComponentProps, AppComponentStates> {
  public constructor() {
    super();
    this.handleOpenFile = this.handleOpenFile.bind(this);
    this.handleSaveDialog = this.handleSaveDialog.bind(this);
    this.handleSaveFile = this.handleSaveFile.bind(this);
    this.handleSaveFileAs = this.handleSaveFileAs.bind(this);
    this.handleSlidesTransition = this.handleSlidesTransition.bind(this);
    this.handleResize = throttle(this.handleResize.bind(this), 300);
    this.state = {
      representedFilename: '',
    }
  }

  private handleResize(): void {
    const slidesElement = document.getElementById('edit-slide-view');
    if (!slidesElement) return null;

    const { updateSlidesDimension } = this.props;
    const { clientWidth: width, clientHeight: height } = slidesElement;

    updateSlidesDimension({ width, height });
  }

  private handleOpenFile() {
    const { goToSlide, openFile } = this.props;
    const options: any = {
      filters: [
        {
          name: 'DevDecks',
          extensions: ['dd']
        }
      ]
    };
    remote.dialog.showOpenDialog(options, (filePaths: string[]) => {
      if (!filePaths) return;
      fs.readFile(filePaths[0], (err: any, data: any) => {
        if (err) return;
        const devdecksBufferString: string = JSON.parse(new Buffer(data).toString());

        // Ensures that slide 0 is active before rendering new slides
        // This prevents an error when previous active slide does not exist
        goToSlide(0);

        openFile(devdecksBufferString);
        this.setState({ representedFilename: filePaths[0] })
        remote.getCurrentWindow().setTitle(`${filePaths[0]} - ${TITLE}`)
      });
    });
  }

  private handleSaveDialog() {
    const { slides } = this.props;
    const { representedFilename } = this.state;
    const data = JSON.stringify(slides);

    const options: any = {
      filters: [
        {
          name: 'DevDecks',
          extensions: ['dd']
        }
      ]
    };

    remote.dialog.showSaveDialog(options, (filename: string) => {
      if (!filename) return;
      fs.writeFile(filename, data);

      this.setState({ representedFilename: filename })
      remote.getCurrentWindow().setTitle(`${filename} - ${TITLE}`)
    });
  }

  private handleSaveFile() {
    const { slides } = this.props;
    const { representedFilename } = this.state;
    const data = JSON.stringify(slides);

    if (representedFilename) fs.writeFile(representedFilename, data);
    else this.handleSaveDialog();
  }

  private handleSaveFileAs() {
    this.handleSaveDialog();
  }

  private handleSlidesTransition(event: any): void {
    const {
      isFullScreen,
      leftArrowPrev,
      rightArrowNext,
      slideNumber,
      slides,
      toggleFullScreen
    } = this.props;

    if (!isFullScreen) return null;

    const isBeginning = slides[slideNumber - 1] === undefined ? true : false;
    const isLast = slides[slideNumber + 1] === undefined ? true : false;

    if (event.keyCode === 37 && !isBeginning) leftArrowPrev();
    else if (event.keyCode === 39 && !isLast) rightArrowNext();
    else if (event.keyCode === 27) toggleFullScreen();
  }
  
  public componentWillMount() {
    const { toggleFullScreen } = this.props;
    ipcRenderer.on('openFile', this.handleOpenFile);
    ipcRenderer.on('saveFile', this.handleSaveFile);
    ipcRenderer.on('saveFileAs', this.handleSaveFileAs);
    ipcRenderer.on('toggleFullScreen', toggleFullScreen);
    window.addEventListener('keydown', this.handleSlidesTransition);
  }

  public componentDidMount(): void {
    const { deviceDimension, updateSlidesDimension } = this.props;
    const slidesElement = document.getElementById('edit-slide-view');
    const { clientWidth, clientHeight } = slidesElement;

    window.addEventListener('resize', this.handleResize);

    updateSlidesDimension({ width: clientWidth, height: (deviceDimension.height * clientWidth) / deviceDimension.width });
  }

  public componentWillUnMount() {
    ipcRenderer.removeAllListeners();
    window.removeEventListener('keydown', this.handleSlidesTransition);
    window.removeEventListener('resize', this.handleResize);
  }

  public render() {
    const {
      deviceDimension,
      isDragging,
      isFullScreen,
      lastSavedSlideDimensions,
      leftArrowPrev,
      rightArrowNext,
      slide,
      slides,
      slideNumber,
      slidesDimension,
      toggleFullScreen,
      updateDeviceDimension,
    } = this.props;

    return (
      <main>
        { 
          isFullScreen ?
            <FullScreenView
              slide={ slide }
              deviceDimension={ deviceDimension } /> :
            <EditView
              deviceDimension={ deviceDimension }
              isDragging={ isDragging }
              lastSavedSlideDimensions={ lastSavedSlideDimensions }
              slide={ slide }
              slidesDimension={ slidesDimension }
              thumbnailsDimension ={{ width: deviceDimension.width / 10, height: deviceDimension.height/ 10 }} 
              updateDeviceDimension={ updateDeviceDimension }/>
        }
      </main>
    );
  }
}

const mapStateToProps= (state: any) => ({
  deviceDimension: state.app.deviceDimension,
  isDragging: state.app.isDragging,
  isFullScreen: state.app.isFullScreen,
  lastSavedSlideDimensions: state.app.lastSavedSlideDimensions,
  slide: state.slides[state.app.currentSlide],
  slideNumber: state.app.currentSlide,
  slides: state.slides,
  slidesDimension: state.app.slidesDimension,
});

const mapDispatchToProps = (dispatch: any) => ({
  goToSlide: (slideNumber: number) => dispatch(goToSlide(slideNumber)),
  leftArrowPrev: () => dispatch(leftArrowPrev()),
  openFile: (newStateFromFile: Object) => dispatch(openFile(newStateFromFile)),
  rightArrowNext: () => dispatch(rightArrowNext()),
  toggleFullScreen: () => dispatch(toggleFullScreen()),
  updateDeviceDimension: (newDeviceDimension: { width: number, height: number }) => dispatch(updateDeviceDimension(newDeviceDimension)),
  updateSlidesDimension: (slidesDimension: { width: number, height: number }) => dispatch(updateSlidesDimension(slidesDimension)),
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent as any);

export { App };
