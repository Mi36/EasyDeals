import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const ProductItem = props => {
  return (
    <View style={styles.main}>
      <Image style={styles.image} source={{uri: props.image}} />

      <Text>{props.title}</Text>
      <Text>₹{props.price}</Text>

      <View>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default ProductItem;
