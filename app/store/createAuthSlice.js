export const createAuthSlice = set => ({
  isLoggedIn: false,
  userInfo: null,
  setUserInfo: info => {
    set(state => ({...state, userInfo: info}))
  },
  // tokens: {
  //   access: {
  //     expires: '2022-03-25T06:55:42.403Z',
  //     token:
  //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjgiLCJpYXQiOjE2NDgxMDQ5NDIsImV4cCI6MTY0ODE5MTM0MiwidHlwZSI6ImFjY2VzcyJ9.YjXEdqQvM_nFiPH8NRThrEqIao3kxN_IpCH32dm5z1U',
  //   },
  //   refresh: {
  //     expires: '2022-05-01T03:14:52.651Z',
  //     token:
  //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjgiLCJpYXQiOjE2NDg3ODI4OTIsImV4cCI6MTY1MTM3NDg5MiwidHlwZSI6InJlZnJlc2gifQ.AeXSGBg8-lzEfXJPJRNq-i2qWCc90gJiMNwqExNg4GA',
  //   },
  // },
  tokens: null,
  setIsLoggedIn: isLoggedIn => {
    set(state => ({...state, isLoggedIn}));
  },
  setTokens: tokens => {
    set(state => ({...state, tokens}));
  },
});
