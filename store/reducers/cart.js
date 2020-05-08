import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
import {ADD_ORDER} from '../actions/order';
import CartItem from '../../models/cart-item';
import {DELETE_PRODUCT} from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      if (state.items[addedProduct.id]) {
        // if added product already exists
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice,
        );
        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: updatedCartItem, // this is vannilla js, adding items
          },
          totalAmount: state.totalAmount + productPrice,
        };
      } else {
        const newCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice,
        );
        return {
          ...state,
          items: {...state.items, [addedProduct.id]: newCartItem},
          totalAmount: state.totalAmount + productPrice,
        };
      }
    case REMOVE_FROM_CART:
      // two cases there, if there is only one item,
      //more number of same item
      const currentQty = state.items[action.pid].quantity;
      let updatedCartItem;
      if (currentQty > 1) {
        //need to reduce it
        updatedCartItem = new CartItem(
          state.items[action.pid].quantity - 1,
          state.items[action.pid].productPrice,
          state.items[action.pid].productTitle,
          state.items[action.pid].sum - state.items[action.pid].productPrice,
        );
        updatedCartItem = {...state.items, [action.pid]: updatedCartItem};
      } else {
        updatedCartItem = {...state.items};
        delete updatedCartItem[action.pid]; // js function, it will delete the item
      }
      return {
        ...state,
        items: updatedCartItem,
        totalAmount: state.totalAmount - state.items[action.pid].productPrice,
      };
    case ADD_ORDER:
      return initialState;
    // if we delete a product it also removed from cart so add delete product here alse
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = {...state.items};
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
  }

  return state;
};
