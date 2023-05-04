import { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsProvider';
import FormFilterName from './FormFilterName';
import FormFilterMult from './FormFilterMult';
import { FilteredContext } from '../context/FilteredProvider';
import { MultipleFilterContext } from '../context/MultipleFilterProvider';
import { OrderContext } from '../context/OrderProvider';

function fComparison(comparison, value, column, planet) {
  switch (comparison) {
  case 'maior que':
    return Number(planet[column]) > Number(value);
  case 'menor que':
    return Number(planet[column]) < Number(value);
  default:
    return Number(planet[column]) === Number(value);
  }
}

export default function Table() {
  const { dataPlanets, isLoading, msgError } = useContext(PlanetsContext);
  const { nameInput } = useContext(FilteredContext);
  const { allFilters } = useContext(MultipleFilterContext);
  const { isRaffle } = useContext(OrderContext);

  const tHeaders = Object.keys(dataPlanets[0]);

  console.log(isRaffle);
  return (
    isLoading
      ? <p>loading</p>
      : dataPlanets.length > 1
        && (
          msgError.length
            ? <p>{msgError}</p>
            : (
              <div>
                <FormFilterName />
                <FormFilterMult />
                <table>
                  <thead>
                    <tr>
                      {tHeaders.map((tHead) => <th key={ tHead }>{tHead}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dataPlanets
                        .filter(({ name }) => name.includes(nameInput))
                        .filter((planet) => {
                          const some = allFilters
                            .some(({ comparison, value, column }) => {
                              const res = fComparison(comparison, value, column, planet);
                              return !res;
                            });
                          return !some;
                        })
                        .map((planet) => {
                          const vPlanets = Object.values(planet);
                          return (
                            <tr key={ planet.name }>
                              {vPlanets.map((value, ind) => (
                                <td
                                  data-testid={ ind ? '' : 'planet-name' }
                                  key={ value }
                                >
                                  {value}
                                </td>
                              ))}
                            </tr>
                          );
                        })
                    }
                  </tbody>
                </table>
              </div>
            )
        )
  );
}
