import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image, Icon} from '../../components';
import {Text} from '../../components';
import PropTypes from 'prop-types';
import {AirbnbRating} from 'react-native-ratings';
import styles from './styles';
import {BaseColor, useTheme} from '../../config/theme';

export default function Tutor(props) {
  const {colors} = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    style,
    image,
    styleLeft,
    styleThumb,
    styleRight,
    onPress,
    name,
    description,
    textRight,
    styleName,
    styleDescription,
    onFavoriteClick = isFavorite => {},
  } = props;

  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <View style={[styles.content]}>
        <Image source={image} style={[styles.thumb, styleThumb]} />
        <View style={{marginLeft: 5}}>
          <Text headline semibold numberOfLines={1} style={{marginLeft: 5}}>
            {name}
          </Text>
          <AirbnbRating
            count={5}
            defaultRating={5}
            size={20}
            showRating={false}
            isDisabled
          />
        </View>
        <TouchableOpacity
          style={[
            styles.heartFavorite,
            {
              backgroundColor: isFavorite
                ? colors.primaryLight
                : BaseColor.whiteColor,
              // backgroundColor: colors.primaryLight,
              borderColor: BaseColor.whiteColor,
            },
          ]}
          onPress={() => {
            onFavoriteClick(isFavorite);
            setIsFavorite(!isFavorite);
          }}>
          <Icon
            solid
            name="heart"
            size={20}
            color={isFavorite ? BaseColor.whiteColor : colors.primaryLight}
          />
        </TouchableOpacity>
      </View>
      <Text body2 grayColor medium numberOfLines={5} style={styleDescription}>
        {description}
      </Text>
      {/* <View style={[styles.contentRight, styleRight]}>
        <Text caption2 grayColor numberOfLines={1}>
          {textRight}
        </Text>
      </View> */}
    </TouchableOpacity>
  );
}

Tutor.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  textRight: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
};

Tutor.defaultProps = {
  image: '',
  name: '',
  description: '',
  textRight: '',
  styleLeft: {},
  styleThumb: {},
  styleRight: {},
  style: {},
  onPress: () => {},
};
