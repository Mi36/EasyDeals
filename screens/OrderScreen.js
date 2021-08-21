import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import OrderItem from '../components/OrderItem';
import Screen from '../components/Screen';
import * as ordersActions from '../store/actions/order';

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
      <Screen>
        <ActivityIndicator color="red" size="large" />
      </Screen>
    );
  }

  if (orders.length === 0) {
    return (
      <Screen>
        <Text style={styles.text}>No orders found</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      {header()}
      <FlatList
        data={orders}
        keyExtractor={item => item?.id}
        renderItem={itemData => (
          <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.date}
            item={itemData.item.item}
          />
        )}
      />
    </Screen>
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
