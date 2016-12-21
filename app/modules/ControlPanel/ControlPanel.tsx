import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';
import { goToSlide } from 'actions/app.actions';
import { addSlide, deleteSlide } from 'actions/slides.actions'; 
import { saveLastSlideDimensions, setActivePlugin, toggleFullScreen } from 'actions/app.actions';
import './control-panel.scss';

interface ControlPanelProps {
  currentSlide: number;
  numberOfSlides: number;

  addSlide: Function;
  goToSlide: Function;
  saveLastSlideDimensions: Function;
  setActivePlugin: Function;
  toggleFullScreen: Function;
  updateCurrentPlugin: Function;
}

class ControlPanelComponent extends React.Component<ControlPanelProps, {}> {
  render() {
    const { 
      currentSlide,
      numberOfSlides,
      
      addSlide,
      goToSlide,
      saveLastSlideDimensions,
      setActivePlugin,
      toggleFullScreen,
      updateCurrentPlugin,
    } = this.props;

    return (
      <div id="control-panel-container">
        <Button 
          className="pt-large"
          iconName="add"
          onClick={() => {
            addSlide(currentSlide);
            goToSlide(currentSlide + 1);
          }} />
        <Button 
          className='pt-large'
          iconName='fullscreen'
          onClick={() => {
            const slideElement = document.getElementById('edit-slide-view');
            const { clientWidth: width, clientHeight: height } = slideElement;
            saveLastSlideDimensions({ width, height });
            toggleFullScreen();
          }} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({ 
  currentSlide: state.app.present.currentSlide,
  numberOfSlides: state.slides.present.length,
});

const mapDispatchToProps = (dispatch: any) => ({
  addSlide: (currentSlide: number) => dispatch(addSlide(currentSlide)),
  deleteSlide: (currentSlide: number) => dispatch(deleteSlide(currentSlide)),
  goToSlide: (slideNumber: number) => dispatch(goToSlide(slideNumber)),
  saveLastSlideDimensions: (dimensions: { width: number; height: number }) => dispatch(saveLastSlideDimensions(dimensions)),
  setActivePlugin: () => dispatch(setActivePlugin()),
  toggleFullScreen: () => dispatch(toggleFullScreen()),
});

const ControlPanel = connect(mapStateToProps, mapDispatchToProps)(ControlPanelComponent as any);

export { ControlPanel };
