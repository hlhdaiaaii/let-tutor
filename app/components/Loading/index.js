import {View, ActivityIndicator} from 'react-native';

export default function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator color={'black'} size="large" />
    </View>
  );
}
