// import React, {useState, useEffect} from 'react';
// import {SafeAreaView, View, TouchableOpacity, ScrollView} from 'react-native';

// import {
//   Button,
//   CountryPicker,
//   DatePicker,
//   Header,
//   Icon,
//   LanguagePicker,
//   Image,
//   Text,
//   TextInput,
//   TopicPicker,
//   Loading,
// } from '../../components';
// import {useStore} from '../../store';

// export default function AccountEdit({navigation}) {
//   const userInfo = useStore(state => state.userInfo);

//   const [name, setName] = useState(userInfo.name);
//   const [phone, setPhone] = useState(userInfo.phone);
//   const [birthday, setBirthday] = useState(userInfo.birthday);
//   const [country, setCountry] = useState(userInfo.country);
//   const [img, setImg] = useState({uri: userInfo.avatar});
//   const [tempImg, setTeamImg] = useState(null);

//   const [level, setLevel] = useState(userInfo.level);
//   const [wantToLearn, setWantToLearn] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const updateData = async () => {
//     setLoading(true);
//     try {
//       const choices = getWantToLearnObject(wantToLearn);
//       const res = await axios.put(
//         serverUrl + 'user/info',
//         {
//           name,
//           country,
//           phone,
//           birthday: birthday.toLocaleString().substring(0, 10),
//           level: level.value,
//           learnTopics: choices.topic,
//           testPreparations: choices.preparation,
//         },
//         {headers: {Authorization: 'Bearer ' + userInfo.tokens.access.token}},
//       );
//       dispatch(setUserInfoAction(res.data.user));
//       showMessage({type: 'success', message: 'Update successful'});
//     } catch (error) {
//       errorHandle(error);
//     }
//     setLoading(false);
//   };
//   useEffect(() => {
//     getData();
//   }, []);
//   const editAvt = () => {
//     launchImageLibrary(options, Response => {
//       if (Response.didCancel) {
//         return;
//       } else if (Response.errorCode) {
//         showMessage({
//           message: 'Action failed',
//           description: Response.errorMessage,
//           type: 'danger',
//         });
//       } else {
//         console.log(Response.assets);
//         const result = Response.assets[0];
//         setTeamImg(result);
//       }
//     });
//   };
//   const cancelUploadImg = () => {
//     setTeamImg(null);
//   };
//   const uploadImage = async () => {
//     setLoading(true);
//     const res = await updateAvatar(token, tempImg);
//     if (res) {
//       setImg({uri: tempImg.uri});
//       setTeamImg(null);
//       dispatch(updateAvatarAction({avatar: tempImg.uri}));
//     }
//     setLoading(false);
//   };
//   return (
//     <SafeAreaView style={globalStyles.container}>
//       {loading && <LoadingIndicator />}
//       <ReviewImage
//         loading={loading}
//         show={tempImg != null}
//         imgSrc={tempImg}
//         onCancel={cancelUploadImg}
//         onUpdate={uploadImage}
//       />
//       <ScrollView>
//         <Card>
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <TouchableOpacity
//               style={{
//                 alignItems: 'center',
//                 marginHorizontal: 10,
//                 marginVertical: 2,
//               }}
//               onPress={editAvt}>
//               <Image style={globalStyles.avt} source={img} />
//               <View style={{flexDirection: 'row', marginTop: 4}}>
//                 <Text style={{fontWeight: '500', color: '#3399ff'}}>Edit</Text>
//                 <GetIcon
//                   iconName={'edit'}
//                   source={'AntDesign'}
//                   size={16}
//                   color={'#3399ff'}
//                 />
//               </View>
//             </TouchableOpacity>
//             <View style={{flex: 1}}>
//               <Text style={globalStyles.titleName}>{userInfo.name}</Text>
//               <Text>
//                 <Text style={{fontWeight: '600'}}>Account id:</Text>{' '}
//                 {userInfo.id}
//               </Text>
//               <Text>
//                 <Text style={{fontWeight: '600'}}>Account type:</Text> {role}
//               </Text>
//             </View>
//           </View>
//         </Card>
//         <Card>
//           <TextInputCard
//             title={'Name'}
//             placeholder={'Enter your name'}
//             value={name}
//             onChangeValue={setName}
//           />
//           <SeperateVertical />

//           <TextInputCard
//             title={'Phone number'}
//             keyboardType={'phone-pad'}
//             value={phone}
//             onChangeValue={setPhone}
//             placeholder={'Enter your phone number'}
//           />
//           <SeperateVertical />

//           <TextInputCard
//             title={'Email'}
//             placeholder={'Enter your email'}
//             isEdit={false}
//             value={userInfo.email}
//           />
//           <SeperateVertical />
//           <MyDatePicker
//             title={'Birthday: '}
//             value={birthday}
//             onChageValue={setBirthday}
//           />
//           <SeperateVertical />
//           <CountryPicker value={country} didSelect={setCountry} />
//           <SeperateVertical />

//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'row',
//               margin: 5,
//               alignItems: 'center',
//               marginVertical: 2,
//             }}>
//             <Text style={{fontWeight: '600', fontSize: 16, marginLeft: 5}}>
//               My level:{' '}
//             </Text>
//             <Picker value={level} data={myLevels} didSelect={setLevel} />
//           </View>
//           <SeperateVertical />
//           <PickWantToLearn value={wantToLearn} onChangeValue={setWantToLearn} />
//         </Card>
//       </ScrollView>
//       <MyButton
//         onPress={updateData}
//         moreStyle={{...globalStyles.authBtnContainer, width: '69%'}}
//         title={'Save'}
//         moreTitleStyle={{color: 'white'}}
//       />
//     </SafeAreaView>
//   );
// }

// const SeperateVertical = () => {
//   return (
//     <View
//       style={{
//         borderBottomColor: 'gray',
//         borderBottomWidth: 0.5,
//         margin: 10,
//       }}></View>
//   );
// };
// function getLevelItem(value) {
//   return myLevels.find(item => item.value == value);
// }

// const options = {
//   title: 'Select Image',
//   customButtons: [
//     {
//       name: 'customOptionKey',
//       title: 'Choose Photo from Custom Option',
//     },
//   ],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };
