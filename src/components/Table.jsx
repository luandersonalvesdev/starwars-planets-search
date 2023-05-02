import { useContext, useEffect } from 'react';
import { PlanetsContext } from '../context/PlanetsProvider';

export default function Table() {
  const { dataPlanets, isLoading, msgError } = useContext(PlanetsContext);
  const tHeaders = Object.keys(dataPlanets[0]);
  return (
    isLoading
      ? <p>loading</p>
      : dataPlanets.length
        && (
          msgError.length
            ? <p>{msgError}</p>
            : (
              <table>
                <thead>
                  <tr>
                    {tHeaders.map((tHead) => <th key={ tHead }>{tHead}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {
                    dataPlanets.map((planet) => {
                      const valuesPlanet = Object.values(planet);
                      return (
                        <tr key={ planet.name }>
                          {valuesPlanet.map((value) => <td key={ value }>{value}</td>)}
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>)
        )
  );
}
