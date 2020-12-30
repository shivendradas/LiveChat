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
    CardStyleInterpolators,
    createStackNavigator, HeaderBackButton
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
import SearchContact from '../ContactDetail/SearchContact';
import ChatConversation from '../chat/ChatCoversation';
import SelectedContact from '../ContactDetail/SelectedContact';

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
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerTitleStyle: { fontWeight: 'bold' }
                }}>
                <Stack.Screen
                    name="TabStack"
                    component={TabStack}
                    options={{ title: props.userName }}
                />
                <Stack.Screen name="SelectedContact" component={SelectedContact}
                    options={({ route }) => ({ title: props.userName })}
                />
                <Stack.Screen name="SearchContact" component={SearchContact}
                    options={({ route }) => ({ title: route.params.name })}
                />
                <Stack.Screen name="Chat" component={ChatConversation}
                    options={({ navigation, route }) => ({
                        title: route.params.name, headerLeft: (props) => (
                            <HeaderBackButton
                                {...props}
                                onPress={() => navigation.navigate('SelectedContact',{ })}
                            />
                        )
                    })}
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
