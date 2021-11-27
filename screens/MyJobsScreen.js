import React from 'react';
import {Alert, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import Header from '../components/Header';
import ProductItem from '../components/ProductItem';
import Screen from '../components/Screen';
import {deleteProduct} from '../store/actions/products';
import * as AuthActions from '../store/actions/auth';

const MyJobsScreen = props => {
  const dispatch = useDispatch();
  const userProducts = useSelector(state => state.products.userproducts);
  console.log(userProducts);

  const actionLogOut = React.useCallback(() => {
    dispatch(AuthActions.logout());
  }, [dispatch]);

  React.useEffect(() => {
    props.navigation.setParams({
      logOut: actionLogOut,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionLogOut]);

  const onPress = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => props.navigation.state.params.logOut(),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <Screen style={styles.main}>
      <Header title={'My jobs'} />
      <Button label={'Log out'} onPress={onPress} style={styles.button} />
      <Button
        label={'Post your job'}
        onPress={() => props.navigation.navigate('AddJob')}
        style={styles.button}
      />

      <FlatList
        bounces={false}
        data={userProducts}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <ProductItem
            title={itemData.item.title}
            price={itemData.item.price}
            onUpdate={() => {
              props.navigation.navigate('EditJob', {
                productId: itemData.item.id,
              });
            }}
            onDelete={() => dispatch(deleteProduct(itemData.item.id))}
          />
        )}
      />
    </Screen>
  );
};

MyJobsScreen.navigationOptions = navData => {
  return {
    headerShown: false,
  };
};

export default MyJobsScreen;

const styles = StyleSheet.create({
  button: {
    height: 40,
    marginHorizontal: 20,
  },
  innerButton: {
    height: 40,
    marginHorizontal: 20,
    width: 100,
  },
});
