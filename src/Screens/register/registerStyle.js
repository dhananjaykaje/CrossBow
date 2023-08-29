import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    centerImage: {
        width: 90,
        height: 90, // Set the same height as width to maintain a circle
        borderRadius: 45, // Set half of the width and height to maintain a circle
      },
    
    label: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    profilePhotoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    uploadButton: {
        width: 90,
        height: 90,
        borderRadius: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CCCCCC',
    },
    uploadButtonText: {
        fontSize: 50,
        color: '#CCCCCC',
    },
    registerButton: {
        width: '100%',
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        alignItems: 'center',
    },
    registerButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
export default styles;