import React, { useContext } from 'react';
import './App.css';
import Table from './components/Table';
import { PlanetsContext } from './context/PlanetsProvider';

function App() {
  return (
    <Table />
  );
}

export default App;
