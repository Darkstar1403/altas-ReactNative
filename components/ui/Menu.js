import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Altas } from '../user/Altas';
import { Listas } from '../user/Listas';
import {Busqueda} from '../user/Busqueda';
import { Bajas } from '../user/Bajas';

const Tab = createBottomTabNavigator();

export default function Menu() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        header
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'altas') {
              iconName = focused
                ? 'person-add'
                : 'person-add-outline';
            } else if (route.name === 'listas') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'busqueda'){
              iconName = focused ? 'body' : 'body-outline';
            }
            else{
              iconName = focused ? 'person-remove' : 'person-remove-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="altas" component={Altas} />
        <Tab.Screen name="listas" component={Listas} />
        <Tab.Screen name="busqueda" component={Busqueda} />
        <Tab.Screen name='bajas' component={Bajas} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}