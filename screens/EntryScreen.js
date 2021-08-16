import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Screen from '../components/Screen';
import Colors from '../constants/Colors';

export default function EntryScreen(props) {
  return (
    <Screen style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.text}>Welcome to our store.</Text>
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
  stretch: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  margin: {
    marginVertical: 50,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222020',
  },
  adminText: {
    fontWeight: '600',
    fontSize: 20,
    color: '#222020',
  },
  customerText: {
    fontWeight: '600',
    fontSize: 20,
    color: 'white',
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 25,
  },
  adminButton: {
    backgroundColor: '#A6CE39',
    marginHorizontal: 25,
    marginVertical: 25,
    paddingVertical: 25,
    borderRadius: 25,
    alignItems: 'center',
  },
  customerButton: {
    backgroundColor: Colors.pink4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    height: 60,
    marginHorizontal: 25,
  },
});
