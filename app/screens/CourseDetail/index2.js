import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  LogBox,
  ScrollView,
} from 'react-native';

import {
  Icon,
  Button,
  Image,
  Text,
  SafeAreaView,
  Tag,
  Header,
} from '../../components';
import {BaseStyle, useTheme} from '../../config';
import {getLevelTitle, getListTag} from '../../services/course';

const CourseDetail = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const {data} = route.params;

  console.log('data', data);
  data.topics = sortTopicsByOrder(data.topics);
  const listTag = getListTag(data.categories);
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const Topic = ({item}) => {
    return (
      <Text>
        {' '}
        {item.orderCourse + 1}. {item.name}
      </Text>
    );
  };
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
        <View>
          <View style={{flexDirection: 'row', padding: 1}}>
            <Image
              source={{uri: data.imageUrl}}
              style={{width: 150, height: 150}}
            />
            <View
              style={{
                marginHorizontal: 5,
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                {data.name}
              </Text>
              <View style={styles.rowContainer}>
                <Text>Level: </Text>
                <Tag item={getLevelTitle(data.level)} />
              </View>
              <View style={styles.rowContainer}>
                <Text>Couse length: </Text>
                <Text> {data.topics.length} topics</Text>
              </View>

              <TouchableOpacity
                style={{...styles.rowContainer, alignSelf: 'flex-end'}}>
                <Icon name={'right'} size={14} color={'#3399ff'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text>Specialies: </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {listTag.map(item => (
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
          </View>

          <Text>Over view: </Text>
          <View style={styles.rowContainer}>
            <Icon name={'notification'} size={18} color={'#10ac84'} />
            <Text>Intro </Text>
          </View>
          <Text style={{margin: 5}}>{data.description}</Text>
          <View style={styles.rowContainer}>
            <Icon name={'questioncircleo'} size={18} color={'#ff9f43'} />
            <Text>Why take this coures </Text>
          </View>
          <Text style={{margin: 5}}>{data.reason}</Text>

          <View style={styles.rowContainer}>
            <Icon name={'questioncircleo'} size={18} color={'#ff9f43'} />
            <Text>What will you able to do </Text>
          </View>
          <Text style={{margin: 5}}>{data.purpose}</Text>

          <View style={styles.rowContainer}>
            <Icon name={'format-list-bulleted'} size={20} color={'#00d2d3'} />
            <Text>List topic </Text>
          </View>
          <View style={{flex: 1, marginHorizontal: 10}}>
            <FlatList
              data={data.topics}
              renderItem={Topic}
              keyExtractor={item => item.id}
              scrollEnabled={true}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

function sortTopicsByOrder(topics) {
  return topics.sort((a, b) => a.orderCourse - b.orderCourse);
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
  },
});

export default CourseDetail;
