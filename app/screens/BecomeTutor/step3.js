import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {
  Button,
  StepProcess,
  Text,
  SafeAreaView,
  Icon,
  Header,
} from '../../components';
import {BaseStyle, useTheme} from '../../config';

export default function BecomeTutor3() {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Become tutor',
      headerBackVisible: false,
    });
  }, []);
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
      <StepProcess step={2} />
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', padding: 20, marginTop: 20}}>
          <Icon name={'check-circle'} size={80} color={colors.primaryLight} />
          <Text title1 style={{fontSize: 20, textAlign: 'center'}}>
            You have done all the steps{'\n'}
            Please, wait for the operator's approval
          </Text>
          <Button
            style={{marginTop: 20}}
            styleText={{color: 'white'}}
            // style={{backgroundColor: '#27ae60'}}
            onPress={() => navigation.popToTop()}>
            Go back
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
