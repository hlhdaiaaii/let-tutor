import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header, Icon, Image, SafeAreaView, Tag, Text} from '../../components';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import {NavConfig} from '../../navigation/config';
import {getListTag} from '../../services/course';

const CourseDetail = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const {data: course} = route.params;

  course.topics = sortTopicsByOrder(course.topics);
  const listTag = getListTag(course.categories);

  console.log('listTag', listTag);

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
            source={{uri: course.imageUrl}}
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
              {t('why_take_this_course')}
            </Text>
            <Text body2 regular style={{marginTop: 10}}>
              {course.reason}
            </Text>
          </View>

          <View style={{marginTop: 20}}>
            <Text title2 primaryColor>
              {t('what_will_you_able_to_do')}
            </Text>
            <Text body2 regular style={{marginTop: 10}}>
              {course.purpose}
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
              data={listTag}
              keyExtractor={(item, index) => item}
              renderItem={({item, index}) => (
                <Tag
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
          <View style={{marginTop: 20, marginBottom: 10}}>
            <Text title2 primaryColor>
              {t('lessons')}
            </Text>
          </View>
          {course.topics.map(e => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(NavConfig.Screens.CourseLesson, {
                  fileUrl: e.nameFile,
                });
              }}
              key={e.id}
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
                {' '}
                {e.orderCourse + 1}. {e.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
function sortTopicsByOrder(topics) {
  return topics.sort((a, b) => a.orderCourse - b.orderCourse);
}
export default CourseDetail;
