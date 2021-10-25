import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Screen from '../components/Screen';
import Colors from '../constants/Colors';

export default function EntryScreen(props) {
  return (
    <Screen style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.text}>Welcome to EasyDeals.</Text>
      </View>
      <Text style={styles.desc}>
        EasyDeals makes it so easy to connect people to buy, sell or exchange
        products.
      </Text>
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
    color: Colors.red,
    textDecorationLine: 'underline',
  },
  header: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  customerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 100,
    alignSelf: 'center',
  },
  desc: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
