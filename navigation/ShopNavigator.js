import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProductOverviewScreen from '../screens/ProductOverviewScreen';
import StartUpScreen from '../screens/StartUpScreen';
import AuthScreen from '../screens/AuthScreen';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';
import EntryScreen from '../screens/EntryScreen';
import OrderDetails from '../screens/OrderDetails';
import UploadProduct from '../screens/UploadProduct';
const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductOverviewScreen,
  ProductDetails: ProductDetailsScreen,
  CartScreen: CartScreen,
});

const AuthNavigator = createStackNavigator({
  Entry: EntryScreen,
  Auth: AuthScreen,
  FORGOTPASSWORD: ForgotPassword,
  RESETPASSWORD: ResetPassword,
  UPLOAD: UploadProduct,
});

const OrderNavigator = createStackNavigator({
  Orders: OrderScreen,
});
const CartNavigator = createStackNavigator({
  CartScreen: CartScreen,
  OrderDetails: OrderDetails,
});

const TabNavigator = createBottomTabNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrderNavigator,
    Cart: CartNavigator,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Products') {
          iconName = focused ? 'apps-outline' : 'apps-outline';
        } else if (routeName === 'Orders') {
          iconName = focused ? 'code-working-outline' : 'code-working-outline';
        } else if (routeName === 'Cart') {
          iconName = focused ? 'cart-outline' : 'cart-outline';
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'black',
      style: {
        backgroundColor: '#5EC7F2',
        borderTopColor: '#141B5D',
        borderTopWidth: 1,
      },
    },
  },
);
const MainNavigator = createSwitchNavigator({
  Start: StartUpScreen,
  Auth: AuthNavigator,
  Shop: TabNavigator,
});

export default createAppContainer(MainNavigator);
