import _ from 'lodash';
import moment from 'moment';

export const processTutorSchedule = data => {
  const now = Date.now();

  const schedules = data.flatMap(schedule => [
    ...schedule.scheduleDetails.filter(e => e.startPeriodTimestamp > now),
  ]);
  // console.log('schedules');
  // console.log(schedules);

  //   schedules.sort((a, b) => {
  //     const time1 = moment(a.startPeriodTimestamp);
  //     const time2 = moment(b.startPeriodTimestamp);

  //     return time1.hours() - time2.hours();
  //   });

  schedules.sort((a, b) => a.startPeriodTimestamp - b.startPeriodTimestamp);
  // console.log('sorted schedules');
  // console.log(schedules);

  const firstTime = schedules.reduce((acc, schedule) => {
    if (!acc) return schedule;
    const accTime = moment(acc.startPeriodTimestamp);
    const scheduleTime = moment(schedule.startPeriodTimestamp);

    return scheduleTime.hours() < accTime.hours() ? schedule : acc;
  });
  const lastTime = schedules.reduce((acc, schedule) => {
    if (!acc) return schedule;
    const accTime = moment(acc.startPeriodTimestamp);
    const scheduleTime = moment(schedule.startPeriodTimestamp);

    return scheduleTime.hours() > accTime.hours() ? schedule : acc;
  });

  const result = {
    firstTime: moment(firstTime.startPeriodTimestamp),
    lastTime: moment(lastTime.startPeriodTimestamp),
    schedules,
  };

  return result;
};

export const generateBookingCellData = (data, page) => {
  const today = moment();
  //   let n = 7;
  //   if (page > 1) n = 8;

  const days = [];
  for (let i = 0; i < 7; i++) {
    const tmp = today
      .clone()
      .add(7 * (page - 1), 'days')
      .add(i, 'days');
    days.push(tmp);
  }

  const cellData = [];
  data.titles.forEach(t => {
    const row = [];
    const time = moment(t.substring(0, 5), 'HH:mm');

    days.forEach(d => {
      row.push({
        key: t,
        startPeriodTimestamp: moment(
          `${d.format('YYYY-MM-DD')} ${time.format('HH:mm')}`,
          'YYYY-MM-DD HH:mm',
        ).valueOf(),
      });
    });
    cellData.push(row);
  });

  return cellData;
};

export const getTitlesAndHeads = (
  schedules = [],
  firstTime = moment(),
  lastTime = moment(),
  page = 1,
) => {
  const today = moment();
  let period = 6;
  if (page > 1) period = 7;

  //   const todayStartTimeSlot = schedules.reduce((acc, schedule) => {
  //     if (!acc) return schedule;
  //     const accTime = moment(acc.startPeriodTimestamp);
  //     const scheduleTime = moment(schedule.startPeriodTimestamp);

  //     return scheduleTime.hours() < accTime.hours() ? schedule : acc;
  //   });
  //   console.log('todayStartTimeSlot');
  //   console.log(todayStartTimeSlot);

  //   const todayEndTimeSlot = schedules.reduce((acc, schedule) => {
  //     if (!acc) return schedule;

  //     const accTime = moment(acc.startPeriodTimestamp);
  //     const scheduleTime = moment(schedule.startPeriodTimestamp);
  //     if (!scheduleTime.isSame(today, 'date')) return acc;

  //     return scheduleTime.hours() > accTime.hours() ? schedule : acc;
  //   });

  //   console.log('todayEndTimeSlot');
  //   console.log(todayEndTimeSlot);

  console.log(firstTime);
  console.log(lastTime);

  const timeSlotsInPageRange = schedules.filter(s => {
    return (
      moment(s.startPeriodTimestamp).isSameOrAfter(
        today.clone().add((page - 1) * period, 'days'),
        'date',
      ) &&
      moment(s.startPeriodTimestamp).isSameOrBefore(
        today.clone().add(page * period, 'days'),
        'date',
      )
    );
  });

  console.log('timeSlotsInPageRange');
  console.log(timeSlotsInPageRange);

  // group
  const titles = [];

  const tmp = firstTime.clone();
  while (tmp.format('HH:mm') !== lastTime.format('HH:mm')) {
    titles.push(
      `${tmp.format('HH:mm')} - ${tmp
        .clone()
        .add(25, 'minutes')
        .format('HH:mm')}`,
    );
    tmp.add(30, 'minutes');
  }
  titles.push(
    `${lastTime.format('HH:mm')} - ${lastTime
      .clone()
      .add(25, 'minutes')
      .format('HH:mm')}`,
  );

  // console.log('titles');
  // console.log(titles);

  // heads
  const heads = [];
  for (let i = 0; i < 7; i++) {
    const tmp = today
      .clone()
      .add(7 * (page - 1), 'days')
      .add(i, 'days');
    heads.push(`${tmp.format('DD/MM')}\n${tmp.format('ddd')}`);
  }
  // console.log('heads');
  // console.log(heads);

  // timeslots
  const timeSlots = _.groupBy(timeSlotsInPageRange, e => {
    return `${moment(e.startPeriodTimestamp).format('HH:mm')} - ${moment(
      e.startPeriodTimestamp,
    )
      .add(25, 'minutes')
      .format('HH:mm')}`;
  });

  // console.log('timeSlots');
  // console.log(timeSlots);
  return {
    titles,
    heads,
    timeSlots,
  };
};

export const checkAfter2Hours = timestamp => {
  const now = moment();
  const time = moment(timestamp);

  return time.isAfter(now.add(2, 'hours'));
};
