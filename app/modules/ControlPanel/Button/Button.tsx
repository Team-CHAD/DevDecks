import * as React from 'react';

interface StatelessComponent<P> {
  (props?: P, context?: any): React.ReactElement<any>;
}

interface ButtonProps {
  props: {
    type: string;
  };
}

const Button = ({ type, dispatch }: { type: string, dispatch: React.MouseEventHandler<HTMLElement> }) => (
  <button onClick={ dispatch }>{type}</button>
);

export default Button;
