import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Button, InputAdornment, TextField } from '@material-ui/core';

const Toolbar = () => {
  return (
    <div className='toolbar'>
      <Button variant='outlined'>
        <FilterListIcon />
      </Button>
      <div className='search'>
        <TextField
          variant='filled'
          placeholder='search'
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
