import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartUpScreen = props => {
  const admin = useSelector(state => state.auth.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Entry');
        return;
      }
      const transformedData = JSON.parse(userData); // convert to js array or object
      const {userId, token, expiryDate} = transformedData;
      const expirationDate = new Date(expiryDate);
      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Entry');
        return;
      }
      if (token && userId && admin) {
        const expirationTime = expirationDate.getTime() - new Date().getTime();
        props.navigation.navigate('Admin');
        dispatch(authActions.authenticate(userId, token, expirationTime, true));
        return;
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      props.navigation.navigate('Shop');
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };
    tryLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.indicator}>
      <StatusBar animated={true} backgroundColor={Colors.green3} />
      <ActivityIndicator color="red" size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green3,
  },
});

export default StartUpScreen;
