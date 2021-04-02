import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProdectItem';
import * as AuthActions from '../../store/actions/auth';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
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
  const header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>All Products</Text>
        <TouchableOpacity onPress={onPress} style={styles.logoutButton}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  if (!isLoading && products.length === 0) {
    return (
      <SafeAreaView style={styles.flex}>
        {header()}
        <View style={styles.noProductAvailable}>
          <Text style={styles.text}>There is no products available</Text>
        </View>
      </SafeAreaView>
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
    <SafeAreaView style={styles.flex}>
      {header()}
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefrehing}
        data={products}
        renderItem={itemData => (
          <ProductItem
            image={itemData.item.imageUrl}
            price={itemData.item.price}
            title={itemData.item.title}
            // onSelect={() => {
            //   selectItemHandler(itemData.item.id);
            // }}
            onAddToCart={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                selectItemHandler(itemData.item.id);
              }}>
              <Text style={styles.buttonLabel}>View details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}>
              <Text style={styles.buttonLabel}>To cart</Text>
            </TouchableOpacity>
          </ProductItem>
        )}
      />
    </SafeAreaView>
  );
};

ProductOverviewScreen.navigationOptions = navData => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5EC7F2',
  },
  button: {
    backgroundColor: '#141B5D',
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#141B5D',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
    padding: 5,
  },
  header: {
    backgroundColor: '#5EC7F2',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  noProductAvailable: {
    alignItems: 'center',
    paddingTop: 35,
  },
  text: {
    fontWeight: '500',
    fontSize: 25,
    textAlign: 'center',
  },
  flex: {
    flex: 1,
    backgroundColor: '#5EC7F2',
  },
  logout: {
    backgroundColor: 'white',
  },
});

export default ProductOverviewScreen;
