import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {useDispatch} from 'react-redux';
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
import * as AuthActions from '../store/actions/auth';

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    CartScreen: CartScreen,
  },
  {
    defaultNavigationOptions: {
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

// const ShopNavigator = createDrawerNavigator(
//   {
//     Products: ProductsNavigator,
//     Orders: OrderNavigator,
//     Admin: AdminNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColor: 'red',
//     },
//     contentComponent: props => {
//       const dispatch = useDispatch();
//       return (
//         <View style={styles.flex}>
//           <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
//             <DrawerNavigatorItems {...props} />
//             {/* above for the contents already there */}
//             <TouchableOpacity
//               style={styles.background}
//               onPress={() => {
//                 dispatch(AuthActions.logout());
//               }}>
//               <Text style={styles.logout}>Logout</Text>
//             </TouchableOpacity>
//           </SafeAreaView>
//         </View>
//       );
//     },
//   },
// );
const TabNavigator = createBottomTabNavigator({
  Products: ProductsNavigator,
  Orders: OrderNavigator,
  //Admin: AdminNavigator,
  CartScreen: CartScreen,
});
const MainNavigator = createSwitchNavigator({
  Start: StartUpScreen,
  Auth: AuthNavigator,
  Shop: TabNavigator,
  Admin: AdminNavigator,
});

export default createAppContainer(MainNavigator);
const styles = StyleSheet.create({
  flex: {flex: 1},
  background: {backgroundColor: 'pink'},
  logout: {marginLeft: 15, fontWeight: 'bold'},
});
