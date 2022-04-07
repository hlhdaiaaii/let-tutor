import React from 'react';
import {View} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {Icon, Text} from '../../components';

export default function MyCountryPicker({value, didSelect}) {
  const onSelect = result => {
    didSelect(result.cca2);
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CountryPicker
          {...{
            countryCode: value,
            withFlag: true,
            withFilter: true,
            withCountryNameButton: true,
            onSelect: onSelect,
            containerButtonStyle: {padding: 0},
          }}
        />
        <Icon name={'angle-down'} size={18} style={{marginLeft: 5}} />
      </View>
    </View>
  );
}
