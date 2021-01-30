import React, {useCallback, useEffect, useReducer, useState} from 'react';
// use reducer not related to redux
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
  }, [dispatch, prodId, formState]);

  //useCallback here used to avoid infinite loop
  //also use a function from navigation part
  // use instead of shouldComponentupdate
  // add dependencies inside the brackets at last
  // if that changes components will rerendered

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler});
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
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={{backgroundColor: 'pink'}}
      resetScrollToCoords={{x: 0, y: 0}}>
      <SafeAreaView style={styles.form}>
        <View style={{alignSelf: 'center'}}>
          {props.navigation.getParam('productId') ? (
            <Text>Edit Product</Text>
          ) : (
            <Text>Add Product</Text>
          )}
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
          //   multiline
          initialValue={editProduct ? editProduct.title : ''}
          initiallyValid={!!editProduct}
          onInputChange={inputChangehandler}
          required
          minLength={5}
        />
        <TouchableOpacity
          style={{backgroundColor: 'red', height: 25, marginTop: 25}}
          onPress={props.navigation.getParam('submit')}>
          <Text>Save</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAwareScrollView>
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
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 5,
  },
});

export default editProductScreen;
