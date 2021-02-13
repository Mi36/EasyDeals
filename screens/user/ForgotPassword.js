import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
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
      <SafeAreaView style={styles.flex}>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.header}>
          <Text style={styles.text}>Forgot Password</Text>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            inputType="email"
            onChangeText={this.inputCangeHandler}
            value={this.email}
            placeholder="E-mail"
          />
          <View style={styles.error}>
            {this.state.errors && this.state.errors.message ? (
              <Text>{this.state.errors.message}</Text>
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
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.navigation.goBack()}
            style={styles.backBtn}>
            <Text style={styles.resetPasswordLabel}>Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

ForgotPassword.navigationOptions = navData => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F1543F'},
  textInput: {
    height: 35,
    marginHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginTop: 27,
  },
  resetPasswordBtn: {
    height: 40,
    width: 120,
    backgroundColor: '#A6CE39',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginTop: 27,
  },
  backBtn: {
    backgroundColor: '#A6CE39',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    padding: 4,
    marginTop: 27,
  },
  resetPasswordLabel: {
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginHorizontal: 15,
    alignItems: 'center',
  },
  error: {alignItems: 'center', marginTop: 4},
  header: {alignItems: 'center'},
  text: {fontSize: 30, fontWeight: 'bold'},
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
