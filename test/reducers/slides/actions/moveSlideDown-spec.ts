import { expect } from 'chai';
import { MOVE_SLIDE_DOWN } from '../../../../app/constants/slides.constants';

export default function(initialState: any, reducer: any, slide: any) {
  const dummySlide1 = {
    plugins: ['plugin1'],
    state: {
      backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
      transition: {
        right: 'rotate-push-left-move-from-right',
        left: 'rotate-push-right-move-from-left',
      }
    }
  };

  describe('MOVE_SLIDE_DOWN', () => {
    const _initialState = [slide, dummySlide1];
    it('should not move the slide when the first slide is selected', () => {
      expect(
        reducer(_initialState, {
          type: MOVE_SLIDE_DOWN,
          slideNumber: 0
        })
      ).to.deep.equal(_initialState);
    });

    it('should swap slide 1 and slide 0 when slide 1 is active', () => {
      expect(
        reducer(_initialState, {
          type: MOVE_SLIDE_DOWN,
          slideNumber: 1
        })
      ).to.deep.equal([dummySlide1, slide]);
    });
  });
}
