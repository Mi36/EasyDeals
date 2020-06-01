import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import * as AuthActions from '../../store/actions/auth';
import {connect} from 'react-redux';
import Toast from 'react-native-tiny-toast';

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
      //this.props.navigation.navigate('RESETPASSWORD', {email});
      this.props
        .resetPassword(this.state.email)
        .then(val => {
          this.setState({isLoading: false});
          setTimeout(() => {
            this.props.navigation.navigate('Auth');
          }, 1000);
        })
        .catch(err => {
          errors.message = err.message;
          // let message = err.message ? err.message : 'Error';
          // Toast.show(message);
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
      <View style={{flex: 1}}>
        {/* <NavigationEvents onDidFocus={() => this._clearState()} /> */}

        <StatusBar barStyle={'dark-content'} />
        <View>
          <TextInput
            style={styles.textInput}
            inputType="email"
            onChangeText={this.inputCangeHandler}
            value={this.email}
            placeholder="E-mail"
          />
          <View style={{alignItems: 'center', marginTop: 4}}>
            {this.state.errors && this.state.errors.message ? (
              <Text style={{color: 'red'}}>{this.state.errors.message}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this._resetPassword}
            style={styles.resetPasswordBtn}>
            <Text style={styles.resetPasswordLabel}>Send Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ForgotPassword.navigationOptions = {
  headerTitle: 'Forgot Password',
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
    marginTop: 27,
  },
  resetPasswordBtn: {
    height: 40,
    width: 120,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: 27,
  },
  resetPasswordLabel: {},
  buttonContainer: {
    marginHorizontal: 15,
    alignItems: 'center',
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
