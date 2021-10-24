import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as productsActions from '../store/actions/products';

const EditProductsScreen = props => {
  const prodId = props.navigation.getParam('productId');

  const editedProduct = useSelector(state =>
    state.products.userproducts?.find(prod => prod.id === prodId),
  );

  const dispatch = useDispatch();

  const [title, setTitle] = useState(editedProduct?.title);
  const [imageUrl, setImageUrl] = useState(editedProduct?.imageUrl);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(editedProduct?.description);
  const [phone, setPhone] = useState(editedProduct?.phone);

  const submitHandler = useCallback(() => {
    dispatch(
      productsActions.updateProduct(prodId, title, description, imageUrl),
    );

    props.navigation.goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, prodId, title, description, imageUrl, price, phone]);

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitHandler]);
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />
        </View>
      </View>
      <TouchableOpacity style={{}} onPress={submitHandler}>
        <Text>EDIT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProductsScreen;

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
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
