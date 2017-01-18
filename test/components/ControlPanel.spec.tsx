import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { ControlPanelComponent } from '../../app/modules/ControlPanel/ControlPanel';

function setup() {
  const props = {
    currentSlide: 0,
    numberOfSlides: 3,
    addSlide: sinon.spy(() => {}),
    goToSlide: sinon.spy(() => {}),
    saveLastSlideDimensions: sinon.spy(() => {}),
    toggleFullScreen: sinon.spy(() => {}),
  };

  const wrapper = shallow(<ControlPanelComponent {...props} />);

  return { props, wrapper };
}

describe('<ControlPanel />', () => {
  const CLICKS = 3;

  describe('Self', () => {
    const { wrapper } = setup();

    it('should render two <Button /> components', () => {
      expect(wrapper.find('Button')).to.have.length(2);
    });

    it('should render one Add Button', () => {
      expect(wrapper.find({ iconName: 'add' })).to.have.length(1);
    });

    it('should render one FullScreen Button', () => {
      expect(wrapper.find({ iconName: 'fullscreen' })).to.have.length(1);
    });
  })

  describe('Add Button', () => {
    const { props: { addSlide, goToSlide }, wrapper } = setup();

    const addButton = wrapper.find({ iconName: 'add' });

    afterEach(() => {
      addSlide.reset();
      goToSlide.reset();
    });

    it('should call addSlide when clicked', () => {
      for (let i = 0; i < CLICKS; i++) {
        addButton.simulate('click');
        expect(addSlide.callCount).to.equal(i + 1);
      }
    });

    it('should call goToSlide when clicked', () => {
      for (let i = 0; i < CLICKS; i++) {
        addButton.simulate('click');
        expect(goToSlide.callCount).to.equal(i + 1);
      }
    });
  });

  describe('FullScreen Button', () => {
    const { props: { saveLastSlideDimensions, toggleFullScreen }, wrapper } = setup();
    const fullScreenButton = wrapper.find({ iconName: 'fullscreen' });

    afterEach(() => {
      saveLastSlideDimensions.reset();
      toggleFullScreen.reset();
    });

    it('should call saveLastSlideDimensions when clicked', () => {
      for (let i = 0; i < CLICKS; i++) {
        fullScreenButton.simulate('click');
        expect(saveLastSlideDimensions.callCount).to.equal(i + 1);
      }
    });

    it('should call toggleFullScreen when clicked', () => {
      for(let i = 0; i < CLICKS; i++) {
        fullScreenButton.simulate('click');
        expect(toggleFullScreen.callCount).to.equal(i + 1);
      }
    });
  });
});