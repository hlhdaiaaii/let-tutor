import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contain: {
    flexDirection: 'column',
    paddingVertical: 10,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 5,
  },
  heartFavorite: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    // bottom: 0,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
