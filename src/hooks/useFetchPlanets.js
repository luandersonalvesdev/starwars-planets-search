import { useState, useMemo, useCallback, useEffect } from 'react';

export default function useFetchPlanets() {
  const [dataPlanets, setDataPlanets] = useState([{}]);
  const [msgError, setMsgError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlanets = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch('https://swapi.dev/api/planets');
    console.log(response);

    if (!response.ok) {
      setMsgError('Falha na busca, tente novamente mais tarde');
      setIsLoading(false);
      return;
    }

    const { results } = await response.json();
    results.map((planet) => {
      delete planet.residents;
      return planet;
    });
    setDataPlanets(results);
    setIsLoading(false);
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
  }), [dataPlanets, msgError, isLoading]);

  return values;
}
