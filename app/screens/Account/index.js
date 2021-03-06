import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Icon,
  ProfileDetail,
  SafeAreaView,
  Text,
} from '../../components';
import {BaseStyle, useTheme} from '../../config';
import {UserData} from '../../mock-data';
import {NavConfig} from '../../navigation/config';
import {useStore} from '../../store';
import styles from './styles';

const Account = props => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(UserData[0]);
  const setTokens = useStore(state => state.setTokens);
  const userInfo = useStore(state => state.userInfo);

  const onLogOut = () => {
    setTokens(null);
  };

  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <View style={[BaseStyle.container, {flex: 1}]}>
        <View style={{marginBottom: 20}}>
          <Text header bold>
            {t('setting')}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <ProfileDetail
              image={{uri: userInfo.avatar}}
              textFirst={userInfo.name}
              textSecond={userInfo.phone}
              textThird={userInfo.email}
              onPress={() => {}}
            />
            <View style={{width: '100%', marginTop: 50}}>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate(NavConfig.Screens.AccountEdit);
                }}>
                <Text body1>{t('edit_account')}</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                  enableRTL={true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate(NavConfig.Screens.ChangePassword);
                }}>
                <Text body1>{t('change_password')}</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                  enableRTL={true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate(NavConfig.Screens.BecomeTutor1);
                  if (userInfo.tutorInfo) {
                    navigation.navigate(NavConfig.Screens.BecomeTutor3);
                  } else {
                    navigation.navigate(NavConfig.Screens.BecomeTutor1);
                  }
                }}>
                <Text body1>{t('become_tutor')}</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                  enableRTL={true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate(NavConfig.Screens.ChangeTheme);
                }}>
                <Text body1>{t('change_theme')}</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                  enableRTL={true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate(NavConfig.Screens.ChangeLanguage);
                }}>
                <Text body1>{t('change_language')}</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                  enableRTL={true}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{padding: 10}}>
        <Button full loading={loading} onPress={() => onLogOut()}>
          {t('sign_out')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Account;
