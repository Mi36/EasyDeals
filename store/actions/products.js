import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT'; //first step
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://ecommerce-f33e7.firebaseio.com/products.json',
      );
      // ok is a field available in response body
      //this is true if rsponse in 200 status code range
      //false if 400 0r 500
      //this come if we are not authenticated or something like that
      //here fetch api did not throw error , but we want
      // so we use the seperate throw
      if (!response.ok) {
        throw new Error('SomeThing Went Wrong');
      }

      const resData = await response.json();
      const loadedData = [];
      for (const key in resData) {
        loadedData.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
          ),
        );
      }
      dispatch({
        type: SET_PRODUCT,
        products: loadedData,
        userProducts: loadedData.filter(prod => prod.ownerId === userId),
      });
    } catch (err) {
      // we can send this to analytic server
      //pr rethrow like below

      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://ecommerce-f33e7.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error('SomeThing Went Wrong');
    }

    dispatch({type: DELETE_PRODUCT, pid: productId});
  };
};

//second step, after this go to reducer
export const createProduct = (title, description, imageUrl, price) => {
  /////////////////////////////
  //because we added thunk
  //by changing to this action creator function deos not immedietly return an object
  // but return a function ie dspatch function , it receives another function argument
  //the function passed automatically by redux thunk
  //this do same thing as above, but before that
  //we can now execute any async code

  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://ecommerce-f33e7.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'apllication/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      },
    ); //.json added because of firebase syntax, by default it send get req,otherwise explicitly mention
    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  };
};

/////////////////////////////

/////////////////////////////

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    console.log('id', id);
    // here getState is used to access the whole store, and then token
    const token = getState().auth.token;
    console.log('token', token);
    const response = await fetch(
      `https://ecommerce-f33e7.firebaseio.com/products/${id}.json?auth=${token}`, // here backtick is used to submit our id
      {
        method: 'PATCH', // patch is used to update a specific item we requesting, PUT is fully override the data
        headers: {
          'Content-Type': 'apllication/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      },
    );
    console.log('res', response);
    if (!response.ok) {
      throw new Error('SomeThing Went Wrong');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
