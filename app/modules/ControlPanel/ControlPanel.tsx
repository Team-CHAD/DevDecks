import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';
import { goToSlide } from '../../actions/app.actions';
import { addSlide, deleteSlide } from '../../actions/slides.actions'; 
import { toggleFullscreenMode } from '../../actions/app.actions'; 


interface ControlPanelProps {
  addSlide?: any;
  currentSlide?: number;
  deleteSlide?: any;
  goToSlide?: any;
  numberOfSlides?: number;
  toggleFullscreenMode?: React.MouseEventHandler<HTMLElement>;
}

class ControlPanelComponent extends React.Component<ControlPanelProps, {}> {
  render() {
    const { addSlide, currentSlide, deleteSlide, goToSlide, numberOfSlides, toggleFullscreenMode } = this.props;
    return (
      <div>
        <Button 
          className='pt-large'
          iconName='add'
          onClick={() => {
            addSlide(currentSlide);
            goToSlide(currentSlide + 1);
          }} />
        <Button 
          className='pt-large'
          iconName='trash'
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
        <Button className='pt-large' iconName='fullscreen' onClick={ toggleFullscreenMode } />
      </div>
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
  toggleFullscreenMode: () => dispatch(toggleFullscreenMode()),
});

const ControlPanel = connect(mapStateToProps, mapDispatchToProps)(ControlPanelComponent as any);

export { ControlPanel };
