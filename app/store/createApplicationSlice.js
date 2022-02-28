export const createApplicationSlice = set => ({
  isDarkMode: false,
  toggleTheme: () => {
    set(state => ({isDarkMode: !state.isDarkMode}));
  },
  setTheme: theme => set(state => ({...state, theme})),
  theme: null,
  font: null,
  force_dark: null,
});
