import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Image, Tag, Text} from '../../components';
import {getLevelTitle} from '../../services/course';

const Course = props => {
  const {onPress, course} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={{uri: course.imageUrl}} style={styles.img}></Image>
        <View
          style={{
            flex: 1,
            margin: 5,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Text
            headline
            heavy
            lightPrimaryColor
            numberOfLines={1}
            style={{fontWeight: '500', fontSize: 18, margin: 3}}>
            {course.name}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {course.categories.map(item => (
              <Tag
                key={item.key}
                outline
                rateSmall
                style={{
                  // backgroundColor: BaseColor.whiteColor,
                  marginRight: 8,
                  height: 28,
                }}>
                {item.title}
              </Tag>
            ))}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 3,
            }}>
            <Text style={{fontWeight: '600', margin: 0}}>
              {' '}
              Level: {getLevelTitle(course.level)}
            </Text>

            <Text> - {course.topics.length} lesson </Text>
          </View>
          <Text
            body1
            grayColor
            regular
            style={{maxHeight: 60, fontSize: 14, margin: 3}}>
            {course.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
  rating: {
    alignSelf: 'flex-start',
  },
});

export default Course;
