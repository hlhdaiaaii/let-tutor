import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '../../config';

export default StyleSheet.create({
  contain: {
    flexDirection: 'column',
    padding: 10,
    width: '100%',
    // marginBottom: 20,
    backgroundColor: BaseColor.whiteColor,
    borderRadius: 10,
    marginVertical: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 30,
    marginRight: 5,
  },
  heartFavorite: {
    width: 32,
    height: 32,
    borderRadius: 20,
    position: 'absolute',
    // bottom: 0,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
