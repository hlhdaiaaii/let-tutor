export const createApplicationSlice = set => ({
  language: 'en',
  setLanguage: language => set(state => ({...state, language})),
  setTheme: theme => set(state => ({...state, theme})),
  theme: 'orange',
  font: null,
  topics: [],
  setTopics: topics => {
    set(state => ({...state, topics}));
  },
});
