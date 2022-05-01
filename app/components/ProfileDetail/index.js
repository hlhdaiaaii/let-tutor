import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from '../../components/Icon';
import Image from '../../components/Image';
import Text from '../../components/Text';
import { BaseColor, useTheme } from '../../config';
import styles from './styles';

export default function ProfileDetail(props) {
  const {colors} = useTheme();
  const {
    style,
    image,
    styleLeft,
    styleThumb,
    styleRight,
    onPress,
    textFirst,
    textSecond,
    textThird,
    icon,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <View style={[styles.contentLeft, styleLeft]}>
        <View>
          <Image source={image} style={[styles.thumb, styleThumb]} />
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <Text headline semibold numberOfLines={1}>
            {textFirst}
          </Text>
          <Text
            body2
            style={{
              marginTop: 3,
              paddingRight: 10,
            }}
            numberOfLines={1}>
            {textSecond}
          </Text>
          <Text footnote grayColor numberOfLines={1}>
            {textThird}
          </Text>
        </View>
      </View>
      {icon && (
        <View style={[styles.contentRight, styleRight]}>
          <Icon
            name="angle-right"
            size={18}
            color={BaseColor.grayColor}
            enableRTL={true}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
