import { useContext } from 'react';
import { MultipleFilterContext } from '../context/MultipleFilterProvider';
import { OrderContext } from '../context/OrderProvider';
import { PlanetsContext } from '../context/PlanetsProvider';

function fMakeOrder(order, planet1Value, planet2Value) {
  switch (order) {
  case 'ASC':
    return planet1Value - planet2Value;
  default:
    return planet2Value - planet1Value;
  }
}

const initialFilters = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

export default function FormFilterMult() {
  const { dataPlanets, setDataPlanets } = useContext(PlanetsContext);
  const { filters,
    setFilters,
    allFilters,
    setAllFilters,
    optionsFilter } = useContext(MultipleFilterContext);
  const { orderBy, setOrderBy, setIsRaffle } = useContext(OrderContext);

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

  function handleChangeOrderAscDesc({ target }) {
    setOrderBy((prevState) => ({
      order: {
        ...prevState.order,
        sort: target.value,
      },
    }));
  }

  function handleChangeOrderColumn({ target }) {
    setOrderBy((prevState) => ({
      order: {
        ...prevState.order,
        column: target.value,
      },
    }));
  }

  function handleClickOrder() {
    const { order } = orderBy;
    let removedPlanets = [];
    // const copyDataPlanets = [...dataPlanets];
    dataPlanets.forEach((planet, ind) => {
      if (planet[order.column] === 'unknown') {
        removedPlanets = [...dataPlanets.splice(ind, 2)];
      }
    });

    const ordered = dataPlanets.sort((planet1, planet2) => {
      const value = fMakeOrder(order.sort, planet1[order.column], planet2[order.column]);
      return value;
    });
    const allOrdered = [...ordered, ...removedPlanets];
    setDataPlanets(allOrdered);
    setIsRaffle((prev) => (!prev));
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

        <select
          name="sort"
          data-testid="column-sort"
          onChange={ handleChangeOrderColumn }
          value={ orderBy.order.column }
        >
          {
            optionsFilter.map((column) => (
              <option key={ column } value={ column }>{column}</option>
            ))
          }
        </select>

        <label htmlFor="ASC">
          Ascendente
          <input
            type="radio"
            value="ASC"
            id="ASC"
            name="order"
            data-testid="column-sort-input-asc"
            onChange={ handleChangeOrderAscDesc }
          />
        </label>
        <label htmlFor="DESC">
          Descendente
          <input
            type="radio"
            value="DESC"
            id="DESC"
            name="order"
            data-testid="column-sort-input-desc"
            onChange={ handleChangeOrderAscDesc }
          />
        </label>

        <button
          data-testid="column-sort-button"
          onClick={ handleClickOrder }
          disabled={ !orderBy.order.sort.length }
        >
          Ordenar
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
