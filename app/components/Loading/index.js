import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './styles';

export default function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator color={'black'} size="large" />
    </View>
  );
}
