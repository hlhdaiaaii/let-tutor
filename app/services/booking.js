import {authRequest} from '../config/request';
import withLogCatch from '../utils/withLogCatch';

export const editBookingRequest = async (studentRequest, bookingId) => {
  const endPoint = 'booking/student-request';

  const [res, err] = await withLogCatch(
    authRequest.post(`${endPoint}/${bookingId}`),
  );

  return res.data;
};

export const getUserBalance = async () => {
  const endPoint = 'user/info';

  const [res, err] = await withLogCatch(authRequest.get(`${endPoint}`));

  if (err) return null;

  const {amount} = res.data.user.walletInfo;

  return amount / 100000;
};

export const bookLesson = async (scheduleDetailIds, note) => {
  const endPoint = 'booking';

  const [res, err] = await withLogCatch(
    authRequest.post(`${endPoint}`, {scheduleDetailIds, note}),
  );

  return res.data;
};

export const cancelLesson = async scheduleDetailIds => {
  const endPoint = 'booking';

  const [res, err] = await withLogCatch(
    authRequest.delete(`${endPoint}`, {data: {scheduleDetailIds}}),
  );

  return res.data;
};
