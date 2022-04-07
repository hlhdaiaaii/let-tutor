import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import React from 'react';
import Toast from 'react-native-toast-message';
import {Navigator} from './navigation';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: require('./lang/en.json'),
    },
    vi: {
      translation: require('./lang/vi.json'),
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

const App = () => {
  // const isDark = useStore(state => state.isDarkMode);

  return (
    <>
      <Navigator />
      <Toast />
    </>
  );
};

export default App;
