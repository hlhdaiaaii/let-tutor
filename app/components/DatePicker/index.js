import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {Platform, Text, View} from 'react-native';
import {Button} from '../../components';

export default function MyDateTimePicker({title, mode, value, onChageValue}) {
  const isIOS = Platform.OS === 'ios';

  const AndroidDateTimePicker = () => {
    const [show, setShow] = useState(false);
    const onChangeAndroid = (event, selectedDate) => {
      setShow(false);
      const currentDate = selectedDate || value;
      // setDate(currentDate)
      onChageValue(currentDate);
    };
    return (
      <View>
        <Button outline style={{height: 25}} onPress={() => setShow(true)}>
          {value.toLocaleDateString()}
        </Button>
        {show && (
          <DateTimePicker
            testID="dateTimePickerAndroid"
            value={value}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeAndroid}
          />
        )}
      </View>
    );
  };
  const onChangeIOS = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    onChageValue(currentDate);
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
      <Text style={{marginHorizontal: 5, fontSize: 16, fontWeight: '600'}}>
        {title}
      </Text>
      {isIOS ? (
        <DateTimePicker
          value={value}
          mode={'date'}
          display="default"
          onChange={onChangeIOS}
          style={{width: 130}}
        />
      ) : (
        <AndroidDateTimePicker />
      )}
    </View>
  );
}
