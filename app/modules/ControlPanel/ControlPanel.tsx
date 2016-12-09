import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';
import { goToSlide } from '../../actions/app.actions';
import { addSlide, deleteSlide } from '../../actions/slides.actions'; 
import { saveLastSlideDimensions, toggleFullscreenMode } from '../../actions/app.actions'; 
import './control-panel.scss';

const Rnd = require('react-rnd');

interface ControlPanelProps {
  addSlide?: any;
  currentSlide?: number;
  deleteSlide?: any;
  goToSlide?: any;
  numberOfSlides?: number;
  saveLastSlideDimensions?: Function;
  toggleFullscreenMode?: any;
}

class ControlPanelComponent extends React.Component<ControlPanelProps, {}> {
  render() {
    const { 
      addSlide,
      currentSlide,
      deleteSlide,
      goToSlide,
      numberOfSlides,
      saveLastSlideDimensions,
      toggleFullscreenMode
    } = this.props;

    return (
      <Rnd
        isResizable={{
          top: false,
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false
        }}
        bounds={{
          right: 0,
          left: 0
        }} >
        <Button
          className="pt-large handle-vertical-custom"
          iconName="drag-handle-vertical" />
        <Button 
          className="pt-large"
          iconName="add"
          onClick={() => {
            addSlide(currentSlide);
            goToSlide(currentSlide + 1);
          }} />
        <Button 
          className="pt-large"
          iconName="trash"
          onClick={() => {
            deleteSlide(currentSlide);

            if (numberOfSlides - 1 < 1) {
              addSlide();
              goToSlide(0);
            } else if (currentSlide === numberOfSlides - 1) {
              goToSlide(currentSlide - 1);
            } else {
              goToSlide(currentSlide);
            }
          }} />
        <Button 
          className='pt-large'
          iconName='fullscreen'
          onClick={() => {
            const slideElement = document.getElementById('edit-slide-view');
            const { clientWidth: width, clientHeight: height } = slideElement;
            saveLastSlideDimensions({ width, height });
            toggleFullscreenMode();
          }} />
      </Rnd>
    );
  }
}

const mapStateToProps = (state: any) => ({ 
  currentSlide: state.app.currentSlide,
  numberOfSlides: state.slides.length,
});

const mapDispatchToProps = (dispatch: any) => ({
  addSlide: (currentSlide: number) => dispatch(addSlide(currentSlide)),
  deleteSlide: (currentSlide: number) => dispatch(deleteSlide(currentSlide)),
  goToSlide: (slideNumber: number) => dispatch(goToSlide(slideNumber)),
  saveLastSlideDimensions: (dimensions: { width: number; height: number }) => dispatch(saveLastSlideDimensions(dimensions)),
  toggleFullscreenMode: () => dispatch(toggleFullscreenMode()),
});

const ControlPanel = connect(mapStateToProps, mapDispatchToProps)(ControlPanelComponent as any);

export { ControlPanel };
