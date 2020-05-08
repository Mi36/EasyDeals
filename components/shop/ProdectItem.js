import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {TouchableNativeFeedback} from 'react-native';

const ProductItem = props => {
  let TouchableOpaComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableOpaComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.product}>
      <TouchableOpaComponent onPress={props.onSelect}>
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: props.image}} />
          </View>
          <View style={styles.detail}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>
            {/* <Button title="View Details" onPress={props.onViewDetail}/>
                <Button title="To Cart" onPress={props.onAddToCart}/> */}
            {props.children}
            {/* this helps to pass data to here through the opening and closing tags.
                fro where ever we use this component. because we added this, change the component open and closing tag
                where we are using this.
                */}
          </View>
        </View>
      </TouchableOpaComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 300,
    margin: 20,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
  },
  image: {
    // marginTop:10,
    width: '100%',
    height: '100%',
    // resizeMode: 'stretch',//image will be completly displayed using this.
    //if we use contain the image will be completly displayed in our view, but its size reduced and uniformly scaled
    //center will move the image center of view, kollatha part purath pokum.
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
  },

  title: {fontSize: 18, marginVertical: 4},
  price: {
    fontSize: 14,
    color: 'blue',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '25%',
  },
  detail: {
    padding: 10,
    height: '15%',
    alignItems: 'center',
  },
});

export default ProductItem;
