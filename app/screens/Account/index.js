import React, {useState} from 'react';
// import {AuthActions, ApplicationActions} from '@actions';
import {
  Button,
  Icon,
  ProfileDetail,
  SafeAreaView,
  Text,
} from '../../components';
import {BaseStyle, useTheme} from '../../config';
// Load sample data
import {UserData} from '../../mock-data';
import {useTranslation} from 'react-i18next';
import {ScrollView, TouchableOpacity, View, Switch} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {useStore} from '../../store';
import {useNavigation} from '@react-navigation/native';
import {NavConfig} from '../../navigation/config';
// const {authentication} = AuthActions;

const Account = props => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(UserData[0]);
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);

  const onLogOut = () => {
    setIsLoggedIn(false);
  };

  // const onLogIn = () => {
  //   navigation.navigate('SignIn');
  // };

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
              image={userData.image}
              textFirst={userData.name}
              point={userData.point}
              textSecond={userData.address}
              textThird={userData.id}
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
