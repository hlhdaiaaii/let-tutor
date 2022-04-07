import React from 'react';
import {View} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {useTheme} from '../../config';

const labels = ['Complete profile', 'Video introduction', 'Approval'];
export default function Step({step}) {
  const {colors} = useTheme();

  return (
    <View style={{width: '100%', padding: 4, backgroundColor: 'white'}}>
      <StepIndicator
        currentPosition={step}
        labels={labels}
        stepCount={3}
        customStyles={{
          currentStepLabelColor: colors.primary,
          separatorFinishedColor: colors.primaryDark,
          stepStrokeCurrentColor: colors.primaryLight,
          stepIndicatorFinishedColor: colors.primary,
          separatorUnFinishedColor: 'gray',
          stepIndicatorUnFinishedColor: 'gray',
          stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,1)',
        }}
      />
    </View>
  );
}
