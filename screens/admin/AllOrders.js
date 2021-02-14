import React from 'react';
import {SafeAreaView} from 'react-native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AllOrders(props) {
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.align}>
        <Text>All orders screen</Text>
      </View>
    </SafeAreaView>
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
  flex: {flex: 1, backgroundColor: '#F1543F'},
  align: {alignItems: 'center'},
});
