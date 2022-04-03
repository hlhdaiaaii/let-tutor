import {request} from '../config/request';
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

  console.log('res');
  console.log(res);

  return res.data.tokens;
};

export async function getUserInfo(accessToken) {
  const endPoint = 'user/info';

  const [res, err] = await withLogCatch(
    request.get(`${endPoint}`, {
      headers: {Authorization: 'Bearer ' + accessToken},
    }),
  );

  if (err) return null;

  const {id, email, name, avatar, country, phone, language, birthday} =
    res.data.user;

  return {id, email, name, avatar, country, phone, language, birthday};
}
