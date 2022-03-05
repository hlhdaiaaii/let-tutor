import React from 'react';
import PropTypes from 'prop-types';
import {Text} from '../../components';
import {BaseColor} from '../../config';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import styles from './styles';

const Course = props => {
  const {title, image, level, nLessons, style, onPress} = props;

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <ImageBackground
        source={image}
        style={styles.imageBackground}
        borderRadius={8}>
        <View style={styles.viewBackground}>
          {/* <View style={styles.viewItem}></View> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text title3 whiteColor bold>
              {title}
            </Text>
            <View>
              <View>
                <Text body1 whiteColor thin>
                  {level}
                </Text>
              </View>
              <View>
                <Text body1 whiteColor bold>
                  {`${nLessons} lessons`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

Course.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
};

Course.defaultProps = {
  style: {},
  name: '',
  description: '',
  title: '',
  onPress: () => {},
};

export default Course;
