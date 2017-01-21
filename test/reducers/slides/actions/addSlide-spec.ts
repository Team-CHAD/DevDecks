import { expect } from 'chai';
import { ADD_SLIDE } from '../../../../app/constants/slides.constants';

export default function(initialState: any, reducer: any, slide: any) {
  describe('ADD_SLIDE', () => {
    it('should add a new slide at position 1 when current slide is 0 and there is only one slide', () => {
      const _initialState: any = [{
        plugins: ['plugin1'],
        state: {
          backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
          transition: {
            right: 'rotate-push-left-move-from-right',
            left: 'rotate-push-right-move-from-left',
          }
        }
      }];

      expect(
        reducer(_initialState, {
          type: ADD_SLIDE,
          currentSlide: 0
        })
      ).to.deep.equal([
        {
          plugins: ['plugin1'],
          state: {
            backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
            transition: {
              right: 'rotate-push-left-move-from-right',
              left: 'rotate-push-right-move-from-left',
            }
          }
        },
        slide
      ])
      .and.to.have.lengthOf(2);
    });

    it('should add a new slide at position 2 when current slide is 1 and there are three slides', () => {
      const _initialState: any = [{
        plugins: ['plugin1'],
        state: {
          backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
          transition: {
            right: 'rotate-push-left-move-from-right',
            left: 'rotate-push-right-move-from-left',
          }
        }
      }, {
        plugins: ['plugin1', 'plugin2'],
        state: {
          backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
          transition: {
            right: 'rotate-push-left-move-from-right',
            left: 'rotate-push-right-move-from-left',
          }
        }
      }, {
        plugins: ['plugin1', 'plugin2', 'plugin5'],
        state: {
          backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
          transition: {
            right: 'rotate-push-left-move-from-right',
            left: 'rotate-push-right-move-from-left',
          }
        }
      }];

      expect(
        reducer(_initialState, {
          type: ADD_SLIDE,
          currentSlide: 1
        })
      )
      .to.deep.equal([
        {
          plugins: ['plugin1'],
          state: {
            backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
            transition: {
              right: 'rotate-push-left-move-from-right',
              left: 'rotate-push-right-move-from-left',
            }
          }
        }, {
          plugins: ['plugin1', 'plugin2'],
          state: {
            backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
            transition: {
              right: 'rotate-push-left-move-from-right',
              left: 'rotate-push-right-move-from-left',
            }
          }
        }, slide, {
          plugins: ['plugin1', 'plugin2', 'plugin5'],
          state: {
            backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
            transition: {
              right: 'rotate-push-left-move-from-right',
              left: 'rotate-push-right-move-from-left',
            }
          }
        }
      ])
      .and.to.have.lengthOf(4);
    });

    it('should add a new slide at the end when last slide is selected', () => {
      const _initialState: any = [{
        plugins: ['plugin1', 'plugin2'],
        state: {
          backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
          transition: {
            right: 'rotate-push-left-move-from-right',
            left: 'rotate-push-right-move-from-left',
          }
        }
      }, {
        plugins: ['plugin1', 'plugin2'],
        state: {
          backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
          transition: {
            right: 'rotate-push-left-move-from-right',
            left: 'rotate-push-right-move-from-left',
          }
        }
      }];

      expect(
        reducer(_initialState, {
          type: ADD_SLIDE,
          currentSlide: 1
        })
      )
      .to.deep.equal([
        {
          plugins: ['plugin1', 'plugin2'],
          state: {
            backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
            transition: {
              right: 'rotate-push-left-move-from-right',
              left: 'rotate-push-right-move-from-left',
            }
          }
        },
        {
          plugins: ['plugin1', 'plugin2'],
          state: {
            backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
            transition: {
              right: 'rotate-push-left-move-from-right',
              left: 'rotate-push-right-move-from-left',
            }
          }
        },
        slide
      ])
    .and.to.have.lengthOf(3)
    });
  });
}
