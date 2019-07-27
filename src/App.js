import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SideNav } from './SideNav';

function App() {
  const [selectedItem, setItem] = useState('');
  return (
    <div className="App">
      <SideNav setItem={setItem}/>
      <h1>
        {selectedItem}
      </h1>
    </div>
  );
}

export default App;
