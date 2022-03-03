import React, {useState, useRef} from 'react';
import {
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

const topics = [
  {id: '1', keyword: 'All'},
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

const tutors = [
  {
    id: '1',
    name: 'Alicia Mave',
    avatar: require('../../assets/images/profile-5.jpg'),
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
  },
  {
    id: '2',
    name: 'Alicia Mave',
    avatar: require('../../assets/images/profile-5.jpg'),
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
  },
  {
    id: '3',
    name: 'Alicia Mave',
    avatar: require('../../assets/images/profile-5.jpg'),
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
  },
  {
    id: '4',
    name: 'Alicia Mave',
    avatar: require('../../assets/images/profile-5.jpg'),
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
  },
  {
    id: '5',
    name: 'Alicia Mave',
    avatar: require('../../assets/images/profile-5.jpg'),
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
  },
  {
    id: '6',
    name: 'Alicia Mave',
    avatar: require('../../assets/images/profile-5.jpg'),
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
  },
  {
    id: '7',
    name: 'Alicia Mave',
    avatar: require('../../assets/images/profile-5.jpg'),
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
  },
  {
    id: '8',
    name: 'Alicia Mave',
    avatar: require('../../assets/images/profile-5.jpg'),
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
  },
  {
    id: '9',
    name: 'Alicia Mave',
    avatar: require('../../assets/images/profile-5.jpg'),
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
  },
  {
    id: '10',
    name: 'Alicia Mave',
    avatar: require('../../assets/images/profile-5.jpg'),
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
  },
  {
    id: '11',
    name: 'Alicia Mave',
    avatar: require('../../assets/images/profile-5.jpg'),
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
  },
  {
    id: '12',
    name: 'Alicia Mave',
    avatar: require('../../assets/images/profile-5.jpg'),
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
  },
];

const Home = props => {
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
      <View style={{padding: 20}}>
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          contentInset={{top: 50}}
          data={tutors}
          contentContainerStyle={{
            marginTop: Platform.OS == 'android' ? 80 : 0,
            paddingHorizontal: 20,
          }}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => (
            <Tutor
              image={item.avatar}
              name={item.name}
              description={item.description}
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
              <View
                style={{
                  flex: 1,
                  paddingRight: 12,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                }}>
                <FormProvider {...methods}>
                  <TextInput
                    style={BaseStyle.textInput}
                    autoCorrect={false}
                    placeholder={t('search_tutor')}
                    placeholderTextColor={BaseColor.grayColor}
                    selectionColor={colors.primary}
                    name="search"
                  />
                  <TouchableOpacity style={styles.btnClearSearch}>
                    <Icon name="times" size={18} color={BaseColor.grayColor} />
                  </TouchableOpacity>
                </FormProvider>
              </View>
            </View>
            <View style={{marginLeft: 15}}>
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
                      // marginTop: 8,
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

export default Home;
