import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

export default function SplashScreen() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={[styles.container, { width: windowWidth, height: windowHeight }]}>
      <Image
        source={require('../assets/splashPic.png')}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
