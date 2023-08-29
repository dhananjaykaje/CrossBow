import React, { useState } from 'react';
import {
  Text,
  Image,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './registerStyle';

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const requestPermissions = async () => {
    try {
      const cameraPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      const storagePermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );

      if (
        cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
        storagePermission === PermissionsAndroid.RESULTS.GRANTED
      ) {
        handleUpload();
      } else {
        console.log('Permissions denied');
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  const handleUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300, // Set a fixed height to maintain the circle shape
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
    })
      .then(image => {
        setProfileImage({ uri: `data:${image.mime};base64,${image.data}` });
      })
      .catch(error => {
        console.error('Error selecting image:', error);
      });
  };

  const handleRegister = async () => {
    if (!username.trim()) {
      Alert.alert('Validation Error', 'Please enter your username');
      return;
    }

    if (!profileImage) {
      Alert.alert('Validation Error', 'Please select a profile image');
      return;
    }

    try {
      const userData = {
        username,
        profileImage,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      console.log('User data saved:', userData);

      setUsername('');
      setProfileImage(null);

      navigation.navigate('newGame');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bgImage.png')}
      style={styles.background}
    >
      <View style={styles.profilePhotoContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={requestPermissions}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage.uri }}
              style={styles.centerImage}
            />
          ) : (
            <Text style={styles.uploadButtonText}>+</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/logo1.png')}
        />
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="black"
          value={username}
          onChangeText={text => setUsername(text)}
          color="black"
        />

        {/* Email field without validation */}
        <Text style={styles.label}>Email (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="black"
        />

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Register;
