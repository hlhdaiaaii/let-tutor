export const createAuthSlice = set => ({
  isLoggedIn: false,
  userId: 10,
  setIsLoggedIn: isLoggedIn => {
    set(state => ({...state, isLoggedIn}));
  },
});
