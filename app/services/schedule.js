import {authRequest} from '../config/request';
import withLogCatch from '../utils/withLogCatch';
import moment from 'moment';

export const getUpcomingSchedule = async (page, perPage) => {
  const endPoint = 'booking/list/student';

  const [res, err] = await withLogCatch(
    authRequest.get(`${endPoint}`, {
      params: {
        page,
        perPage,
        dateTimeGte: moment().subtract(30, 'minutes').valueOf(),
        orderBy: 'meeting',
        sortBy: 'asc',
      },
    }),
  );
  return res.data.data;
};

export const getTotalLearnedTime = async () => {
  const endPoint = 'call/total';

  const [res, err] = await withLogCatch(authRequest.get(`${endPoint}`));

  return res.data.total;
};
