import React from 'react';
import './Styles/App.css';
import SideNav from './components/SideNav';
import Main from './components/Main';

function App() {
  return (
    <div className='App'>
      <SideNav />
      <Main />
    </div>
  );
}

export default App;
