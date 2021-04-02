import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Input from '../../components/input';
import * as AuthActions from '../../store/actions/auth';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

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
      Alert.alert('Error Occured', error, [{text: 'Ok'}]);
    }
  }, [error]);
  useEffect(() => {
    props.navigation.setParams({
      aaaa: isSignUp,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignUp]);

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = AuthActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
        true,
      );
    } else {
      action = AuthActions.login(
        formState.inputValues.email,
        formState.inputValues.password,
        true,
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Admin');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangehandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
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
    <View style={styles.main}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={1}>
        <View>
          <View style={styles.screen}>
            <View style={styles.signup}>
              {isSignUp ? (
                <Text style={styles.header}>REGISTER</Text>
              ) : (
                <Text style={styles.header}>LOGIN</Text>
              )}
            </View>
          </View>
          <ScrollView style={styles.scrollview}>
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
                <ActivityIndicator color="black" size="small" />
              ) : (
                <TouchableOpacity
                  style={styles.customerButton}
                  onPress={authHandler}>
                  <Text>{isSignUp ? 'Register' : 'Login'}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.customerButton}
                onPress={() => {
                  setIsSignUp(prevState => !prevState);
                }}>
                <Text>{`Switch to ${isSignUp ? 'Login' : 'Register'}`}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.goback}
                onPress={() => {
                  props.navigation.navigate('FORGOTPASSWORD');
                }}>
                <Text style={styles.underline}>Forgot Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.goback}
                onPress={() => {
                  props.navigation.goBack();
                }}>
                <Text style={styles.underline}>back</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
AuthScreen.navigationOptions = navData => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F1543F',
    flex: 1,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 50,
  },
  screen: {
    paddingTop: 25,
    alignItems: 'center',
  },
  customerButton: {
    backgroundColor: '#A6CE39',
    marginHorizontal: 25,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  signup: {
    flexDirection: 'row',
    paddingTop: 25,
  },
  scrollview: {
    marginHorizontal: 24,
    marginTop: 50,
  },
  goBackTextColor: {},
  forgotPassword: {},
  switch: {
    marginVertical: 15,
  },
  linearGradient: {
    flex: 1,
  },
  goback: {
    backgroundColor: '#A6CE39',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
});

export default AuthScreen;
