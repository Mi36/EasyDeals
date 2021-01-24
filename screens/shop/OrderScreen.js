import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/order';

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

  if (isLoading) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'pink',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>No orders found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount.toFixed(2)}
          date={itemData.item.date}
          item={itemData.item.item}
        />
      )}
    />
  );
};

OrderScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
  };
};

const styles = StyleSheet.create({});

export default OrderScreen;
