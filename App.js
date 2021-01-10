import React, {Component} from 'react';
import {persistStore, persistReducer} from 'redux-persist'; // for prsist
//import storage from 'redux-persist/lib/storage';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Remote']);

import AsyncStorage from '@react-native-community/async-storage'; // for persisit

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import NavigationContainer from './navigation/NavigationContainer';
import thunk from 'redux-thunk';

import {createLogger} from 'redux-logger'; // for persist
import {PersistGate} from 'redux-persist/integration/react';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root', //use this in all
  storage: AsyncStorage, // here the storage we are using
  whitelist: ['order'], //  here th list of reducers we want to persist, if we want some specific only
  //seperated by commas
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistedStore = persistStore(store);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <NavigationContainer />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
