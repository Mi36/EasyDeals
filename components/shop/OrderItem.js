import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import CartItem from './CartItem';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.OrderItem}>
      <View style={styles.summary}>
        <Text>₹{props.amount}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setShowDetails(prevState => !prevState);
        }}>
        <Text style={styles.buttonLabel}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Text>
      </TouchableOpacity>
      {showDetails && (
        <View>
          {props.item.map(cartItem => (
            <View key={cartItem.productId}>
              <CartItem
                quantity={cartItem.quantity}
                amount={cartItem.sum}
                title={cartItem.productTitle}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  OrderItem: {
    padding: 15,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 15,
  },
  button: {
    backgroundColor: '#141B5D',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonLabel: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default OrderItem;
