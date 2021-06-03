import PropTypes from 'prop-types';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const KeyboardAvoidingViewWrapper = ({children}) => {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraHeight={180}
      showsVerticalScrollIndicator={false}
      bounces={false}
      keyboardShouldPersistTaps="handled">
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAvoidingViewWrapper;

KeyboardAvoidingViewWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

KeyboardAvoidingViewWrapper.defaultProps = {
  children: null,
};
