import {levelFilter} from '../config/constant';
import {authRequest} from '../config/request';
import withLogCatch from '../utils/withLogCatch';

export const getCourses = async ({page, size, q, categoryId}) => {
  const endPoint = 'course';

  console.log(page, size, q, categoryId);

  const params = {page, size, q};
  if (categoryId) {
    params.categoryId = categoryId;
  }

  const [res, err] = await withLogCatch(
    authRequest.get(`${endPoint}`, {
      params,
    }),
  );

  console.log('courses', res.data.data);

  return res.data.data;
};

export const getCourseCates = async () => {
  const endPoint = 'content-category';

  const [res, err] = await withLogCatch(authRequest.get(`${endPoint}`));

  return [{key: '', title: 'Recommended'}, ...res.data.rows];
};

export const getLevelTitle = id => {
  if (id == 0) return 'Any Level';
  const result = levelFilter.find(item => item.id == id);
  if (result != undefined) return result.label;
  return 'Any Level';
};

export const getListTag = listTag => {
  const result = [];
  listTag.forEach(item => result.push(item.title));
  return result;
};
