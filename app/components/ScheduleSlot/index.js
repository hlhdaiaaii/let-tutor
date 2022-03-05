import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image, Icon} from '../../components';
import {Text} from '../../components';
import PropTypes from 'prop-types';
import {AirbnbRating} from 'react-native-ratings';
import styles from './styles';
import {BaseColor, useTheme} from '../../config/theme';
import DropShadow from 'react-native-drop-shadow';

const ScheduleSlot = ({tutorName, from, to, avatar}) => {
  return (
    <DropShadow
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
      }}>
      <TouchableOpacity style={[styles.contain]} activeOpacity={0.9}>
        <View style={[styles.content]}>
          <Image source={avatar} style={[styles.thumb]} />
          <View style={{marginLeft: 5}}>
            <Text
              headline
              heavy
              lightPrimaryColor
              numberOfLines={1}
              style={{marginLeft: 5}}>
              {tutorName}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View>
                <Text
                  caption1
                  lightPrimaryColor
                  numberOfLines={1}
                  style={{marginLeft: 5}}>
                  {`${from}`}
                </Text>
              </View>
              <Text
                caption1
                lightPrimaryColor
                numberOfLines={1}
                style={{marginLeft: 5}}>
                {`-`}
              </Text>
              <View>
                <Text
                  caption1
                  lightPrimaryColor
                  numberOfLines={1}
                  style={{marginLeft: 5}}>
                  {`${to}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </DropShadow>
  );
};

export default ScheduleSlot;
