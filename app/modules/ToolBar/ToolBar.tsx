import * as React from 'react';
import { connect } from 'react-redux';
import { Menu as ToolBarMenu, MenuItem as ToolBarItem } from '@blueprintjs/core';
import * as actions from '../App/actions';
import { ITextBoxPlugin } from '../App/interfaces';
import './toolbar.scss';

// Import from plugins
// Need a way to dynamically update this file based on
// a list of plugins available
import plugins from '../../plugins';


interface ToolBarComponentProps {
  addPluginToCurrentSlide: React.MouseEventHandler<HTMLElement>,
}

class ToolBarComponent extends React.Component<ToolBarComponentProps, {}> {
  public render() {
    const { addPluginToCurrentSlide } = this.props;
    return (
      <div id="tb">
        <ToolBarMenu className='pt-large tb--menu'>
          {
            plugins.map((plugin: any, key: number) => (
              <ToolBarItem
                key = { key }
                iconName = { plugin.icon }
                onClick = { addPluginToCurrentSlide.bind(this, { value: '', ...plugin }) }
                text = { plugin.text }
              />
            ))
          }
        </ToolBarMenu>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => {
  return {
    addPluginToCurrentSlide: (component: any) => dispatch(actions.addPluginToCurrentSlide(component))
  };
};

const ToolBar = connect(mapStateToProps, mapDispatchToProps)(ToolBarComponent as any);

export { ToolBar };
