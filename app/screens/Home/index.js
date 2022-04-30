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
  Header,
  Icon,
  SafeAreaView,
  Tag,
  TextInput,
  Tutor,
} from '../../components';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import {NavConfig} from '../../navigation/config';
import {getTopicList, getTutorList, searchTutor} from '../../services/tutor';
import {useStore} from '../../store';
import styles from './styles';

const Home = props => {
  console.log('DEBUG');
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

  const [tutors, setTutors] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 9;

  const topics = useStore(state => state.topics);
  const [chosenTopicKey, setChosenTopicKey] = useState('');
  const setTopics = useStore(state => state.setTopics);

  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchAndSaveTopic = async () => {
      const topicList = await getTopicList();

      console.log(topicList);

      setTopics(topicList);
    };

    fetchAndSaveTopic();
  }, []);

  useEffect(() => {
    const fetchTutors = async () => {
      const data = await getTutorList(page, perPage);

      setTutors(data);
    };

    fetchTutors();
  }, []);

  useEffect(() => {
    console.log('search keyword: ' + searchKeyword);

    const search = async () => {
      const data = await searchTutor(
        {specialties: [chosenTopicKey]},
        searchKeyword,
        page,
        perPage,
      );
      setTutors(data);
      console.log(data);
    };

    const timeoutRef = setTimeout(() => {
      search();
    }, 300);

    return () => clearTimeout(timeoutRef);
  }, [searchKeyword]);

  useEffect(() => {
    const search = async () => {
      const data = await searchTutor(
        {specialties: [chosenTopicKey]},
        searchKeyword,
        page,
        perPage,
      );
      setTutors(data);
      console.log(data);
    };

    search();
  }, [chosenTopicKey]);

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
          data={tutors}
          contentContainerStyle={{
            marginTop: Platform.OS == 'android' ? 100 : 0,
            paddingHorizontal: 20,
            paddingBottom: 150,
          }}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => {
            return (
              <Tutor
                image={item.avatar}
                specialties={item.specialties.split(',').map(e => {
                  // console.log(e);
                  return topics.find(o => o.key === e);
                })}
                rating={item.rating}
                name={item.name}
                description={item.description}
                isFavorite={item.isFavorite}
                onPress={() =>
                  navigation.navigate(NavConfig.Screens.TutorDetail, {
                    id: item.id,
                  })
                }
              />
            );
          }}
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
                <FormProvider {...methods}>
                  <TextInput
                    style={[
                      BaseStyle.textInput,
                      {backgroundColor: BaseColor.whiteColor},
                    ]}
                    autoCorrect={false}
                    placeholder={t('search_tutor')}
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
              </DropShadow>
            </View>
            <View style={{marginHorizontal: 12}}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={topics}
                keyExtractor={(item, index) => item.key}
                renderItem={({item, index}) => (
                  <Tag
                    // key={item.key}
                    primary={item.key === chosenTopicKey}
                    outline={!(item.key === chosenTopicKey)}
                    style={{
                      // backgroundColor: BaseColor.whiteColor,
                      marginRight: 8,
                      height: 28,
                    }}
                    onPress={() => setChosenTopicKey(item.key)}>
                    {item.name}
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

export default Home;
