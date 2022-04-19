import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar} from 'react-native';
import {Icon} from '../components';
import {BaseColor, BaseStyle, useTheme} from '../config';
import {authRequest} from '../config/request';
import {
  Account,
  // AccountEdit,
  ChangePassword,
  Courses,
  ForgotPassword,
  Home,
  Login,
  Schedule,
  SignUp,
} from '../screens';
import BecomeTutor1 from '../screens/BecomeTutor/step1';
import BecomeTutor2 from '../screens/BecomeTutor/step2';
import BecomeTutor3 from '../screens/BecomeTutor/step3';
import Booking from '../screens/Booking';
import ChangeTheme from '../screens/ChangeTheme';
import ChangeLanguage from '../screens/ChangeLanguage';
import CourseDetail from '../screens/CourseDetail';
import {ReportTutor} from '../screens/ReportTutor';
import TutorDetail from '../screens/TutorDetail';
import {getUserInfo, refreshToken} from '../services/auth';
import {useStore} from '../store';
import {NavConfig} from './config';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {colors} = useTheme();
  const tokens = useStore(state => state.tokens);
  const setTokens = useStore(state => state.setTokens);
  const setUserInfo = useStore(state => state.setUserInfo);
  const language = useStore(state => state.language);
  const {i18n} = useTranslation();

  console.log('tokens: ', tokens);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    const checkToken = async () => {
      // const myTokens = tokens;

      if (tokens) {
        console.log('verify tokens');
        // verify token
        // if expired
        const userInfo = await getUserInfo(tokens.access.token);
        // const isValidToken = await getUserInfo('mockAccessToken');
        console.log('userInfo');
        console.log(userInfo);

        if (!userInfo) {
          console.log('!isValidToken');
          console.log(tokens);
          if (moment(Date.now()).isBefore(moment(tokens.refresh.expires))) {
            console.log('VALID REFRESH TOKEN, refresh token');
            console.log(tokens);
            const newTokens = await refreshToken(tokens.refresh.token);

            setIsLoggedIn(true);
            setTokens(newTokens);
            setUserInfo(userInfo);

            authRequest.defaults.headers.common['Authorization'] =
              'Bearer ' + newTokens.access.token;
          }
        } else {
          console.log('VALID TOKEN');
          setUserInfo(userInfo);
          setIsLoggedIn(true);

          authRequest.defaults.headers.common['Authorization'] =
            'Bearer ' + tokens.access.token;
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkToken();
  }, [tokens]);

  useEffect(() => {
    // Config status bar
    if (Platform.OS == 'android') {
      StatusBar.setBackgroundColor(colors.primary, true);
    }
    StatusBar.setBarStyle('light-content', true);
  }, [colors]);

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
            {/* <Root.Screen
              name={NavConfig.Screens.AccountEdit}
              component={AccountEdit}
            /> */}
            <Root.Screen
              name={NavConfig.Screens.ChangePassword}
              component={ChangePassword}
            />
            <Root.Screen
              name={NavConfig.Screens.ChangeTheme}
              component={ChangeTheme}
            />
            <Root.Screen
              name={NavConfig.Screens.ChangeLanguage}
              component={ChangeLanguage}
            />
            <Root.Screen
              name={NavConfig.Screens.TutorDetail}
              component={TutorDetail}
            />
            <Root.Screen
              name={NavConfig.Screens.CourseDetail}
              component={CourseDetail}
            />
            <Root.Screen name={NavConfig.Screens.Booking} component={Booking} />
            <Root.Screen
              name={NavConfig.Screens.ReportTutor}
              component={ReportTutor}
            />
            <Root.Screen
              name={NavConfig.Screens.BecomeTutor1}
              component={BecomeTutor1}
            />
            <Root.Screen
              name={NavConfig.Screens.BecomeTutor2}
              component={BecomeTutor2}
            />
            <Root.Screen
              name={NavConfig.Screens.BecomeTutor3}
              component={BecomeTutor3}
            />
          </>
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
};
