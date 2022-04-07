import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {Button, Header, Icon, Image, Loading, Text} from '../../components';
import {BaseStyle, useTheme} from '../../config';
import {bookLesson, getUserBalance} from '../../services/booking';

export default function Booking() {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const route = useRoute();
  const {timeSlot, tutor, callBack} = route.params;

  const [sucess, setSucess] = useState(false);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const startTime = new Date(timeSlot.startPeriodTimestamp);
  const endTime = new Date(timeSlot.endPeriodTimestamp);

  useEffect(() => {
    const fetchBalance = async () => {
      const userBalance = await getUserBalance();
      setBalance(userBalance);
      setLoading(false);
    };

    fetchBalance();
  }, []);

  const submit = async () => {
    setLoading(true);
    const res = await bookLesson([timeSlot.id], note);
    if (res) {
      setSucess(true);
      callBack();
    }
    setLoading(false);
  };
  if (loading) return <Loading />;
  if (sucess)
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView, {flex: 1}]}
        edges={['right', 'top', 'left']}>
        <Header
          title={t('book_lesson')}
          renderLeft={() => {
            return (
              <Icon
                name="angle-left"
                size={20}
                color={colors.text}
                enableRTL={true}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View>
          <View style={{padding: 20, width: '100%', alignItems: 'center'}}>
            <Icon name="check-circle" size={40} solid color={'#52C41A'} />
            <Text
              style={{fontWeight: 'bold', fontSize: 20, marginVertical: 20}}>
              Booking success
            </Text>
            <Text style={{fontSize: 15}}>
              Check your mail's inbox to see detail information
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {flex: 1}]}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('book_lesson')}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.text}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View>
        <Image
          source={{uri: tutor.avatar}}
          style={{
            width: 120,
            height: 120,
            borderRadius: 20,
            alignSelf: 'center',
          }}></Image>
        <View style={{margin: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="chalkboard-teacher" size={18} />
            <Text body1> Tutor: </Text>
            <Text body1 medium>
              {tutor.name}
            </Text>
          </View>
          <View style={styles.verticalDivide} />
          <View style={styles.rowItem}>
            <Icon name="calendar" size={18} />
            <Text body1>Booking date:</Text>
            <Text body1 medium>
              {startTime.toString().substring(0, 16)}
            </Text>
          </View>
          <View style={styles.verticalDivide} />
          <View style={styles.rowItem}>
            <Icon name="clock" size={18} />
            <Text body1>Booking time:</Text>
            <Text body1 medium>
              {startTime.toString().substring(16, 21)} -{' '}
              {endTime.toString().substring(16, 21)}
            </Text>
          </View>
          <View style={styles.verticalDivide} />
          <View style={styles.rowItem}>
            <Icon name="dollar-sign" size={18} />
            <Text body1>Price: </Text>
            <Text body1 medium>
              {' '}
              1 lesson
            </Text>
          </View>
          <View style={styles.verticalDivide} />
          <View style={styles.rowItem}>
            <Icon name="wallet" size={18} />
            <Text> Your balance: </Text>
            <Text style={{fontSize: 16}}>
              {' '}
              {balance} {balance > 1 ? 'lessons' : 'lesson'} left
            </Text>
          </View>
          <View style={styles.verticalDivide} />
          <Text>Request </Text>

          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder={'What you want the tutor know?'}
            multiline={true}
            style={{minHeight: 80}}
          />
        </View>
      </View>
      <Button full round style={{marginTop: 10, height: 50}} onPress={submit}>
        {t('book_now')}
      </Button>
      {/* <MyButton
        onPress={submit}
        title={'Book'}
        moreStyle={globalStyles.authBtnContainer}
        moreTitleStyle={{color: 'white'}}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  verticalDivide: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    paddingVertical: 3,
  },
});
