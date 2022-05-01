import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {
  Button,
  Header,
  Icon,
  Image,
  Tag,
  Text,
  Loading,
} from '../../components';
import {BaseStyle, useTheme} from '../../config';
import {NavConfig} from '../../navigation/config';
import {cancelLesson} from '../../services/booking';
import {
  getTotalLearnedTime,
  getUpcomingSchedule,
} from '../../services/schedule';
import {checkAfter2Hours} from '../../utils/booking';

const Upcoming = ({item, navigation, refetchCb}) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const tutorInfo = item.scheduleDetailInfo.scheduleInfo.tutorInfo;
  const scheduleInfo = item.scheduleDetailInfo.scheduleInfo;
  const endTime = moment(item.scheduleDetailInfo.endPeriodTimestamp);
  const startTime = moment(item.scheduleDetailInfo.startPeriodTimestamp);
  // const date = new Date(scheduleInfo.date);

  console.log('scheduleInfo', scheduleInfo);

  const goToMeeting = () => {
    navigation.navigate(NavConfig.Screens.Meeting, {
      data: item,
    });
  };
  const cancel = async () => {
    const id = [item.scheduleDetailInfo.id];
    const res = await cancelLesson(id);
    if (res) refetchCb();
  };
  const cancelClass = async () => {
    if (!checkAfter2Hours(startTime.valueOf())) {
      Toast.show({
        type: 'warning',
        text1: 'Cancel',
        text2: 'You can only cancel the lessons 2h before it starts.',
      });
      return;
    }
    Alert.alert(
      'Are you sure to cancel this lesson?',
      'This action cannot be undone and you will not be refunded.',
      [
        {
          text: 'Yes',
          onPress: () => cancel(),
          style: 'destructive',
        },
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <View style={{marginHorizontal: 2}}>
      <View style={{flexDirection: 'row'}}>
        <Image source={{uri: tutorInfo.avatar}} style={styles.img} />
        <View style={{flex: 1, margin: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              {tutorInfo.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 15, fontWeight: '500', marginEnd: 10}}>
              {startTime.format('DD/MM/YYYY')}
            </Text>
            <Tag outline rateSmall>
              {startTime.format('HH:mm')}
            </Tag>
            <Text bold> - </Text>
            <Tag outline rateSmall>
              {endTime.format('HH:mm')}
            </Tag>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginVertical: 5,
          justifyContent: 'center',
        }}>
        <Button
          round
          onPress={cancelClass}
          style={{minWidth: 150, backgroundColor: colors.accent}}>
          {t('cancel')}
        </Button>
        <Button round onPress={goToMeeting} style={{minWidth: 150}}>
          {t('go_to_meeting')}
        </Button>
      </View>
    </View>
  );
};

const Schedule = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const [schedule, setSchedule] = useState([]);
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const perPage = 5;
  const totalCount = useRef(0);
  const [totalLearnedTime, setTotalLearnedTime] = useState(0);

  useEffect(() => {
    const fetchTotalLearnedTime = async () => {
      const data = await getTotalLearnedTime();

      setTotalLearnedTime(data);
    };

    fetchTotalLearnedTime();
  }, []);

  // const maxPage = Math.ceil(count / perPage);
  const fetchSchedule = async () => {
    const data = await getUpcomingSchedule(page, perPage);

    console.log('schedule', data);
    if (page === 1) setSchedule(data.rows);
    else setSchedule(prev => [...prev, ...data.rows]);
    totalCount.current = data.count;
    if (perPage * page >= totalCount.current) {
      setCanLoadMore(false);
    }
  };
  useEffect(() => {
    console.log('canLoadMore', canLoadMore);
    if (canLoadMore) fetchSchedule();
  }, [page, canLoadMore]);

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {flex: 1}]}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('schedule')}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.text}
              enableRTL={true}
            />
          );
        }}
        renderRight={() => {
          return (
            <Icon
              name="history"
              size={20}
              color={colors.text}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate(NavConfig.Screens.ClassHistory);
        }}
      />
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text headline primaryColor>
            {`${t('total_learned_time')}: ${Math.floor(
              totalLearnedTime / 60,
            )} ${t('hours')} ${totalLearnedTime % 60} ${t('minutes')}`}
          </Text>
          {!schedule[0] ? null : (
            <>
              <Text title3 grayColor>
                {t('upcoming_lesson')}
              </Text>
              <Upcoming
                item={schedule[0]}
                navigation={navigation}
                refetchCb={() => {
                  setPage(1);
                  fetchSchedule();
                }}
              />
            </>
          )}
        </View>

        <FlatList
          ListFooterComponent={canLoadMore ? Loading : null}
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            if (canLoadMore) setPage(prev => prev + 1);
          }}
          keyExtractor={item => item.id.toString()}
          refreshing={false}
          onRefresh={() => {
            setPage(1);
          }}
          showsVerticalScrollIndicator={false}
          contentInset={{top: 50}}
          contentContainerStyle={{
            marginTop: Platform.OS == 'android' ? 20 : 0,
            paddingHorizontal: 20,
            paddingBottom: 30,
          }}
          scrollEventThrottle={1}
          data={schedule.slice(1)}
          renderItem={({item, index}) => (
            <Upcoming
              item={item}
              navigation={navigation}
              refetchCb={() => {
                setPage(1);
                fetchSchedule();
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 60,
    height: 60,
    // resizeMode: 'contant',
    borderRadius: 10,
    margin: 5,
  },
  countryContainer: {
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    margin: 4,
    padding: 0,
    paddingHorizontal: 5,
  },
  imp: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Schedule;
