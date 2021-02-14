/* eslint-disable react-hooks/rules-of-hooks */
import React, {useCallback, useEffect, useReducer, useState} from 'react';
// use reducer not related to redux
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../components/input';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productActions from '../../store/actions/products';
// use outside of component if not depend on prop, it helps to avoid unnecessory
// recreations of the function
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value, // change only that perticular one
    };
    const updatedValidities = {
      ...state.inputVlidities,
      [action.input]: action.isValid,
    };
    let updatedformIsValid = true;
    for (const key in updatedValidities) {
      updatedformIsValid = updatedformIsValid && updatedValidities[key]; // everything in the form must be true
      // it checks all, it checks every item +latest value of updatedFormIsvalid
    }

    return {
      ...state,
      formIsvalid: updatedformIsValid,
      inputVlidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const editProductScreen = props => {
  // this will rerun when error changes

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const prodId = props.navigation.getParam('productId');
  const editProduct = useSelector(state =>
    state.products.userproducts.find(prod => prod.id === prodId),
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editProduct ? editProduct.title : '',
      imageUrl: editProduct ? editProduct.imageUrl : '',
      description: editProduct ? editProduct.description : '',
      price: '',
    },
    inputVlidities: {
      title: editProduct ? true : false,
      imageUrl: editProduct ? true : false,
      description: editProduct ? true : false,
      price: editProduct ? true : false,
    },
    formIsvalid: editProduct ? true : false,
  });

  // const [titleIsValid, setTitleIsValid] = useState(false);
  // const [title, setTitle] = useState(editProduct ? editProduct.title : '');
  // const [imageUrl, setImage] = useState(
  //   editProduct ? editProduct.imageUrl : '',
  // );
  // const [price, setPrice] = useState('');
  // const [description, setDescription] = useState(
  //   editProduct ? editProduct.description : '',
  // );

  const inputChangehandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      // let isValid = false;
      // if (text.trim().length > 0) {
      //   isValid = true;
      // }
      //trim() will remove white spaces
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  const submitHandler = useCallback(async () => {
    if (!formState.formIsvalid) {
      Alert.alert('Wrong Input', 'Please check errors in the form', [
        {text: 'Okay'},
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      if (editProduct) {
        await dispatch(
          productActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
          ),
        );
      } else {
        await dispatch(
          productActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
          ), //here + is used to convert to a string
        );
      }
      props.navigation.goBack();
    } catch (err) {
      console.log(err);
      setError(err.message);
    }

    setIsLoading(false); // this will only set after dispatch above functions, this is due to our async await syntex
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, prodId, formState]);

  //useCallback here used to avoid infinite loop
  //also use a function from navigation part
  // use instead of shouldComponentupdate
  // add dependencies inside the brackets at last
  // if that changes components will rerendered

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitHandler]);

  useEffect(() => {
    if (error) {
      console.log(error);
      Alert.alert('An Error Occured', error, [{text: 'Okay'}]);

      Alert.alert('An error occured', 'Please check errors ', [{text: 'Okay'}]);
    }
  }, [error]);

  if (isLoading) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}}>
        <SafeAreaView style={styles.form}>
          <View style={styles.head}>
            <Text>
              {props.navigation.getParam('productId') ? (
                <Text style={styles.text}>Edit Product</Text>
              ) : (
                <Text style={styles.text}>Add Product</Text>
              )}
            </Text>
          </View>
          <Input
            id="title"
            label="Title"
            errorText="please enter valid title"
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="sentences"
            autoCorrect
            onInputChange={inputChangehandler}
            initialValue={editProduct ? editProduct.title : ''}
            initiallyValid={!!editProduct} //if we have edited product, then only initially valid, otherwise not i itially valid
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="please enter valid url"
            keyboardType="default"
            returnKeyType="next"
            initialValue={editProduct ? editProduct.imageUrl : ''}
            initiallyValid={!!editProduct}
            onInputChange={inputChangehandler}
            required
          />
          {editProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="please enter valid Price"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangehandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="description"
            errorText="please enter valid description"
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="sentences"
            autoCorrect
            initialValue={editProduct ? editProduct.title : ''}
            initiallyValid={!!editProduct}
            onInputChange={inputChangehandler}
            required
            minLength={5}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={props.navigation.getParam('submit')}>
            <Text>Save</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

editProductScreen.navigationOptions = navData => {
  const submitFun = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Save" onPress={submitFun} />
      </HeaderButtons>
    ),
    tabBarLabel: 'Add Product',
  };
};

const styles = StyleSheet.create({
  form: {margin: 20},
  formControl: {
    width: '100%',
  },
  label: {
    marginVertical: 8,
  },
  head: {
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 5,
  },
  header: {
    backgroundColor: '#F1543F',
    height: 50,
    justifyContent: 'center',
  },
  flex: {flex: 1, backgroundColor: '#F1543F'},
  button: {
    backgroundColor: '#A6CE39',
    marginHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 25,
  },
  indicator: {alignItems: 'center', justifyContent: 'center', flex: 1},
});

export default editProductScreen;
