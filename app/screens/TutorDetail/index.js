import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {
  BookingModal,
  Button,
  Header,
  Icon,
  Image,
  SafeAreaView,
  Tag,
  Text,
} from '../../components';
import Review from '../../components/Review';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import {getTutorInfo, getTutorSchedule} from '../../services/tutor';
import {useStore} from '../../store';
import styles from './styles';

// const tutor = {
//   id: '1',
//   name: 'Alicia Mave',
//   nation: 'Canada',
//   role: 'English Tutor',
//   avatar: require('../../assets/images/profile-5.jpg'),
//   specialties: ['KET', 'PET', 'IELTS', 'Business English'],
//   description:
//     'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
// };

// const reviews = [
//   {
//     id: 1,
//     name: 'Emma Stone',
//     review:
//       'Lorem velit enim adipisicing excepteur enim occaecat culpa anim. Velit sint dolore culpa consectetur. Est cillum ea sunt do sint sint duis duis non enim ex nostrud pariatur. Qui deserunt ex incididunt pariatur laboris. Do amet nostrud anim officia sint reprehenderit incididunt tempor consequat occaecat irure duis Lorem.',
//     rate: 4,
//     createdAt: '2022-05-05',
//     avatar: require('../../assets/images/profile-4.jpg'),
//   },
//   {
//     id: 2,
//     name: 'Emma Stone',
//     review:
//       'Lorem velit enim adipisicing excepteur enim occaecat culpa anim. Velit sint dolore culpa consectetur. Est cillum ea sunt do sint sint duis duis non enim ex nostrud pariatur. Qui deserunt ex incididunt pariatur laboris. Do amet nostrud anim officia sint reprehenderit incididunt tempor consequat occaecat irure duis Lorem.',
//     rate: 4,
//     createdAt: '2022-05-05',
//     avatar: require('../../assets/images/profile-4.jpg'),
//   },
//   {
//     id: 3,
//     name: 'Emma Stone',
//     review:
//       'Lorem velit enim adipisicing excepteur enim occaecat culpa anim. Velit sint dolore culpa consectetur. Est cillum ea sunt do sint sint duis duis non enim ex nostrud pariatur. Qui deserunt ex incididunt pariatur laboris. Do amet nostrud anim officia sint reprehenderit incididunt tempor consequat occaecat irure duis Lorem.',
//     rate: 4,
//     createdAt: '2022-05-05',
//     avatar: require('../../assets/images/profile-4.jpg'),
//   },
//   {
//     id: 4,
//     name: 'Emma Stone',
//     review:
//       'Lorem velit enim adipisicing excepteur enim occaecat culpa anim. Velit sint dolore culpa consectetur. Est cillum ea sunt do sint sint duis duis non enim ex nostrud pariatur. Qui deserunt ex incididunt pariatur laboris. Do amet nostrud anim officia sint reprehenderit incididunt tempor consequat occaecat irure duis Lorem.',
//     rate: 4,
//     createdAt: '2022-05-05',
//     avatar: require('../../assets/images/profile-4.jpg'),
//   },
// ];

const TutorDetail = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {
    params: {id: tutorId},
  } = useRoute();
  const [tutor, setTutor] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const topics = useStore(state => state.topics);

  useEffect(() => {
    const fetchTutorDetail = async () => {
      const data = await getTutorInfo(tutorId);

      console.log('data');
      console.log(data);

      setTutor(data);
    };

    console.log('tutorId: ', tutorId);
    fetchTutorDetail();
  }, []);

  useEffect(() => {
    if (tutor) {
      console.log('tutor');
      console.log(tutor);
      const fetchTutorSchedules = async () => {
        const data = await getTutorSchedule(tutor.id);
      };

      fetchTutorSchedules();
    }
  }, [tutor]);

  const onFavoriteClick = () => {};

  const onBookingClick = () => setBookingModalVisible(true);

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {flex: 1}]}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('tutor')}
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

      {!tutor ? null : (
        <View style={{flex: 1}}>
          <FlatList
            contentContainerStyle={{padding: 20}}
            refreshControl={
              <RefreshControl
                colors={[colors.primary]}
                tintColor={colors.primary}
                refreshing={false}
                onRefresh={() => {}}
              />
            }
            data={tutor.reviews}
            keyExtractor={(item, index) => item.id}
            ListHeaderComponent={() => (
              <View style={{marginBottom: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{
                      uri: tutor.avatar,
                    }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 30,
                      marginRight: 20,
                    }}
                  />
                  <View>
                    <Text title3 bold numberOfLines={1}>
                      {tutor.name}
                    </Text>
                    <Text caption1 light accentColor numberOfLines={1}>
                      {tutor.role}
                    </Text>
                    <Text subhead thin grayColor numberOfLines={1}>
                      {tutor.country}
                    </Text>
                    <AirbnbRating
                      count={5}
                      defaultRating={5}
                      size={20}
                      showRating={false}
                      isDisabled
                    />
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.heartFavorite,
                      {
                        backgroundColor: isFavorite
                          ? BaseColor.whiteColor
                          : colors.primaryLight,
                        // backgroundColor: colors.primaryLight,
                        borderColor: 'black',
                      },
                    ]}
                    onPress={() => {
                      onFavoriteClick(isFavorite);
                      setIsFavorite(!isFavorite);
                    }}>
                    <Icon
                      solid
                      name="heart"
                      size={isFavorite ? 25 : 20}
                      color={
                        isFavorite ? colors.primaryLight : BaseColor.whiteColor
                      }
                    />
                  </TouchableOpacity>
                </View>
                <Button
                  full
                  round
                  style={{marginTop: 10, height: 50}}
                  onPress={onBookingClick}>
                  {t('book_now')}
                </Button>
                <View style={{marginTop: 20}}>
                  <Text title2 primaryColor>
                    {t('experience')}
                  </Text>
                  <Text body2 regular style={{marginTop: 10}}>
                    {tutor.experience}
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <Text title2 primaryColor>
                    {t('specialties')}
                  </Text>
                  <FlatList
                    contentContainerStyle={{marginTop: 10}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={tutor.specialties.map(e =>
                      topics.find(o => o.key === e),
                    )}
                    keyExtractor={(item, index) => item.key}
                    renderItem={({item, index}) => (
                      <Tag
                        outline
                        style={{
                          // backgroundColor: BaseColor.whiteColor,
                          marginRight: 8,
                          height: 28,
                        }}>
                        {item.name}
                      </Tag>
                    )}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <View>
                    <Text title2 primaryColor>
                      {t('reviews')}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="plus-circle" size={14} color={colors.accent} />
                    <Text body1 style={{paddingHorizontal: 4}} accentColor>
                      {t('write_a_review')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            renderItem={({item}) => (
              <Review
                style={{
                  borderBottomWidth: 0.5,
                  borderColor: BaseColor.dividerColor,
                }}
                image={{uri: item.avatar}}
                name={item.name}
                rate={item.rating}
                date={moment(item.createdAt).format('YYYY-MM-DD')}
                content={item.content}
              />
            )}
          />
        </View>
      )}
      <BookingModal
        isVisible={bookingModalVisible}
        onSwipeComplete={() => setBookingModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default TutorDetail;
