import {ADD_ORDER, SET_ORDER, ADD_ORDER_FAILED} from '../actions/order';
import Order from '../../models/order';

const initialState = {
  orders: [],
  addOrderError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date,
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder), //adding data to orders, here updated with immutable way.
        addOrderError: false,
      };
    case ADD_ORDER_FAILED:
      return {
        ...state,
        addOrderError: true,
      };
  }

  return state;
};
