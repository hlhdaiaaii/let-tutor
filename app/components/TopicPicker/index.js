import React from 'react';
import {StyleSheet, View} from 'react-native';
import MultiSelect from 'react-native-sectioned-multi-select';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon, Text} from '../../components';
import {useTheme} from '../../config';
import {topics} from '../../config/constant';

export default function TopicPicker({
  title = 'Topics want to learn',
  value,
  onChangeValue,
}) {
  const onSelected = result => {
    console.log(result);
    onChangeValue(result);
  };

  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <MultiSelect
        IconRenderer={MaterialIcons}
        readOnlyHeadings={true}
        onSelectedItemsChange={onSelected}
        selectedItems={value}
        subKey="children"
        items={topics}
        uniqueKey="id"
        selectText={title}
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
        hideSearch
        showDropDowns={false}
        confirmText={'Pick'}
        selectToggleIconComponent={<Icon name={'angle-down'} size={18} />}
        selectToggleTextColor={colors.primary}
        renderSelectText={() => (
          <Text subhead bold grayColor>
            {title}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  title: {fontWeight: '500', marginLeft: 4},
  typeContainer: {
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
