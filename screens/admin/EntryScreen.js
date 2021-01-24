import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function EntryScreen(props) {
  return (
    <View>
      <Text>Welcome</Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('AdminLogin');
        }}>
        <Text>Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Auth')}>
        <Text>Customer</Text>
      </TouchableOpacity>
    </View>
  );
}
