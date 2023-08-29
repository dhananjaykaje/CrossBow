import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  ImageBackground,
  Image,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  Button,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import Contacts from 'react-native-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './newGameStyle'
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
 
const NewGame = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [extractedUserData, setExtractedUserData] = useState(null);
  const [isPlayerModalVisible, setPlayerModalVisible] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState(null);
  const [imageUri, setimageUri] = useState()
  const ref = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchContacts();
    fetchUserData();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };



  const fetchContacts = async () => {
    try {
      const permissionGranted = await requestContactPermission();
      if (permissionGranted) {
        const fetchedContacts = await Contacts.getAll();
        setContacts(fetchedContacts);
      } else {
        console.log('Permission not granted.');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const requestContactPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app needs access to your contacts.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const fetchUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);

        const { username, profileImage } = parsedUserData;
        const userData = {
          name: username,
          image: profileImage?.uri,
        };

        // Set the extracted user data
        setExtractedUserData(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  //screen shot


  //contact List Modal 
  const renderContactListItem = ({ item }) => (
    <Text style={styles.contactListItem}>{item.displayName}</Text>
  );
  // player modal
  const togglePlayerModal = () => {
    setPlayerModalVisible(!isPlayerModalVisible);
  };

  const selectPlayers = (playerCount) => {
    setSelectedPlayers(playerCount);
    togglePlayerModal();
    if (playerCount) {
      navigation.navigate('multi', { selectedPlayers: playerCount });
    }
  };

  const renderPlayerOptionModal = () => (
    <View style={styles.modalContainer}>
      <View style={styles.playerOptionsContainer}>
        <View style={styles.playerOptionButton}>
          <Button title="2 Players" onPress={() => selectPlayers(2)} color="#FF5733" />
        </View>
        <View style={styles.playerOptionButton}>
          <Button title="3 Players" onPress={() => selectPlayers(3)} color="#33FF57" />
        </View>
        <View style={styles.playerOptionButton}>
          <Button title="4 Players" onPress={() => selectPlayers(4)} color="#3357FF" />
        </View>
        {/* ... Add more options if needed */}
      </View>
      <View style={styles.closeButtonContainer}>
        <Button title="Close" onPress={togglePlayerModal} color="#560B57" />
      </View>
    </View>
  );


  return (

    <ImageBackground
      source={require('../../assets/images/bgImage.png')}
      style={styles.background}
    >
      <ViewShot ref={ref}>
        <View style={styles.header}>
          {userData ? (
            <View style={styles.userInfo}>
              {userData.profileImage && (
                <Image
                  source={{ uri: userData.profileImage.uri }}
                  style={styles.userImage}
                />
              )}
              <View style={styles.userText}>
                <Text style={styles.username}>{userData.username}</Text>
                <Text style={styles.rank}>Rank</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.loadingText}>Loading user data...</Text>
          )}

          <View style={styles.pointsContainer}>
            <Image
              source={require('../../assets/images/c.png')}
              style={styles.pointsIcon}
            />
            <Text style={styles.pointsText}>25K</Text>
            <Image
              source={require('../../assets/images/dia.png')}
              style={styles.pointsIcon}
            />
            <Text style={styles.pointsText}>25K</Text>
            <Image
              source={require('../../assets/images/plus.png')}
              style={styles.pointsIcon}
            />
          </View>
        </View>

        <View style={styles.imageRow}>
          <Image source={require('../../assets/images/coin.png')} />
          <Image source={require('../../assets/images/coin2.png')} />
          <Image source={require('../../assets/images/coin3.png')} />
          <Image source={require('../../assets/images/coin4.png')} />
        </View>
        <View style={styles.notImageContainer}>
          <Image
            source={require('../../assets/images/not.png')}
            style={styles.notImage}
          />
        </View>
        <View style={styles.liveMatchImageContainer}>
          <Image
            source={require('../../assets/images/liveMatch.png')}
            style={styles.liveMatchImage}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: '10%',
            marginHorizontal: '5%',
          }}
        >
          <TouchableOpacity onPress={() => {
            try {
              togglePlayerModal(2);
            } catch (error) {
              console.error('Error toggling player modal:', error);
            }
          }}>
            <Image source={require('../../assets/images/pwf.png')} />
          </TouchableOpacity>

          <TouchableOpacity
            // onPress={() => navigation.navigate('DiceGame')}
            onPress={() => {
              navigation.navigate('DiceGame', { userData: extractedUserData })
            }}
          >
            <Image source={require('../../assets/images/pwfc.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={toggleModal}>
            <Image source={require('../../assets/images/friends.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            ref.current.capture().then(uri => {
              console.log("do something with ", uri);
              setimageUri(uri)
            });
          }}>
            <Image source={require('../../assets/images/ad1.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            const options={
              url:imageUri,
              message:"hello",
            };
            Share.open(options)
          }}>
            <Image source={require('../../assets/images/share.png')} />
          </TouchableOpacity>

          <Image source={require('../../assets/images/setting.png')} />
        </View>

        {/* Contact List Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.contactListContainer}>
              <FlatList
                data={contacts}
                renderItem={renderContactListItem}
                keyExtractor={(item) => item.recordID}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Player Options Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isPlayerModalVisible}
          onRequestClose={togglePlayerModal}
        >
          {renderPlayerOptionModal()}
        </Modal>
        <TouchableOpacity
          style={styles.backButton} // Define your styles for the back button
          onPress={() => navigation.goBack()} // Go back when pressed
        >
          <Text style={styles.backText}>Back</Text>{/* Add your back button image */}
        </TouchableOpacity>

      </ViewShot>
    </ImageBackground>
  );
};

export default NewGame;
