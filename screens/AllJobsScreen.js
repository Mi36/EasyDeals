import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import Header from '../components/Header';
import ProductItem from '../components/ProductItem';
import Screen from '../components/Screen';
import Colors from '../constants/Colors';
import * as productActions from '../store/actions/products';

const AllJobsScreen = props => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isRefrehing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(); //initially undefined, thats why this is empty

  const selectItemHandler = id => {
    props.navigation.navigate('JobDetails', {productId: id});
  };

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);

    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
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
        <View style={styles.noProductAvailable}>
          <Text style={styles.text}>There is no jobs available</Text>
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
    <Screen>
      <Header title={'JOBS AVAILABLE'} />
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefrehing}
        data={products}
        renderItem={itemData => (
          <ProductItem
            image={itemData.item.imageUrl}
            price={itemData.item.price}
            title={itemData.item.title}
            onDetailsPress={() => selectItemHandler(itemData.item.id)}
            onAddToCart={() => {}}
          />
        )}
      />
    </Screen>
  );
};

AllJobsScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green3,
  },
  button: {
    backgroundColor: Colors.brand_2,
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#141B5D',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
    padding: 5,
  },
  header: {
    backgroundColor: Colors.green3,
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
    backgroundColor: Colors.green1,
  },
  logout: {
    backgroundColor: 'white',
  },
});

export default AllJobsScreen;
