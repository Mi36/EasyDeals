import React, {useRef, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import KeyboardAvoidingViewWrapper from '../components/KBAvoidingView';
import Screen from '../components/Screen';
import Colors from '../constants/Colors';
import * as orderActions from '../store/actions/order';

export default function OrderDetails({navigation}) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  const dispatch = useDispatch();

  const addOrderError = useSelector(state => state.order.addOrderError);

  const cartItems = navigation.getParam('cartItems');
  const totalAmount = navigation.getParam('totalAmount');

  const addOrderErrorRef = useRef();
  addOrderErrorRef.current = addOrderError;

  const check = () => {
    let isValid = true;
    if (name.trim().length === 0) {
      setNameError('Please enter name.');
      isValid = false;
    }
    if (address.trim().length === 0) {
      setAddressError('Please enter address.');
      isValid = false;
    }
    if (phone === null || undefined) {
      setPhoneError('Please enter phone number.');
      isValid = false;
    }
    if (isNaN(phone)) {
      setPhoneError('Please enter valid phone number.');
      isValid = false;
    }
    return isValid;
  };

  const errorAlert = () =>
    Alert.alert('Warning', 'Something wen wrong please try again later', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const successAlert = () =>
    Alert.alert('Success', 'Your order is recorded.', [
      {text: 'OK', onPress: () => navigation.navigate('CartScreen')},
    ]);

  const orderSubmitHandler = () => {
    if (check()) {
      dispatch(
        orderActions.addOrder(cartItems, totalAmount, name, phone, address),
      ).then(() => {
        if (addOrderErrorRef.current) {
          errorAlert();
        } else {
          successAlert();
        }
      });
    }
  };

  return (
    <Screen>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}>
          <Ionicons name={'md-arrow-back'} size={25} color={Colors.brand_2} />
        </TouchableOpacity>
        <Text style={styles.heading}>Enter your details</Text>
      </View>
      <KeyboardAvoidingViewWrapper>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          value={name}
          onChangeText={val => {
            setName(val);
            setNameError(null);
          }}
        />
        {nameError && <Text style={styles.error}>{nameError}</Text>}
        <TextInput
          style={styles.textInput}
          placeholder="Phone number"
          value={phone}
          keyboardType="numeric"
          onChangeText={val => {
            setPhone(val);
            setPhoneError(null);
          }}
        />
        {phoneError && <Text style={styles.error}>{phoneError}</Text>}
        <TextInput
          style={styles.textInput}
          placeholder="Address"
          value={address}
          multiline
          onChangeText={val => {
            setAddress(val);
            setAddressError(null);
          }}
        />
        {addressError && <Text style={styles.error}>{addressError}</Text>}
        <Button
          onPress={orderSubmitHandler}
          label={'Submit order'}
          style={styles.button}
        />
      </KeyboardAvoidingViewWrapper>
    </Screen>
  );
}

OrderDetails.navigationOptions = navData => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.brand,
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 60,
    marginHorizontal: 20,
  },
  button: {
    marginHorizontal: 20,
  },
  text: {
    color: Colors.white,
  },
  error: {
    color: Colors.danger,
    marginHorizontal: 20,
  },
  header: {
    height: 50,
    backgroundColor: Colors.green3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    position: 'absolute',
    left: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: '500',
  },
});
