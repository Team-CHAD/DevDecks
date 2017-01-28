import { expect } from 'chai';
import { OPEN_NEW_DECK } from '../../../../app/constants/slides.constants';

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

  describe('OPEN_NEW_DECK', () => {
    const _initialState = [slide, dummySlide1];
    it('should reset slides state to a single slide with no plugins', () => {
      expect(reducer(_initialState, { type: OPEN_NEW_DECK })).to.deep.equal(initialState);
    });
  });
}
