import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const OrderContext = createContext();

const initialState = { order: { column: 'population', sort: '' } };

export default function OrderProvider({ children }) {
  const [orderBy, setOrderBy] = useState(initialState);
  const [isRaffle, setIsRaffle] = useState(false);

  const values = useMemo(() => ({
    orderBy, setOrderBy, isRaffle, setIsRaffle,
  }), [orderBy, isRaffle]);

  return (
    <OrderContext.Provider value={ values }>
      { children }
    </OrderContext.Provider>
  );
}

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
