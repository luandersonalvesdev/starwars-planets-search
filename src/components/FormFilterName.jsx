import { useContext } from 'react';
import { FilteredContext } from '../context/FilteredProvider';

export default function FormFilterName() {
  const { nameInput, setNameInput } = useContext(FilteredContext);

  const handleChange = ({ target }) => {
    setNameInput(target.value);
  };

  return (
    <div>
      <form action="">
        <input
          type="text"
          placeholder="Pesquise por nome"
          value={ nameInput }
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </form>
    </div>
  );
}
