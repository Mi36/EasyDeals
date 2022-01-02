import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Screen from '../components/Screen';
import Colors from '../constants/Colors';

const JobDetailsScreen = props => {
  const productId = props.navigation.getParam('productId');

  const selectedproduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId),
  );
  return (
    <Screen>
      <ScrollView style={styles.container}>
        <View style={styles.action} />
        <Text style={styles.price}>Price: ₹{selectedproduct?.price}</Text>
        <Text style={styles.description}>
          Description: {selectedproduct?.description}
        </Text>
        <Text style={styles.phone}>
          contact number: {selectedproduct?.phone}
        </Text>
        <Text style={styles.phone}>Place: {selectedproduct?.place}</Text>
      </ScrollView>
    </Screen>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  price: {
    fontSize: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.black2,
  },
  action: {
    marginVertical: 10,
  },
  container: {
    paddingHorizontal: 20,
  },
  button: {
    height: 40,
  },
  phone: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: Colors.black2,
  },
});

JobDetailsScreen.navigationOptions = () => {
  return {
    headerShown: true,
    title: 'Job details',
    headerTintColor: 'black',
    headerStyle: {
      backgroundColor: Colors.green3,
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  };
};

export default JobDetailsScreen;
