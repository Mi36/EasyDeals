import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({title, onBack}) => {
  return (
    <View style={styles.main}>
      {onBack && (
        <TouchableOpacity style={styles.back} onPress={onBack}>
          <Ionicons name={'arrow-back'} size={25} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.green2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingVertical: 10,
    fontWeight: 'bold',
    fontSize: 30,
  },
  back: {
    position: 'absolute',
    left: 5,
  },
});
