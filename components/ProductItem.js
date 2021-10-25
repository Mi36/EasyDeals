import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Button from './Button';

const ProductItem = props => {
  return (
    <View style={styles.main}>
      <Image style={styles.image} source={{uri: props.image}} />

      <Text style={styles.textAlign}>{props.title}</Text>
      <Text style={styles.textAlign}>₹{props.price}</Text>
      {props.onDetailsPress && (
        <Button
          onPress={props.onDetailsPress}
          label={'Details'}
          style={styles.button}
        />
      )}
      {props.onUpdate && (
        <Button
          onPress={props.onUpdate}
          label={'Update'}
          style={styles.button}
        />
      )}
      {props.onDelete && (
        <Button
          onPress={props.onDelete}
          label={'Delete'}
          style={styles.button}
        />
      )}

      <View>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    alignItems: 'center',
  },
  textAlign: {
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    height: 40,
    marginHorizontal: 20,
    marginBottom: 10,
  },
});

export default ProductItem;
