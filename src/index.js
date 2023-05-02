import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PlanetsProvider from './context/PlanetsProvider';
import FilteredProvider from './context/FilteredProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetsProvider>
      <FilteredProvider>
        <App />
      </FilteredProvider>
    </PlanetsProvider>,
  );
