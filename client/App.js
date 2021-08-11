import React from 'react';
import 'tailwindcss/tailwind.css';
import Navbar from './components/Navbar';
import Routes from './Routes';

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes />
    </div>
  );
};

export default App;
