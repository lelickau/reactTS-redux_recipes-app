import React, { FC } from 'react';
import Navbar from './components/navbar/Navbar';
import AppRouter from './router/AppRouter';

import './styles/style.scss';

const App:FC = () => {
  return (
    <>
      <Navbar/>
      <main className="container">
        <AppRouter/>
      </main>
    </>
  );
};

export default App;
