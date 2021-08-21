import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-tiny-toast';
import {connect} from 'react-redux';
import Button from '../components/Button';
import KeyboardAvoidingViewWrapper from '../components/KBAvoidingView';
import Screen from '../components/Screen';
import Colors from '../constants/Colors';
import * as AuthActions from '../store/actions/auth';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoading: false,
      errors: {},
      email: '',
    };
  }

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
      Toast.show(message);
    } else {
      if (!emailRegex.test(email)) {
        valid = false;
        error = true;
        message = 'Please enter a valid email.';
        Toast.show(message);
      }
    }

    this.setState({error});
    return valid;
  };

  _resetPassword = () => {
    let errors = {};
    if (this._validate()) {
      this.props
        .resetPassword(this.state.email)
        .then(val => {
          Toast.show(
            'An email send to your mail. please reset password from there.',
          );
          this.setState({isLoading: false});
          setTimeout(() => {
            this.props.navigation.navigate('Auth');
          }, 3000);
        })
        .catch(err => {
          errors.message = err.message;
          this.setState({
            isLoading: false,
            errors: errors,
          });
        });
    }
  };

  inputCangeHandler = text => {
    this.setState({
      email: text,
    });
  };

  render() {
    return (
      <Screen style={styles.flex}>
        <KeyboardAvoidingViewWrapper>
          <View style={styles.header}>
            <Text style={styles.headText}>Reset Password</Text>
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              inputType="email"
              onChangeText={this.inputCangeHandler}
              value={this.email}
              placeholder="Enter your email"
            />
            <View style={styles.error}>
              {this.state.errors && this.state.errors.message ? (
                <Text>{this.state.errors.message}</Text>
              ) : null}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={this._resetPassword} label={'Reset my password'} />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.props.navigation.goBack()}
              style={styles.backBtn}>
              <Text style={styles.backLabel}>Back</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingViewWrapper>
      </Screen>
    );
  }
}

ForgotPassword.navigationOptions = navData => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  flex: {
    justifyContent: 'center',
  },
  textInput: {
    height: 60,
    marginHorizontal: 15,
    borderRadius: 10,
    paddingLeft: 15,
    marginTop: 27,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  resetPasswordBtn: {
    backgroundColor: Colors.pink4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    height: 60,
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    padding: 4,
    marginTop: 5,
  },
  resetPasswordLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  backLabel: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginHorizontal: 15,
  },
  error: {
    alignItems: 'center',
    marginTop: 4,
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  stretch: {
    width: 130,
    height: 130,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  headText: {
    fontWeight: 'bold',
    fontSize: 35,
    color: Colors.black2,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: data => dispatch(AuthActions.resetPassword(data)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(ForgotPassword);
