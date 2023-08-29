import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    background: {
      flex: 1,
      resizeMode: 'cover',
    },
    header: {
      flexDirection: 'row',
      marginHorizontal: '5%',
      marginVertical: '3%',
      justifyContent: 'space-between',
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userImage: {
      width: 40,
      height: 40,
      borderRadius: 50,
      marginRight: 10,
    },
    userText: {
      justifyContent: 'center',
    },
    username: {
      fontSize: 16,
      color: '#f5f5f5',
      fontWeight: 'bold',
    },
    rank: {
      fontSize: 14,
      color: '#f5f5f5',
      fontWeight: 'bold',
    },
    pointsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: 'white',
      backgroundColor: '#340737',
      borderWidth: 3,
      borderRadius: 20,
    },
    pointsIcon: {
      marginHorizontal: 10,
    },
    pointsText: {
      fontSize: 14,
      color: '#f5f5f5',
      fontWeight: 'bold',
    },
    imageRow: {
      flexDirection: 'row',
      marginVertical: '10%',
      justifyContent: 'space-between',
      marginHorizontal: '5%',
    },
    notImageContainer: {
      alignSelf: 'flex-end',
      backgroundColor: '#00FF7F',
      width: '60%',
      marginTop: '5%',
    },
    notImage: {
      alignSelf: 'flex-end',
    },
    liveMatchImageContainer: {
      alignItems: 'center',
      marginTop: '10%',
    },
    liveMatchImage: {
      height: 160,
      width: 260,
      borderRadius: 10,
    },
    iconRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: '5%',
      marginHorizontal: '15%',
    },
    contactListContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      width: '80%',
      maxHeight: '80%',
    },
    contactListItem: {
      fontSize: 16,
      color: '#333',
      marginBottom: 10,
      fontWeight: 'bold',
      borderBottomWidth: 2,
      borderColor: '#f5f5f5',
    },
    playerOption: {
      marginBottom: 10,
      borderBottomWidth: 2,
      borderColor: '#f5f5f5',
    },
    playerOptionText: {
      fontSize: 16,
      color: '#333',
      fontWeight: 'bold',
    },
    closeButton: {
      marginTop: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#560B57',
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    loadingText: {
      color: '#f5f5f5',
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(64, 0, 64, 0.9)', // Dark purple background color
      height: '50%', // 50% of the screen height
    },
    playerOptionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    playerOptionButton: {
      flex: 1,
      marginRight: 10,
    },
    closeButtonContainer: {
      marginTop: 20,
      paddingHorizontal: 20,
      alignSelf: 'flex-end',
    },
    backButton:{
      backgroundColor:'white',
      width:60,
      height:40,
      alignItems:"center",
      justifyContent:'center',
      marginHorizontal:'5%',
      marginVertical:'5%',
      borderRadius:15
    },
    backText:{
      color:'black',
      fontSize:18,
      fontWeight:'bold'
    }
  });
  export default styles;