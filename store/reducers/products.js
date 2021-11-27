import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT,
} from '../actions/products';
import Product from '../../models/product';
const initialState = {
  availableProducts: [],
  userproducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        availableProducts: action.products,
        userproducts: action.userProducts,
      };

    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.description,
        action.productData.price,
        action.productData.phone,
      );

      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userproducts: state.userproducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userproducts.findIndex(
        prod => prod.id === action.pid,
      );
      const updatedProduct = new Product(
        action.pid,
        state.userproducts[productIndex].ownerId,
        action.productData.title,
        action.productData.description,
        state.userproducts[productIndex].price, // price should not be edited
        action.productData.phone,
      );
      const updatedUserProducts = [...state.userproducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductsIndex = state.availableProducts.findIndex(
        prod => prod.id === action.pid,
      );
      const updateAvailableProducts = [...state.availableProducts];
      updateAvailableProducts[availableProductsIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updateAvailableProducts,
        userproducts: updatedUserProducts,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        userproducts: state.userproducts.filter(
          product => product.id !== action.pid, // it returns true when coming id not equal to product id
        ),
        //filter: take every item from old array, if the function returns true we keep
        // the item otherwise drop the item.
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pid, // it returns true when coming id not equal to product id
        ),
      };
  }

  return state;
};
