import {authRequest} from '../config/request';
import withLogCatch from '../utils/withLogCatch';

export const editBookingRequest = (studentRequest, bookingId) => {
  const endPoint = 'booking/student-request';

  const [res, err] = await withLogCatch(authRequest.post(`${endPoint}/${bookingId}`));

  return res;
};
