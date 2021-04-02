import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/order';
import {SafeAreaView} from 'react-native';

const OrderScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector(state => state.order.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrder()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);
  const header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>YOUR ORDERS</Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.noOrder}>
        <Text style={styles.text}>No orders found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.flex}>
      {header()}
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.date}
            item={itemData.item.item}
          />
        )}
      />
    </SafeAreaView>
  );
};

OrderScreen.navigationOptions = navData => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#5EC7F2',
  },
  text: {
    fontWeight: '500',
    fontSize: 25,
    textAlign: 'center',
  },
  noOrder: {
    flex: 1,
    backgroundColor: '#5EC7F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#5EC7F2',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default OrderScreen;
