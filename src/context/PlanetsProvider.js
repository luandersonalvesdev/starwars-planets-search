import { createContext } from 'react';
import PropTypes from 'prop-types';
import useFetchPlanets from '../hooks/useFetchPlanets';

export const PlanetsContext = createContext();

export default function PlanetsProvider({ children }) {
  const dataPlanets = useFetchPlanets();
  return (
    <PlanetsContext.Provider value={ dataPlanets }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
