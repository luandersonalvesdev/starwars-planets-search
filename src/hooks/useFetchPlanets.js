import { useState, useMemo, useCallback, useEffect } from 'react';

export default function useFetchPlanets() {
  const [dataPlanets, setDataPlanets] = useState([{}]);
  const [dataPlanetsSort, setDataPlanetsSort] = useState([{}]);
  const [msgError, setMsgError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlanets = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://swapi.dev/api/planets');

      if (!response.ok) {
        throw new Error('Falha na busca, tente novamente mais tarde');
      }

      const { results } = await response.json();
      results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setDataPlanets(results);
      setDataPlanetsSort(results);
    } catch (error) {
      setMsgError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  const values = useMemo(() => ({
    dataPlanets,
    setDataPlanets,
    msgError,
    setMsgError,
    isLoading,
    setIsLoading,
    dataPlanetsSort,
    setDataPlanetsSort,
  }), [dataPlanets, msgError, isLoading, dataPlanetsSort]);

  return values;
}
