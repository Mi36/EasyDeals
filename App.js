import AsyncStorage from '@react-native-community/async-storage'; // for persisit
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {Component} from 'react';
//import storage from 'redux-persist/lib/storage';
import {YellowBox} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist'; // for prsist
import {PersistGate} from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import config from './config';
import NavigationContainer from './navigation/NavigationContainer';
import authReducer from './store/reducers/auth';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import productReducer from './store/reducers/products';
import colors from './styles/colors';

YellowBox.ignoreWarnings(['Remote']);

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

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: config.webClientId, //for android
      iosClientId: config.iosClientId, //// [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      offlineAccess: false, //true if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }
  componentDidMount = () => {
    this._configureGoogleSignIn();
    changeNavigationBarColor(colors.brand_5);
  };

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
