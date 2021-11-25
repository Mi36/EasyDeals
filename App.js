import AsyncStorage from '@react-native-community/async-storage'; // for persisit
import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist'; // for prsist
import {PersistGate} from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import NavigationContainer from './navigation/NavigationContainer';
import authReducer from './store/reducers/auth';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import productReducer from './store/reducers/products';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root', //use this in all
  storage: AsyncStorage, // here the storage we are using
  whitelist: ['order', 'auth'], //  here th list of reducers we want to persist, if we want some specific only
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistedStore = persistStore(store);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    RNBootSplash.hide(); // immediate
  };

  render() {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistedStore}>
            <NavigationContainer />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

export default App;
