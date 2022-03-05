import {
  Header,
  Icon,
  SafeAreaView,
  Tag,
  Text,
  Image,
  Button,
} from '../../components';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  TouchableOpacity,
  Dimensions,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Review from '../../components/Review';
import {AirbnbRating} from 'react-native-ratings';

const topics = [
  {id: '1', keyword: 'Recommended'},
  {id: '2', keyword: 'English for Kids'},
  {id: '3', keyword: 'Bussiness English'},
  {id: '4', keyword: 'Conversational Englis'},
  {id: '5', keyword: 'STARTERS'},
  {id: '6', keyword: 'MOVERS'},
  {id: '7', keyword: 'FLYERS'},
  {id: '8', keyword: 'KET'},
  {id: '9', keyword: 'PET'},
  {id: '10', keyword: 'IELTS'},
  {id: '11', keyword: 'TOEFL'},
  {id: '12', keyword: 'TOEIC'},
];

const course = {
  id: 1,
  title: 'What is Ethereum?',
  level: 'Intermediate',
  nLessons: 9,
  image: require('../../assets/images/course-1.jpg'),
  description:
    'Commodo pariatur minim consectetur irure. Amet cupidatat sint nulla quis culpa nulla consequat dolor adipisicing tempor. In amet nostrud proident Lorem enim esse aliqua minim pariatur Lorem. Deserunt labore minim voluptate enim mollit culpa occaecat ea nulla irure. Laborum occaecat voluptate nisi elit tempor eiusmod incididunt dolore nostrud labore deserunt nostrud enim. Nisi non anim anim eiusmod deserunt nulla et minim nulla ut commodo. Mollit proident laborum enim eiusmod ut ad ex fugiat.',
};

const lessons = [
  {
    id: 1,
    title: 'Lesson 1',
  },
  {
    id: 2,
    title: 'Lesson 1',
  },
  {
    id: 3,
    title: 'Lesson 1',
  },
  {
    id: 4,
    title: 'Lesson 1',
  },
  {
    id: 5,
    title: 'Lesson 1',
  },
  {
    id: 6,
    title: 'Lesson 1',
  },
  {
    id: 7,
    title: 'Lesson 1',
  },
];

const CourseDetail = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {flex: 1}]}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('course')}
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
      <ScrollView>
        <View
          style={{
            marginBottom: 10,
            padding: 20,
          }}>
          <Image
            source={course.image}
            style={{
              borderRadius: 10,
              width: '100%',
              height: ((Dimensions.get('window').width - 40) * 3) / 4,
            }}
          />
          <View style={{marginTop: 20}}>
            <Text title2>{course.title}</Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text title2 primaryColor>
              {t('description')}
            </Text>
            <Text body2 regular style={{marginTop: 10}}>
              {course.description}
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text title2 primaryColor>
              {t('topics')}
            </Text>
            <FlatList
              contentContainerStyle={{marginTop: 10}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={topics}
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
                  {item.keyword}
                </Tag>
              )}
            />
          </View>
          <View style={{marginTop: 20, marginBottom: 10}}>
            <Text title2 primaryColor>
              {t('lessons')}
            </Text>
          </View>
          {lessons.map(e => (
            <View
              style={{
                // width: '80%',
                flexDirection: 'row',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.primary,
                marginBottom: 10,
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: BaseColor.whiteColor,
              }}>
              <Text headline light>
                {e.title}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseDetail;
