import React, {useRef, useState} from 'react';
import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
} from '../../components';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import {
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useForm, FormProvider} from 'react-hook-form';
import {useStore} from '../../store';
import {NavConfig} from '../../navigation/config';

const SignIn = props => {
  const {...methods} = useForm({mode: 'onChange'});
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const email = useRef('');
  const password = useRef('');
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);

  const onSubmit = data => {
    console.log(data);
    setIsLoggedIn(true);
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header title={t('sign_in')} />

      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={offsetKeyboard}
        style={{
          flex: 1,
        }}>
        <View style={styles.contain}>
          <FormProvider {...methods}>
            <TextInput
              style={[BaseStyle.textInput]}
              onFocus={() => {}}
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
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 10}]}
              onFocus={() => {}}
              autoCorrect={false}
              placeholder={t('input_password')}
              secureTextEntry={true}
              selectionColor={colors.primary}
              onChangeText={e => {
                password.current = e;
              }}
              label="Password"
              name="password"
              rules={{required: `Password ${t('is_required')}`}}
            />
          </FormProvider>

          <View style={{width: '100%', marginVertical: 16}}>
            <Button
              full
              loading={loading}
              style={{marginTop: 20}}
              onPress={methods.handleSubmit(onSubmit)}>
              {t('sign_in')}
            </Button>
          </View>
          <View style={styles.contentActionBottom}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(NavConfig.Screens.ForgotPassword)
              }>
              <Text body2 grayColor>
                {t('forgot_password')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate(NavConfig.Screens.SignUp)}>
              <Text body2 primaryColor>
                {t('not_have_account')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
