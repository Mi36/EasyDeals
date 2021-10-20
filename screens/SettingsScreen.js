import React from 'react';
import {StyleSheet} from 'react-native';
import Button from '../components/Button';
import Screen from '../components/Screen';

const SettingsScreen = () => {
  return (
    <Screen>
      <Button onPress={() => {}} />
    </Screen>
  );
};

SettingsScreen.navigationOptions = navData => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({});

export default SettingsScreen;
