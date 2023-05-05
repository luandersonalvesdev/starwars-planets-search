import React from 'react';
import { getByLabelText, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import dataPlanets from './dataMocks/dataPlanets';
import PlanetsProvider from '../context/PlanetsProvider';
import FilteredProvider from '../context/FilteredProvider';
import MultipleFilterProvider from '../context/MultipleFilterProvider';
import OrderProvider from '../context/OrderProvider';
import userEvent from '@testing-library/user-event';
import useFetchPlanets from '../hooks/useFetchPlanets';

describe('Render App and...', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataPlanets, ok: true,
    });
  });

  it('... if fetch have been called and loading all planets names and filter by name.', async () => {
    render(
      <PlanetsProvider>
        <FilteredProvider>
          <MultipleFilterProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </MultipleFilterProvider>
        </FilteredProvider>
      </PlanetsProvider>
    )

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/loading/i)).toBeDefined();

    await waitFor(() => {
      const allPlanetsName = screen.getAllByTestId('planet-name');
      expect(allPlanetsName).toHaveLength(10);
    });

    const inputName = screen.getByRole('textbox');
    expect(inputName).toBeDefined();
    userEvent.type(inputName, 'Kamino');

    const allPlanetsName = screen.getAllByTestId('planet-name');
      expect(allPlanetsName).toHaveLength(1);
  })

  it('... if filter by population bigger than 100.000', async () => {
    render(
      <PlanetsProvider>
        <FilteredProvider>
          <MultipleFilterProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </MultipleFilterProvider>
        </FilteredProvider>
      </PlanetsProvider>
    )
    const allPlanetsName = await screen.findAllByTestId('planet-name');

    const comparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter, 'maior que');

    const numberInput = screen.getByRole('spinbutton');
    userEvent.type(numberInput, '100000')

    const btnToFilter = screen.getByRole('button', { name: /filtrar/i});
    userEvent.click(btnToFilter);

    const allPlanetsName2 = screen.getAllByTestId('planet-name');
    expect(allPlanetsName2).toHaveLength(7);
  })

  it('... if filter by population lower than 100.000', async () => {
    render(
      <PlanetsProvider>
        <FilteredProvider>
          <MultipleFilterProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </MultipleFilterProvider>
        </FilteredProvider>
      </PlanetsProvider>
    )
    const allPlanetsName = await screen.findAllByTestId('planet-name');

    const comparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter, 'menor que');

    const numberInput = screen.getByRole('spinbutton');
    userEvent.type(numberInput, '100000')

    const btnToFilter = screen.getByRole('button', { name: /filtrar/i});
    userEvent.click(btnToFilter);

    const allPlanetsName2 = screen.getAllByTestId('planet-name');
    expect(allPlanetsName2).toHaveLength(1);
  })

  it('... if filter by population equal than 1000', async () => {
    render(
      <PlanetsProvider>
        <FilteredProvider>
          <MultipleFilterProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </MultipleFilterProvider>
        </FilteredProvider>
      </PlanetsProvider>
    )
    const allPlanetsName = await screen.findAllByTestId('planet-name');

    const comparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter, 'igual a');

    const numberInput = screen.getByRole('spinbutton');
    userEvent.type(numberInput, '1000')

    const btnToFilter = screen.getByRole('button', { name: /filtrar/i});
    userEvent.click(btnToFilter);

    const allPlanetsName2 = screen.getAllByTestId('planet-name');
    expect(allPlanetsName2).toHaveLength(1);
  })

  it('... if order by diameter Ascendente', async () => {
    render(
      <PlanetsProvider>
        <FilteredProvider>
          <MultipleFilterProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </MultipleFilterProvider>
        </FilteredProvider>
      </PlanetsProvider>
    )
    const allPlanetsName = await screen.findAllByTestId('planet-name');

    const orderAscEl = screen.getByRole('radio', { name: /ascendente/i})
    expect(orderAscEl).toBeDefined();
    userEvent.click(orderAscEl);

    const sortFilter = screen.getByTestId('column-sort');
    userEvent.selectOptions(sortFilter, 'diameter');

    const btnToOrder = screen.getByRole('button', { name: /ordenar/i});
    userEvent.click(btnToOrder);

    const allPlanetsName2 = screen.getAllByTestId('planet-name');
    expect(allPlanetsName2[0].innerHTML).toBe('Endor');
    expect(allPlanetsName2[9].innerHTML).toBe('Bespin');
  })

  it('... if order by population Descendente', async () => {
    render(
      <PlanetsProvider>
        <FilteredProvider>
          <MultipleFilterProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </MultipleFilterProvider>
        </FilteredProvider>
      </PlanetsProvider>
    )
    const allPlanetsName = await screen.findAllByTestId('planet-name');

    const orderDescEl = screen.getByRole('radio', { name: /descendente/i})
    expect(orderDescEl).toBeDefined();
    userEvent.click(orderDescEl);

    const btnToOrder = screen.getByRole('button', {  name: /ordenar/i});
    userEvent.click(btnToOrder);

    const allPlanetsName2 = screen.getAllByTestId('planet-name');
    expect(allPlanetsName2[0].innerHTML).toBe('Coruscant');
  })

  it('... if delete some filter', async () => {
    render(
      <PlanetsProvider>
        <FilteredProvider>
          <MultipleFilterProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </MultipleFilterProvider>
        </FilteredProvider>
      </PlanetsProvider>
    )
    const allPlanetsName = await screen.findAllByTestId('planet-name');

    const comparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter, 'igual a');

    const numberInput = screen.getByRole('spinbutton');
    userEvent.type(numberInput, '1000')

    const btnToFilter = screen.getByRole('button', { name: /filtrar/i});
    userEvent.click(btnToFilter);

    const btnToDelete = screen.getByRole('button', { name: /exluir/i});
    userEvent.click(btnToDelete);

    const allPlanetsName2 = screen.getAllByTestId('planet-name');
    expect(allPlanetsName2).toHaveLength(8);
  })

  it('test unitary of "throw new error"', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataPlanets, ok: false,
    });

    render(
      <PlanetsProvider>
        <FilteredProvider>
          <MultipleFilterProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </MultipleFilterProvider>
        </FilteredProvider>
      </PlanetsProvider>
    )

  })
});
