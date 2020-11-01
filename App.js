/**
 * Live Chat Application
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import * as React from 'react';
import {
  NavigationContainer
} from '@react-navigation/native';
import {
  createStackNavigator
} from '@react-navigation/stack';
import {
  createMaterialBottomTabNavigator
} from '@react-navigation/material-bottom-tabs';
/*import
  MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';*/

import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import HomeTab from './tabpages/HomeTab';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#633689',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
      
        name="FirstPage"
        component={HomeTab}
        options={{
          tabBarLabel: 'Home',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons
          //       name="home"
          //       color={color}
          //       size={size}
          //     />
          // ),
        }} />
      <Tab.Screen
        name="SecondPage"
        component={SecondPage}
        options={{
          tabBarLabel: 'Setting',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons
          //       name="settings"
          //       color={color}
          //       size={size}
          //     />
          // ),
        }} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Settings"
        screenOptions={{
          headerStyle: { backgroundColor: '#633689' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <Stack.Screen
          name="TabStack"
          component={TabStack}
          options={{ title: 'Shivendra Das' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
