import React, {useCallback, useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import Button from '../components/Button';
import Screen from '../components/Screen';
import * as AuthActions from '../store/actions/auth';

const SettingsScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const actionLogOut = useCallback(() => {
    dispatch(AuthActions.logout());
  }, [dispatch]);

  useEffect(() => {
    navigation.setParams({
      logOut: actionLogOut,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionLogOut]);

  const onPress = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => navigation.state.params.logOut(),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <Screen>
      <Button onPress={onPress} label={'Log out'} style={styles.button} />
    </Screen>
  );
};

SettingsScreen.navigationOptions = navData => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 25,
  },
});

export default SettingsScreen;
