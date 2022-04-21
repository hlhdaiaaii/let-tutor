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
    level,
    learnTopics,
    testPreparations,
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
    level,
    learnTopics,
    testPreparations,
    wantToLearnList: getWantToLearnList(learnTopics, testPreparations),
  };
};

export const updateUserInfo = async data => {
  const endPoint = 'user/info';

  console.log('updateUserInfo:', data);

  const [res, err] = await withLogCatch(authRequest.put(`${endPoint}`, data));

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
    level,
    learnTopics,
    testPreparations,
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
    level,
    learnTopics,
    testPreparations,
    wantToLearnList: getWantToLearnList(learnTopics, testPreparations),
  };
};

export function getWantToLearnList(topic, preparation) {
  const result = [];
  topic.forEach(element => {
    result.push(element.id + 8);
  });
  preparation.forEach(item => {
    result.push(item.id);
  });
  return result;
}

export function getWantToLearnObject(data) {
  const result = {
    topic: [],
    preparation: [],
  };
  for (let i = 0; i < data.length; i++) {
    if (data[i] < 9) result.preparation.push(data[i]);
    else result.topic.push(data[i] - 8);
  }
  return result;
}

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

export const updateAvatar = async avatarData => {
  const endPoint = 'user/uploadAvatar';

  let data = new FormData();

  data.append('avatar', {
    uri: avatarData.uri,
    type: avatarData.type,
    name: avatarData.fileName,
  });
  const [res, err] = await withLogCatch(
    authRequest.post(`${endPoint}`, data, {
      headers: {'Content-Type': 'multipart/form-data'},
    }),
  );

  if (err) {
    return null;
  }

  return res.data.avatar;
};
