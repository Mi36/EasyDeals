import React from 'react';
import {Text} from 'react-native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import PropTypes from 'prop-types';

const Button = ({onPress, label, style}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.6}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

Button.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
};
Button.defaultProps = {
  label: '',
  onPress: null,
  style: {},
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.black3,
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
});
