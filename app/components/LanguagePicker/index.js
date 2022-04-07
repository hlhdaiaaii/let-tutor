import React from 'react';
import {StyleSheet, View} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {languages} from '../../config/constant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text, Icon} from '../../components';

export default function LanguagePicker({value, onChangeValue}) {
  const items = getListLanguage();
  const onSelected = result => {
    console.log(result);
    onChangeValue(result);
  };
  return (
    <View style={styles.container}>
      <SectionedMultiSelect
        IconRenderer={MaterialIcons}
        onSelectedItemsChange={onSelected}
        selectedItems={value}
        items={items}
        uniqueKey="id"
        selectToggleIconComponent={
          <Icon name={'angle-down'} size={18} style={{marginLeft: -210}} />
        }
        renderSelectText={() => (
          <Text subhead bold grayColor style={{marginLeft: -225}}>
            Language I speak
          </Text>
        )}
        showRemoveAll
        modalWithSafeAreaView={true}
        styles={{
          selectToggle: {
            padding: 5,
            marginBottom: 10,
            justifyContent: 'space-evenly',
          },
          selectToggleText: {
            fontWeight: '600',
          },
          chipContainer: {
            backgroundColor: 'white',
          },
        }}
        showCancelButton
        // hideSearch
        showDropDowns={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    marginHorizontal: 3,
    // alignItems: 'center',
    // justifyContent: 'space-between'
  },
  // title: {fontWeight: '500', marginLeft: 4},
  typeContainer: {
    // padding: 6,
    paddingHorizontal: 9,
    flexDirection: 'row',
    borderWidth: 0.25,
    borderColor: 'gray',
    alignItems: 'center',
    borderRadius: 6,
  },
  typeContent: {
    fontWeight: '600',
    marginHorizontal: 5,
  },
});

function getListLanguage() {
  const result = [];
  for (var key in languages) {
    result.push({
      id: key,
      name: languages[key],
    });
  }
  return result;
}
