import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Button, Header, Icon, SafeAreaView, Text} from '../../components';
import {BaseStyle, useTheme} from '../../config';
import {useStore} from '../../store';
import styles from './styles';

const languages = [
  {key: 'en', name: 'English'},
  {key: 'vi', name: 'Vietnamese'},
];

const ChangeLanguage = props => {
  const {navigation} = props;
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [languageSelected, setLanguageSelected] = useState(i18n.language);
  const setLanguage = useStore(state => state.setLanguage);

  const onSelect = select => {
    setLanguageSelected(select);
  };

  const onChangeLanguage = () => {
    setLanguage(languageSelected);
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('change_theme')}
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

      <FlatList
        contentContainerStyle={{paddingHorizontal: 20}}
        data={languages}
        keyExtractor={item => item.key}
        renderItem={({item}) => {
          console.log('item', item);
          const selected = item.key === languageSelected;
          return (
            <TouchableOpacity
              style={[styles.item, {borderBottomColor: colors.border}]}
              onPress={() => onSelect(item.key)}>
              <View>
                <Text
                  body1
                  style={
                    selected
                      ? {
                          color: colors.primary,
                        }
                      : {}
                  }>
                  {item.name}
                </Text>
              </View>
              {selected && (
                <Icon name="check" size={14} color={colors.primary} />
              )}
            </TouchableOpacity>
          );
        }}
      />
      <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
        <Button full onPress={onChangeLanguage}>
          {t('change_language')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ChangeLanguage;
