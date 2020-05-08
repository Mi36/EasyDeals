import React, {useReducer, useEffect} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

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
        {...props} // by putting this accept all props from outside
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        //    onChangeText={titleChangehandler.bind(this, 'title')} // last argumrnt is text by default// no need to pass
        // returnKeyType="next"
        // autoCapitalize="sentences"
        // autoCorrect
        // this all must be set from outside
        onEndEditing={() => {
          console.log('fires when we go out from a field');
        }}
        onSubmitEditing={() => {
          console.log('fires when we press next or done from keyboard');
        }}
        onBlur={lostFocushandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={{paddingTop: 15}}>
          <Text style={{color: 'red'}}>{props.errorText}</Text>
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
  },
  input: {
    // paddingHorizontal: 2,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 10,
  },
});

export default Input;
