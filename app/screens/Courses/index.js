import React, {useState, useRef} from 'react';
import {
  Course,
  Header,
  Icon,
  SafeAreaView,
  Tag,
  Text,
  TextInput,
  Tutor,
} from '../../components';
import Logo from '../../assets/images/logo.svg';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
  View,
  FlatList,
  Animated,
  Platform,
} from 'react-native';
import styles from './styles';
import {FormProvider, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import DropShadow from 'react-native-drop-shadow';
import {NavConfig} from '../../navigation/config';

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

const courses = [
  {
    id: 1,
    title: 'What is Ethereum?',
    level: 'Intermediate',
    nLessons: 9,
    image: require('../../assets/images/course-1.jpg'),
  },
  {
    id: 2,
    title: 'What is Ethereum?',
    level: 'Intermediate',
    nLessons: 9,
    image: require('../../assets/images/course-1.jpg'),
  },
  {
    id: 3,
    title: 'What is Ethereum?',
    level: 'Intermediate',
    nLessons: 9,
    image: require('../../assets/images/course-1.jpg'),
  },
  {
    id: 4,
    title: 'What is Ethereum?',
    level: 'Intermediate',
    nLessons: 9,
    image: require('../../assets/images/course-1.jpg'),
  },
  {
    id: 5,
    title: 'What is Ethereum?',
    level: 'Intermediate',
    nLessons: 9,
    image: require('../../assets/images/course-1.jpg'),
  },
  {
    id: 6,
    title: 'What is Ethereum?',
    level: 'Intermediate',
    nLessons: 9,
    image: require('../../assets/images/course-1.jpg'),
  },
  {
    id: 7,
    title: 'What is Ethereum?',
    level: 'Intermediate',
    nLessons: 9,
    image: require('../../assets/images/course-1.jpg'),
  },
  {
    id: 8,
    title: 'What is Ethereum?',
    level: 'Intermediate',
    nLessons: 9,
    image: require('../../assets/images/course-1.jpg'),
  },
  {
    id: 9,
    title: 'What is Ethereum?',
    level: 'Intermediate',
    nLessons: 9,
    image: require('../../assets/images/course-1.jpg'),
  },
  {
    id: 10,
    title: 'What is Ethereum?',
    level: 'Intermediate',
    nLessons: 9,
    image: require('../../assets/images/course-1.jpg'),
  },
  {
    id: 11,
    title: 'What is Ethereum?',
    level: 'Intermediate',
    nLessons: 9,
    image: require('../../assets/images/course-1.jpg'),
  },
  {
    id: 12,
    title: 'What is Ethereum?',
    level: 'Intermediate',
    nLessons: 9,
    image: require('../../assets/images/course-1.jpg'),
  },
];

const Courses = props => {
  const {...methods} = useForm({
    mode: 'onChange',
  });
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [chosenTopicId, setChosenTopicId] = useState(topics[0].id);

  const scrollAnim = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const clampedScroll = useRef(
    Animated.diffClamp(
      Animated.add(
        scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: 'clamp',
        }),
        offsetAnim,
      ),
      0,
      40,
    ),
  ).current;

  const navbarTranslate = clampedScroll.interpolate({
    inputRange: [0, 40],
    outputRange: [0, -40],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView]}
      edges={['right', 'top', 'left']}>
      <Header
        title=""
        renderLeft={() => {
          return <Logo width={150} height={150} />;
        }}
        renderRight={() => (
          <Icon name="bell" size={20} color={colors.text} enableRTL={true} />
        )}
        style={{paddingVertical: 10}}
      />
      <View>
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          contentInset={{top: 50}}
          data={courses}
          contentContainerStyle={{
            marginTop: Platform.OS == 'android' ? 100 : 0,
            paddingHorizontal: 20,
            paddingBottom: 150,
          }}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => (
            // <Tutor
            //   image={item.avatar}
            //   name={item.name}
            //   description={item.description}
            //   onPress={() => navigation.navigate(NavConfig.Screens.TutorDetail)}
            // />
            <Course
              onPress={() =>
                navigation.navigate(NavConfig.Screens.CourseDetail)
              }
              style={{marginBottom: 10}}
              image={item.image}
              title={item.title}
              level={item.level}
              nLessons={item.nLessons}
            />
          )}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollAnim,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}
        />
        <Animated.View
          style={[styles.search, {transform: [{translateY: navbarTranslate}]}]}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <DropShadow style={styles.searchInput}>
                {/* <View
                style={{
                  flex: 1,
                  paddingRight: 12,                  
                }}> */}
                <FormProvider {...methods}>
                  <TextInput
                    style={[
                      BaseStyle.textInput,
                      {backgroundColor: BaseColor.whiteColor},
                    ]}
                    autoCorrect={false}
                    placeholder={t('search_courses')}
                    placeholderTextColor={BaseColor.grayColor}
                    selectionColor={colors.primary}
                    name="search"
                  />
                  <TouchableOpacity style={styles.btnClearSearch}>
                    <Icon name="times" size={18} color={BaseColor.grayColor} />
                  </TouchableOpacity>
                </FormProvider>
                {/* </View> */}
              </DropShadow>
            </View>
            <View style={{marginHorizontal: 12}}>
              {/* <View style={styles.rowTitle}>
                <Text title3 bold>
                  {t('topics')}
                </Text>
              </View> */}
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={topics}
                keyExtractor={(item, index) => item.id}
                renderItem={({item, index}) => (
                  <Tag
                    key={item.id}
                    primary={item.id === chosenTopicId}
                    outline={!(item.id === chosenTopicId)}
                    style={{
                      // backgroundColor: BaseColor.whiteColor,
                      marginRight: 8,
                      height: 28,
                    }}
                    onPress={() => setChosenTopicId(item.id)}>
                    {item.keyword}
                  </Tag>
                )}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Courses;
