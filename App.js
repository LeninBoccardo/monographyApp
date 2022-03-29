import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './Screens/Menu/index';
import Init from './Screens/Init/index';
import Module from './Screens/Module/index';
import Modules from './Screens/Modules/index';
import Test from './Screens/Test/index';
import Tests from './Screens/Tests/index';
import History from './Screens/History/index';
import Questions from './Screens/Questions/index';
import InitTest from './Screens/InitTest/index';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Init">
        <Stack.Screen
          name="Init"
          component={Init}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InitTest"
          component={InitTest}
          options={{
            headerTitle: 'Início',
            headerLeft: false,
            headerTintColor: '#21aff0'
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            headerTitle: 'Menu',
            headerTintColor: '#21aff0',
            headerLeft: false,
          }}
        />
        <Stack.Screen
          name="Modules"
          component={Modules}
          options={{
            headerTitle: 'Módulos',
            headerTintColor: "#21aff0",
          }}
        />
        <Stack.Screen
          name="Module"
          component={Module}
          options={{
            headerTitle: 'Módulo',
            headerTintColor: "#21aff0",
          }}
        />
        <Stack.Screen
          name="Tests"
          component={Tests}
          options={{
            headerTitle: 'Testes',
            headerTintColor: "#21aff0",
          }}
        />
        <Stack.Screen
          name="Test"
          component={Test}
          options={{
            headerTitle: 'Teste',
            headerTintColor: "#21aff0",
          }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{
            headerTitle: 'Histórico',
            headerTintColor: "#21aff0",
          }}
        />
        <Stack.Screen
          name="Questions"
          component={Questions}
          options={{
            headerTitle: 'Dúvidas',
            headerTintColor: "#21aff0",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
