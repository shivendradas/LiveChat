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

//import SecondPage from '../../pages/SecondPage';
import HomeTab from './HomeTab';
import ChatTab from './ChatTab';
import EventTab from './EventTab';
import { connect } from 'react-redux';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function TabStack() {
    return (
        //By default shifting value is true, so if tab is more than 3 than label hide
        <Tab.Navigator shifting={false}
            initialRouteName="ChatTab"
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
                }
            }}>
            {
                //For this home tab is hidden
             /*   
            <Tab.Screen

                name="HomeTab"
                component={HomeTab}
                options={{
                    tabBarLabel: 'Home',
                    // tabBarIcon: ({ color, size }) => (
                    //   <MaterialCommunityIcons
                    //     name="home"
                    //     color={color}
                    //     size={size}
                    //   />
                    // ),
                }} />
                */
            }
            <Tab.Screen
                name="ChatTab"
                component={ChatTab}
                options={{
                    tabBarLabel: 'Chat',
                    // tabBarIcon: ({ color, size }) => (
                    //   <MaterialCommunityIcons
                    //       name="home"
                    //       color={color}
                    //       size={size}
                    //     />
                    // ),
                }} />
            <Tab.Screen

                name="EventTab"
                component={EventTab}
                options={{
                    tabBarLabel: 'Event',
                    // tabBarIcon: ({ color, size }) => (
                    //   <MaterialCommunityIcons
                    //       name="Event"
                    //       color={color}
                    //       size={size}
                    //     />
                    // ),
                }} />
        </Tab.Navigator>
    );
}

function MainTab(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="ChatTab"
                screenOptions={{
                    headerStyle: { backgroundColor: '#633689' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' }
                }}>
                <Stack.Screen
                    name="TabStack"
                    component={TabStack}
                    options={{ title: props.userName }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName
    }
};
export default connect(mapStateToProps, null)(MainTab);
