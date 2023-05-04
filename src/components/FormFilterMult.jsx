import { useContext } from 'react';
import { MultipleFilterContext } from '../context/MultipleFilterProvider';

export default function FormFilterMult() {
  const initialFilters = {
    column: 'population',
    comparison: 'maior que',
    value: 0,
  };

  const { filters,
    setFilters,
    allFilters,
    setAllFilters,
    optionsFilter } = useContext(MultipleFilterContext);

  function handleChange({ target }) {
    setFilters((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  }

  function handleAdd() {
    setAllFilters((prevState) => ([
      ...prevState,
      { ...filters },
    ]));
    setFilters(initialFilters);
  }

  function handleDelete(ind) {
    setAllFilters((prevState) => {
      prevState.splice(ind, 1);
      return [...prevState];
    });
  }

  const newOptionsFilter = optionsFilter.filter((option) => {
    const afterFiltered = allFilters.some((fil) => fil.column === option);
    return !afterFiltered;
  });

  return (
    <div>
      <form onSubmit={ (e) => e.preventDefault() }>
        <select
          name="column"
          data-testid="column-filter"
          onChange={ handleChange }
          value={ filters.column }
        >
          {
            newOptionsFilter.map((column) => (
              <option key={ column } value={ column }>{column}</option>
            ))
          }
        </select>

        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ handleChange }
          value={ filters.comparison }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>

        <input
          type="number"
          data-testid="value-filter"
          name="value"
          onChange={ handleChange }
          value={ filters.value }
        />

        <button
          data-testid="button-filter"
          onClick={ handleAdd }
        >
          Filtrar
        </button>
      </form>
      <ul>
        {
          allFilters.map(({ column, comparison, value }, ind) => (
            <li key={ ind } data-testid="filter">
              <span>{`${column} `}</span>
              <span>{`${comparison} `}</span>
              <span>{`${value} `}</span>
              <button onClick={ () => handleDelete(ind) }>Exluir</button>
            </li>
          ))
        }
      </ul>
      <button
        data-testid="button-remove-filters"
        onClick={ () => setAllFilters([]) }
      >
        Remover todos os filtros
      </button>
    </div>
  );
}
