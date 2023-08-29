import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  Modal,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MATRIX_SIZE = 7;
const CELL_SIZE = SCREEN_WIDTH / MATRIX_SIZE;

const customPath = [1, 2, 3, 4, 5, 6, 7, 14, 21, 28, 35, 42, 49, 48, 47, 46, 45, 44, 43, 36, 29, 22, 15, 8, 9, 10, 11, 12, 13, 20, 27, 34, 41, 40, 39, 38, 37, 30, 23, 16, 17, 18, 19, 26, 33, 32, 31, 24, 25];

// const dangerBoxes = [5, 42, 9, 27, 30, 43, 47, 14, 32];
const dangerBoxes = [5];

const DiceGame = ({ route, navigation }) => {
  const { userData } = route.params;
  console.log("check image>>//==>", userData.image);
  console.log("check name>>//==>", userData.name);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [computerPosition, setComputerPosition] = useState(0);
  const [diceNumber, setDiceNumber] = useState(1);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isPlayerTurn && !isGameFinished) {
      const computerRollInterval = setInterval(() => {
        rollDiceComputer();

        if (customPath[computerPosition] === 25) {
          setIsGameFinished(true);
          setWinner('Computer');
          setShowModal(true);
          clearInterval(computerRollInterval);
        } else {
          setIsPlayerTurn(true);
        }
      }, 1000);

      return () => {
        clearInterval(computerRollInterval);
      };
    }
  }, [isPlayerTurn, computerPosition, isGameFinished]);

  const calculateNextPosition = (currentPosition, steps) => {
    let newPosition = currentPosition + steps;

    if (newPosition >= customPath.length) {
      newPosition -= customPath.length;
    }

    return newPosition;
  };

  const rollDicePlayer = () => {
    if (isGameFinished || !isPlayerTurn) return;

    const newDiceNumber = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(newDiceNumber);

    const remainingSteps = customPath.length - playerPosition - 1;

    if (remainingSteps < newDiceNumber) {
      setIsPlayerTurn(false);
      return;
    }

    const newPosition = calculateNextPosition(playerPosition, newDiceNumber);

    if (newPosition === playerPosition && newDiceNumber !== 1) {
      setIsPlayerTurn(false);
      return;
    }

    if (newPosition <= customPath.length - 1) {
      if (customPath[newPosition] === 25) {
        setIsGameFinished(true);
        setWinner(userData.name);
        setShowModal(true);
      } else if (dangerBoxes.includes(customPath[newPosition])) {
        setPlayerPosition(0); // Restart from box 1 due to danger
        setIsPlayerTurn(false);
      } else if (newPosition === computerPosition) {
        // Player lands on computer's position, reset computer's position
        setComputerPosition(0);
        setPlayerPosition(newPosition);
        setIsPlayerTurn(false);
      } else {
        setPlayerPosition(newPosition);
        setIsPlayerTurn(false);
      }
    }
  };

  const rollDiceComputer = () => {
    if (isGameFinished || isPlayerTurn) return;

    const newDiceNumber = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(newDiceNumber);

    const remainingSteps = customPath.length - computerPosition - 1;

    if (remainingSteps < newDiceNumber) {
      return;
    }

    const newPosition = calculateNextPosition(computerPosition, newDiceNumber);

    if (newPosition === computerPosition && newDiceNumber !== 1) {
      return;
    }

    if (newPosition <= customPath.length - 1) {
      if (customPath[newPosition] === 25) {
        setIsGameFinished(true);
        setWinner('Computer');
        setShowModal(true);
      } else if (dangerBoxes.includes(customPath[newPosition])) {
        setComputerPosition(0); // Restart from box 1 due to danger
      } else if (newPosition === playerPosition) {
        // Computer lands on player's position, reset player's position
        setPlayerPosition(0);
        setComputerPosition(newPosition);
      } else {
        setComputerPosition(newPosition);
      }
    }
  };

  const resetGame = () => {
    setDiceNumber(1);
    setIsGameFinished(false);
    setIsPlayerTurn(true);
    setPlayerPosition(0);
    setComputerPosition(0);
    setWinner(null);
    setShowModal(false);
  };

  const closeModal = () => {
    navigation.goBack();
  };

  const renderBoard = () => {
    const board = [];

    for (let i = 0; i < MATRIX_SIZE; i++) {
      const row = [];
      for (let j = 0; j < MATRIX_SIZE; j++) {
        const boxNumber = i * MATRIX_SIZE + j + 1;
        const isPlayerHere = customPath[playerPosition] === boxNumber;
        const isComputerHere = customPath[computerPosition] === boxNumber;
        const isWinnerHere = boxNumber === 25;
        const isDangerBox = dangerBoxes.includes(boxNumber);

        row.push(
          <View
            key={j}
            style={[
              styles.cell,
              {
                backgroundColor: isWinnerHere ? '#4CAF50' : isDangerBox ? '#FF5252' : '#FFC107',
                borderColor: isPlayerHere ? '#f44336' : isComputerHere ? '#2196F3' : '#000',
                borderWidth: isPlayerHere || isComputerHere ? 2 : 1,
              },
            ]}
          >
            {isPlayerHere && <Image
              source={{ uri: userData.image }}
              style={styles.userImage}
            />}
            {isComputerHere && <Image
              source={require('../../assets/images/profile.png')}
              style={styles.userImage}
            />}
          </View>
        );
      }
      board.push(
        <View key={i} style={styles.row}>
          {row}
        </View>
      );
    }

    return board;
  };

  const renderModalContent = () => {
    if (isGameFinished) {
      return (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {winner ? `${winner} wins!` : 'Game Over'}
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={resetGame}>
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.buttonText}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };


  return (
    <ImageBackground
      source={require('../../assets/images/bgImage.png')}
      style={styles.background}
    >
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: userData.image }}
            style={styles.userImage}
          />
          <View style={styles.userText}>
            <Text style={styles.username}>{userData.name}</Text>
            <Text style={styles.rank}>Rank</Text>
          </View>
        </View>

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

      <View style={styles.container}>
        <View style={styles.board}>{renderBoard()}</View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Dice Number: {diceNumber}</Text>

        </View>
        <TouchableOpacity style={styles.button} onPress={rollDicePlayer} disabled={isGameFinished || !isPlayerTurn}>
          <Text style={styles.buttonText}>
            {isGameFinished ? 'Game Over' : 'Roll Dice'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Reset Game</Text>
        </TouchableOpacity>
        <Modal style={styles.modal} visible={showModal} animationType="slide" transparent={true}>
        {renderModalContent()}
      </Modal>
      </View>
      <TouchableOpacity
        style={styles.backButton} // Define your styles for the back button
        onPress={() => navigation.goBack()} // Go back when pressed
      >
        <Text style={styles.backText}>Back</Text>{/* Add your back button image */}
      </TouchableOpacity>
    </ImageBackground>
  );
};

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
    height:"40%",
    width:"65%",
    borderRadius: 10,
    justifyContent:'center',
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
  },
  
});

export default DiceGame;
