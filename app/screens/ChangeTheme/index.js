import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, TouchableOpacity, View, StatusBar} from 'react-native';
import {Header, Icon, SafeAreaView, Text, Button} from '../../components';
import {BaseStyle, ThemeSupport, useTheme} from '../../config';
import {useStore} from '../../store';
import styles from './styles';

const ChangeTheme = props => {
  const themeStorage = useStore(state => state.theme);
  const setAppTheme = useStore(state => state.setTheme);
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [themeSupport, setTheme] = useState(ThemeSupport);

  useEffect(() => {
    setTheme(
      themeSupport.map(item => {
        return {
          ...item,
          selected: item.theme == themeStorage,
        };
      }),
    );
  }, []);

  const onSelect = selected => {
    setTheme(
      themeSupport.map(item => {
        return {
          ...item,
          selected: item.theme == selected.theme,
        };
      }),
    );
  };

  const onChangeTheme = () => {
    const list = themeSupport.filter(item => item.selected);
    if (list.length > 0) {
      setAppTheme(list[0].theme);
      StatusBar.setBackgroundColor(list[0].light.colors.primary, true);
    }
  };

  const renderItem = item => {
    return (
      <TouchableOpacity
        style={[
          styles.profileItem,
          {borderBottomColor: colors.border, borderBottomWidth: 1},
        ]}
        onPress={() => onSelect(item)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 16,
              height: 16,
              backgroundColor: item.light.colors.primary,
            }}
          />
          <Text body1 style={{marginHorizontal: 8}}>
            {item.theme}
          </Text>
        </View>
        {item.selected && (
          <Icon name="check" size={18} color={colors.primary} />
        )}
      </TouchableOpacity>
    );
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
        contentContainerStyle={styles.contain}
        data={themeSupport}
        keyExtractor={(item, index) => item.theme}
        renderItem={({item}) => renderItem(item)}
      />
      <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
        <Button full onPress={onChangeTheme}>
          {t('change_theme')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ChangeTheme;
