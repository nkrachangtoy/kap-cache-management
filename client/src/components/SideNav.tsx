import React from 'react';
// import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import KoreLogo from '../assets/kore-white-logo.jpg';

const SideNav = () => {
  return (
    <div className='sidenav'>
      <img src={KoreLogo} alt="KoreLogo" className='sidenav__icon' />
      <PersonIcon className='sidenav__icon' />
    </div>
  );
};

export default SideNav;
