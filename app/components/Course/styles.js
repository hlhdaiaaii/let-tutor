import {StyleSheet} from 'react-native';
import {BaseColor} from '../../config';
import {Dimensions} from 'react-native';

export default StyleSheet.create({
  imageBackground: {
    height: ((Dimensions.get('window').width - 40) * 3) / 4,
    width: '100%',
  },
  viewBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
  },

  thumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  styleThumb: {
    borderWidth: 1,
    borderColor: BaseColor.whiteColor,
  },
});
