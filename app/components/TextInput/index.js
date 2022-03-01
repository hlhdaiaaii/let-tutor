import React, {forwardRef} from 'react';
import {I18nManager, TextInput, View} from 'react-native';
import {BaseColor, BaseStyle, useFont, useTheme} from '../../config';
import PropTypes from 'prop-types';
import {Text} from '../../components';
import {useController, useFormContext} from 'react-hook-form';

const Index = forwardRef((props, ref) => {
  const font = useFont();
  const {colors} = useTheme();
  const cardColor = colors.card;
  const {
    style,
    onChangeText = () => {},
    onFocus = () => {},
    placeholder,
    value,
    success,
    secureTextEntry,
    keyboardType,
    multiline,
    textAlignVertical,
    icon,
    onSubmitEditing = () => {},
    inputStyle,
    onBlur = () => {},
    name,
    label,
    rules,
    defaultValue,
    ...attrs
  } = props;

  const formContext = useFormContext();
  const {formState} = formContext;
  const {field} = useController({name, rules, defaultValue});
  const hasError = Boolean(formState?.errors[name]);

  if (!formContext || !name) {
    const msg = !formContext
      ? 'TextInput must be wrapped by the FormProvider'
      : 'Name must be defined';
    console.error(msg);
    return null;
  }

  return (
    <View style={{marginBottom: 20}}>
      {label && (
        <Text subhead bold grayColor>
          {label}
        </Text>
      )}
      <View style={[BaseStyle.textInput, {backgroundColor: cardColor}, style]}>
        <TextInput
          ref={ref}
          style={[
            {
              fontFamily: `${font}-Regular`,
              flex: 1,
              height: '100%',
              textAlign: I18nManager.isRTL ? 'right' : 'auto',
              color: colors.text,
              paddingTop: 5,
              paddingBottom: 5,
            },
            inputStyle,
          ]}
          onFocus={() => onFocus()}
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor={success ? BaseColor.grayColor : colors.primary}
          secureTextEntry={secureTextEntry}
          selectionColor={colors.primary}
          keyboardType={keyboardType}
          multiline={multiline}
          textAlignVertical={textAlignVertical}
          onSubmitEditing={onSubmitEditing}
          onChangeText={e => {
            onChangeText(e);
            field.onChange(e);
          }}
          onBlur={e => {
            onBlur(e);
            field.onBlur(e);
          }}
          value={field.value}
          {...attrs}
        />
        {icon}
      </View>
      {hasError && (
        <Text style={{color: BaseColor.pinkDarkColor}}>
          {formState.errors[name].message}
        </Text>
      )}
    </View>
  );
});

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  success: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  multiline: PropTypes.bool,
  textAlignVertical: PropTypes.string,
  icon: PropTypes.node,
  onSubmitEditing: PropTypes.func,
  inputStyle: PropTypes.object,
  error: PropTypes.string,
  label: PropTypes.string,
};

Index.defaultProps = {
  inputStyle: {},
  style: {},
  onChangeText: text => {},
  onFocus: () => {},
  placeholder: 'Placeholder',
  value: '',
  success: true,
  secureTextEntry: false,
  keyboardType: 'default',
  multiline: false,
  textAlignVertical: 'center',
  icon: null,
  onSubmitEditing: () => {},
};

export default Index;
