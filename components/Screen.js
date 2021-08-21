//import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

export default function Screen(props) {
  const {style, children} = props;

  // these can be used if header added
  // const navigation = useNavigation();
  // const onBack = React.useCallback(() => navigation.goBack(), [navigation]);
  return (
    <SafeAreaView style={[styles.container, style]} co>
      <StatusBar
        animated={true}
        backgroundColor={Colors.green3}
        barStyle="dark-content"
      />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green3,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
});
