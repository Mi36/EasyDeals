export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'SET_ORDER';
import Order from '../../models/order';

export const fetchOrder = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://ecommerce-f33e7.firebaseio.com/orders/${userId}.json`,
      ); //.json added because of firebase syntax, by default it send get req,otherwise explicitly mention

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const resData = await response.json();
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,

            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date), // this is for getting date object instaed of string
          ),
        );
      }

      dispatch({type: SET_ORDER, orders: loadedOrders});
    } catch (err) {
      throw err; // by throwing this it reaches in the component
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://ecommerce-f33e7.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'apllication/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      },
    ); //.json added because of firebase syntax, by default it send get req,otherwise explicitly mention
    console.log('order', response);
    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const resData = await response.json();
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
