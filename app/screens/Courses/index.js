import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Animated,
  FlatList,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import Logo from '../../assets/images/logo.svg';
import {
  Course,
  Header,
  Icon,
  SafeAreaView,
  Tag,
  TextInput,
} from '../../components';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import {NavConfig} from '../../navigation/config';
import {getCourseCates, getCourses} from '../../services/course';
import styles from './styles';

const Courses = props => {
  const {...methods} = useForm({
    mode: 'onChange',
  });
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {colors} = useTheme();

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

  const [courses, setCourses] = useState([]);
  const [cates, setCates] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const [chosenCate, setChosenCate] = useState({});
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourses({page, size: perPage});

      setCourses(data.rows);
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchCates = async () => {
      const data = await getCourseCates();

      setCates(data);
    };

    fetchCates();
  }, []);

  const search = async () => {
    console.log('chosenCate', chosenCate);

    const params = {size: perPage, q: searchKeyword};

    if (chosenCate.id) params.categoryId = [chosenCate.id];

    const data = await getCourses(params);
    setCourses(data.rows);
  };

  useEffect(() => {
    console.log('search keyword: ' + searchKeyword);

    const timeoutRef = setTimeout(() => {
      search();
    }, 300);

    return () => clearTimeout(timeoutRef);
  }, [searchKeyword]);

  useEffect(() => {
    search();
  }, [chosenCate]);

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
                navigation.navigate(NavConfig.Screens.CourseDetail, {
                  data: item,
                })
              }
              course={item}
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
                    onChangeText={text => {
                      setSearchKeyword(text);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.btnClearSearch}
                    onPress={() => {
                      methods.reset();
                      setSearchKeyword('');
                    }}>
                    <Icon name="times" size={18} color={BaseColor.grayColor} />
                  </TouchableOpacity>
                </FormProvider>
                {/* </View> */}
              </DropShadow>
            </View>
            <View style={{marginHorizontal: 12}}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={cates}
                keyExtractor={(item, index) => item.key}
                renderItem={({item, index}) => (
                  <Tag
                    primary={item.key === chosenCate.key}
                    outline={!(item.key === chosenCate.key)}
                    style={{
                      marginRight: 8,
                      height: 28,
                    }}
                    onPress={() => setChosenCate(item)}>
                    {item.title}
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
