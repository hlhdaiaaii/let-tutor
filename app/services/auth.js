import {authRequest, request} from '../config/request';
import withLogCatch from '../utils/withLogCatch';

export const login = async (email, password) => {
  const endPoint = 'auth/login';

  const [res, err] = await withLogCatch(
    request.post(`${endPoint}`, {email, password}),
  );

  return res.data.tokens;
};

export const refreshToken = async refreshToken => {
  const endPoint = 'auth/refresh-token';

  const [res, err] = await withLogCatch(
    request.post(`${endPoint}`, {refreshToken, timezone: 7}),
  );

  return res.data.tokens;
};

export const getUserInfo = async accessToken => {
  const endPoint = 'user/info';

  const [res, err] = await withLogCatch(
    request.get(`${endPoint}`, {
      headers: {Authorization: 'Bearer ' + accessToken},
    }),
  );

  if (err) return null;

  const {
    id,
    email,
    name,
    avatar,
    country,
    phone,
    language,
    birthday,
    tutorInfo,
    level
  } = res.data.user;

  return {
    id,
    email,
    name,
    avatar,
    country,
    phone,
    language,
    birthday,
    tutorInfo,
    level
  };
};

export const signUp = async (email, password) => {
  const endPoint = 'auth/register';

  const [res, err] = await withLogCatch(
    request.post(`${endPoint}`, {email, password}),
  );

  if (err) {
    return err.response.data;
  }
  return res.data;
};

export const forgotPassword = async email => {
  const endPoint = 'user/forgotPassword';

  const [res, err] = await withLogCatch(request.post(`${endPoint}`, {email}));

  if (err) {
    return err.response.data;
  }
  return res.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const endPoint = 'auth/change-password';

  const [res, err] = await withLogCatch(
    authRequest.post(`${endPoint}`, {password: currentPassword, newPassword}),
  );

  if (err) {
    return err.response.data;
  }
  return res.data;
};
