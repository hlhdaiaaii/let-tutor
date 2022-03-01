import {Button, Header, Icon, SafeAreaView, TextInput} from '../../components';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import React, {useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useForm, FormProvider} from 'react-hook-form';

const successInit = {
  email: true,
};
const ResetPassword = props => {
  const {...methods} = useForm({mode: 'onChange'});
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const email = useRef('');
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(successInit);

  // const onReset = () => {
  //   if (email == '') {
  //     setSuccess({
  //       ...success,
  //       email: false,
  //     });
  //   } else {
  //     setLoading(true);
  //     setTimeout(() => {
  //       setLoading(false);
  //       navigation.navigate('SignIn');
  //     }, 500);
  //   }
  // };

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
              onChangeText={e => {
                email.current = e;
              }}
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
              onPress={methods.handleSubmit(() => {
                console.log(email.current);
              })}
              loading={loading}>
              {t('reset_password')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;
