import React from 'react';
import { Paper } from '@material-ui/core';
import Toolbar from './Toolbar';
import Grid from './Grid';

const Main = () => {
  return (
    <div className='main'>
      <Toolbar />
      <Grid />
    </div>
  );
};

export default Main;
