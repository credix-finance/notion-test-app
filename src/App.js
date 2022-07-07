import React, { FC } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import KeyGenerator from './components/KeyGenerator';

const App: FC = () => {

  return (
    <div>
      <Navbar />
      <KeyGenerator />
      <Footer />
    </div>
  );
}

export default App;
