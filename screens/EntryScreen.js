import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function EntryScreen(props) {
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView bounces={false}>
        <View style={styles.header}>
          <Text style={styles.text}>Welcome to our store.</Text>
        </View>
        <View style={styles.margin}>
          <Image
            style={styles.stretch}
            source={require('../assets/cart.png')}
          />
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Auth')}
          style={styles.customerButton}>
          <Text style={styles.customerText}>CUSTOMER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('AdminLogin')}
          style={styles.customerButton}>
          <Text style={styles.customerText}>ADMIN</Text>
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: '#F1543F',
    flex: 1,
  },
  stretch: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  margin: {marginVertical: 50},
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
    color: '#222020',
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
    backgroundColor: '#A6CE39',
    marginHorizontal: 25,
    paddingVertical: 25,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 25,
  },
});
