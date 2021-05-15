import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function EntryScreen(props) {
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.text}>Welcome to our store.</Text>
      </View>
      <View style={styles.margin}>
        <Image style={styles.stretch} source={require('../assets/cart.png')} />
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Auth')}
        style={styles.customerButton}>
        <Text style={styles.customerText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
EntryScreen.navigationOptions = navData => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#5EC7F2',
    flex: 1,
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
    backgroundColor: '#141B5D',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    height: 60,
    marginHorizontal: 25,
  },
});
