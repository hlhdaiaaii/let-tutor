import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image, Icon} from '../../components';
import {Text} from '../../components';
import PropTypes from 'prop-types';
import {AirbnbRating} from 'react-native-ratings';
import styles from './styles';
import {BaseColor, useTheme} from '../../config/theme';
import DropShadow from 'react-native-drop-shadow';

export default function Tutor(props) {
  const {colors} = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    style,
    image,
    styleThumb,
    onPress,
    name,
    description,
    styleDescription,
    onFavoriteClick = isFavorite => {},
  } = props;

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
      <TouchableOpacity
        style={[styles.contain, style]}
        onPress={onPress}
        activeOpacity={0.9}>
        <View style={[styles.content]}>
          <Image source={image} style={[styles.thumb, styleThumb]} />
          <View style={{marginLeft: 5}}>
            <Text headline heavy lightPrimaryColor numberOfLines={1} style={{marginLeft: 5}}>
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
                  ? BaseColor.whiteColor
                  : colors.primaryLight,
                // backgroundColor: colors.primaryLight,
                borderColor: 'black',
              },
            ]}
            onPress={() => {
              onFavoriteClick(isFavorite);
              setIsFavorite(!isFavorite);
            }}>
            <Icon
              solid
              name="heart"
              size={isFavorite ? 25 : 20}
              color={isFavorite ? colors.primaryLight : BaseColor.whiteColor}
            />
          </TouchableOpacity>
        </View>
        <Text body1 grayColor regular numberOfLines={5} style={styleDescription}>
          {description}
        </Text>
        {/* <View style={[styles.contentRight, styleRight]}>
        <Text caption2 grayColor numberOfLines={1}>
          {textRight}
        </Text>
      </View> */}
      </TouchableOpacity>
    </DropShadow>
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
