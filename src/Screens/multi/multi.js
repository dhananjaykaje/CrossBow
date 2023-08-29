import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Modal,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MATRIX_SIZE = 7;
const CELL_SIZE = SCREEN_WIDTH / MATRIX_SIZE;

const customPath = [1, 2, 3, 4, 5, 6, 7, 14, 21, 28, 35, 42, 49, 48, 47, 46, 45, 44, 43, 36, 29, 22, 15, 8, 9, 10, 11, 12, 13, 20, 27, 34, 41, 40, 39, 38, 37, 30, 23, 16, 17, 18, 19, 26, 33, 32, 31, 24, 25];

const dangerBoxes = [5, 42, 9, 27, 30, 43, 47, 14, 32];

const multi = () => {
    // const { numberOfPlayers } = route.params;
console.log('====================================');
// console.log(numberOfPlayers);
console.log('====================================');
  const [playerPosition, setPlayerPosition] = useState(0);
  const [diceNumber, setDiceNumber] = useState(1);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (customPath[playerPosition] === 25) {
      setIsGameFinished(true);
      setWinner('Player');
      setShowModal(true);
    }
  }, [playerPosition]);

  const calculateNextPosition = (currentPosition, steps) => {
    let newPosition = currentPosition + steps;

    if (newPosition >= customPath.length) {
      newPosition -= customPath.length;
    }

    return newPosition;
  };

  const rollDicePlayer = () => {
    if (isGameFinished) return;

    const newDiceNumber = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(newDiceNumber);

    const remainingSteps = customPath.length - playerPosition - 1;

    if (remainingSteps < newDiceNumber) {
      return;
    }

    const newPosition = calculateNextPosition(playerPosition, newDiceNumber);

    if (newPosition === playerPosition && newDiceNumber !== 1) {
      return;
    }

    if (newPosition <= customPath.length - 1) {
      if (dangerBoxes.includes(customPath[newPosition])) {
        setPlayerPosition(0); // Restart from box 1 due to danger
      } else {
        setPlayerPosition(newPosition);
      }
    }
  };

  const resetGame = () => {
    setDiceNumber(1);
    setIsGameFinished(false);
    setPlayerPosition(0);
    setWinner(null);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderBoard = () => {
    const board = [];

    for (let i = 0; i < MATRIX_SIZE; i++) {
      const row = [];
      for (let j = 0; j < MATRIX_SIZE; j++) {
        const boxNumber = i * MATRIX_SIZE + j + 1;
        const isPlayerHere = customPath[playerPosition] === boxNumber;
        const isWinnerHere = boxNumber === 25;
        const isDangerBox = dangerBoxes.includes(boxNumber);

        row.push(
          <View
            key={j}
            style={[
              styles.cell,
              {
                backgroundColor: isWinnerHere ? '#4CAF50' : isDangerBox ? '#FF5252' : '#FFC107',
                borderColor: isPlayerHere ? '#f44336' : '#000',
                borderWidth: isPlayerHere ? 2 : 1,
              },
            ]}
          >
            {isPlayerHere && <Text style={styles.boxNumber}>P</Text>}
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

  return (
    <ImageBackground
      source={require('../../assets/images/bgImage.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.board}>{renderBoard()}</View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Dice Number: {diceNumber}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={rollDicePlayer} disabled={isGameFinished}>
          <Text style={styles.buttonText}>
            {isGameFinished ? 'Game Over' : 'Roll Dice'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Reset Game</Text>
        </TouchableOpacity>
        <Modal visible={showModal} animationType="slide" transparent={true}>
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
        </Modal>
      </View>
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
});

export default multi;
