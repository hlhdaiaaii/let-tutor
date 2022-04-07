import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Header, Icon} from '../../components';
import {BaseStyle, useTheme} from '../../config';
import Toast from 'react-native-toast-message';
import {sendReportTutor} from '../../services/tutor';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import DropShadow from 'react-native-drop-shadow';

export const ReportTutor = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {tutor} = route.params;
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [report1, setReport1] = useState(false);
  const [report2, setReport2] = useState(false);
  const [report3, setReport3] = useState(false);
  const [report4, setReport4] = useState(false);
  const [report5, setReport5] = useState(false);
  const [description, setDescript] = useState('');

  const setDescription = id => {
    setDescript(description + reportContent[id] + '\n');
  };
  const removeDescription = id => {
    setDescript(description.replace(reportContent[id] + '\n', ''));
  };
  const send = async () => {
    if (description == '') {
      Toast.show({
        type: 'warning',
        text1: 'Report error',
        text2: 'Please enter detail problem about this tutor!',
      });
      return;
    }
    const res = await sendReportTutor(tutor.id, description);
    if (res) {
      Toast.show({
        type: 'success',
        text1: 'Report sent',
        text2: 'We will consider the matter as soon as possible.',
      });
      navigation.goBack();
    }
  };
  const select1 = () => {
    if (!report1) setDescription(0);
    else removeDescription(0);
    setReport1(!report1);
  };
  const select2 = () => {
    if (!report2) setDescription(1);
    else removeDescription(1);
    setReport2(!report2);
  };
  const select3 = () => {
    if (!report3) setDescription(2);
    else removeDescription(2);
    setReport3(!report3);
  };
  const select4 = () => {
    if (!report4) setDescription(3);
    else removeDescription(3);
    setReport4(!report4);
  };
  const select5 = () => {
    if (!report5) setDescription(4);
    else removeDescription(4);
    setReport5(!report5);
  };
  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {flex: 1}]}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('tutor')}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.text}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{margin: 10}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Icon name="exclamation-circle" size={40} color={'#f0932b'} />
        </View>
        <Text style={styles.title}>You are reporting {tutor.name}</Text>
        <Text style={styles.title}>Help us understand what's happening!</Text>
        <View style={{margin: 10}}>
          <TouchableOpacity style={styles.checkBoxRow} onPress={select1}>
            <View style={styles.checkBox}>
              <Icon
                name="check-circle"
                color={report1 ? 'green' : 'gray'}
                size={20}
              />
            </View>
            <Text style={styles.itemContent}>This tutor is annoying me</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkBoxRow} onPress={select2}>
            <View style={styles.checkBox}>
              <Icon
                name="check-circle"
                color={report2 ? 'green' : 'gray'}
                size={20}
              />
            </View>
            <Text style={styles.itemContent}>
              This profile is pretending be someone or is fake
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkBoxRow} onPress={select3}>
            <View style={styles.checkBox}>
              <Icon
                name="check-circle"
                color={report3 ? 'green' : 'gray'}
                size={20}
              />
            </View>
            <Text style={styles.itemContent}>Inappropriate profile photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkBoxRow} onPress={select4}>
            <View style={styles.checkBox}>
              <Icon
                name="check-circle"
                color={report4 ? 'green' : 'gray'}
                size={20}
              />
            </View>
            <Text style={styles.itemContent}>
              This tutor didn't appear at lesson
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkBoxRow} onPress={select5}>
            <View style={styles.checkBox}>
              <Icon
                name="check-circle"
                color={report5 ? 'green' : 'gray'}
                size={20}
              />
            </View>
            <Text style={styles.itemContent}>
              This tutor's behavior is not appropriate
            </Text>
          </TouchableOpacity>
        </View>

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
          <TextInput
            multiline={true}
            style={styles.textInput}
            placeholder={'Let us know details about the problem'}
            value={description}
            onChangeText={setDescript}
          />
        </DropShadow>

        <Button
          outline
          round
          style={{backgroundColor: 'white', marginTop: 10, height: 50}}
          onPress={send}>
          {t('send_report')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const reportContent = [
  'This tutor is annoying me',
  'This profile is pretending be someone or is fake',
  'Inappropriate profile photo',
  "This tutor didn't appear at lesson",
  "This tutor's behavior is not appropriate",
];

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#6ab04c',
    fontSize: 18,
    textAlign: 'center',
  },
  textInput: {
    minHeight: 60,
    margin: 5,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  checkBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  itemContent: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 5,
  },
  checkBox: {justifyContent: 'center', alignItems: 'center'},
});
