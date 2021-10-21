//import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

export default function Screen({style, children}) {
  //padding won't work on safearea

  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.green3}
        barStyle="dark-content"
      />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green3,
  },
});
