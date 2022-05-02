import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {Header, Icon, Image, Loading, Text, Tag} from '../../components';
import {BaseStyle, useTheme} from '../../config';
import {getHistorySchedule} from '../../services/schedule';
import moment from 'moment';

const History = ({item, navigation, refetchCb}) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const tutorInfo = item.scheduleDetailInfo.scheduleInfo.tutorInfo;
  const scheduleInfo = item.scheduleDetailInfo.scheduleInfo;
  const endTime = moment(item.scheduleDetailInfo.endPeriodTimestamp);
  const startTime = moment(item.scheduleDetailInfo.startPeriodTimestamp);
  // const date = new Date(scheduleInfo.date);

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
    </View>
  );
};

const ClassHistory = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const perPage = 5;
  const totalCount = useRef(0);

  const fetchHistory = async () => {
    const data = await getHistorySchedule(page, perPage);

    console.log('history', data);
    if (page === 1) setHistory(data.rows);
    else setHistory(prev => [...prev, ...data.rows]);
    totalCount.current = data.count;
    if (perPage * page >= totalCount.current) {
      setCanLoadMore(false);
    }
  };

  useEffect(() => {
    if (canLoadMore) fetchHistory();
  }, [page, canLoadMore]);

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {flex: 1}]}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('History')}
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
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{flex: 1}}>
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
          data={history}
          renderItem={({item, index}) => (
            <History
              item={item}
              navigation={navigation}
              refetchCb={() => {
                setPage(1);
                fetchHistory();
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

export default ClassHistory;
