import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Screen from '../components/Screen';
import Colors from '../constants/Colors';

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
    color: '#222020',
  },
  customerText: {
    fontWeight: '600',
    fontSize: 20,
    color: 'white',
  },
  header: {
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 20,
  },
  customerButton: {
    backgroundColor: Colors.pink4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 100,
    alignSelf: 'center',
    borderWidth: 1,
  },
});
