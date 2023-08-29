import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    background: {
      flex: 1,
      resizeMode: 'cover',
    },
    board: {
      flexDirection: 'column-reverse',
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      width: CELL_SIZE,
      height: CELL_SIZE,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 5,
    },
    boxNumber: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'red',
    },
    infoContainer: {
      marginVertical: 10,
    },
    infoText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    button: {
      marginVertical: 10,
      padding: 10,
      backgroundColor: '#340737',
      borderRadius: 15,
      borderWidth: 1,
      borderWidthColor: 'white',
      width: 150,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: '#2196F3',
      borderRadius: 5,
      padding: 10,
      width: 120,
      alignItems: 'center',
      marginBottom: 10,
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
      width: 30,
      height: 30,
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
  });
  export default styles;