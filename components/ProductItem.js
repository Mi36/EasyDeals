import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from './Button';

const ProductItem = props => {
  return (
    <View style={styles.main}>
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
    width: 250,
    height: 250,
    alignSelf: 'center',
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
