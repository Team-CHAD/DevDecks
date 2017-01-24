import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { SmartSlideComponent } from '../../app/modules/SmartSlide/SmartSlide';

function setup() {
  const deviceDimension = {
    width: 1280,
    height: 800
  };
  const props = {
    currentSelectedPlugin: {
      moduleName: '',
      pluginNumber: 1,
      slideNumber: 2
    },
    goToSlide: sinon.spy(() => { }),
    isInPresenterMode: false,
    setActivePlugin: sinon.spy(() => { }),
    slide: {
      plugins: [{ state: { text: 'plugin1' } }, { state: { text: 'plugin2' } }, { state: { text: 'plugin3' } }, { state: { text: 'plugin4' } }],
      state: {
        backgroundColor: {
          r: 100,
          g: 100,
          b: 100,
          a: 1
        },
        transition: {
          right: 'rotate-push-left-move-from-right',
          left: 'rotate-push-right-move-from-left',
        }
      }
    },
    slidesDimension: {
      width: deviceDimension.width * .75,
      height: deviceDimension.height * .75,
    },
    scale: Math.min( this.slidesDimension.width / deviceDimension.width, this.slidesDimension.height / deviceDimension.height),
    slideNumber: 2,
    toggleGuidelines: sinon.spy(() => { }),
    updateCurrentPlugin: sinon.spy(() => { })
  }

  const wrapper = shallow(<SmartSlideComponent {...props} />);

  return { props, wrapper }; 
}

describe('<SmartSlide />', () => {

  describe('Self', () => {
    const { wrapper } = setup();

    it('should render four <Plugin> components to the slide', () => {
      expect(wrapper.find('Plugin')).to.have.length(4);
    })
  })  

  describe('Plugin', () => {
    const { props: { currentSelectedPlugin, setActivePlugin, updateCurrentPlugin }, wrapper } = setup();

    const plugins = wrapper.find('Plugin');

    afterEach(() => {
      setActivePlugin.reset();
      updateCurrentPlugin.reset();
    });

    it('should call setActivePlugin on plugin 2 when plugin 2 is clicked and plugin 1 is current plugin', () => {
      plugins[2].simulate('click');
      expect(setActivePlugin.callCount).to.equal(1);
      expect(currentSelectedPlugin.pluginNumber).to.equal(2);
    })

    it('should update plugin 1 state[text] when plugin 1 is current plugin and state changes', () => {
      expect(currentSelectedPlugin.pluginNumber).to.equal(1);
      plugins[1].simulate('keyDown', { keycode: 65 });
      plugins[1].simulate('keyDown', { keycode: 78 });
      expect(updateCurrentPlugin.callCount).to.equal(2);
      expect(plugins[1].state.text).to.equal('plugin1an')
    })
  })


})


