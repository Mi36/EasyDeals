import {createAppContainer, createSwitchNavigator} from 'react-navigation';
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
const AdminNavigator = createStackNavigator({
  UserProducts: UserProductScreen,
  EditProduct: EditProductscreen,
  AllOrders: AllOrders,
});

const TabNavigator = createBottomTabNavigator({
  Products: ProductsNavigator,
  Orders: OrderNavigator,
  CartScreen: CartScreen,
});
const MainNavigator = createSwitchNavigator({
  Start: StartUpScreen,
  Auth: AuthNavigator,
  Shop: TabNavigator,
  Admin: AdminNavigator,
});

export default createAppContainer(MainNavigator);
