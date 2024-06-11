import React from 'react';
import Navbar from './components/navbar/Navbar';
import Posts from './components/posts/Posts';

const App: React.FC = () => {

  return (
    <>
      <Navbar />
      <Posts/>
    </>
  );
}

export default App;
