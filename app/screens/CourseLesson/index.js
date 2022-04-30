import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Header, Icon, SafeAreaView} from '../../components';
import {BaseStyle, useTheme} from '../../config';
import Pdf from 'react-native-pdf';

const CourseLesson = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const {fileUrl} = route.params;

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {flex: 1}]}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('lesson')}
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

      <Pdf
        source={{uri: fileUrl.replace(/\s/g, '%20')}}
        trustAllCerts={false}
        onError={error => console.log(error)}
        style={{flex: 1, height: '100%', width: '100%'}}
      />
    </SafeAreaView>
  );
};

export default CourseLesson;
