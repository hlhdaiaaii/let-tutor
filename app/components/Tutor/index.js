import React, {useState} from 'react';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import {Image, Icon} from '../../components';
import {Text} from '../../components';
import PropTypes from 'prop-types';
import {AirbnbRating} from 'react-native-ratings';
import styles from './styles';
import {BaseColor, useTheme} from '../../config/theme';
import DropShadow from 'react-native-drop-shadow';
import Tag from '../Tag';

const topics = [
  // {id: '1', name: 'Recommended'},
  // {id: '2', name: 'English for Kids'},
  // {id: '3', name: 'Bussiness English'},
  // {id: '4', name: 'Conversational Englis'},
  // {id: '5', name: 'STARTERS'},
  // {id: '6', name: 'MOVERS'},
  // {id: '7', name: 'FLYERS'},
  {id: '8', name: 'KET'},
  {id: '9', name: 'PET'},
  {id: '10', name: 'IELTS'},
  {id: '11', name: 'TOEFL'},
  {id: '12', name: 'TOEIC'},
];
export default function Tutor(props) {
  const {
    style,
    image,
    styleThumb,
    onPress,
    name,
    description,
    styleDescription,
    isFavorite,
    onFavoriteClick = isFavorite => {},
    specialties = [],
    rating = 5,
  } = props;
  const {colors} = useTheme();
  const [favorite, setFavorite] = useState(isFavorite);
  

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
          <Image source={{uri: image}} style={[styles.thumb, styleThumb]} />
          <View style={{marginLeft: 5, maxWidth: '50%'}}>
            <Text
              headline
              heavy
              lightPrimaryColor
              numberOfLines={1}
              style={{marginLeft: 5}}>
              {name}
            </Text>
            <AirbnbRating
              count={5}
              defaultRating={rating}
              size={20}
              showRating={false}
              isDisabled
              ratingContainerStyle={{translateX: -18}}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {specialties.map(item => (
                <Tag
                  key={item.key}
                  outline
                  rateSmall
                  style={{
                    // backgroundColor: BaseColor.whiteColor,
                    marginRight: 8,
                    height: 28,
                  }}>
                  {item.name}
                </Tag>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={[
              styles.heartFavorite,
              {
                backgroundColor: favorite
                  ? BaseColor.whiteColor
                  : colors.primaryLight,
                // backgroundColor: colors.primaryLight,
                borderColor: 'black',
              },
            ]}
            onPress={() => {
              onFavoriteClick(favorite);
              setFavorite(!favorite);
            }}>
            <Icon
              solid
              name="heart"
              size={favorite ? 25 : 20}
              color={favorite ? colors.primaryLight : BaseColor.whiteColor}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            body1
            grayColor
            regular
            numberOfLines={5}
            style={styleDescription}>
            {description}
          </Text>
        </View>

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
