import { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsProvider';
import FormFilterName from './FormFilterName';
import { FilteredContext } from '../context/FilteredProvider';

export default function Table() {
  const { dataPlanets, isLoading, msgError } = useContext(PlanetsContext);
  const { nameInput } = useContext(FilteredContext);
  const tHeaders = Object.keys(dataPlanets[0]);
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
                <table>
                  <thead>
                    <tr>
                      {tHeaders.map((tHead) => <th key={ tHead }>{tHead}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dataPlanets.filter(({ name }) => name.includes(nameInput))
                        .map((planet) => {
                          const vPlanets = Object.values(planet);
                          return (
                            <tr key={ planet.name }>
                              {vPlanets.map((value) => <td key={ value }>{value}</td>)}
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
