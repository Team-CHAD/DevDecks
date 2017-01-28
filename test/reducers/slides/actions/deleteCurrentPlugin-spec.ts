import { expect } from 'chai';
import { DELETE_CURRENT_PLUGIN } from '../../../../app/constants/slides.constants';

export default function(initialState: any, reducer: any, slide: any) {
  describe('DELETE_CURRENT_PLUGIN', () => {
    it('should the first plugin from the first slide', () => {
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
          type: DELETE_CURRENT_PLUGIN,
          pluginNumber: 0,
          slideNumber: 0
        })
      ).to.deep.equal([
        {
          plugins: [null],
          state: {
            backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
            transition: {
              right: 'rotate-push-left-move-from-right',
              left: 'rotate-push-right-move-from-left',
            }
          }
        }
      ]);
    });

    it('should delete the third plugin only from the second slide', () => {
      const _initialState: any = [
        slide,
        {
          plugins: ['plugin1', 'plugin2', 'plugin3'],
          state: {
            backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
            transition: {
              right: 'rotate-push-left-move-from-right',
              left: 'rotate-push-right-move-from-left',
            }
          }
        }
      ];
      expect(
        reducer(_initialState, {
          type: DELETE_CURRENT_PLUGIN,
          pluginNumber: 2,
          slideNumber: 1
        })
      ).to.deep.equal([
        slide,
        {
          plugins: ['plugin1', 'plugin2', null],
          state: {
            backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
            transition: {
              right: 'rotate-push-left-move-from-right',
              left: 'rotate-push-right-move-from-left',
            }
          }
        }
      ]);
    });
  });
}
