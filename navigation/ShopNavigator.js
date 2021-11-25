import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Colors from '../constants/Colors';
import AddProductsScreen from '../screens/AddProductsScreen';
import AllProductsScreen from '../screens/AllProductsScreen';
import AuthScreen from '../screens/AuthScreen';
import EditProductsScreen from '../screens/EditProductsScreen';
import EntryScreen from '../screens/EntryScreen';
import ForgotPassword from '../screens/ForgotPassword';
import MyProductsScreen from '../screens/MyProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ResetPassword from '../screens/ResetPassword';
import StartUpScreen from '../screens/StartUpScreen';

const ProductsNavigator = createStackNavigator({
  Products: AllProductsScreen,
  ProductDetails: ProductDetailsScreen,
});

const AuthNavigator = createStackNavigator({
  Entry: EntryScreen,
  Auth: AuthScreen,
  FORGOTPASSWORD: ForgotPassword,
  RESETPASSWORD: ResetPassword,
});

const UpdateNavigator = createStackNavigator({
  MyProducts: MyProductsScreen,
  AddProducts: AddProductsScreen,
  EditProducts: EditProductsScreen,
});

const TabNavigator = createBottomTabNavigator(
  {
    Products: ProductsNavigator,
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
