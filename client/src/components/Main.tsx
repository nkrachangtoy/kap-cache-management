import React from 'react';
import { Paper } from '@material-ui/core';
import Toolbar from './Toolbar';

const Main = () => {
  return (
    <div className='main'>
      <Toolbar />
      <Paper className='main__grid'>
        <h1>hello</h1>
      </Paper>
    </div>
  );
};

export default Main;
