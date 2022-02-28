import React, {useState} from 'react';
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
import {useForm, Controller} from 'react-hook-form';

const SignIn = props => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    console.log(data);
  };

  const onError = (errors, e) => {
    return console.log(errors);
  };

  const onLogin = () => {
    handleSubmit(onSubmit);
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
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Email"
                style={[BaseStyle.textInput]}
                onChangeText={onChange}
                onFocus={() => {}}
                onBlur={onBlur}
                autoCorrect={false}
                placeholder={t('input_email')}
                placeholderTextColor={BaseColor.grayColor}
                value={value}
                selectionColor={colors.primary}
                error={errors?.email?.message}
              />
            )}
            name="email"
            rules={{required: `Email ${t('is_required')}`}}
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[BaseStyle.textInput, {marginTop: 10}]}
                onChangeText={onChange}
                onFocus={() => {}}
                autoCorrect={false}
                placeholder={t('input_password')}
                secureTextEntry={true}
                value={value}
                selectionColor={colors.primary}
                label={'Password'}
                onBlur={onBlur}
                error={errors?.password?.message}
              />
            )}
            name="password"
            rules={{required: `Password ${t('is_required')}`}}
          />

          <View style={{width: '100%', marginVertical: 16}}>
            <Button
              full
              loading={loading}
              style={{marginTop: 20}}
              onPress={handleSubmit(onSubmit)}>
              {t('sign_in')}
            </Button>
          </View>
          <View style={styles.contentActionBottom}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPassword')}>
              <Text body2 grayColor>
                {t('forgot_password')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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
