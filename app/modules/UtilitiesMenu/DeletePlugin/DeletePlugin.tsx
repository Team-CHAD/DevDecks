import * as React from 'react';
import { Button, Intent } from "@blueprintjs/core";
import './delete-plugin.scss';

interface DeletePluginProps {
  deleteCurrentPlugin: Function;
  setActivePlugin: Function;
}

const DeletePlugin = ({ deleteCurrentPlugin, setActivePlugin }: DeletePluginProps) => {
  return (
    <Button
      id="delete-button-devdecks"
      intent={ Intent.DANGER }
      onClick={ () => {
        deleteCurrentPlugin();
        setActivePlugin();
      }} >
      Delete
    </Button>
  );
}

export default DeletePlugin;
