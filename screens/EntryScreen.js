import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Screen from '../components/Screen';

export default function EntryScreen(props) {
  return (
    <Screen style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.text}>Welcome to MiSTORE.</Text>
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Auth')}
        style={styles.customerButton}>
        <Text style={styles.customerText}>Continue</Text>
      </TouchableOpacity>
    </Screen>
  );
}
EntryScreen.navigationOptions = navData => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  customerText: {
    fontWeight: '600',
    fontSize: 20,
  },
  header: {
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 20,
  },
  customerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 100,
    alignSelf: 'center',
    borderWidth: 1,
  },
});
