import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';
import ResetPassword from '../screens/ResetPassword';
// import Home from '../screens/Home';
// import ForgotPassword from '../screens/ForgotPassword';
import {StatusBar} from 'react-native';
import {useStore} from '../store';
import {NavConfig} from './config';
import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';
import {useDarkMode} from '../config';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainStack = createBottomTabNavigator();

const AuthNavigator = () => {
  // const isLoggedIn = useStore(state => state.isLoggedIn);

  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={NavConfig.Screens.Login} component={Login} />
      <AuthStack.Screen
        name={NavConfig.Screens.ForgotPassword}
        component={ResetPassword}
      />
      <AuthStack.Screen
        name={NavConfig.Screens.SignUp}
        component={SignUp}
      />
    </AuthStack.Navigator>
  );
};

// const MainNavigator = () => (
//   <MainStack.Navigator screenOptions={{headerShown: false}}>
//     <MainStack.Screen name="Home" component={Home} />
//   </MainStack.Navigator>
// );

export const Navigator = () => {
  const isLoggedIn = useStore(state => state.isLoggedIn);
  const isDarkMode = useDarkMode();  

  useEffect(() => {
    // Config status bar
    if (Platform.OS == 'android') {
      StatusBar.setBackgroundColor(isDarkMode ? 'black' : 'white', true);
    }
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true);
  }, [isDarkMode]);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />

      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={NavConfig.Stacks.Auth} component={AuthNavigator} />
        {/* {!isLoggedIn ? (
          <Stack.Screen
            name={NavConfig.Stacks.Auth}
            component={AuthNavigator}
          />
        ) : (
          <Stack.Screen
            name={NavConfig.Stacks.Main}
            component={MainNavigator}
          />
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
