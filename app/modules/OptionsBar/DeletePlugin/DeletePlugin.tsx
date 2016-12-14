import * as React from 'react';
import { Button } from "@blueprintjs/core";

interface DeletePluginProps {
  deleteCurrentPlugin: Function;
}

const DeletePlugin = ({ deleteCurrentPlugin }: DeletePluginProps) => {
  return (
      <Button className="pt-button" type="button" onClick={ () => deleteCurrentPlugin() }>
        Delete
      </Button>
  );
}

export default DeletePlugin;
