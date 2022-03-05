import React from 'react';
import {Icon, Image, Text} from '../../components';
import {useTheme} from '../../config';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {AirbnbRating} from 'react-native-ratings';

export default function Review(props) {
  const {colors} = useTheme();
  const {style, image, name, date, review, rate, onAction = () => {}} = props;
  return (
    <View style={[styles.contain, {backgroundColor: colors.background}, style]}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
          alignItems: 'center',
        }}>
        <Image source={image} style={styles.thumb} />
        <View
          style={{
            flex: 1,
          }}>
          <Text headline numberOfLines={1}>
            {name}
          </Text>

          <Text footnote grayColor numberOfLines={1}>
            {date}
          </Text>
        </View>
        <AirbnbRating
          count={5}
          defaultRating={5}
          size={20}
          showRating={false}
          isDisabled
        />
      </View>
      <View>
        <Text
          body2
          thin grayColor
          style={{
            marginTop: 10,
          }}>
          {review}
        </Text>
      </View>
    </View>
  );
}

Review.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  date: PropTypes.string,
  review: PropTypes.string,
  onAction: PropTypes.func,
};
