import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import Video from 'react-native-video';
import {
  Button,
  StepProcess,
  SafeAreaView,
  Text,
  Header,
  Icon,
} from '../../components';
import {BaseStyle, useTheme} from '../../config';
import {requestBecomeTutor} from '../../services/tutor';
import {useStore} from '../../store';

export default function BecomeTutor2() {
  const navigation = useNavigation();
  const route = useRoute();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {data} = route.params;
  const userInfo = useStore(state => state.userInfo);

  const [video, setVideo] = useState(null);
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const pickVideo = () => {
    launchImageLibrary(
      {
        mediaType: 'video',
        durationLimit: 360,
      },
      response => {
        if (response.didCancel) {
          return;
        } else if (response.errorCode) {
          console.log(response.errorMessage);
          Toast.show({
            text1: 'Action failed',
            text2: response.errorMessage,
            type: 'error',
            visibilityTime: 500,
          });
        } else {
          setVideo(response.assets[0]);
        }
      },
    );
  };

  const submit = async () => {
    if (video == null) {
      Toast.show({
        type: 'info',
        text2: 'Please choose a introduce video',
        visibilityTime: 500,
      });
      return;
    }
    setLoading(true);
    data.video = video;
    const res = await requestBecomeTutor(data);
    if (res != null) {
      //   dispatch(setApprovingAction());
      navigation.replace('BecomeTutor3');
    }
    setLoading(false);
  };
  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {flex: 1}]}
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
      <StepProcess step={1} />
      {loading && <LoadingIndicator />}
      <ScrollView>
        <View style={{padding: 10}}>
          <Text
            title2
            style={{
              textAlign: 'center',
              margin: 10,
              color: colors.primary,
            }}>
            Step 2: Introduce yourself
          </Text>
          <Text callout style={{}}>
            Let students know what they can expect from a lesson with you by
            recording a video highlighting your teaching style, expertise and
            personality. Students can be nervous to speak with a foreigner, so
            it really helps to have a friendly video that introduces yourself
            and invites students to call you.
          </Text>

          <Text style={{marginTop: 10, marginBottom: 20}}>
            A few helpful tips:{'\n'}
            1. Find a clean and quiet space{'\n'}
            2. Smile and look at the camera{'\n'}
            3. Dress smart{'\n'}
            4. Speak for 1-3 minutes{'\n'}
            5. Brand yourself and have fun!
          </Text>
          {video != null && (
            <View>
              <Video
                ref={videoRef}
                style={{
                  width: '96%',
                  height: 200,
                  alignSelf: 'center',
                  margin: 5,
                  flex: 1,
                }}
                resizeMode={'contain'}
                source={{uri: video.uri}}
              />
            </View>
          )}
          <Button onPress={pickVideo}>Choose video</Button>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
              marginTop: 10,
            }}>
            <Button
              style={{backgroundColor: colors.primaryLight, minWidth: 100}}
              onPress={() => navigation.goBack()}>
              Previous
            </Button>
            <Button onPress={submit} style={{minWidth: 100}}>
              Done
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
