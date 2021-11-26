import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Colors from '../constants/Colors';
import AddJobScreen from '../screens/AddJobScreen';
import AllJobsScreen from '../screens/AllJobsScreen';
import AuthScreen from '../screens/AuthScreen';
import EditJobScreen from '../screens/EditJobScreen';
import EntryScreen from '../screens/EntryScreen';
import ForgotPassword from '../screens/ForgotPassword';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import MyJobsScreen from '../screens/MyJobsScreen';
import ResetPassword from '../screens/ResetPassword';
import StartUpScreen from '../screens/StartUpScreen';

const JobsNavigator = createStackNavigator({
  Jobs: AllJobsScreen,
  JobDetails: JobDetailsScreen,
});

const AuthNavigator = createStackNavigator({
  Entry: EntryScreen,
  Auth: AuthScreen,
  FORGOTPASSWORD: ForgotPassword,
  RESETPASSWORD: ResetPassword,
});

const UpdateNavigator = createStackNavigator({
  MyJobs: MyJobsScreen,
  AddJob: AddJobScreen,
  EditJob: EditJobScreen,
});

const TabNavigator = createBottomTabNavigator(
  {
    Jobs: JobsNavigator,
    Admin: UpdateNavigator,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Jobs') {
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
