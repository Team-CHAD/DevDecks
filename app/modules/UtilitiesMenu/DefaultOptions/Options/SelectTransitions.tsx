import * as React from 'react';
import * as Select from 'react-select';
import 'react-select/dist/react-select.css';

const { Transitions } = require('react-transitions');

interface SelectTransitionsProps {
  slide: any;
  updateCurrentSlide: Function;
}

const SelectTransitions = ({ slide, updateCurrentSlide }: SelectTransitionsProps) => {
  const { transition } = slide.state;

  // Odd transition at element 26
  // Removing this transition so we can dynamically produce
  // left and right directions in pairs
  const oddTransitions: any = [
    'rotate-fall-scale-up',
    'rotate-out-newspaper-rotate-in-newspaper',
    'scale-down-center-scale-up-center',
    'sides',
    'slide',
  ];

  const customTransitions = Transitions.filter((transition: string) => {
    if (!oddTransitions.includes(transition)) return true;
  });

  const options = customTransitions.reduce((
    transitions: any,
    current: string,
    i: number,
  ) => {
    if (i % 2 === 0) {
      transitions.pair.push(current);
    } else {
      transitions.pair.push(current);
      transitions._transitions.push({
        value: transitions.pair[0],
        label: transitions.pair[0],
        pair: transitions.pair,
      });
      transitions.pair = [];
    }

    return transitions;
  }, { _transitions: [], pair: [] })._transitions;

  return (
    <label className="pt-label">
      Transitions
      <Select
        className="pt-select"
        clearable={false}
        searchable={false}
        value={transition.right}
        options={options}
        onChange={(val: any) =>
          updateCurrentSlide({
            transition: {
              right: val.pair[0],
              left: val.pair[1],
            }
          })
        }>
      </Select>
    </label>
  );
}

export default SelectTransitions;
