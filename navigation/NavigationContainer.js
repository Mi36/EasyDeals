// we want to find out when our token is null, when that become null we want automatically logout from the app
//navigate back to auth screen
// so the token info stored in redux
//only navigation file have the wrapped by our store
//from navigationComponent there is no direct access to store so
//this file created

import React, {useEffect, useRef} from 'react';

import {useSelector} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import Shopnavigator from './ShopNavigator';
const NavigationContainer = props => {
  const navRef = useRef();
  const isAuth = useSelector(state => !!state.auth.token); //!! 2 times used for forcing this to true or false any way,
  //if no token it returns false now
  useEffect(() => {
    if (!isAuth) {
      //we want to navigate to auth screen, but normally not accessible to using navigation props
      //because it is outside
      //to do this, use useRef
      //now establishes a connection between navRef and ShopNavigator
      navRef.current.dispatch(NavigationActions.navigate({routeName: 'Auth'}));
    }
  }, [isAuth]);
  return <Shopnavigator ref={navRef} />;
};

export default NavigationContainer;
