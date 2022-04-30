import {authRequest} from '../config/request';
import {processTutorSchedule} from '../utils/booking';
import withLogCatch from '../utils/withLogCatch';
import languageConverter from 'iso-language-converter';
import {isoCountry} from 'iso-country';

export const addFavoriteTutor = async tutorId => {
  const endPoint = 'user/manageFavoriteTutor';

  const [res, err] = await withLogCatch(
    authRequest.post(`${endPoint}`, {tutorId}),
  );

  return res;
};

export const sendReportTutor = async (tutorId, content) => {
  const endPoint = 'report';

  const [res, err] = await withLogCatch(
    authRequest.post(`${endPoint}`, {tutorId, content}),
  );

  return res;
};

export const getFavoriteData = async () => {
  const endPoint = 'tutor/more';

  const [res, err] = await withLogCatch(
    authRequest.get(`${endPoint}`, {
      params: {
        perPage: 1,
        page: 1,
      },
    }),
  );

  return res;
};

export const getTutorList = async (page, perPage) => {
  const endPoint = 'tutor/more';

  const [res, err] = await withLogCatch(
    authRequest.get(`${endPoint}`, {
      params: {
        page,
        perPage,
      },
    }),
  );

  const tutors = res.data.tutors.rows.map(e => {
    const rating =
      e.feedbacks.reduce((acc, e) => acc + e.rating, 0) / e.feedbacks.length;

    return {
      id: e.userId,
      name: e.name,
      specialties: e.specialties,
      rating,
      avatar: e.avatar,
      description: e.bio,
    };
  });

  return tutors;
};

export const getTutorSchedule = async tutorId => {
  const endPoint = 'schedule';

  const [res, err] = await withLogCatch(
    authRequest.post(`${endPoint}`, {tutorId}),
  );

  return processTutorSchedule(res.data.data);
};

export const searchTutor = async (filters, search, page, perPage) => {
  const endPoint = 'tutor/search';

  const [res, err] = await withLogCatch(
    authRequest.post(`${endPoint}`, {filters, search, page, perPage}),
  );

  const tutors = res.data.rows.map(e => {
    const rating =
      e.feedbacks.reduce((acc, e) => acc + e.rating, 0) / e.feedbacks.length;

    return {
      id: e.userId,
      name: e.name,
      specialties: e.specialties,
      rating,
      avatar: e.avatar,
      description: e.bio,
    };
  });

  return tutors;
};

export const getTopicList = async () => {
  const topicEndPoint = 'learn-topic';
  const testPreEndPoint = 'test-preparation';

  const [res1, err1] = await withLogCatch(authRequest.get(`${topicEndPoint}`));
  const [res2, err2] = await withLogCatch(
    authRequest.get(`${testPreEndPoint}`),
  );

  return [{id: 99, key: '', name: 'Recommended'}, ...res1.data, ...res2.data];
};

export const getTestPreList = async () => {
  const endPoint = 'test-preparation';

  const [res, err] = await withLogCatch(authRequest.get(`${endPoint}`));

  return res.data;
};

export const getTutorInfo = async tutorId => {
  const endPoint = `tutor/${tutorId}`;

  const [res, err] = await withLogCatch(authRequest.get(`${endPoint}`));

  console.log(res.data);

  return {
    id: res.data.userId,
    name: res.data.User.name,
    avatar: res.data.User.avatar,
    country: isoCountry(res.data.User.country).name,
    languages: res.data.languages
      .split(',')
      .map(lang => languageConverter(lang)),
    video: res.data.video,
    specialties: res.data.specialties.split(','),
    rating: res.data.avgRating,
    bio: res.data.bio,
    education: res.data.education,
    experience: res.data.experience,
    reviews: res.data.User.feedbacks.map(e => ({
      id: e.id,
      rating: e.rating,
      content: e.content,
      createdAt: e.createdAt,
      name: e.firstInfo.name,
      avatar: e.firstInfo.avatar,
    })),
    isFavorite: res.data.isFavorite,
  };
};

export const requestBecomeTutor = async payload => {
  const endPoint = `tutor/register`;

  const params = new FormData();
  for (var key in payload) {
    if (key == 'avatar' || key == 'video') continue;
    if (key == 'languages') {
      params.append(key, ['Vietnamese', 'English']);
      continue;
    }
    if (key == 'specialties') {
      params.append(key, 'english-for-kids,business-english');
      continue;
    }
    params.append(key, payload[key]);
  }
  const videoInfo = payload.video;
  params.append('video', {
    name: 'introVideo.mp4',
    uri: videoInfo.uri,
    type: videoInfo.type,
  });
  const imageInfo = payload.avatar;
  params.append('avatar', {
    name: imageInfo.fileName,
    uri: imageInfo.uri,
    type: imageInfo.type,
  });
  params.append('price', 5000);
  console.log(params);
  const res = await authRequest.post(endPoint, params);
  return res.data;
};
