import { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from '../context/PlanetsProvider';
import { MultipleFilterContext } from '../context/MultipleFilterProvider';

export default function useFilterPlanets() {
  const { dataPlanets } = useContext(PlanetsContext);
  const { allFilters } = useContext(MultipleFilterContext);
  const [planetsFiltered, setPlanetsFiltered] = useState(dataPlanets);

  useEffect(() => {
    setPlanetsFiltered(dataPlanets);
  }, [dataPlanets]);

  function filterPlanets() {
    const allPlanets = [];
    planetsFiltered.filter((planet) => {
      allFilters.forEach((filter) => {
        switch (filter.comparison) {
        case 'maior que':
          if (planet[filter.column] > filter.value) {
            allPlanets.push(planet);
          }
          break;
        case 'menor que':
          if (planet[filter.column] < filter.value) {
            allPlanets.push(planet);
          }
          break;
        default:
          if (planet[filter.column] === filter.value) {
            allPlanets.push(planet);
          }
        }
      });
    });
    setPlanetsFiltered(allPlanets);
  }
}
