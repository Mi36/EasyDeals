import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ProductItem from '../components/ProductItem';
import {deleteProduct} from '../store/actions/products';

const MyProductsScreen = props => {
  const dispatch = useDispatch();
  const userProducts = useSelector(state => state.products.userproducts);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('AddProducts');
        }}>
        <Text>Add</Text>
      </TouchableOpacity>
      <FlatList
        data={userProducts}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <ProductItem
            image={itemData.item.image}
            title={itemData.item.title}
            price={itemData.item.price}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('EditProducts', {
                  productId: itemData.item.id,
                });
              }}>
              <Text>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(deleteProduct(itemData.item.id))}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </ProductItem>
        )}
      />
    </>
  );
};

export default MyProductsScreen;

const styles = StyleSheet.create({});
