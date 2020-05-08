import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as AuthActions from '../../store/actions/auth';
import {connect} from 'react-redux';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
      password: '',
      confirmPassword: '',
      error: {},
      isLoading: false,
      email: '',
      errors: {},
    };
  }

  _resetPassword = () => {
    //const {email} = this.state;
    const options = {
      code: this.state.code,
      password: this.state.password,
    };
    this.props.newPassword(options);
    this.props.navigation.navigate('Auth');
  };

  newPasswordHandler = text => {
    this.setState({
      password: text,
    });
  };

  codeHandler = text => {
    this.setState({
      code: text,
    });
  };

  _validate = () => {
    const {email} = this.state;
    let valid = true,
      error = false,
      message = '';
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.length === 0 || email === '') {
      valid = false;
      error = true;
      message = 'Email cannot be empty.';
      // Toast.show(message);
    } else {
      if (!emailRegex.test(email)) {
        valid = false;
        error = true;
        message = 'Please enter a valid email.';
        // Toast.show(message);
      }
    }

    this.setState({error});
    return valid;
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <TextInput
            style={styles.textInput}
            // inputType="email"
            onChangeText={this.codeHandler}
            value={this.code}
          />
          <TextInput
            style={styles.textInput}
            // inputType="email"
            onChangeText={this.newPasswordHandler}
            value={this.password}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this._resetPassword}
            style={styles.resetPasswordBtn}>
            <Text style={styles.resetPasswordLabel}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ResetPassword.navigationOptions = {
  headerTitle: 'Reset Password',
  headerTintColor: 'black',
  headerStyle: {
    backgroundColor: 'orange',
  },
};

const styles = StyleSheet.create({
  textInput: {
    height: 35,
    marginHorizontal: 15,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 15,
    marginVertical: 27,
  },
  resetPasswordBtn: {
    height: 40,
    width: 120,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  resetPasswordLabel: {},
  buttonContainer: {
    marginHorizontal: 15,
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    newPassword: data => dispatch(AuthActions.newPassword(data)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(ResetPassword);
