import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Input from '../components/input';
import KeyboardAvoidingViewWrapper from '../components/KBAvoidingView';
import * as AuthActions from '../store/actions/auth';
import Colors from '../constants/Colors';

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
      Alert.alert('Error Occured', error, [{text: 'OK'}]);
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
      <StatusBar animated={true} backgroundColor={Colors.brand_5} />
      <KeyboardAvoidingViewWrapper>
        <View style={styles.screen}>
          <View style={styles.signup}>
            <Image
              style={styles.stretch}
              source={require('../assets/cart.png')}
            />
          </View>
        </View>
        <ScrollView style={styles.scrollview} bounces={false}>
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
                <Text style={styles.buttonLabel}>
                  {isSignUp ? 'Register' : 'Login'}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.customerButton}
              onPress={() => {
                setIsSignUp(prevState => !prevState);
              }}>
              <Text style={styles.buttonLabel}>{`Switch to ${
                isSignUp ? 'Login' : 'Register'
              }`}</Text>
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
          </View>
        </ScrollView>
      </KeyboardAvoidingViewWrapper>
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
    backgroundColor: '#5EC7F2',
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
    backgroundColor: '#141B5D',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    height: 60,
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  signup: {
    flexDirection: 'row',
    marginTop: 50,
  },
  scrollview: {
    marginHorizontal: 24,
    marginTop: 10,
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
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  stretch: {
    width: 130,
    height: 130,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
});

export default AuthScreen;
