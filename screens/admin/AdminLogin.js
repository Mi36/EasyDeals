import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from 'react-native';

export default function AdminLogin(props) {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.header}>
        <Text style={styles.adminLoginText}>Admin login</Text>
      </View>

      <TextInput
        style={styles.email}
        placeholder={'E-mail'}
        value={email}
        onChangeText={value => {
          setEmail(value);
        }}
      />
      <TextInput
        style={styles.password}
        placeholder={'Password'}
        value={password}
        onChangeText={value => {
          setPassword(value);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('UserProducts');
        }}
        style={styles.customerButton}>
        <Text style={styles.customerText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goback}
        onPress={() => {
          props.navigation.goBack();
        }}>
        <Text style={styles.underline}>go back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

AdminLogin.navigationOptions = navData => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F1543F'},
  adminLoginText: {fontSize: 30, fontWeight: 'bold'},
  header: {alignItems: 'center'},
  customerButton: {
    backgroundColor: '#A6CE39',
    marginHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 25,
  },
  customerText: {
    fontWeight: '600',
    fontSize: 20,
    color: '#222020',
  },
  email: {
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    marginVertical: 25,
    marginHorizontal: 20,
    paddingLeft: 10,
    borderRadius: 10,
  },
  password: {
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    marginHorizontal: 20,
    paddingLeft: 10,
    borderRadius: 10,
  },
  goback: {
    backgroundColor: '#A6CE39',
    width: 100,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
  underline: {textDecorationLine: 'underline'},
});
