import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Button from '../components/Button';
import Header from '../components/Header';
import KeyboardAvoidingViewWrapper from '../components/KBAvoidingView';
import Screen from '../components/Screen';
import * as productsActions from '../store/actions/products';

const AddJobScreen = props => {
  const prodId = props.navigation.getParam('productId');
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');

  const submitHandler = useCallback(() => {
    if (isValid()) {
      dispatch(
        productsActions.createProduct(title, description, +price, phone, place),
      );

      props.navigation.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, prodId, title, description, price, phone, place]);

  const [phoneError, setPhoneError] = useState();
  const [placeError, setPlaceError] = useState();
  const [descError, setDescError] = useState();
  const [titleError, setTitleError] = useState();
  const [priceError, setPriceError] = useState();

  const isValid = () => {
    if (phone.trim().length === 0) {
      setPhoneError('Phone number cannot be empty');
      return false;
    }
    if (title.trim().length === 0) {
      setTitleError('title cannot be empty');
      return false;
    }

    if (place.trim().length === 0) {
      setPlaceError('place cannot be empty');
      return false;
    }
    if (place.trim().length === 0) {
      setPriceError('price cannot be empty');
      return false;
    }
    if (description.trim().length === 0) {
      setDescError('description cannot be empty');
      return false;
    }
    return true;
  };

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitHandler]);
  return (
    <Screen>
      <Header title={'Add job'} onBack={() => props.navigation.goBack()} />
      <KeyboardAvoidingViewWrapper>
        <ScrollView style={styles.form} bounces={false}>
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
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => {
                setPrice(text);
                setPriceError(null);
              }}
            />
            <Text style={styles.error}>{priceError}</Text>
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
            <Text style={styles.label}>PHONE</Text>
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
            <Text style={styles.label}>PLACE</Text>
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
          <Button onPress={submitHandler} label={'Add'} />
        </ScrollView>
      </KeyboardAvoidingViewWrapper>
    </Screen>
  );
};

export default AddJobScreen;

AddJobScreen.navigationOptions = () => {
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
    height: 60,
    paddingLeft: 10,
  },
  button: {
    marginTop: 20,
  },
  error: {
    color: 'red',
  },
});
