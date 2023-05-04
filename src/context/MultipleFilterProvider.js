import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const MultipleFilterContext = createContext();

const optionsFilter = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function MultipleFilterProvider({ children }) {
  const state = {
    column: 'population',
    comparison: 'maior que',
    value: 0,
  };

  const [filters, setFilters] = useState(state);
  const [allFilters, setAllFilters] = useState([]);

  const values = useMemo(() => ({
    filters, setFilters, allFilters, setAllFilters, optionsFilter,
  }), [allFilters, filters]);

  return (
    <MultipleFilterContext.Provider value={ values }>
      { children }
    </MultipleFilterContext.Provider>
  );
}

MultipleFilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
