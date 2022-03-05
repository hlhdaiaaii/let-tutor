import {
  Header,
  Icon,
  SafeAreaView,
  Tag,
  Text,
  Image,
  Button,
  ScheduleSlot,
} from '../../components';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View, FlatList, RefreshControl} from 'react-native';
import styles from './styles';
import Review from '../../components/Review';

const schedules = [
  {
    id: 1,
    from: '08:00',
    to: '10:00',
    tutor: {
      avatar: require('../../assets/images/profile-1.jpg'),
      id: 1,
      name: 'Steve Rogger',
    },
  },
  {
    id: 2,
    from: '08:00',
    to: '10:00',
    tutor: {
      avatar: require('../../assets/images/profile-1.jpg'),
      id: 1,
      name: 'Steve Rogger',
    },
  },
  {
    id: 3,
    from: '08:00',
    to: '10:00',
    tutor: {
      avatar: require('../../assets/images/profile-1.jpg'),
      id: 1,
      name: 'Steve Rogger',
    },
  },
  {
    id: 4,
    from: '08:00',
    to: '10:00',
    tutor: {
      avatar: require('../../assets/images/profile-1.jpg'),
      id: 1,
      name: 'Steve Rogger',
    },
  },
  {
    id: 5,
    from: '08:00',
    to: '10:00',
    tutor: {
      avatar: require('../../assets/images/profile-1.jpg'),
      id: 1,
      name: 'Steve Rogger',
    },
  },
  {
    id: 6,
    from: '08:00',
    to: '10:00',
    tutor: {
      avatar: require('../../assets/images/profile-1.jpg'),
      id: 1,
      name: 'Steve Rogger',
    },
  },
  {
    id: 7,
    from: '08:00',
    to: '10:00',
    tutor: {
      avatar: require('../../assets/images/profile-1.jpg'),
      id: 1,
      name: 'Steve Rogger',
    },
  },
];

const Schedule = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

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
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <View style={{flex: 1}}>
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                width: '100%',
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text title2 primaryColor>
                {`${t('total_learned_time')}: 84h`}
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 20}}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={false}
              onRefresh={() => {}}
            />
          }
          data={schedules}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => (
            <ScheduleSlot
              tutorName={item.tutor.name}
              from={item.from}
              to={item.to}
              avatar={item.tutor.avatar}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Schedule;
