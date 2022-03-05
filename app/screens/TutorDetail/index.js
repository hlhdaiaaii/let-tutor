import {
  Comment,
  Header,
  Icon,
  SafeAreaView,
  Tag,
  Text,
  Image,
  Button,
  BookingModal,
} from '../../components';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View, FlatList, RefreshControl} from 'react-native';
import styles from './styles';
import Review from '../../components/Review';
import {AirbnbRating} from 'react-native-ratings';

const tutor = {
  id: '1',
  name: 'Alicia Mave',
  nation: 'Canada',
  role: 'English Tutor',
  avatar: require('../../assets/images/profile-5.jpg'),
  specialities: ['KET', 'PET', 'IELTS', 'Business English'],
  description:
    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
};

const reviews = [
  {
    id: 1,
    name: 'Emma Stone',
    review:
      'Lorem velit enim adipisicing excepteur enim occaecat culpa anim. Velit sint dolore culpa consectetur. Est cillum ea sunt do sint sint duis duis non enim ex nostrud pariatur. Qui deserunt ex incididunt pariatur laboris. Do amet nostrud anim officia sint reprehenderit incididunt tempor consequat occaecat irure duis Lorem.',
    rate: 4,
    createdAt: '2022-05-05',
    avatar: require('../../assets/images/profile-4.jpg'),
  },
  {
    id: 2,
    name: 'Emma Stone',
    review:
      'Lorem velit enim adipisicing excepteur enim occaecat culpa anim. Velit sint dolore culpa consectetur. Est cillum ea sunt do sint sint duis duis non enim ex nostrud pariatur. Qui deserunt ex incididunt pariatur laboris. Do amet nostrud anim officia sint reprehenderit incididunt tempor consequat occaecat irure duis Lorem.',
    rate: 4,
    createdAt: '2022-05-05',
    avatar: require('../../assets/images/profile-4.jpg'),
  },
  {
    id: 3,
    name: 'Emma Stone',
    review:
      'Lorem velit enim adipisicing excepteur enim occaecat culpa anim. Velit sint dolore culpa consectetur. Est cillum ea sunt do sint sint duis duis non enim ex nostrud pariatur. Qui deserunt ex incididunt pariatur laboris. Do amet nostrud anim officia sint reprehenderit incididunt tempor consequat occaecat irure duis Lorem.',
    rate: 4,
    createdAt: '2022-05-05',
    avatar: require('../../assets/images/profile-4.jpg'),
  },
  {
    id: 4,
    name: 'Emma Stone',
    review:
      'Lorem velit enim adipisicing excepteur enim occaecat culpa anim. Velit sint dolore culpa consectetur. Est cillum ea sunt do sint sint duis duis non enim ex nostrud pariatur. Qui deserunt ex incididunt pariatur laboris. Do amet nostrud anim officia sint reprehenderit incididunt tempor consequat occaecat irure duis Lorem.',
    rate: 4,
    createdAt: '2022-05-05',
    avatar: require('../../assets/images/profile-4.jpg'),
  },
];

const TutorDetail = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);

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
          data={reviews}
          keyExtractor={(item, index) => item.id}
          ListHeaderComponent={() => (
            <View style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={tutor.avatar}
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
                    {tutor.nation}
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
                  {t('description')}
                </Text>
                <Text body2 regular style={{marginTop: 10}}>
                  {tutor.description}
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <Text title2 primaryColor>
                  {t('specialities')}
                </Text>
                <FlatList
                  contentContainerStyle={{marginTop: 10}}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={tutor.specialities}
                  keyExtractor={(item, index) => index}
                  renderItem={({item, index}) => (
                    <Tag
                      key={index}
                      outline
                      style={{
                        // backgroundColor: BaseColor.whiteColor,
                        marginRight: 8,
                        height: 28,
                      }}>
                      {item}
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
              image={item.avatar}
              name={item.name}
              rate={item.rate}
              date={item.createdAt}
              review={item.review}
            />
          )}
        />
      </View>
      <BookingModal
        isVisible={bookingModalVisible}
        onSwipeComplete={() => setBookingModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default TutorDetail;
