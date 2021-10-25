import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import Header from '../components/Header';
import Screen from '../components/Screen';
import * as productsActions from '../store/actions/products';

const AddProductsScreen = props => {
  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state =>
    state.products.userProducts?.find(prod => prod.id === prodId),
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = useCallback(() => {
    dispatch(
      productsActions.createProduct(
        title,
        description,
        imageUrl,
        +price,
        phone,
      ),
    );

    props.navigation.goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, prodId, title, description, imageUrl, price, phone]);
  console.log(phone);

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitHandler]);
  return (
    <Screen>
      <Header title={'Add product'} onBack={() => props.navigation.goBack()} />
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={setImageUrl}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>PHONE</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />
        </View>
      </View>
      <Button onPress={submitHandler} label={'Add'} />
    </Screen>
  );
};

export default AddProductsScreen;

AddProductsScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
});
