import React, {useState} from 'react';
import {FlatList, Button, Text, View, StyleSheet, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productActions from '../../store/actions/products';
import ImagePicker from 'react-native-image-picker';
// watch from 10 onwards
//https://www.youtube.com/watch?v=GEtqS9Qozv4&t=681s

import ProductItem from '../../components/shop/ProdectItem';

const PickImage = ({image, onImagePicked}) => {
  const [selectedImage, setSelectedImage] = useState();
  const pickImageHandler = () => {
    ImagePicker.showImagePicker(
      {title: 'Pick image', maxWidth: 800, maxHeight: 600},
      response => {
        if (response.error) {
          console.log('image error');
        } else {
          console.log('image:' + response.uri);
          setSelectedImage({uri: response.uri});
          onImagePicked({uri: response.uri});
        }
      },
    );
  };
  return (
    <View style={{alignItems: 'center', marginTop: 25}}>
      <View style={styles.imageContainer}>
        <Image source={selectedImage} />
      </View>
      <View style={styles.button}>
        <Button title="Pick image" onPress={pickImageHandler} />
      </View>
    </View>
  );
};

const UserProductScreen = props => {
  const userProducts = useSelector(state => state.products.userproducts);
  const dispatch = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', {productId: id});
  };

  if (userProducts.length === 0) {
    return (
      // <View style={styles.empty}>
      //   <Text>No items found</Text>
      // </View>
      <PickImage />
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}>
          <Button
            color="red"
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color="red"
            title="Delete"
            onPress={() => {
              dispatch(productActions.deleteProduct(itemData.item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};
UserProductScreen.navigationOptions = navData => {
  return {
    headerTitle: 'User products',

    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="MENU"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="ADD"
          onPress={() => {
            navData.navigation.navigate('EditProduct');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductScreen;

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 8,
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 10,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'red',
    width: '80%',
    height: 150,
  },
});
