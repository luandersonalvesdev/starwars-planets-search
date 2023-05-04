import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PlanetsProvider from './context/PlanetsProvider';
import FilteredProvider from './context/FilteredProvider';
import MultipleFilterProvider from './context/MultipleFilterProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetsProvider>
      <FilteredProvider>
        <MultipleFilterProvider>
          <App />
        </MultipleFilterProvider>
      </FilteredProvider>
    </PlanetsProvider>,
  );
