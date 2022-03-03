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
import {ScrollView, View} from 'react-native';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useForm, FormProvider} from 'react-hook-form';

const ChangePassword = props => {
  const {...methods} = useForm({
    mode: 'onChange',
  });
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('change_password')}
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
        <View style={styles.contain}>
          <FormProvider {...methods}>
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('current_password')}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              autoCorrect={false}
              secureTextEntry={true}
              placeholder={t('current_password')}
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={colors.primary}
              name="currentPassword"
              rules={{required: `${t('current_password')} ${t('is_required')}`}}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('new_password')}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              autoCorrect={false}
              secureTextEntry={true}
              placeholder={t('new_password')}
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={colors.primary}
              name="newPassword"
              rules={{required: `${t('new_password')} ${t('is_required')}`}}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('confirm_password')}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              autoCorrect={false}
              secureTextEntry={true}
              placeholder={t('confirm_password')}
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={colors.primary}
              name="confirmPassword"
              rules={{required: `${t('confirm_password')} ${t('is_required')}`}}
            />
          </FormProvider>
        </View>
      </ScrollView>
      <View style={{padding: 20}}>
        <Button
          loading={loading}
          full
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              navigation.goBack();
            }, 500);
          }}>
          {t('confirm')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
