import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import StartUpScreen from '../screens/StartUpScreen';
import AuthScreen from '../screens/user/AuthScreen';
import EditProductscreen from '../screens/user/EditproductsScreen';
import ForgotPassword from '../screens/user/ForgotPassword';
import ResetPassword from '../screens/user/ResetPassword';
import UserProductScreen from '../screens/user/UserProductsScreen';
import EntryScreen from '../screens/EntryScreen';
import AdminLogin from '../screens/admin/AdminLogin';
import AdminSignUp from '../screens/admin/AdminSignUp';
import AllOrders from '../screens/admin/AllOrders';
const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductOverviewScreen,
  ProductDetails: ProductDetailsScreen,
  CartScreen: CartScreen,
});

const AuthNavigator = createStackNavigator({
  Entry: EntryScreen,
  AdminLogin: AdminLogin,
  AdminSignUp: AdminSignUp,
  Auth: AuthScreen,
  FORGOTPASSWORD: ForgotPassword,
  RESETPASSWORD: ResetPassword,
});

const OrderNavigator = createStackNavigator({
  Orders: OrderScreen,
});
const AdminNavigator = createBottomTabNavigator(
  {
    UserProducts: UserProductScreen,
    EditProduct: EditProductscreen,
    AllOrders: AllOrders,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'UserProducts') {
          iconName = focused ? 'apps-outline' : 'apps-outline';
        } else if (routeName === 'AllOrders') {
          iconName = focused ? 'ios-list' : 'ios-list';
        } else if (routeName === 'EditProduct') {
          iconName = focused ? 'build-outline' : 'build-outline';
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'green',
    },
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrderNavigator,
    CartScreen: CartScreen,
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
        } else if (routeName === 'CartScreen') {
          iconName = focused ? 'cart-outline' : 'cart-outline';
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'green',
    },
  },
);
const MainNavigator = createSwitchNavigator({
  Start: StartUpScreen,
  Auth: AuthNavigator,
  Shop: TabNavigator,
  Admin: AdminNavigator,
});

export default createAppContainer(MainNavigator);
