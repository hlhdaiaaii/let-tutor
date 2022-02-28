import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import React from 'react';
import {QueryClientProvider, QueryClient} from 'react-query';
import {Navigator} from './navigation';

const RNQueryClient = new QueryClient();
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
    <QueryClientProvider client={RNQueryClient}>
      <Navigator />
    </QueryClientProvider>
  );
};

export default App;
