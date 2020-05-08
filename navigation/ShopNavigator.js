import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import * as AuthActions from '../store/actions/auth';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductScreen from '../screens/user/UserProductsScreen';
import EditProductscreen from '../screens/user/EditproductsScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartUpScreen from '../screens/StartUpScreen';
import ForgotPassword from '../screens/user/ForgotPassword';
import ResetPassword from '../screens/user/ResetPassword';

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    CartScreen: CartScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        // backgroundColor: 'yel',
      },
      headertintColor: 'red',
    },
  },
);

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen,
  FORGOTPASSWORD: ForgotPassword,
  RESETPASSWORD: ResetPassword,
});

const OrderNavigator = createStackNavigator({
  Orders: OrderScreen,
});
const AdminNavigator = createStackNavigator({
  UserProducts: UserProductScreen,
  EditProduct: EditProductscreen,
});

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrderNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: 'red',
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{flex: 1}}>
          <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
            <DrawerNavigatorItems {...props} />
            {/* above for the contents already there */}
            <TouchableOpacity
              style={{backgroundColor: 'pink'}}
              onPress={() => {
                dispatch(AuthActions.logout());
                //props.navigation.navigate('Auth');
              }}>
              <Text style={{marginLeft: 15, fontWeight: 'bold'}}>Logout</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      );
    },
  },
);
const MainNavigator = createSwitchNavigator({
  Start: StartUpScreen, // this means this is the first thing i load
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator); // now this can be used in app.js
