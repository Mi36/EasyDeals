import React, {useReducer, useEffect} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import Colors from '../styles/colors';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false,
  });

  const {onInputChange, id} = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputState, id]);

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({type: INPUT_CHANGE, value: text, isValid: isValid});
  };

  const lostFocushandler = () => {
    dispatch({type: INPUT_BLUR});
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onEndEditing={() => {
          console.log('fires when we go out from a field');
        }}
        onSubmitEditing={() => {
          console.log('fires when we press next or done from keyboard');
        }}
        onBlur={lostFocushandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorLabel}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    flex: 1,
  },
  label: {
    marginVertical: 8,
    fontWeight: 'bold',
  },
  input: {
    paddingVertical: 15,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 10,
    height: 60,
  },
  errorContainer: {
    paddingTop: 2,
  },
  errorLabel: {
    color: Colors.danger,
    fontWeight: '500',
  },
});

export default Input;
