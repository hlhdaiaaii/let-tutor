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
  LanguagePicker,
  SafeAreaView,
  Text,
  TextInput,
  TopicPicker,
} from '../../components';
import {BaseColor, BaseStyle, useTheme} from '../../config';

export default function BecomeTutor1() {
  const navigation = useNavigation();
  const {...methods} = useForm({mode: 'onChange'});
  const {t} = useTranslation();
  const {colors} = useTheme();

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarErr, setAvatarErr] = useState('');

  const [topics, setTopics] = useState([]);
  const [topicsErr, setTopicsErr] = useState('');

  const [country, setCountry] = useState('');
  const [countryErr, setCountryErr] = useState('');

  const [targetStudent, setTargetStudent] = useState(null);
  const [targetStudentErr, setTargetStudentErr] = useState('');

  const [languages, setLanguages] = useState([]);
  const [languagesErr, setLanguagesErr] = useState('');

  const [birthday, setBirthday] = useState(new Date());

  const pressNext = data => {
    console.log('become tutor data');
    console.log(data);

    // console.log(checkInput);
    // if (!checkInput()) return;
    // navigation.navigate('BecomeTutor2', {
    //   data: {
    //     avatar,
    //     country,
    //     birthday: birthday.toLocaleDateString(),
    //     specialties: topics,
    //     languages,

    //     // education,
    //     // interests,
    //     // experience,
    //     // profession,
    //     // bio,
    //     // targetStudent,
    //   },
    // });
  };

  const chooseTargetStudent = value => {
    setTargetStudentErr('');
    setTargetStudent(value);
  };
  const chooseAvatar = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode) {
        Toast.show({
          text1: 'Action failed',
          text2: response.errorMessage,
          type: 'danger',
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
        title={t('become_tutor')}
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
            <Text
              title2
              style={{
                textAlign: 'center',
                margin: 10,
                color: colors.primary,
              }}>
              Step 1: Set up your tutor profile
            </Text>
            <Text callout>
              Your tutor profile is your chance to market yourself to students
              on Tutoring. You can make edits later on your profile settings
              page.
            </Text>
            <Text callout>
              New students may browse tutor profiles to find a tutor that fits
              their learning goals and personality. Returning students may use
              the tutor profiles to find tutors they've had great experiences
              with already.
            </Text>

            <Text headline style={{marginVertical: 10}}>
              Basic information:{' '}
            </Text>
            {/* <View style={{flexDirection: 'row'}}> */}
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
              <View>
                <Text body1>Your avatar:</Text>
                <TouchableOpacity onPress={chooseAvatar}>
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

              <Text style={{maxWidth: 150, marginLeft: 20}}>
                Please upload a professional photo.
              </Text>
            </View>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <View>
                <TextInput
                  style={[BaseStyle.textInput]}
                  label="Fullname"
                  name="fullname"
                  placeholder="Fullname"
                  placeholderTextColor={BaseColor.grayColor}
                  selectionColor={colors.primary}
                  // onChangeText={setName}
                  rules={{required: `Fullname ${t('is_required')}`}}
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
                {countryErr != '' && country == '' && (
                  <Text style={styles.error}>{countryErr}</Text>
                )}
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
            </View>
            {/* </View> */}

            <View>
              <Text headline style={{marginVertical: 10}}>
                CV
              </Text>
              <Text>
                Students will view this information on your profile to decide if
                you're a good fit for them.
              </Text>
              <Text>
                In order to protect your privacy, please do not share your
                personal information (email, phone number, social email, skype,
                etc) in your profile.
              </Text>
              <View style={{marginTop: 10}}>
                <TextInput
                  label="Education"
                  name="education"
                  placeholder="Education"
                  selectionColor={colors.primary}
                  rules={{required: `Education ${t('is_required')}`}}
                />
              </View>
              <TextInput
                label="Interests"
                name="interests"
                placeholder="Interests"
                selectionColor={colors.primary}
                rules={{required: `Interests ${t('is_required')}`}}
              />
              <TextInput
                label="Experience"
                name="experience"
                placeholder="Experience"
                selectionColor={colors.primary}
                rules={{required: `Experience ${t('is_required')}`}}
              />

              <TextInput
                label="Profession"
                name="profession"
                placeholder="Profession"
                selectionColor={colors.primary}
                rules={{required: `Profession ${t('is_required')}`}}
              />
            </View>

            <View>
              <LanguagePicker value={languages} onChangeValue={setLanguages} />
              {languagesErr != '' && languages.length == 0 && (
                <Text style={styles.error}>{languagesErr}</Text>
              )}
              <Text headline style={{marginVertical: 10}}>
                Who I teach
              </Text>
              <Text style={{marginBottom: 10}}>
                This is the first thing students will see when looking for
                tutors.
              </Text>
              <TextInput
                label="Introduction"
                name="introduction"
                placeholder="Introduction"
                selectionColor={colors.primary}
                rules={{required: `Introduction ${t('is_required')}`}}
              />

              <Text subhead bold grayColor style={{marginRight: -6}}>
                I am best at teaching students who are
              </Text>
              <View style={{marginVertical: 5}}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => chooseTargetStudent('Beginner')}>
                  <View style={styles.checkBox}>
                    <Icon
                      name="check-circle"
                      color={targetStudent == 'Beginner' ? 'green' : 'gray'}
                      size={20}
                    />
                  </View>
                  {/* <RadioButton
                    status={
                      targetStudent == 'Beginner' ? 'checked' : 'unchecked'
                    }
                    onPress={() => chooseTargetStudent('Beginner')}
                    value="Beginner"
                  /> */}
                  <Text style={styles.targetStudent}>Beginner</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => chooseTargetStudent('Intermediate')}>
                  <View style={styles.checkBox}>
                    <Icon
                      name="check-circle"
                      color={targetStudent == 'Intermediate' ? 'green' : 'gray'}
                      size={20}
                    />
                  </View>
                  {/* <RadioButton
                    status={
                      targetStudent == 'Intermediate' ? 'checked' : 'unchecked'
                    }
                    onPress={() => chooseTargetStudent('Intermediate')}
                    value="Intermediate"
                  /> */}
                  <Text style={styles.targetStudent}>Intermediate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => chooseTargetStudent('Advanced')}>
                  <View style={styles.checkBox}>
                    <Icon
                      name="check-circle"
                      color={targetStudent == 'Advanced' ? 'green' : 'gray'}
                      size={20}
                    />
                  </View>
                  <Text style={styles.targetStudent}>Advanced</Text>
                </TouchableOpacity>
                {targetStudentErr != '' && targetStudent == null && (
                  <Text style={styles.error}>{targetStudentErr}</Text>
                )}
              </View>
              <TopicPicker
                title="My specialties are"
                onChangeValue={setTopics}
                value={topics}
              />
              {topicsErr != '' && topics.length == 0 && (
                <Text style={styles.error}>{topicsErr}</Text>
              )}
            </View>
            <Button
              style={{marginTop: 20}}
              full
              onPress={methods.handleSubmit(pressNext)}>
              Next step
            </Button>
          </FormProvider>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>

    // </CustomScrollView >
    // {/* </SafeAreaView> */ }
  );
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
  error: {
    color: 'orange',
    marginLeft: 10,
    fontWeight: '500',
  },
  checkBox: {justifyContent: 'center', alignItems: 'center', marginRight: 10},
});

const options = {
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
  },
};
