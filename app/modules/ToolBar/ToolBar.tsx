import * as React from 'react';
import { connect } from 'react-redux';
import { Menu as ToolBarMenu, MenuItem as ToolBarItem } from '@blueprintjs/core';
import './toolbar.scss';

// Import from plugins
// Need a way to dynamically update this file based on
// a list of plugins available
import plugins from '../../plugins';
import * as actions from '../App/actions';

interface Plugin {
  name: string,
  // FIX: component should be of type React.Component but
  // it is not working.
  component: any,
  icon: string,
  text?: string
}

class ToolBarComponent extends React.Component<{ addPluginToCurrentSlide: any }, {}> {
  // NOTE: It would be better to explicitly define the type of e.
  // Normally, this would just be e: React.MouseEventHandler,
  // but it's not working so need to figure this out

  // This is where we handle rendering what view
  // This needs access to redux so this is why we would not be able to
  // use a stateless component. Being a stateful component, redux will
  // be able to hook on onto it (?)
  private addToCurrentSlide (plugin: Plugin): void {

  }

  public render() {
    // NOTE: text is a required prop of ToolBarItem

    const { addPluginToCurrentSlide } = this.props;
    return (
      <div id="tb">
        <ToolBarMenu className='pt-large tb--menu'>
          {
            plugins.map((plugin: Plugin, key: number) => (
              <ToolBarItem
                key = { key }
                iconName = { plugin.icon }
                onClick = { addPluginToCurrentSlide.bind(this, plugin.component) }
                text = { plugin.text }
              />
            ))
          }
        </ToolBarMenu>
      </div>
    );
  }
}

const mapStateToProps = (state: any ) => { return {}};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addPluginToCurrentSlide: (component: any) => dispatch(actions.addPluginToCurrentSlide(component))
  };
};

const ToolBar = connect(mapStateToProps, mapDispatchToProps)(ToolBarComponent as any);

export { ToolBar };
