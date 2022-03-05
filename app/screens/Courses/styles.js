import {StyleSheet} from 'react-native';
import {BaseColor, BaseStyle} from '../../config';

export default StyleSheet.create({
  searchInput: {
    flex: 1,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  search: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // backgroundColor: BaseColor.grayColor,
  },
  btnClearSearch: {
    position: 'absolute',
    right: 16,
    bottom: '50%',
    transform: [{translateY: 25}],
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: '100%',
  },
  rowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
