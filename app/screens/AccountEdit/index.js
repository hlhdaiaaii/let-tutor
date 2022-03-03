import {
  Button,
  Header,
  Icon,
  Image,
  SafeAreaView,
  Text,
  TextInput,
} from '../../components';
import {BaseColor, BaseStyle, useTheme} from '../../config';
// Load sample data
import {UserData} from '../../mock-data';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useForm, FormProvider} from 'react-hook-form';

const AccountEdit = props => {
  const {...methods} = useForm({
    mode: 'onChange',
    defaultValues: {
      email: UserData[0].email,
      name: UserData[0].name,
    },
  });
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [id, setId] = useState(UserData[0].id);
  const [name, setName] = useState(UserData[0].name);
  const [email, setEmail] = useState(UserData[0].email);
  const [address, setAddress] = useState(UserData[0].address);
  const [image, setImage] = useState(UserData[0].image);
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('edit_profile')}
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
        onPressRight={() => {}}
      />
      <ScrollView>
        <FormProvider {...methods}>
          <View style={styles.contain}>
            <View>
              <Image source={image} style={styles.thumb} />
            </View>
            <View style={styles.contentTitle}>
              <Text headline bold>
                {t('email')}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              autoCorrect={false}
              placeholder={t('input_email')}
              placeholderTextColor={BaseColor.grayColor}
              name="email"
              editable={false}
            />
            <View style={styles.contentTitle}>
              <Text headline bold>
                {t('name')}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              autoCorrect={false}
              placeholder={t('input_name')}
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={colors.primary}
              name="name"
              rules={{required: `Name ${t('is_required')}`}}
            />
          </View>
        </FormProvider>
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

export default AccountEdit;
