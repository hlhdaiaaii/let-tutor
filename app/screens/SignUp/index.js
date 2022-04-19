import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {Button, Header, Icon, SafeAreaView, TextInput} from '../../components';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import {signUp} from '../../services/auth';
import styles from './styles';

const SignUp = props => {
  const {...methods} = useForm({mode: 'onChange'});
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();

  const onSubmit = async ({email, password, confirmPassword}) => {
    console.log(email, password, confirmPassword);

    if (password !== confirmPassword) {
      Toast.show({
        text1: 'Sign up',
        text2: 'Confirm password is not matched',
        type: 'error',
        visibilityTime: 500,
      });
      return;
    }

    const res = await signUp(email, password);

    if (!res.user)
      Toast.show({
        text1: 'Sign up',
        text2: res.message,
        type: 'error',
        visibilityTime: 500,
      });
    else
      Toast.show({
        text1: 'Sign up',
        text2: 'Sign up successfully',
        type: 'success',
        visibilityTime: 500,
      });
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('sign_up')}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={[styles.contain, {marginTop: 65}]}>
          <FormProvider {...methods}>
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 10}]}
              autoCorrect={false}
              placeholder={t('input_email')}
              keyboardType="email-address"
              placeholderTextColor={BaseColor.grayColor}
              label="Email"
              name="email"
              rules={{
                required: `Email ${t('is_required')}`,
                pattern: {
                  value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                  message: 'Must be formatted: john.doe@email.com',
                },
              }}
            />
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 10}]}
              onFocus={() => {}}
              autoCorrect={false}
              placeholder={t('input_password')}
              secureTextEntry={true}
              selectionColor={colors.primary}
              label="Password"
              name="password"
              rules={{required: `Password ${t('is_required')}`}}
            />
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 10}]}
              onFocus={() => {}}
              autoCorrect={false}
              placeholder={t('confirm_password')}
              secureTextEntry={true}
              selectionColor={colors.primary}
              label="Confirm password"
              name="confirmPassword"
              rules={{required: `Password ${t('is_required')}`}}
            />
          </FormProvider>

          <View style={{width: '100%'}}>
            <Button
              full
              style={{marginTop: 20}}
              onPress={methods.handleSubmit(onSubmit)}>
              {t('sign_up')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
