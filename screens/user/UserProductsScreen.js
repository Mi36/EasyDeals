import React, {useState, useEffect, useCallback} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useDispatch, useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProdectItem';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productActions from '../../store/actions/products';
import * as AuthActions from '../../store/actions/auth';
import * as cartActions from '../../store/actions/cart';

// show all images as static here
//adding functionality keep pending

// const PickImage = () => {
//   const [selectedImage, setSelectedImage] = useState();
//   const [takenImage, setTakenImage] = useState();
//   useEffect(() => {
//     auth().signInAnonymously();
//   });

//   const uploadImage = async () => {
//     const uri = selectedImage.uri;
//     const response = await fetch(uri); //take uri from picker
//     const blob = await response.blob(); //converted to blob
//     const userData = await AsyncStorage.getItem('userData');
//     console.log('dsadasd', userData);
//     const transformedData = JSON.parse(userData);
//     console.log(transformedData.userId);
//     const task = storage()
//       .ref()
//       .child(
//         `post/${auth().currentUser._user.uid}/${Math.random().toString(36)}`,
//       )
//       .put(blob);

//     const taskProgress = snapshot => {
//       console.log(
//         `${snapshot.bytesTransferred} transferred out of ${
//           snapshot.totalBytes
//         }`,
//       );
//     };

//     const taskCompleted = () => {
//       task.snapshot.ref.getDownloadURL().then(snapshot => {
//         console.log('ssss', snapshot);
//         savePostData(snapshot);
//       });
//     };
//     const taskError = snapshot => {
//       console.log(snapshot);
//     };

//     task.on('state_changed', taskProgress, taskCompleted, taskError);

//     task.then(() => {
//       console.log('Image uploaded to the bucket!');
//       task.snapshot.ref.getDownloadURL().then(snapshot => {
//         console.log('ssss', snapshot);
//         savePostData(snapshot);
//       });
//     });
//   };

//   const savePostData = downloadURL => {
//     console.log('working');
//     database()
//       .ref('/products/123')
//       .update({
//         image: downloadURL,
//       })
//       .then(() => console.log('Data updated.'));
//   };

//   const takePhotoHandler = () => {
//     launchCamera(
//       {
//         mediaType: 'photo',
//         includeBase64: false,
//         maxHeight: 200,
//         maxWidth: 200,
//       },
//       response => {
//         setTakenImage(response);
//       },
//     );
//   };

//   const pickImageHandler = () => {
//     launchImageLibrary(
//       {
//         mediaType: 'photo',
//         includeBase64: false,
//         maxHeight: 200,
//         maxWidth: 200,
//       },
//       response => {
//         setSelectedImage(response);
//       },
//     );
//   };
//   return (
//     <View style={styles.pickImage}>
//       <View style={styles.imageContainer}>
//         <Image source={selectedImage} />
//       </View>
//       <View style={styles.imageContainer}>
//         <Image source={takenImage} />
//       </View>
//       <View style={styles.button}>
//         <Button title="Pick image" onPress={pickImageHandler} />
//         <Button title="Take image" onPress={takePhotoHandler} />
//         <Button title="press here" onPress={uploadImage} />
//       </View>
//     </View>
//   );
// };

const UserProductScreen = props => {
  const userProducts = useSelector(state => state.products.availableProducts);
  console.log('useProducts', userProducts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefrehing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(); //initially undefined, thats why this is empty
  const {navigation} = props;
  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', {productId: id});
  };

  const actionLogOut = useCallback(() => {
    dispatch(AuthActions.logout());
  }, [dispatch]);
  useEffect(() => {
    props.navigation.setParams({
      logOut: actionLogOut,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionLogOut]);

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

  if (userProducts.length === 0) {
    return (
      <>
        <StatusBar backgroundColor="#F1543F" barStyle={'dark-content'} />
        <SafeAreaView style={styles.flex}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => props.navigation.state.params.logOut()}
              style={styles.goback}>
              <Text>logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.empty}>
            <Text>No items found</Text>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => props.navigation.state.params.logOut()}
          style={styles.goback}>
          <Text>logout</Text>
        </TouchableOpacity>
      </View>
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
    </SafeAreaView>
  );
};
UserProductScreen.navigationOptions = navData => {
  return {
    headerTitle: 'User products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="All orders"
          onPress={() => {
            navData.navigation.navigate('AllOrders');
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
    tabBarLabel: 'Products',
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
  goback: {
    backgroundColor: '#A6CE39',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginRight: 20,
    padding: 5,
  },
  pickImage: {alignItems: 'center', marginTop: 25},
  flex: {flex: 1, backgroundColor: '#F1543F'},
  header: {
    backgroundColor: '#F1543F',
    height: 50,
    justifyContent: 'center',
  },
});
