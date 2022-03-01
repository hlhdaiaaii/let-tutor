import {Button, Header, Icon, SafeAreaView, TextInput} from '../../components';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import React, {useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useForm, FormProvider} from 'react-hook-form';

// const successInit = {
//   name: true,
//   email: true,
//   address: true,
// };

const SignUp = props => {
  const {...methods} = useForm({mode: 'onChange'});
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const name = useRef('');
  const email = useRef('');
  const address = useRef('');
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(successInit);

  // const onSignUp = () => {
  //   if (name == '' || email == '' || address == '') {
  //     setSuccess({
  //       ...success,
  //       name: name != '' ? true : false,
  //       email: email != '' ? true : false,
  //       address: address != '' ? true : false,
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
              style={[BaseStyle.textInput]}
              autoCorrect={false}
              placeholder={t('input_name')}
              placeholderTextColor={BaseColor.grayColor}
              onChangeText={text => {
                name.current = text;
              }}
              label="Name"
              name="name"
              rules={{required: `Name ${t('is_required')}`}}
            />
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 10}]}
              autoCorrect={false}
              placeholder={t('input_email')}
              keyboardType="email-address"
              placeholderTextColor={BaseColor.grayColor}
              onChangeText={text => {
                name.current = text;
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
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 10}]}
              autoCorrect={false}
              placeholder={t('input_address')}
              placeholderTextColor={BaseColor.grayColor}
              onChangeText={text => {
                address.current = text;
              }}
              label="Address"
              name="address"
              rules={{
                required: `Address ${t('is_required')}`,
              }}
            />
          </FormProvider>

          <View style={{width: '100%'}}>
            <Button
              full
              style={{marginTop: 20}}
              loading={loading}
              onPress={methods.handleSubmit(() => {
                console.log(JSON.stringify({name, email, address}));
              })}>
              {t('sign_up')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
