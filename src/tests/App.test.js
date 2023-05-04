import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import dataPlanets from './dataMocks/dataPlanets';
import PlanetsProvider from '../context/PlanetsProvider';
import FilteredProvider from '../context/FilteredProvider';
import MultipleFilterProvider from '../context/MultipleFilterProvider';
import OrderProvider from '../context/OrderProvider';

describe('Render App and...', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (dataPlanets),
    });
  });

  it('... if fetch have been called and loading all planets', async () => {
    render(
    <PlanetsProvider><FilteredProvider><MultipleFilterProvider><OrderProvider><App />
      </OrderProvider></MultipleFilterProvider></FilteredProvider></PlanetsProvider>
      )

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/loading/i)).toBeDefined();

      await waitFor(() => {
        const planetsNameEl = screen.getAllByTestId('planet-name');
        expect(planetsNameEl).toHaveLength(10);
      });
  })
});
