import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {
  Button,
  CountryPicker,
  DatePicker,
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
  TopicPicker,
} from '../../components';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import {myLevels} from '../../config/constant';
import {
  getWantToLearnObject,
  updateAvatar,
  updateUserInfo,
} from '../../services/user';
import {useStore} from '../../store';
import moment from 'moment';

export default function AccountEdit() {
  const navigation = useNavigation();
  const {...methods} = useForm({mode: 'onChange'});
  const {t} = useTranslation();
  const {colors} = useTheme();

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const userInfo = useStore(state => state.userInfo);
  const setUserInfo = useStore(state => state.setUserInfo);

  const [name, setName] = useState(userInfo.name);
  const [phone, setPhone] = useState(userInfo.phone);
  const [birthday, setBirthday] = useState(new Date(userInfo.birthday));
  const [country, setCountry] = useState(userInfo.country);
  const [avatar, setAvatar] = useState({uri: userInfo.avatar});
  const [avatarErr, setAvatarErr] = useState('');

  const [level, setLevel] = useState(userInfo.level || myLevels[0].value);
  const [topics, setTopics] = useState(userInfo.wantToLearnList);
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({name, phone}) => {
    setLoading(true);

    // first upload avatar
    if (avatar.uri !== userInfo.avatar) {
      // console.log('avatar.base64', avatar.base64);
      await updateAvatar(avatar);
    }

    // then upload user info
    const choices = getWantToLearnObject(topics);
    const updatedUserInfo = await updateUserInfo({
      name,
      country,
      phone,
      birthday: moment(birthday).format('YYYY-MM-DD'),
      level,
      learnTopics: choices.topic,
      testPreparations: choices.preparation,
    });
    // const res = await axios.put(
    //   serverUrl + 'user/info',
    //   {
    //     name,
    //     country,
    //     phone,
    //     birthday: birthday.toLocaleString().substring(0, 10),
    //     level: level.value,
    //     learnTopics: choices.topic,
    //     testPreparations: choices.preparation,
    //   },
    //   {headers: {Authorization: 'Bearer ' + userInfo.tokens.access.token}},
    // );

    setUserInfo(updatedUserInfo);
    Toast.show({
      type: 'success',
      text1: 'Update profile',
      text2: 'Profile updated successfully',
    });

    setLoading(false);
  };

  const chooseAvatar = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode) {
        Toast.show({
          text1: 'Action failed',
          text2: response.errorMessage,
          type: 'info',
          visibilityTime: 500,
        });
      } else {
        console.log(response.assets);
        const result = response.assets[0];
        setAvatar(result);
        setAvatarErr(false);
      }
    });
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('edit_account')}
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
      {/* {loading && <Loading />} */}
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        // behavior="padding"
        keyboardVerticalOffset={offsetKeyboard}
        style={{
          flex: 1,
          margin: 10,
        }}>
        <ScrollView>
          <FormProvider {...methods}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderEndWidth: 0.5,
                borderEndColor: colors.primary,
                padding: 3,
                paddingEnd: 5,
              }}>
              <View style={{alignItems: 'center'}}>
                <Text body1>Your avatar:</Text>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={chooseAvatar}>
                  {avatar != null ? (
                    <Image source={{uri: avatar.uri}} style={styles.avt} />
                  ) : (
                    <View style={styles.noAvt}>
                      <Text
                        thin
                        style={{
                          textAlign: 'center',
                          padding: 3,
                          color: avatarErr ? 'red' : 'black',
                        }}>
                        Upload your avatar here{' '}
                      </Text>
                    </View>
                  )}
                  <Text caption1 style={{alignSelf: 'center', marginBottom: 4}}>
                    Click to edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <View>
                <TextInput
                  style={[BaseStyle.textInput]}
                  defaultValue={userInfo.name}
                  label="Name"
                  name="name"
                  placeholder="Name"
                  placeholderTextColor={BaseColor.grayColor}
                  selectionColor={colors.primary}
                  rules={{required: `Name ${t('is_required')}`}}
                />
              </View>

              <View>
                <TextInput
                  style={[BaseStyle.textInput]}
                  defaultValue={userInfo.phone}
                  label="Phone"
                  name="phone"
                  placeholder="Phone"
                  placeholderTextColor={BaseColor.grayColor}
                  selectionColor={colors.primary}
                  rules={{required: `Phone ${t('is_required')}`}}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text subhead bold grayColor style={{marginRight: 10}}>
                  Country
                </Text>
                <CountryPicker value={country} didSelect={setCountry} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text subhead bold grayColor style={{marginRight: -6}}>
                  Birthday
                </Text>
                <DatePicker value={birthday} onChageValue={setBirthday} />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginHorizontal: 5,
                  alignItems: 'center',
                }}>
                <Text subhead bold grayColor style={{marginRight: -6}}>
                  Level
                </Text>
                <Picker
                  selectedValue={level}
                  onValueChange={(value, index) => setLevel(value)}
                  mode="dropdown" // Android only
                  style={styles.picker}>
                  {myLevels.map(e => (
                    <Picker.Item label={e.label} value={e.value} />
                  ))}
                </Picker>
              </View>
              <TopicPicker
                title="Topics want to learn"
                onChangeValue={value => {
                  console.log(value);
                  setTopics(value);
                }}
                value={topics}
              />
            </View>
            <Button
              style={{marginTop: 20}}
              full
              onPress={methods.handleSubmit(onSubmit)}>
              {t('Update')}
            </Button>
          </FormProvider>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function getLevelItem(value) {
  return myLevels.find(item => item.value == value);
}

const styles = StyleSheet.create({
  avt: {
    width: 120,
    height: 120,
    borderRadius: 5,
  },
  noAvt: {
    height: 120,
    width: 120,
    borderRadius: 5,
    borderWidth: 0.5,
    borderStyle: 'dashed',
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelChoice: {padding: 5, height: 30, margin: 4},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  targetStudent: {
    fontSize: 15,
    fontWeight: '600',
  },
  picker: {
    width: 300,
    // borderWidth: 1,
    // borderColor: '#666',
  },
  error: {
    color: 'orange',
    marginLeft: 10,
    fontWeight: '500',
  },
  checkBox: {justifyContent: 'center', alignItems: 'center', marginRight: 10},
});

const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  title: 'Select Image',
  customButtons: [
    {
      name: 'customOptionKey',
      title: 'Choose Photo from Custom Option',
    },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
    cameraRoll: true,
    waitUntilSaved: true,
  },
  includeBase64: true,
};
