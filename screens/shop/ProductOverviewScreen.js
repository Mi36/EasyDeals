import React, {useEffect, useState, useCallback} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProdectItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import * as AuthActions from '../../store/actions/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ProductOverviewScreen = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefrehing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(); //initially undefined, thats why this is empty
  const actionLogOut = useCallback(() => {
    dispatch(AuthActions.logout());
  }, [dispatch]);
  useEffect(() => {
    props.navigation.setParams({
      logOut: actionLogOut,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionLogOut]);

  const selectItemHandler = id => {
    props.navigation.navigate('ProductDetails', {productId: id});
  };

  const loadProducts = useCallback(async () => {
    setError(null);
    // setIsLoading(true);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }

    // here we get the thrown error fro actionFunction
    //  setIsLoading(false);
    setIsRefreshing(false);
  }, [dispatch, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts,
    );
    // the load focus function will ru when ever we coming to this screen

    // another thing in useeffect is we can return something from this ie
    //this is  function that run whenever component rerun or destroyed
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts, props.navigation]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const products = useSelector(state => state.products.availableProducts);
  const cart = useSelector(state => state.cart.items);

  if (isLoading) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.indicator}>
        <Text>There is no products available</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.indicator}>
        <Text>An error occured</Text>
        <Button title="Try Again" color="red" onPress={loadProducts} />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefrehing}
        data={products}
        renderItem={itemData => (
          <ProductItem
            image={itemData.item.imageUrl}
            price={itemData.item.price}
            title={itemData.item.title}
            onSelect={() => {
              selectItemHandler(itemData.item.id);
            }}
            onAddToCart={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}>
            <Button
              color="red"
              title="View Details"
              onPress={() => {
                selectItemHandler(itemData.item.id);
              }}
            />
            <Button
              color="red"
              title="To Cart"
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
            />
          </ProductItem>
        )}
      />
    </SafeAreaView>
  );
};
ProductOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All products',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Ionicons name="log-out-outline" size={25} color="red" />
        <Item
          title="Logout"
          onPress={() => {
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
                  onPress: () => navData.navigation.state.params.logOut(),
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductOverviewScreen;
