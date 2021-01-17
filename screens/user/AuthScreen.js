import React, {useReducer, useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import * as AuthActions from '../../store/actions/auth';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

import Input from '../../components/input';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value, // change only that perticular one
    };
    const updatedValidities = {
      ...state.inputVlidities,
      [action.input]: action.isValid,
    };
    let updatedformIsValid = true;
    for (const key in updatedValidities) {
      updatedformIsValid = updatedformIsValid && updatedValidities[key]; // everything in the form must be true
      // it checks all, it checks every item +latest value of updatedFormIsvalid
    }

    return {
      ...state,
      formIsvalid: updatedformIsValid,
      inputVlidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputVlidities: {
      email: false,
      password: false,
    },
    formIsvalid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('Error Occured', error, [{text: 'Okay'}]);
    }
  }, [error]);
  useEffect(() => {
    props.navigation.setParams({
      aaaa: isSignUp,
    });
  }, [isSignUp]);

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = AuthActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    } else {
      action = AuthActions.login(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangehandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      // let isValid = false;
      // if (text.trim().length > 0) {
      //   isValid = true;
      // }
      //trim() will remove white spaces
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  return (
    <LinearGradient colors={['pink', 'grey']} style={styles.linearGradient}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={1}>
        <View>
          <View style={{alignItems: 'center', paddingTop: 25}}>
            {isSignUp ? (
              <Text style={{fontWeight: 'bold', fontSize: 50}}>REGISTER</Text>
            ) : (
              <Text style={{fontWeight: 'bold', fontSize: 50}}>LOGIN</Text>
            )}
          </View>
          <ScrollView style={{marginHorizontal: 24, marginTop: 50}}>
            <Input
              keyboardType="email-address"
              label="E-Mail"
              id="email"
              email
              required
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              initialValue=""
              onInputChange={inputChangehandler}
            />
            <Input
              keyboardType="default"
              label="Password"
              id="password"
              secureTextEntry
              minlenght={6}
              required
              autoCapitalize="none"
              errorText="Please enter a valid password"
              initialValue=""
              onInputChange={inputChangehandler}
            />
            <View style={styles.switch}>
              {isLoading ? (
                <ActivityIndicator color="red" size="small" />
              ) : (
                <Button
                  title={isSignUp ? 'Sign Up' : 'Login'}
                  color="black"
                  onPress={authHandler}
                />
              )}
              <Button
                title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
                color="black"
                onPress={() => {
                  setIsSignUp(prevState => !prevState);
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => {
                props.navigation.navigate('FORGOTPASSWORD');
              }}>
              <Text style={styles.goBackTextColor}>Forgot Password</Text>
            </TouchableOpacity>
            <Icon name="rocket" size={30} color="#900" />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};
AuthScreen.navigationOptions = navData => {
  return {
    headerShown: false,
    headerTintColor: 'red', // heading color
    headerStyle: {
      backgroundColor: 'pink',
    },
  };
};

const styles = StyleSheet.create({
  screen: {},
  goBackTextColor: {},
  forgotPassword: {},
  switch: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linearGradient: {
    flex: 1,
    // justifyContent: 'center',
  },
});

export default AuthScreen;
