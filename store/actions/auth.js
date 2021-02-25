export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const FORGOT = 'FORGOT';
export const LOGOUT = 'LOGOUT';
export const NEW_PASSWORD = 'NEW_PASSWORD';
import AsyncStorage from '@react-native-community/async-storage';
import ENV from '../../ENV/env';
let timer;

export const newPassword = options => {
  console.log(options.code, options.password);
  return async dispatch => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${
        ENV.googleApiKey
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oobCode: options.code,
          newPassword: options.password,
        }),
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      console.log(errorResData.error.message); // this we can find by using console
      let message = 'Something went wrong';
      if (errorId === 'OPERATION_NOT_ALLOWED') {
        message = 'operation not allowd';
      }
      if (errorId === 'EXPIRED_OOB_CODE') {
        message = 'code expired';
      }
      if (errorId === 'INVALID_OOB_CODE') {
        message = 'invalid code';
      }
      if (errorId === 'USER_DISABLED') {
        message = 'user disabled';
      }

      throw new Error(message);
    }
    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: NEW_PASSWORD,
      email: resData.email,
    });
  };
};

export const resetPassword = email => {
  return async dispatch => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${
        ENV.googleApiKey
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          requestType: 'PASSWORD_RESET',
        }),
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      console.log(errorResData.error.message); // this we can find by using console
      let message = 'Something went wrong';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'email not found';
      }

      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    //dispatch({type: SIGNUP, token: resData.idToken, userId: resData.localId}); // we can get these console resdata
    dispatch({
      type: FORGOT,
      email: resData.email,
    });
  };
};

export const logout = () => {
  // dispatch only use when we need the output. like if we want to use async await
  //here not required dispatch
  // when function fired  action takes place immediatly, no data return there, so we not using dispatch

  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {
    type: LOGOUT,
  };
};

//const setLogo

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
        ENV.googleApiKey
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message; // this we can find by using console
      let message = 'Something went wrong';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email already used';
      }

      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    //dispatch({type: SIGNUP, token: resData.idToken, userId: resData.localId}); // we can get these console resdata
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000,
      ),
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000,
    ); // this is neww time in future with current time+expiry time in milliseconds, the put it in new date object
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};
export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
        ENV.googleApiKey
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message; // this we can find by using console
      let message = 'Something went wrong';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'Invalid Password';
      }

      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    //  dispatch({type: LOGIN, token: resData.idToken, userId: resData.localId});
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000,
      ),
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000,
    ); // this is neww time in future with current time+expiry time in milliseconds, the put it in new date object
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer); // this is js inbuilt function
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    }),
  );
};
