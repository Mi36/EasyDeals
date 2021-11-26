import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import Header from '../components/Header';
import KeyboardAvoidingViewWrapper from '../components/KBAvoidingView';
import Screen from '../components/Screen';
import * as productsActions from '../store/actions/products';

const EditJobScreen = props => {
  const prodId = props.navigation.getParam('productId');

  const editedProduct = useSelector(state =>
    state.products.userproducts?.find(prod => prod.id === prodId),
  );
  const editedProduct1 = useSelector(state => state.products.userproducts);
  console.log(editedProduct1, editedProduct.phone);

  const dispatch = useDispatch();

  const [title, setTitle] = useState(editedProduct?.title);
  const [imageUrl, setImageUrl] = useState(editedProduct?.imageUrl);
  const [description, setDescription] = useState(editedProduct?.description);
  const [phone, setPhone] = useState(editedProduct?.phone);
  const [place, setPlace] = useState(editedProduct?.place);
  const [phoneError, setPhoneError] = useState();
  const [placeError, setPlaceError] = useState();
  const [descError, setDescError] = useState();
  const [titleError, setTitleError] = useState();
  const [imageError, setImageError] = useState();

  const isValid = () => {
    if (phone.trim().length === 0) {
      setPhoneError('Phone number cannot be empty');
      return false;
    }
    if (title.trim().length === 0) {
      setTitleError('title cannot be empty');
      return false;
    }
    if (imageUrl.trim().length === 0) {
      setImageError('image url cannot be empty');
      return false;
    }
    if (place.trim().length === 0) {
      setPlaceError('place cannot be empty');
      return false;
    }
    if (description.trim().length === 0) {
      setDescError('description cannot be empty');
      return false;
    }
    return true;
  };
  const submitHandler = useCallback(() => {
    if (isValid()) {
      dispatch(
        productsActions.updateProduct(
          prodId,
          title,
          description,
          imageUrl,
          phone,
          place,
        ),
      );

      props.navigation.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, prodId, title, description, imageUrl, phone, place]);

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitHandler]);
  return (
    <Screen>
      <Header
        title={'Update your job'}
        onBack={() => props.navigation.goBack()}
      />
      <KeyboardAvoidingViewWrapper>
        <ScrollView bounces={false}>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={text => {
                  setTitle(text);
                  setTitleError(null);
                }}
              />
              <Text style={styles.error}>{titleError}</Text>
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Image URL</Text>
              <TextInput
                style={styles.input}
                value={imageUrl}
                onChangeText={text => {
                  setImageUrl(text);
                  setImageError(null);
                }}
              />
              <Text style={styles.error}>{imageError}</Text>
            </View>

            <View style={styles.formControl}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={text => {
                  setDescription(text);
                  setDescError(null);
                }}
              />
              <Text style={styles.error}>{descError}</Text>
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={text => {
                  setPhone(text);
                  setPhoneError(null);
                }}
              />
              <Text style={styles.error}>{phoneError}</Text>
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Place</Text>
              <TextInput
                style={styles.input}
                value={place}
                onChangeText={text => {
                  setPlace(text);
                  setPlaceError(null);
                }}
              />
              <Text style={styles.error}>{placeError}</Text>
            </View>
          </View>
          <Button
            label={'Update'}
            onPress={submitHandler}
            style={styles.button}
          />
        </ScrollView>
      </KeyboardAvoidingViewWrapper>
    </Screen>
  );
};

export default EditJobScreen;

EditJobScreen.navigationOptions = navData => {
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
    height: 60,
    borderRadius: 10,
    paddingLeft: 8,
  },
  button: {
    marginHorizontal: 20,
  },
  error: {
    color: 'red',
  },
});
