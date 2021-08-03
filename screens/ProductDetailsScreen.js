import React from 'react';
import {StatusBar} from 'react-native';
import {StyleSheet, Text, Image, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import Colors from '../constants/Colors';

const ProductDetailsScreen = props => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam('productId');
  const selectedproduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId),
  );
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={Colors.brand_5} />
      <Image style={styles.image} source={{uri: selectedproduct.imageUrl}} />
      <View style={styles.action}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(cartActions.addToCart(selectedproduct));
          }}>
          <Text style={styles.buttonLabel}>Add to cart</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>₹{selectedproduct.price}</Text>
      <Text style={styles.description}>{selectedproduct.description}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  container: {
    backgroundColor: '#5EC7F2',
    flex: 1,
    paddingHorizontal: 10,
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
  button: {
    backgroundColor: '#141B5D',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonLabel: {
    fontWeight: 'bold',
    color: 'white',
  },
});

ProductDetailsScreen.navigationOptions = navData => {
  return {
    headerShown: true,
    title: 'Product details',
    headerTintColor: 'black',
    headerStyle: {
      backgroundColor: '#5EC7F2',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  };
};

export default ProductDetailsScreen;
