import React from 'react';
import {StyleSheet, Button, ScrollView, Text, Image, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../../store/actions/cart';

const ProductDetailsScreen = props => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam('productId');
  const selectedproduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId),
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedproduct.imageUrl}} />
      <View style={styles.action}>
        <Button
          title="Add To cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedproduct));
          }}
        />
      </View>

      <Text style={styles.price}>${selectedproduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedproduct.description}</Text>
    </ScrollView>
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
    alignItems: 'center',
  },
});

export default ProductDetailsScreen;
