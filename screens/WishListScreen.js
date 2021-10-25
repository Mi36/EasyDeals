import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CartItem from '../components/CartItem';
import Header from '../components/Header';
import Screen from '../components/Screen';
import Colors from '../constants/Colors';
import * as CartActions from '../store/actions/cart';

const WishListScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(); // we can add like before for error handling
  const dispatch = useDispatch();
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1,
    );
    // this is to make returned item as array, it allows we can use flatlist
    //also we can disable button by checking the lenght of array
  });

  return (
    <Screen style={styles.flex}>
      <Header title={'Wish List'} />
      <View style={styles.screen}>
        <View style={styles.summary}>
          {isLoading ? (
            <ActivityIndicator color="blue" size="small" />
          ) : (
            <Text style={styles.summaryText}>
              Total:₹{totalAmount.toFixed(2)}
            </Text>
          )}
        </View>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={itemData => (
            <CartItem
              navigation={navigation}
              quantity={itemData.item.quantity}
              amount={itemData.item.sum}
              title={itemData.item.productTitle}
              id={itemData.item.productId}
              deletable
              onRemove={async () => {
                setIsLoading(true);
                await dispatch(
                  CartActions.removeFromCart(itemData.item.productId),
                );
                setIsLoading(false);
              }}
            />
          )}
        />
      </View>
    </Screen>
  );
};
export default WishListScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    height: 50,
  },
  button: {
    backgroundColor: '#141B5D',
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonLabel: {
    fontWeight: 'bold',
    color: 'white',
  },
  summaryText: {
    fontSize: 18,
    color: 'black',
  },
  diasbled: {
    backgroundColor: Colors.grey_dimmed,
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  flex: {
    justifyContent: undefined,
  },
});

WishListScreen.navigationOptions = navData => {
  return {
    headerShown: false,
  };
};
