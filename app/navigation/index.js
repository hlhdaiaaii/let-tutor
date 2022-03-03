import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import {useStore} from '../store';
import {NavConfig} from './config';
import {BaseColor, BaseStyle, useDarkMode, useTheme} from '../config';
import {Icon} from '../components';
import {useTranslation} from 'react-i18next';
import {
  Schedule,
  Login,
  SignUp,
  Home,
  ChangePassword,
  AccountEdit,
  Account,
  Courses,
  ForgotPassword,
} from '../screens';

const Root = createStackNavigator();
const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={NavConfig.Screens.Login} component={Login} />
      <AuthStack.Screen
        name={NavConfig.Screens.ForgotPassword}
        component={ForgotPassword}
      />
      <AuthStack.Screen name={NavConfig.Screens.SignUp} component={SignUp} />
    </AuthStack.Navigator>
  );
};

const MainTabNavigator = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();

  return (
    <MainTab.Navigator
      initialRouteName={NavConfig.Screens.Home}
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
        activeTintColor: colors.primary,
        inactiveTintColor: BaseColor.grayColor,
        style: BaseStyle.tabBar,
        labelStyle: {
          fontSize: 12,
        },
      }}
      screenOptions={{headerShown: false}}>
      <MainTab.Screen
        name={NavConfig.Screens.Home}
        component={Home}
        options={{
          title: t('home'),
          tabBarIcon: ({color}) => (
            <Icon name="home" size={20} solid color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name={NavConfig.Screens.Schedule}
        component={Schedule}
        options={{
          title: t('schedule'),
          tabBarIcon: ({color}) => (
            <Icon name="calendar" size={20} solid color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name={NavConfig.Screens.Courses}
        component={Courses}
        options={{
          title: t('courses'),
          tabBarIcon: ({color}) => (
            <Icon name="book-open" size={20} solid color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name={NavConfig.Screens.Account}
        component={Account}
        options={{
          title: t('account'),
          tabBarIcon: ({color}) => (
            <Icon name="user-circle" size={20} solid color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

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

      <Root.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
        }}>
        {/* <Stack.Screen name={NavConfig.Stacks.Auth} component={AuthNavigator} /> */}
        {!isLoggedIn ? (
          <Root.Screen name={NavConfig.Stacks.Auth} component={AuthNavigator} />
        ) : (
          <>
            <Root.Screen
              name={NavConfig.Stacks.Main}
              component={MainTabNavigator}
            />
            <Root.Screen
              name={NavConfig.Screens.AccountEdit}
              component={AccountEdit}
            />
            <Root.Screen
              name={NavConfig.Screens.ChangePassword}
              component={ChangePassword}
            />
          </>
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
};
