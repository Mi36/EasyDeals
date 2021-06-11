import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const UploadProduct = () => {
  const [response, setResponse] = React.useState(null);
  console.log(response);

  const uploadImageToStorage = (path, imageName) => {
    let reference = storage().ref(imageName); // 2
    let task = reference.putFile(path); // 3

    task
      .then(() => {
        // 4
        console.log('Image uploaded to the bucket!');
      })
      .catch(e => console.log('uploading image error => ', e));
  };

  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

  const options = {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 0,
    mediaType: 'photo',
    includeBase64: false,
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="cover"
          resizeMethod="scale"
          style={{width: 200, height: 200}}
          source={{uri: response?.assets[0]?.uri}}
        />
      </View>
      <View styels={styles.button} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => onButtonPress('library', options)}>
          <Text> SELECT IMAGE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            uploadImageToStorage(response?.assets[0]?.uri, 'sssssss')
          }>
          <Text> UPLOAD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150,
  },
  button: {
    margin: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
});

export default UploadProduct;

const actions = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  {
    title: 'Take Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'video',
    },
  },
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
    },
  },
  {
    title: 'Select Image or Video\n(mixed)',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
    },
  },
];
