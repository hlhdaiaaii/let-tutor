import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import {Button, Header, Icon, SafeAreaView, TextInput} from '../../components';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import {forgotPassword} from '../../services/auth';
import Toast from 'react-native-toast-message';

const ForgotPassword = props => {
  const {...methods} = useForm({mode: 'onChange'});
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();

  const onSubmit = async ({email}) => {
    console.log(email);

    const res = await forgotPassword(email);

    if (res.statusCode)
      Toast.show({
        text1: 'Forgot password',
        text2: res.message,
        type: 'error',
        visibilityTime: 500,
      });
    else {
      Toast.show({
        text1: 'Forgot password',
        text2:
          'Reset password request is sent successfully. Check your email to continue',
        type: 'success',
        visibilityTime: 500,
      });

      navigation.goBack();
    }
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('reset_password')}
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
        <View
          style={{
            alignItems: 'center',
            padding: 20,
            width: '100%',
            marginTop: 65,
          }}>
          <FormProvider {...methods}>
            <TextInput
              style={[BaseStyle.textInput]}
              autoCorrect={false}
              placeholder={t('input_email')}
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={colors.primary}
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
          </FormProvider>

          <View style={{width: '100%'}}>
            <Button
              full
              style={{marginTop: 20}}
              onPress={methods.handleSubmit(onSubmit)}>
              {t('reset_password')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
