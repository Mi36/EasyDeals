import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import Screen from '../components/Screen';
import Colors from '../constants/Colors';
import * as cartActions from '../store/actions/cart';

const ProductDetailsScreen = props => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam('productId');

  const selectedproduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId),
  );
  return (
    <Screen style={styles.container}>
      <Image style={styles.image} source={{uri: selectedproduct?.imageUrl}} />
      <View style={styles.action}>
        <Button
          label={'Add to cart'}
          onPress={() => {
            dispatch(cartActions.addToCart(selectedproduct));
          }}
        />
      </View>
      <Text style={styles.price}>₹{selectedproduct?.price}</Text>
      <Text style={styles.description}>{selectedproduct?.description}</Text>
    </Screen>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
  action: {
    marginVertical: 10,
  },
  container: {
    paddingHorizontal: 20,
  },
});

ProductDetailsScreen.navigationOptions = () => {
  return {
    headerShown: true,
    title: 'Product details',
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

export default ProductDetailsScreen;
