import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';

const SideNav = () => {
  return (
    <div className='sidenav'>
      <MenuIcon className='sidenav__icon' />
      <PersonIcon className='sidenav__icon' />
    </div>
  );
};

export default SideNav;
