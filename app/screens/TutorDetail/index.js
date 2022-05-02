import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {
  BookingModal,
  Header,
  Icon,
  Image,
  Loading,
  SafeAreaView,
  Tag,
  Text,
} from '../../components';
import Review from '../../components/Review';
import {TableBooking} from '../../components/TableBooking';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import {
  addFavoriteTutor,
  getTutorInfo,
  getTutorSchedule,
} from '../../services/tutor';
import {useStore} from '../../store';
import {getTitlesAndHeads} from '../../utils/booking';
import styles from './styles';
import Video from 'react-native-video';

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
  const [schedulePage, setSchedulePage] = useState(1);
  const [tutorScheduleData, setTutorScheduleData] = useState(null);
  const [tutorScheduleShow, setTutorScheduleShow] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchTutorDetail = async () => {
      const data = await getTutorInfo(tutorId);

      console.log('tutorInfo');
      console.log(data);

      setTutor(data);
      setIsFavorite(data.isFavorite);
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
        setTutorScheduleData(data);
      };

      fetchTutorSchedules();
    }
  }, [tutor]);

  useEffect(() => {
    if (tutorScheduleData) {
      setTutorScheduleShow(
        getTitlesAndHeads(
          tutorScheduleData.schedules,
          tutorScheduleData.firstTime,
          tutorScheduleData.lastTime,
          schedulePage,
        ),
      );
    }
  }, [schedulePage, tutorScheduleData]);

  const onFavoriteClick = () => {
    setIsFavorite(true);
    addFavoriteTutor(tutor.id);
  };

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
                <View>
                  <Video
                    source={{
                      uri: tutor.video,
                    }}
                    style={{
                      width: '96%',
                      height: 200,
                      alignSelf: 'center',
                      margin: 5,
                      flex: 1,
                    }}
                    controls
                    repeat={false}
                    resizeMode={'contain'}
                  />
                </View>
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

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ReportTutor', {tutor});
                    }}
                    style={{
                      marginTop: 10,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon name="exclamation-circle" size={18} />
                    <Text>Report</Text>
                  </TouchableOpacity>
                </View>
                {/* <Button
                  full
                  round
                  style={{marginTop: 10, height: 50}}
                  onPress={onBookingClick}>
                  {t('book_now')}
                </Button> */}
                <View style={{marginTop: 20}}>
                  <Text title2 primaryColor>
                    {t('languages')}
                  </Text>
                  <Text body2 regular style={{marginTop: 10}}>
                    {tutor.languages.join(', ')}
                  </Text>
                </View>
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
                <View style={{marginTop: 20}}>
                  <Text title2 primaryColor style={{marginBottom: 10}}>
                    {t('tutor_schedule')}
                  </Text>

                  {tutorScheduleShow ? (
                    <>
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() => {
                            setSchedulePage(prev => prev - 1);
                          }}
                          disabled={schedulePage == 1}>
                          <Icon name="angle-left" size={30} />
                        </TouchableOpacity>
                        <View style={{width: 50}}></View>
                        <TouchableOpacity
                          onPress={() => {
                            console.log('press');
                            setSchedulePage(prev => prev + 1);
                          }}>
                          <Icon name="angle-right" size={30} />
                        </TouchableOpacity>
                      </View>
                      <TableBooking
                        data={tutorScheduleShow}
                        tutor={tutor}
                        page={schedulePage}
                      />
                    </>
                  ) : (
                    <View>
                      <Loading />
                    </View>
                  )}
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
