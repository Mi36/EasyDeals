import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Colors from '../constants/Colors';
import AddProductsScreen from '../screens/AddProductsScreen';
import AuthScreen from '../screens/AuthScreen';
import WishListScreen from '../screens/WishListScreen';
import EditProductsScreen from '../screens/EditProductsScreen';
import EntryScreen from '../screens/EntryScreen';
import ForgotPassword from '../screens/ForgotPassword';
import MyProductsScreen from '../screens/MyProductsScreen';

import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import AllProductsScreen from '../screens/AllProductsScreen';
import ResetPassword from '../screens/ResetPassword';
import StartUpScreen from '../screens/StartUpScreen';
import UploadProduct from '../screens/UploadProduct';

const ProductsNavigator = createStackNavigator({
  Products: AllProductsScreen,
  ProductDetails: ProductDetailsScreen,
  Selected: WishListScreen,
});

const AuthNavigator = createStackNavigator({
  Entry: EntryScreen,
  Auth: AuthScreen,
  FORGOTPASSWORD: ForgotPassword,
  RESETPASSWORD: ResetPassword,
  UPLOAD: UploadProduct,
});

const UpdateNavigator = createStackNavigator({
  MyProducts: MyProductsScreen,
  AddProducts: AddProductsScreen,
  EditProducts: EditProductsScreen,
});

const TabNavigator = createBottomTabNavigator(
  {
    Products: ProductsNavigator,
    Selected: WishListScreen,
    Admin: UpdateNavigator,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Products') {
          iconName = focused ? 'apps-outline' : 'apps-outline';
        } else if (routeName === 'Selected') {
          iconName = focused ? 'cart-outline' : 'cart-outline';
        } else if (routeName === 'Admin') {
          iconName = 'key-sharp';
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
