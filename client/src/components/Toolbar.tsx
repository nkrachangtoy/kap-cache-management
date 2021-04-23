import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import SideDrawer from './SideDrawer';
import Pagination from './Pagination';

const Toolbar = () => {
  return (
    <div className='toolbar'>
      <Pagination />
      {/* <SideDrawer /> */}
      <div className='search'>
        <TextField
          variant='filled'
          placeholder='search with Redis query'
          size='small'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Toolbar;
