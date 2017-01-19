import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';
import {
  goToSlide,
  saveLastSlideDimensions,
  toggleFullScreen,
} from 'actions/app.actions';
import { addSlide } from 'actions/slides.actions'; 
import './control-panel.scss';

interface ControlPanelProps {
  currentSlide: number;
  numberOfSlides: number;

  addSlide: Function;
  goToSlide: Function;
  saveLastSlideDimensions: Function;
  toggleFullScreen: Function;
}

export class ControlPanelComponent extends React.Component<ControlPanelProps, {}> {
  render() {
    const { 
      currentSlide,
      numberOfSlides,
      
      addSlide,
      goToSlide,
      saveLastSlideDimensions,
      toggleFullScreen,
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
            saveLastSlideDimensions();
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
  goToSlide: (slideNumber: number) => dispatch(goToSlide(slideNumber)),
  saveLastSlideDimensions: () => dispatch(saveLastSlideDimensions()),
  toggleFullScreen: () => dispatch(toggleFullScreen()),
});

const ControlPanel = connect(mapStateToProps, mapDispatchToProps)(ControlPanelComponent as any);

export { ControlPanel };
