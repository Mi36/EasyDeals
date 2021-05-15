import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const cartItem = props => {
  return (
    <View style={styles.cartItem}>
      <Text>
        {'\u2B24  '}
        {props.quantity} {props.title}
      </Text>

      <Text style={styles.itemData}>₹{props.amount}</Text>
      <View style={styles.delete}>
        {props.deletable && (
          <TouchableOpacity onPress={props.onRemove} style={styles.button}>
            <Text style={styles.buttonLabel}>DELETE</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default cartItem;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  itemData: {
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: 'pink',
    marginHorizontal: 25,
  },
  delete: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#141B5D',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 100,
  },
  buttonLabel: {
    fontWeight: 'bold',
    color: 'white',
  },
});
