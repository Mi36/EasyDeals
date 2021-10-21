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
import Colors from '../constants/Colors';
import SettingsScreen from '../screens/SettingsScreen';
import MyProductsScreen from '../screens/MyProductsScreen';
import AddProductsScreen from '../screens/AddProductsScreen';
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
    AllProducts: ProductsNavigator,
    Cart: CartNavigator, // change to wish list
    Settings: SettingsScreen,
    MyProducts: MyProductsScreen,
    AddProducts: AddProductsScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'AllProducts') {
          iconName = focused ? 'apps-outline' : 'apps-outline';
        } else if (routeName === 'Cart') {
          iconName = focused ? 'cart-outline' : 'cart-outline';
        } else if (routeName === 'Settings') {
          iconName = 'code-working-outline';
        } else if (routeName === 'MyProducts') {
          iconName = 'code-working-outline';
        } else if (routeName === 'AddProducts') {
          iconName = 'code-working-outline';
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'black',
      style: {
        backgroundColor: Colors.green3,
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
