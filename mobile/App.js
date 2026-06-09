import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaScreen from './src/screens/ListaScreen';
import FormularioScreen from './src/screens/FormularioScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Lista"
          component={ListaScreen}
          options={{ title: 'Minhas Músicas 🎵' }}
        />
        <Stack.Screen
          name="Formulario"
          component={FormularioScreen}
          options={({ route }) =>
            ({ title: route.params?.musica ? 'Editar Música' : 'Nova Música' })
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
