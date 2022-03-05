import {Button, Icon, Image, Text} from '../../components';
import {BaseColor, useTheme} from '../../config';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

const dates = [
  '2022-01-01',
  '2022-01-02',
  '2022-01-03',
  '2022-01-04',
  '2022-01-05',
  '2022-01-05',
  '2022-01-05',
  '2022-01-05',
];

const timeSlots = [
  {from: '08:00', to: '10:00'},
  {from: '08:00', to: '10:00'},
  {from: '08:00', to: '10:00'},
  {from: '08:00', to: '10:00'},
  {from: '08:00', to: '10:00'},
  {from: '08:00', to: '10:00'},
];

const BookingModal = ({...attrs}) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const cardColor = colors.card;
  const [chosenDateIdx, setChosenDateIdx] = useState(null);
  const [chosenTimeIdx, setChosenTimeIdx] = useState(null);
  const [step, setStep] = useState(0);

  return (
    <Modal swipeDirection={['down']} style={styles.bottomModal} {...attrs}>
      <View style={[styles.contentBottom, {backgroundColor: cardColor}]}>
        <View style={styles.contentSwipeDown}>
          <View style={styles.lineSwipeDown} />
        </View>
        {step === 0 && (
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              data={dates}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={[
                    styles.date,
                    {borderColor: colors.primary},
                    chosenDateIdx === index
                      ? {backgroundColor: colors.primary}
                      : {backgroundColor: BaseColor.whiteColor},
                  ]}
                  activeOpacity={0.9}
                  onPress={() => setChosenDateIdx(index)}>
                  <Text
                    numberOfLines={1}
                    style={
                      chosenDateIdx === index
                        ? {color: BaseColor.whiteColor}
                        : {color: colors.primaryDark}
                    }>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <Button
              round
              style={{marginTop: 10, marginBottom: 20}}
              onPress={() => setStep(prev => prev + 1)}>
              {t('choose_date')}
            </Button>
          </>
        )}
        {step === 1 && (
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              data={timeSlots}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={[
                    styles.date,
                    {borderColor: colors.primary},
                    chosenTimeIdx === index
                      ? {backgroundColor: colors.primary}
                      : {backgroundColor: BaseColor.whiteColor},
                  ]}
                  activeOpacity={0.9}
                  onPress={() => setChosenTimeIdx(index)}>
                  <Text
                    numberOfLines={1}
                    style={
                      chosenTimeIdx === index
                        ? {color: BaseColor.whiteColor}
                        : {color: colors.primaryDark}
                    }>
                    {`${item.from} - ${item.to}`}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <Button round style={{marginTop: 10, marginBottom: 20}}>
              {t('choose_time')}
            </Button>
          </>
        )}
      </View>
    </Modal>
  );
};

export default BookingModal;
