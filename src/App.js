import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import intro from './Screens/introscreen/intro';
import newGame from './Screens/newGame/newGame';
import shop from './Screens/Shpo/shop';
import DiceGame from './Screens/Play Game/playGame';
import register from './Screens/register/register';
import multi from './Screens/multi/multi';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="intro" component={intro} options={{ headerShown: false }}/>
        <Stack.Screen name="register" component={register} options={{ headerShown: false }}/>
        <Stack.Screen name="newGame" component={newGame} options={{ headerShown: false }}/>
        <Stack.Screen name="shop" component={shop} options={{ headerShown: false }}/>
        <Stack.Screen name="DiceGame" component={DiceGame} options={{ headerShown: false }}/>
        <Stack.Screen name="multi" component={multi} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;