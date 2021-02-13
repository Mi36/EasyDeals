import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AllOrders(props) {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>All orders screen</Text>
      </View>
    </>
  );
}
AllOrders.navigationOptions = navData => {
  return {
    tabBarLabel: 'All Orders',
  };
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F1543F',
    height: 50,
    justifyContent: 'center',
  },
});
