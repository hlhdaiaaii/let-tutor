import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
  },
  specifications: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
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
