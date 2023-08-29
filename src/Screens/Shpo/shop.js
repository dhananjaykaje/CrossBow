import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShopScreen = ({navigation}) => {
  const [showGems, setShowGems] = useState(true);
  const [showCoins, setShowCoins] = useState(false);

  const handleToggleGems = () => {
    setShowGems(true);
    setShowCoins(false);
  };

  const handleToggleCoins = () => {
    setShowGems(false);
    setShowCoins(true);
  };


  //Flatlist data
  const data = [
    { type: 'format1', value1: 'Value 1', image1: require('../../assets/images/iconCoin.png'), image2: require('../../assets/images/zeus.png'), value2: 'Buy Now' },
    { type: 'format2', value1: 'Value 2', image1: require('../../assets/images/iconCoin.png'), image2: require('../../assets/images/zeus.png'), value2: 'Buy Now' },
    // Add more data items here
  ];

  const DualDataItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.column}>
          <Image source={item.image1} style={styles.itemImage} />
          <Text>{item.value1}</Text>
          <Text>{item.type}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.column}>
          <Image source={item.image2} style={styles.itemImage} />
          <Text>{item.value2}</Text>
          <Text>{item.type}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/zeus.png')}
            style={styles.topImage}
          />
          <Text style={styles.topText}>25/10</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.centText}>Level 40</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/smallCoin.png')}
            style={styles.topImage}
          />
          <Text style={styles.topText}>50000</Text>
        </View>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={handleToggleGems} style={styles.tab}>
          <Text style={styles.tabText}>Gems</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleCoins} style={styles.tab}>
          <Text style={styles.tabText}>Coins</Text>
        </TouchableOpacity>
      </View>
      {showGems && (
        <View >
          {/* Gems section */}
          <View>
            <Text>Gems</Text>
          </View>
        </View>
      )}
      {showCoins && (
        <View style={styles.side}>
          {/* Coins section */}
          <View >
            <Text >Coins</Text>
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => <DualDataItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('newGame')}>
        <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C2FF',
  },
  topView: {
    marginTop: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', // To align image and text horizontally
  },
  topText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginTop: -10,
    backgroundColor: 'grey',
  },
  centText: {
    fontSize: 24,
    marginTop: -10,
    color: 'white',
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 20,
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  separator: {
    width: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  activeTab: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
  activeTabText: {
    color: 'white',
  },
});

export default ShopScreen;



