import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import React,{useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const intro = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('register');
    }, 2000); 
    return () => clearTimeout(timer); // Clear the timer if the component unmounts before the timeout
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
  
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/SplashScreen.png')}
            style={styles.centerImage}
          />
        </View>
     
    </SafeAreaView>
  );
}

export default intro

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImage: {
    width: "120%", // Set your desired width
    height: "120%", // Set your desired height
    resizeMode: 'contain', // Adjust the resizeMode as needed
  },
 
});
