import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../constants/Colors';

const cartItem = props => {
  return (
    <TouchableOpacity
      style={styles.cartItem}
      onPress={() =>
        props.navigation.navigate('ProductDetails', {productId: props.id})
      }>
      <Text style={styles.text}>
        {props.quantity} {props.title}
      </Text>

      <Text style={styles.itemData}>₹{props.amount}</Text>
      <View style={styles.delete}>
        {props.deletable && (
          <TouchableOpacity onPress={props.onRemove} style={styles.button}>
            <Text>X</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default cartItem;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Colors.black2,
    borderRadius: 5,
  },
  itemData: {
    flexDirection: 'row',
    color: Colors.white,
  },
  deleteButton: {
    backgroundColor: 'pink',
    marginHorizontal: 25,
  },
  delete: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: Colors.pink2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonLabel: {
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    color: Colors.white,
  },
});
