import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import * as CartActions from '../../store/actions/cart';
import Colors from '../constants/Colors';

const CartScreen = ({navigation}) => {
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
    <SafeAreaView style={styles.flex}>
      <StatusBar animated={true} backgroundColor={colors.brand_5} />
      <View style={styles.header}>
        <Text style={styles.headerText}>CART</Text>
      </View>
      <View style={styles.screen}>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Total:₹{totalAmount.toFixed(2)}
          </Text>
          {isLoading ? (
            <ActivityIndicator color="blue" size="small" />
          ) : (
            <TouchableOpacity
              disabled={cartItems.length === 0 ? true : false}
              style={cartItems.length === 0 ? styles.diasbled : styles.button}
              onPress={() =>
                // dispatch(orderActions.addOrder(cartItems, totalAmount))
                navigation.navigate('OrderDetails', {
                  cartItems,
                  totalAmount,
                })
              }>
              <Text style={styles.buttonLabel}>Order now</Text>
            </TouchableOpacity>
          )}
          {/*above function do two things place order and also remove item from cart, these two are in different reducers. from actions the type get passed and
            both reducer will work */}
        </View>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={itemData => (
            <CartItem
              quantity={itemData.item.quantity}
              amount={itemData.item.sum}
              title={itemData.item.productTitle}
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
    </SafeAreaView>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    shadowOffset: {width: 0, height: 2},
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
    flex: 1,
    backgroundColor: '#5EC7F2',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

CartScreen.navigationOptions = navData => {
  return {
    headerShown: false,
  };
};
