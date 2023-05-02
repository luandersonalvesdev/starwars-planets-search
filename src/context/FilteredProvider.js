import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const FilteredContext = createContext();

export default function FilteredProvider({ children }) {
  const [nameInput, setNameInput] = useState('');

  const values = useMemo(() => ({
    nameInput, setNameInput,
  }), [nameInput, setNameInput]);
  return (
    <FilteredContext.Provider value={ values }>
      { children }
    </FilteredContext.Provider>
  );
}

FilteredProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
