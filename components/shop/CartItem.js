import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const cartItem = props => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text>
          {props.quantity} {props.title}
        </Text>
      </Text>
      <View style={styles.delete}>
        <Text style={styles.itemData}>₹{props.amount}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}>
            <Text>DELETE</Text>
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemData: {
    flexDirection: 'row',
  },
  deleteButton: {
    //  height:25,
    backgroundColor: 'pink',
    marginHorizontal: 25,
    //  width:25
  },
  delete: {flexDirection: 'row', margin: 15},
});
