import React from 'react';
import 'tailwindcss/tailwind.css';
import Navbar from './components/Navbar';
import Routes from './Routes';

const App = () => {
  return (
    <div className="text-s font-sans">
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
