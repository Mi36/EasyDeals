import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function AdminLogin(props) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('UserProducts');
        }}>
        <Text>AdminLoginScreen</Text>
      </TouchableOpacity>
    </View>
  );
}
