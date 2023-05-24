import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Keyboard, PermissionsAndroid, Platform, TextComponent } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MyAlert from '../../../component/MyAlert';
import Toast from 'react-native-toast-message';
import Loader from '../../../WebApi/Loader';
import LinearGradient from 'react-native-linear-gradient';
import { baseUrl, login, shop_eat_business, requestPostApi, requestGetApi, connect_dating_profile, connect_dating_editprofile, common_master_attributes, } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import RNPickerSelect from 'react-native-picker-select';

const image1 = require('../../../assets/images/people-following-person.png')
const onlinePersonImageWidth = 50
const onlineDotWidth = 12
const DatingEditProfile = (props) => {
  const User = useSelector(state => state.user.user_details)
  const [searchValue, setsearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('');
  const [jobtitle, setJobTitle] = useState('');
  const [jobcompany, setJobCompany] = useState('');
  const [qualification, setQualification] = useState('');
  const [collegename, setCollegename] = useState('');
  const [menutypeOpen, setmenutypeOpen] = useState(false);
  const [menutypevalue, setmenutypevalue] = useState(null);
  const [menutypedate, setmenutypedate] = useState([
    { label: '150 cm', value: '150 cm' },
    { label: '151 cm', value: '151 cm' },
    { label: '152 cm', value: '152 cm' },
    { label: '153 cm', value: '153 cm' },
    { label: '154 cm', value: '154 cm' },
    { label: '155 cm', value: '155 cm' },
    { label: '156 cm', value: '156 cm' },
    { label: '157 cm', value: '157 cm' },
    { label: '158 cm', value: '158 cm' },
    { label: '159 cm', value: '159 cm' },
    { label: '160 cm', value: '160 cm' },
    { label: '161 cm', value: '161 cm' },
    { label: '162 cm', value: '162 cm' },
    { label: '163 cm', value: '163 cm' },
    { label: '164 cm', value: '164 cm' },
    { label: '165 cm', value: '165 cm' },
    { label: '166 cm', value: '166 cm' },
    { label: '167 cm', value: '167 cm' },
    { label: '168 cm', value: '168 cm' },
    { label: '169 cm', value: '169 cm' },
    { label: '170 cm', value: '170 cm' },
    { label: '171 cm', value: '171 cm' },
    { label: '172 cm', value: '172 cm' },
    { label: '173 cm', value: '173 cm' },
    { label: '174 cm', value: '174 cm' },
    { label: '175 cm', value: '175 cm' },
    { label: '176 cm', value: '176 cm' },
    { label: '177 cm', value: '177 cm' },
    { label: '178 cm', value: '178 cm' },
    { label: '179 cm', value: '179 cm' },
    { label: '180 cm', value: '180 cm' },
    { label: '181 cm', value: '181 cm' },
    { label: '182 cm', value: '182 cm' },
    { label: '183 cm', value: '183 cm' },
    { label: '184 cm', value: '184 cm' },
  ]);
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef()
  const [userMessage, setUserMessage] = useState('')
  const [filepath, setfilepath] = useState(null)
  const [pick1, setpick] = useState('')
  const [aboutme, setAboutMe] = useState('');

  const [multiSliderValue, setMultiSliderValue] = useState([18, 24])
  // const [slidervalue,setSLiderValue]=useState('');
  console.log('slidervalue====================================');
  console.log(multiSliderValue[1]);
  console.log('====================================slidervalue');
  const [showPassionsModal, setShowPassionsModal] = useState(false);
  const [showPassionsModal2, setShowPassionsModal2] = useState(false);
  const [showPassionsModal3, setShowPassionsModal3] = useState(false);
  const [showPassionsModal4, setShowPassionsModal4] = useState(false);
  const [showPassionsModal5, setShowPassionsModal5] = useState(false);
  const [showPassionsModal6, setShowPassionsModal6] = useState(false);
  const [showPassionsModal7, setShowPassionsModal7] = useState(false);
  const [showPassionsModal8, setShowPassionsModal8] = useState(false);
  const [showPassionsModal9, setShowPassionsModal9] = useState(false);
  const [showPassionsModal10, setShowPassionsModal10] = useState(false);
  const [showPassionsModal11, setShowPassionsModal11] = useState(false);
  const [showPassionsModal12, setShowPassionsModal12] = useState(false);

  const [selectedPassions, setSelectedPassions] = useState([])


  const [selectedLanguage, setSelectedLanguage] = useState([])

  const [selectedZodiac, setSelectedZodiac] = useState('')

  const [allZodiac, setZodiac] = useState(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Saggitarius', 'Capricorn', 'Aquarius', 'Pisces']);

  const [heightselect, setHeightSelect] = useState('');
  const [genderValue, setGenderValue] = useState(['Men', 'Women', 'Transgender']);
  const [genderselect, setGenderSelect] = useState('');
  const [showMeValue, setShowMeValue] = useState(['Men', 'Women', 'Everyone']);
  const [showMeselect, setShowMeSelect] = useState('');

  const [smokingValue, setSmokingValue] = useState(['Yes', 'No', 'Occassionally']);
  const [smokingdata, setSmokingdata] = useState('');

  const [drinkingValue, setDrinkingValue] = useState(['Yes', 'No', 'Occassionally']);
  const [drinkingselect, setDrinkingSelect] = useState('');

  const [kidsValue, setKidsValue] = useState(['Open to kids', 'Don`t want', 'Not sure yet']);
  const [kidsSelect, setKidsSelect] = useState('');

  const [politicsValue, setPoliticsValue] = useState(['Apolotical', 'Moderate', 'Communist', 'Socialist']);
  const [politicsselect, setPoliticsSelect] = useState('');

  const [attribute, setAttribute] = useState([]);
  const [attribute1, setAttribute1] = useState([]);
  const [upData, setupData] = useState([
    {
      id: '1',
      name: 'Chetan Manne',
      isOnline: true,
      message: 'Reference site about lorem...',
      img: require('../../../assets/images/dating-message-image.png'),
    },
    {
      id: '1',
      name: 'Chetan Manne',
      isOnline: false,
      message: 'Reference site about lorem...',
      img: require('../../../assets/images/dating-message-image.png'),
    },
    {
      id: '1',
      name: 'Chetan Manne',
      isOnline: true,
      message: 'Reference site about lorem...',
      img: require('../../../assets/images/dating-message-image.png'),
    },
    {
      id: '1',
      name: 'Chetan Manne',
      isOnline: false,
      message: 'Reference site about lorem...',
      img: require('../../../assets/images/dating-message-image.png'),
    },
  ])

  // const changeShowMeValue = (index) => {
  //   if (showMeValue === index) {
  //     return
  //   }
  //   if (showMeValue === 0) {
  //     setShowMeSelect('Male')
  //   } else if (showMeValue === 1) {
  //     setShowMeSelect('Women')
  //   } else if (showMeValue === 2) {
  //     setShowMeSelect('Everyone')
  //   }

  //   setShowMeValue(index)
  // }
  // const changeSmokingValue = (index) => {
  //   console.log(smokingdata);
  //   if (smokingValue === index) {
  //     return
  //   }
  //   if (smokingValue === 0) {
  //     setSmokingdata('Yes')
  //   } else if (smokingValue === 1) {
  //     setSmokingdata('No')
  //   } else if (smokingValue === 2) {
  //     setSmokingdata('Occassionally')
  //   }
  //   setSmokingValue(index)
  // }

  // const changeDrinkingValue = (index) => {
  //   if (drinkingValue === index) {
  //     return
  //   }
  //   if (drinkingValue === 0) {
  //     setDrinkingSelect('Yes')
  //   } else if (drinkingValue === 1) {
  //     setDrinkingSelect('No')
  //   } else if (drinkingValue === 2) {
  //     setDrinkingSelect('Occassionally')
  //   }
  //   setDrinkingValue(index)
  // }
  // const changeKidsValue = (index) => {
  //   if (kidsValue === index) {
  //     return
  //   }
  //   if (kidsValue === 0) {
  //     setKidsSelect('Open to kids')
  //   } else if (kidsValue === 1) {
  //     setKidsSelect('Don`t want')
  //   } else if (kidsValue === 2) {
  //     setKidsSelect('Not sure yet')
  //   }
  //   setKidsValue(index)
  // }
  // const changePoliticsValue = (index) => {
  //   if (politicsValue === index) {
  //     return
  //   }
  //   if (politicsValue === 0) {
  //     setPoliticsSelect('Apolotical')
  //   } else if (politicsValue === 1) {
  //     setPoliticsSelect('moderate')
  //   } else if (politicsValue === 2) {
  //     setPoliticsSelect('Left')
  //   } else if (politicsValue === 3) {
  //     setPoliticsSelect('Right')
  //   } else if (politicsValue === 4) {
  //     setPoliticsSelect('Communist')
  //   } else if (politicsValue === 5) {
  //     setPoliticsSelect('Socialist')
  //   }

  //   setPoliticsValue(index)
  // }

  const changeSelectedPassions = (value) => {
    console.log("changeSelectedPassions", value);

    const isarray = selectedPassions.some(el => el.id == value.id)
    if (isarray) {
      const updatedData = selectedPassions?.filter(el => el.id != value.id)
      setSelectedPassions(updatedData)
      console.log("changeSelectedupdatedData", updatedData);
    } else {
      setSelectedPassions([...selectedPassions, value])
      console.log("changeSelectedPselectedPassions", selectedPassions);
    }



  }

  const changeSelectedLanguage = (value) => {
    if (selectedLanguage?.includes(value.id)) {
      const updatedData = selectedLanguage?.filter(el => el !== value.id)
      setSelectedLanguage([...updatedData])
    } else {
      setSelectedLanguage([...selectedLanguage, value.id])
    }
  }

  const changeSelectedShowme = (index) => {
    if (showMeselect === index) {
      return
    }
    setShowMeSelect(index)
  }
  const changeSelectedGender = (index) => {
    if (genderselect === index) {
      return
    }
    setGenderSelect(index)
  }
  const changeSelectedSmoking = (index) => {
    if (smokingdata === index) {
      return
    }
    setSmokingdata(index)
  }
  const changeSelectedDrinking = (index) => {
    if (drinkingselect === index) {
      return
    }
    setDrinkingSelect(index)
  }
  const changeSelectedKids = (index) => {
    if (kidsSelect === index) {
      return
    }
    setKidsSelect(index)
  }
  const changeSelectedzodiac = (index) => {
    if (selectedZodiac === index) {
      return
    }
    setSelectedZodiac(index)
  }
  const changeSelectedPolitics = (index) => {
    if (politicsselect === index) {
      return
    }
    setPoliticsSelect(index)
  }
  const multiSliderValuesChange = (values) => {
    console.log("MultiSlider:::", values);
    setMultiSliderValue(values)
  }


  const openLibrary = async () => {

    let options = {
      title: 'Image Picker',
      // mediaType: 'mixed',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      durationLimit: 30,
      title: 'Select Image/Video',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (image) => {
      if (!image.didCancel) {
        console.log('the ddd==', image.assets[0].uri)
        var photo = {
          uri: image.assets[0].uri,
          type: image.assets[0].type,
          name: image.assets[0].fileName
        };
        console.log("image", photo);
        setpick(photo)
        setfilepath(image)
      }
    })


  }
  const requestCameraPermission = async () => {
    if (Platform.OS === 'ios') {
      openLibrary();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to access camera',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          openLibrary();
          console.log('Storage Permission Granted.');
        } else {
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('ERROR' + err);
      }
    }
  };
  const opencamera = async () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // let options = {
    //   title: 'Select Image',
    //   customButtons: [
    //     {
    //       name: 'customOptionKey',
    //       title: 'Choose Photo from Custom Option'
    //     },
    //   ],
    //   mediaType:'video',
    //   maxWidth: 500,
    //   maxHeight: 500,
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // };

    launchCamera(options, (image) => {
      if (!image.didCancel) {
        console.log('the ddd==', image)
        var photo = {
          uri: image.assets[0].uri,
          type: image.assets[0].type,
          name: image.assets[0].fileName
        };
        console.log("imageCamera", photo);
        setpick(photo)
        setfilepath(image)
      }

    })

  }

  const GetPassionAttributes = async () => {
    // console.log("the res==>>GetPassionAttributes", hob);
    setLoading(true);

    const { responseJson, err } = await requestGetApi(
      common_master_attributes + 'dating_passion',
      "",
      "GET",
      User.token
    );
    setLoading(false);
    console.log("the res==>>GetPassionAttributes", responseJson);
    if (responseJson.headers.success == 1) {
      console.log("the res==>>GetPassionAttributes", responseJson.body);
      setAttribute(responseJson.body);

    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }

  };
  const GetLanguageAttributes = async () => {
    // console.log("the res==>>GetLanguageAttributes", hob);
    setLoading(true);

    const { responseJson, err } = await requestGetApi(
      common_master_attributes + 'dating_language',
      "",
      "GET",
      User.token
    );
    setLoading(false);
    console.log("the res==>>GetLanguageAttributes", responseJson);
    if (responseJson.headers.success == 1) {
      console.log("the res==>>GetLanguageAttributes", responseJson.body);
      setAttribute1(responseJson.body);
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }

  };

  const Editprofile = async () => {
    if (smokingdata == '') {
      Toast.show({ text1: 'Please select smoking or not' });
    }
    var passiondata = selectedPassions?.map(el => attribute.find(att => att.id == el.id)).map(el => { return { attribute_type: el.master_type, attribute_code: el.master_code, attribute_value: el.name } });

    var languagedata = selectedLanguage?.map(el => attribute1.find(att => att.id == el.id)).map(el => { return { attribute_type: el.master_type, attribute_code: el.master_code, attribute_value: el.name } });
    console.log("EditprofileDATA::", passiondata);
    // setLoading(true)

    var data = {
      // username: "Saurabh Kumar",
      about: aboutme,
      // fullname: "Saurabh kumar",
      // dob: "1991-01-01",
      // age_preference: multiSliderValue[1],
      // activity_status: "Online",
      // intrest_in: showMeselect,
      gender: "Male",
      qualification: qualification,
      university: collegename,
      height: heightselect,
      job_title: jobtitle,
      job_company: jobcompany,
      smoking: smokingdata,
      drinking: drinkingselect,
      kids: kidsSelect,
      zodiac: selectedZodiac,
      politics: politicsselect,
      passions: passiondata,
      languages: languagedata
    }
    console.log("SAVEDATA:", data);
    const { responseJson, err } = await requestPostApi(connect_dating_editprofile, data, 'PUT', User.token)
    setLoading(false)
    console.log('the Editprofileres==>>', responseJson)
    if (responseJson.headers.success == 1) {
      //  Toast.show(responseJson.headers.message)
      Toast.show({ text1: responseJson.headers.message });
      menuList(menutypevalue)
      //  props.navigation.navigate('ShopCart')
    } else {
      Toast.show({ text1: responseJson.headers.message });
      // setalert_sms(err)
      // setMy_Alert(true)
    }
  }

  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ flex: 1, }}>
      <LinearGradient
        colors={['#FD869F', 'rgba(255, 255, 255, 0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.7, 0.9]}
        style={{ flex: 1, height: dimensions.SCREEN_HEIGHT, }}
      >
        <ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 80, padding: 20, }}>
            <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ flex: 1 }}>
              <Image source={require('../../../assets/images/dating-back-arrow.png')} style={{ width: 25, height: 15 }} resizeMode='contain' />
            </TouchableOpacity>
            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ fontSize: 12.5, fontWeight: '600', color: '#31313f' }}>Edit Profile</Text>
            </View>
            <View style={{ flex: 1 }} />
          </View>
          <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>

            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', marginBottom: 10 }}>Edit Profile Photo</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Image source={require('../../../assets/images/dating-message-image.png')} style={{ width: 100, height: 100, borderRadius: 2 }} resizeMode='contain' />
                <View style={styles.deleteIconView}>
                  <Image source={require('../../../assets/images/dating-delete-photo-icon.png')} style={styles.deleteIcon} resizeMode='contain' />
                </View>
              </View>
              {/* <View style={{ marginLeft: 20 }}>
                <Image source={require('../../../assets/images/dating-message-image.png')} style={{ width: 100, height: 100, borderRadius: 2 }} resizeMode='contain' />
                <View style={styles.deleteIconView}>
                  <Image source={require('../../../assets/images/dating-delete-photo-icon.png')} style={styles.deleteIcon} resizeMode='contain' />
                </View>
              </View> */}
              <TouchableOpacity onPress={() => { requestCameraPermission() }} style={styles.plusIconSuperView}>
                <Image source={require('../../../assets/images/dating-upload-camera-icon.png')} style={{ width: 30, height: 30, }} resizeMode='contain' />
                <View style={styles.plusIconView}>
                  <Image source={require('../../../assets/images/dating-upload-plus-icon.png')} style={styles.deleteIcon} resizeMode='contain' />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 20 }}>About me</Text>
            <TextInput
              value={aboutme}
              textAlignVertical='top'
              onChangeText={(e) => { setAboutMe(e) }}
              placeholder={'Type here.....'}
              placeholderTextColor="#ff5e96"
              multiline={true}
              // maxLength={500}
              // keyboardType="number-pad"
              autoCapitalize='none'
              fontStyle='italic'
              style={[styles.input]}
            />
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 15 }}>Passions</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff1f6', padding: 20, borderRadius: 10, width: '100%' }}>
              <View style={{ width: "90%", flexWrap: 'wrap', flexDirection: 'row', }}>

                {
                  selectedPassions.length > 0 ?
                    (<>
                      {
                        selectedPassions.map((item, index) => {
                          return (
                            <View style={{ flexDirection: 'row', }}>
                              <View style={styles.showMeImageView}>
                                <Image source={{ uri: `${item.image}` }} style={styles.showMeImage} resizeMode='contain' />
                              </View>
                              <Text style={{ fontSize: 16, color: '#ff5e96', fontStyle: 'italic' }}>{item.name}</Text>
                            </View>
                          )
                        })
                      }
                    </>)
                    :
                    <Text style={{ fontSize: 16, color: '#ff5e96', fontStyle: 'italic' }}>Select Passion</Text>

                }
              </View>


              <TouchableOpacity onPress={() => { setShowPassionsModal(true), GetPassionAttributes() }}>
                <Image source={require('../../../assets/images/dating-change-password-right-arrow.png')} style={{ height: 20, width: 20, }} resizeMode='contain' />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 15 }}>Language</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff1f6', padding: 20, borderRadius: 10 }}>
              <Text style={{ fontSize: 16, color: '#ff5e96', fontStyle: 'italic' }}>{selectedLanguage != '' ? selectedLanguage?.map(el => attribute1.find(att => att.id === el)?.name).join(', ') : 'Select Language'}</Text>
              <TouchableOpacity onPress={() => { setShowPassionsModal2(true), GetLanguageAttributes('dating_language') }}>
                <Image source={require('../../../assets/images/dating-change-password-right-arrow.png')} style={{ height: 20, width: 20, }} resizeMode='contain' />
              </TouchableOpacity>
            </View>

            {/* <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 15 }}>Occupation</Text>
            <View style={{ justifyContent: 'center', backgroundColor: '#fff1f6', padding: 20, borderRadius: 10, height: 60, }}>

              <TextInput
                value={jobtitle}
                onChangeText={(text) => {
                  setJobTitle(text)
                }}
                placeholder=""
                // placeholderTextColor={Mycolors.placeholdercolor}
                style={{ color: '#ff5e96', fontSize: 14, height: 60, paddingLeft: -5, }}
              />

            </View> */}
            {/* 
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 15 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869' }}>Age preference</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#ff3b7f' }}>{`${multiSliderValue[0]}-${multiSliderValue[1]}`}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <MultiSlider
                values={[multiSliderValue[0], multiSliderValue[1]]}
                // values={[multiSliderValue[0]]}
                sliderLength={350}

                // isMarkersSeparated={true}
                // onValuesChangeStart={setSLiderValue}
                // onValuesChangeFinish={setSLiderValue}

                onValuesChange={multiSliderValuesChange}
                min={18}
                max={60}
                step={1}
                allowOverlap={false}
                minMarkerOverlapDistance={10}
                markerStyle={{
                  ...Platform.select({
                    ios: {
                      height: 25,
                      width: 25,
                      shadowColor: '#000000',
                      shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.1,
                      borderColor: '#f23476',
                      borderWidth: 1, marginLeft: 16
                    },
                    android: {
                      height: 25,
                      width: 25,
                      borderRadius: 50,
                      backgroundColor: '#f23476',
                      borderColor: '#f23476',
                      borderWidth: 1, marginLeft: 16
                    }
                  })
                }}
                pressedMarkerStyle={{
                  ...Platform.select({
                    android: {
                      height: 25,
                      width: 25,
                      borderRadius: 20,
                      backgroundColor: '#f23476'
                    }
                  })
                }}
                selectedStyle={{ backgroundColor: '#f23476', }}
                unselectedStyle={{ backgroundColor: '#e3d0d7', borderColor: '#f23476', borderWidth: 0.5, }}
                trackStyle={{
                  height: 5
                }}
                touchDimensions={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  slipDisplacement: 40
                }}
              />
            </View> */}
            <View style={{ width: '90%', marginTop: 10 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#3e5869', }}>My basics</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderRadius: 10, height: 50, overflow: 'hidden', alignItems: "center", width: '100%', alignSelf: 'center', marginTop: 0 }}>
              <View style={{ width: '30%', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../../../assets/dating_workicon.png')} style={{ heigh: 20, width: 20, marginRight: 7 }} />
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869' }}>Work</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '60%', height: 60, alignItems: 'center', }}>
                <Text numberOfLines={1} style={{ fontSize: 14, color: '#ff5e96', fontStyle: 'italic', textAlign: 'center', marginRight: 8 }}>{jobtitle != '' ? jobtitle + ' at ' + jobcompany : 'Add'}</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal9(true)} >
                  <Image source={require('../../../assets/images/dating-change-password-right-arrow.png')} style={{ height: 14, width: 14, }} resizeMode='contain' />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderRadius: 10, height: 50, overflow: 'hidden', alignItems: "center", width: '100%', alignSelf: 'center', marginTop: 0 }}>
              <View style={{ width: '30%', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../../../assets/education_icon.png')} style={{ heigh: 24, width: 20, marginRight: 7 }} />
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', }}>Education</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '50%', height: 60, alignItems: 'center', }}>
                <Text style={{ fontSize: 14, color: '#ff5e96', fontStyle: 'italic', textAlign: 'center', marginRight: 8 }}>{qualification != '' ? qualification + ' at ' + collegename : 'Add'}</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal10(true)} >
                  <Image source={require('../../../assets/images/dating-change-password-right-arrow.png')} style={{ height: 14, width: 14, }} resizeMode='contain' />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderRadius: 10, height: 50, overflow: 'hidden', alignItems: "center", width: '100%', alignSelf: 'center', marginTop: 0 }}>
              <View style={{ width: '30%', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../../../assets/body-type-short.png')} style={{ heigh: 80, width: 34, marginLeft: -7, top: -3 }} />
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', }}>Gender</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '50%', height: 60, alignItems: 'center', }}>
                <Text style={{ fontSize: 14, color: '#ff5e96', fontStyle: 'italic', textAlign: 'center', marginRight: 8 }}>{genderselect != '' ? genderselect : 'Add'}</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal11(true)} >
                  <Image source={require('../../../assets/images/dating-change-password-right-arrow.png')} style={{ height: 14, width: 14, }} resizeMode='contain' />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderRadius: 10, height: 50, overflow: 'hidden', alignItems: "center", width: '100%', alignSelf: 'center', marginTop: 0 }}>
              <View style={{ width: '30%', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../../../assets/icons-ruler.png')} style={{ heigh: 22, width: 22, marginRight: 7, marginLeft: -2 }} />
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', }}>Height</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '50%', height: 60, alignItems: 'center', }}>
                <Text style={{ fontSize: 14, color: '#ff5e96', fontStyle: 'italic', textAlign: 'center', marginRight: 8 }}>{heightselect != '' ? heightselect : 'Add'}</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal12(true)} >
                  <Image source={require('../../../assets/images/dating-change-password-right-arrow.png')} style={{ height: 14, width: 14, }} resizeMode='contain' />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ width: '90%', marginTop: 10 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#3e5869', }}>More about me</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gray', marginTop: 5 }}>Cover the thinks most people are curious about</Text>
            </View>

            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderRadius: 10, height: 50, overflow: 'hidden', alignItems: "center", width: '100%', alignSelf: 'center', marginTop: 0 }}>
              <View style={{ width: '30%', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../../../assets/body-type-short.png')} style={{ heigh: 80, width: 34, marginLeft: -7, top: -3 }} />
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', }}>Show me</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '50%', height: 60, alignItems: 'center', }}>
                <Text style={{ fontSize: 14, color: '#ff5e96', fontStyle: 'italic', textAlign: 'center', marginRight: 8 }}>{showMeselect != '' ? showMeselect : 'Add'}</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal7(true)} >
                  <Image source={require('../../../assets/images/dating-change-password-right-arrow.png')} style={{ height: 14, width: 14, }} resizeMode='contain' />
                </TouchableOpacity>
              </View>
            </View> */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderRadius: 10, height: 50, overflow: 'hidden', alignItems: "center", width: '100%', alignSelf: 'center', marginTop: 0 }}>
              <View style={{ width: '30%', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../../../assets/no-smoking.png')} style={{ heigh: 24, width: 20, marginRight: 7 }} />
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', }}>Smoking</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '50%', height: 60, alignItems: 'center', }}>
                <Text style={{ fontSize: 14, color: '#ff5e96', fontStyle: 'italic', textAlign: 'center', marginRight: 8 }}>{smokingdata != '' ? smokingdata : 'Add'}</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal6(true)} >
                  <Image source={require('../../../assets/images/dating-change-password-right-arrow.png')} style={{ height: 14, width: 14, }} resizeMode='contain' />
                </TouchableOpacity>
              </View>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderRadius: 10, height: 50, overflow: 'hidden', alignItems: "center", width: '100%', alignSelf: 'center', marginTop: 0 }}>
              <View style={{ width: '30%', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../../../assets/beer-mug.png')} style={{ heigh: 24, width: 20, marginRight: 7 }} />
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', }}>Drinking</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '50%', height: 60, alignItems: 'center', }}>
                <Text style={{ fontSize: 14, color: '#ff5e96', fontStyle: 'italic', textAlign: 'center', marginRight: 8 }}>{drinkingselect != '' ? drinkingselect : 'Add'}</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal5(true)} >
                  <Image source={require('../../../assets/images/dating-change-password-right-arrow.png')} style={{ height: 14, width: 14, }} resizeMode='contain' />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderRadius: 10, height: 50, overflow: 'hidden', alignItems: "center", width: '100%', alignSelf: 'center', marginTop: 0 }}>
              <View style={{ width: '30%', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../../../assets/icons-pacifier.png')} style={{ heigh: 24, width: 20, marginRight: 7 }} />
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', }}>Kid's</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '50%', height: 60, alignItems: 'center', }}>
                <Text style={{ fontSize: 14, color: '#ff5e96', fontStyle: 'italic', textAlign: 'center', marginRight: 8 }}>{kidsSelect != '' ? kidsSelect : 'Add'}</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal4(true)} >
                  <Image source={require('../../../assets/images/dating-change-password-right-arrow.png')} style={{ height: 14, width: 14, }} resizeMode='contain' />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderRadius: 10, height: 50, overflow: 'hidden', alignItems: "center", width: '100%', alignSelf: 'center', marginTop: 0 }}>
              <View style={{ width: '30%', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../../../assets/crystal-ball.png')} style={{ heigh: 24, width: 20, marginRight: 7 }} />
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', }}>Zodiac</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '50%', height: 60, alignItems: 'center', }}>
                <Text style={{ fontSize: 14, color: '#ff5e96', fontStyle: 'italic', textAlign: 'center', marginRight: 8 }}>{selectedZodiac != '' ? selectedZodiac : 'Add'}</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal3(true)} >
                  <Image source={require('../../../assets/images/dating-change-password-right-arrow.png')} style={{ height: 14, width: 14, }} resizeMode='contain' />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderRadius: 10, height: 50, overflow: 'hidden', alignItems: "center", width: '100%', alignSelf: 'center', marginTop: 0 }}>
              <View style={{ width: '30%', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../../../assets/icons-elections.png')} style={{ heigh: 24, width: 20, marginRight: 7 }} />
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', }}>Politics</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '50%', height: 60, alignItems: 'center', }}>
                <Text style={{ fontSize: 14, color: '#ff5e96', fontStyle: 'italic', textAlign: 'center', marginRight: 8 }}>{politicsselect != '' ? politicsselect : 'Add'}</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal8(true)} >
                  <Image source={require('../../../assets/images/dating-change-password-right-arrow.png')} style={{ height: 14, width: 14, }} resizeMode='contain' />
                </TouchableOpacity>
              </View>
            </View>


            <View style={{ height: 50 }} />

            <MyButtons title="Save" height={60} width={'100%'} borderRadius={10} alignSelf="center" press={() => { Editprofile() }} marginHorizontal={20} fontSize={11}
              titlecolor={Mycolors.BG_COLOR} hLinearColor={['#8d046e', '#e30f50']} />

            <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, backgroundColor: '#F8F8F8' }}>
            </View>








          </View>
          <View style={{ height: 100 }} />

        </ScrollView>

        <Modal
          isVisible={showPassionsModal}
          swipeDirection="down"
          onBackdropPress={() => setShowPassionsModal(false)}
          onSwipeComplete={(e) => {
            setShowPassionsModal(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ height: '50%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>
                <View style={{ flex: 1 }} />
                <Text style={{ flex: 4, color: Mycolors.Black, fontWeight: '500', textAlign: 'center' }}>Passions</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal(false)} style={{ flex: 1 }}>
                  <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center' }}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', alignSelf: 'center' }}>
                <Text style={{ color: '#4a4c52', fontSize: 12 }}>
                  Select passions that you would like to share. Choose a minimum of 3.
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                  <Text style={{ color: '#4a4c52', fontSize: 12, fontWeight: '500' }}>Passions</Text>
                  <Text style={{ color: '#4a4c52', fontSize: 12, fontWeight: '500' }}>{`${selectedPassions?.length}/${attribute?.length}`}</Text>
                </View>

                <FlatList
                  data={attribute}
                  showsHorizontalScrollIndicator={false}
                  numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {
                    const isarray = selectedPassions.some(e => e.id == item.id)
                    return (
                      <TouchableOpacity onPress={() => { changeSelectedPassions(item) }} style={[styles.showMeView, { width: '30%', marginHorizontal: index % 3 === 1 ? 10 : 0, marginBottom: 10, backgroundColor: isarray ? '#fff1f6' : '#fff', borderColor: isarray ? '#ff3b7f' : '#e3d0d7' }]}>
                        <View style={[styles.showMeImageView,
                          // { backgroundColor: selectedPassions?.includes(item.id) ? '#ff3b7f' : '#e3d0d7' }
                        ]}>
                          <Image source={{ uri: `${item.image}` }} style={styles.showMeImage} resizeMode='contain' />
                        </View>
                        <Text style={styles.showMeText}>{item.name}</Text>

                      </TouchableOpacity>
                    )
                  }}
                />
              </View>

              {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>

          </View>
        </Modal>

        {/* ......Language select modal 2..... */}
        <Modal
          isVisible={showPassionsModal2}
          swipeDirection="down"
          onBackdropPress={() => setShowPassionsModal2(false)}
          onSwipeComplete={(e) => {
            setShowPassionsModal2(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ height: '50%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>
                <View style={{ flex: 1 }} />
                <Text style={{ flex: 4, color: Mycolors.Black, fontWeight: '500', textAlign: 'center' }}>Language</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal2(false)} style={{ flex: 1 }}>
                  <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center' }}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', alignSelf: 'center' }}>
                <Text style={{ color: '#4a4c52', fontSize: 12 }}>
                  Select language that you would like to share. Choose a minimum of 2.
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                  <Text style={{ color: '#4a4c52', fontSize: 12, fontWeight: '500' }}>Language's</Text>
                  <Text style={{ color: '#4a4c52', fontSize: 12, fontWeight: '500' }}>{`${selectedLanguage?.length}/${attribute1?.length}`}</Text>
                </View>

                <FlatList
                  data={attribute1}
                  showsHorizontalScrollIndicator={false}
                  numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity onPress={() => { changeSelectedLanguage(item) }} style={[styles.showMeView, { width: '30%', marginHorizontal: index % 3 === 1 ? 10 : 0, marginBottom: 10, backgroundColor: selectedLanguage?.includes(item.id) ? '#fff1f6' : '#fff', borderColor: selectedLanguage?.includes(item.id) ? '#ff3b7f' : '#e3d0d7' }]}>
                        <Text style={styles.showMeText}>{item.name}</Text>
                        {/* <View style={[styles.showMeImageView, { backgroundColor: selectedLanguage?.includes(item.id) ? '#ff3b7f' : '#e3d0d7' }]}>
                          <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                        </View> */}
                      </TouchableOpacity>
                    )
                  }}
                />
              </View>

              {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>

          </View>
        </Modal>

        {/* ......Zodiac select modal 3..... */}
        <Modal
          isVisible={showPassionsModal3}
          swipeDirection="down"
          onBackdropPress={() => setShowPassionsModal3(false)}
          onSwipeComplete={(e) => {
            setShowPassionsModal3(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ height: '47%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>
                <View style={{ flex: 1 }} >
                  <Image source={require('../../../assets/crystal-ball.png')} style={{ height: 44, width: 44 }} />
                </View>
                <Text style={{ flex: 4, color: Mycolors.Black, fontWeight: '500', textAlign: 'center', fontSize: 16 }}>What's your Zodiac sign?</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal3(false)} style={{ flex: 1 }}>
                  <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center', fontSize: 14 }}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', alignSelf: 'center', marginTop: 9 }}>
                {/* <Text style={{ color: '#4a4c52', fontSize: 12 }}>
                  Select Zodiac that you would like to share.
                </Text> */}


                <FlatList
                  data={allZodiac}
                  showsHorizontalScrollIndicator={false}
                  numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity onPress={() => { changeSelectedzodiac(item) }} style={[styles.showMeView, { width: '30%', marginHorizontal: index % 3 === 1 ? 10 : 0, marginBottom: 10, backgroundColor: selectedZodiac == item ? '#fff1f6' : '#fff', borderColor: selectedZodiac == item ? '#ff3b7f' : '#e3d0d7' }]}>
                        <Text style={styles.showMeText}>{item}</Text>
                        {/* <View style={[styles.showMeImageView, { backgroundColor: selectedZodiac == item ? '#ff3b7f' : '#e3d0d7' }]}>
                          <Image source={require('../../../assets/images/dating-selected-arrow.png')} style={styles.showMeImage} resizeMode='contain' />
                        </View> */}
                      </TouchableOpacity>
                    )
                  }}
                />
              </View>

              {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>

          </View>
        </Modal>
        {/* ......Kid's select modal 4..... */}
        <Modal
          isVisible={showPassionsModal4}
          swipeDirection="down"
          onBackdropPress={() => setShowPassionsModal4(false)}
          onSwipeComplete={(e) => {
            setShowPassionsModal4(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ height: '40%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>
                <View style={{ flex: 1 }} >
                  <Image source={require('../../../assets/icons-pacifier.png')} style={{ height: 44, width: 44 }} />
                </View>
                <Text style={{ flex: 4, color: Mycolors.Black, fontWeight: '500', textAlign: 'center', fontSize: 16 }}>What are your ideal plans for children?</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal4(false)} style={{ flex: 1 }}>
                  <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center', fontSize: 14 }}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', alignSelf: 'center', marginTop: 9 }}>
                {/* <Text style={{ color: '#4a4c52', fontSize: 12 }}>
                  Select Zodiac that you would like to share.
                </Text> */}

                <FlatList

                  data={kidsValue}
                  showsHorizontalScrollIndicator={false}
                  // numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity onPress={() => { changeSelectedKids(item) }} style={[styles.showMeView, { width: '100%', marginBottom: 10, backgroundColor: kidsSelect == item ? '#fff1f6' : '#fff', borderColor: kidsSelect == item ? '#ff3b7f' : '#e3d0d7' }]}>
                        <Text style={styles.showMeText}>{item}</Text>

                      </TouchableOpacity>
                    )
                  }}
                />
              </View>

              {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>

          </View>
        </Modal>
        {/* ......Drinking select modal 5..... */}
        <Modal
          isVisible={showPassionsModal5}
          swipeDirection="down"
          onBackdropPress={() => setShowPassionsModal5(false)}
          onSwipeComplete={(e) => {
            setShowPassionsModal5(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ height: '40%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>
                <View style={{ flex: 1 }} >
                  <Image source={require('../../../assets/beer-mug.png')} style={{ height: 44, width: 44 }} />
                </View>
                <Text style={{ flex: 4, color: Mycolors.Black, fontWeight: '500', textAlign: 'center', fontSize: 16 }}>Do you drink? </Text>
                <TouchableOpacity onPress={() => setShowPassionsModal5(false)} style={{ flex: 1 }}>
                  <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center', fontSize: 14 }}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', alignSelf: 'center', marginTop: 9 }}>
                {/* <Text style={{ color: '#4a4c52', fontSize: 12 }}>
                  Select Zodiac that you would like to share.
                </Text> */}


                <FlatList

                  data={drinkingValue}
                  showsHorizontalScrollIndicator={false}
                  // numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity onPress={() => { changeSelectedDrinking(item) }} style={[styles.showMeView, { width: '100%', marginBottom: 10, backgroundColor: drinkingselect == item ? '#fff1f6' : '#fff', borderColor: drinkingselect == item ? '#ff3b7f' : '#e3d0d7' }]}>
                        <Text style={styles.showMeText}>{item}</Text>

                      </TouchableOpacity>
                    )
                  }}
                />
              </View>

              {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>

          </View>
        </Modal>
        {/* ......Smoking select modal 6..... */}
        <Modal
          isVisible={showPassionsModal6}
          swipeDirection="down"
          onBackdropPress={() => setShowPassionsModal6(false)}
          onSwipeComplete={(e) => {
            setShowPassionsModal6(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ height: '40%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>
                <View style={{ flex: 1 }} >
                  <Image source={require('../../../assets/no-smoking.png')} style={{ height: 40, width: 40 }} />
                </View>
                <Text style={{ flex: 4, color: Mycolors.Black, fontWeight: '500', textAlign: 'center', fontSize: 16 }}>Do you smoke?</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal6(false)} style={{ flex: 1 }}>
                  <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center', fontSize: 14 }}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', alignSelf: 'center', marginTop: 9 }}>
                {/* <Text style={{ color: '#4a4c52', fontSize: 12 }}>
                  Select Zodiac that you would like to share.
                </Text> */}
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 1, marginBottom: 10 }}>

                </View> */}

                <FlatList

                  data={smokingValue}
                  showsHorizontalScrollIndicator={false}
                  // numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity onPress={() => { changeSelectedSmoking(item) }} style={[styles.showMeView, { width: '100%', marginBottom: 10, backgroundColor: smokingdata == item ? '#fff1f6' : '#fff', borderColor: smokingdata == item ? '#ff3b7f' : '#e3d0d7' }]}>
                        <Text style={styles.showMeText}>{item}</Text>

                      </TouchableOpacity>
                    )
                  }}
                />
              </View>

              {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>

          </View>
        </Modal>
        {/* ......Show me select modal 7..... */}
        <Modal
          isVisible={showPassionsModal7}
          swipeDirection="down"
          onBackdropPress={() => setShowPassionsModal7(false)}
          onSwipeComplete={(e) => {
            setShowPassionsModal7(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ height: '38%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>

                <View style={{ flex: 1 }} >
                  <Image source={require('../../../assets/gender-equality.png')} style={{ height: 40, width: 40 }} />
                </View>
                <Text style={{ flex: 4, color: Mycolors.Black, fontWeight: '500', textAlign: 'center', fontSize: 16 }}>What are you looking for?</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal7(false)} style={{ flex: 1 }}>
                  <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center' }}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', alignSelf: 'center', marginTop: 9 }}>
                {/* <Text style={{ color: '#4a4c52', fontSize: 12 }}>
                  Select Zodiac that you would like to share.
                </Text> */}
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 1, marginBottom: 10 }}>

                </View> */}

                <FlatList

                  data={showMeValue}
                  showsHorizontalScrollIndicator={false}
                  // numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity onPress={() => { changeSelectedShowme(item) }} style={[styles.showMeView, { width: '100%', marginBottom: 10, backgroundColor: showMeselect == item ? '#fff1f6' : '#fff', borderColor: showMeselect == item ? '#ff3b7f' : '#e3d0d7' }]}>
                        <Text style={styles.showMeText}>{item}</Text>

                      </TouchableOpacity>
                    )
                  }}
                />
              </View>

              {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>

          </View>
        </Modal>
        {/* ......Politics select modal 8..... */}
        <Modal
          isVisible={showPassionsModal8}
          swipeDirection="down"
          onBackdropPress={() => setShowPassionsModal8(false)}
          onSwipeComplete={(e) => {
            setShowPassionsModal8(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ height: '45%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>
                <View style={{ flex: 1 }} >
                  <Image source={require('../../../assets/icons-elections.png')} style={{ height: 40, width: 40 }} />
                </View>
                <Text style={{ flex: 4, color: Mycolors.Black, fontWeight: '500', textAlign: 'center', fontSize: 16 }}>What are your Political learnings?</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal8(false)} style={{ flex: 1 }}>
                  <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center' }}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', alignSelf: 'center', marginTop: 6 }}>
                {/* <Text style={{ color: '#4a4c52', fontSize: 12 }}>
                  Select Zodiac that you would like to share.
                </Text> */}


                <FlatList

                  data={politicsValue}
                  showsHorizontalScrollIndicator={false}
                  // numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity onPress={() => { changeSelectedPolitics(item) }} style={[styles.showMeView, { width: '100%', marginBottom: 10, backgroundColor: politicsselect == item ? '#fff1f6' : '#fff', borderColor: politicsselect == item ? '#ff3b7f' : '#e3d0d7' }]}>
                        <Text style={styles.showMeText}>{item}</Text>

                      </TouchableOpacity>
                    )
                  }}
                />
              </View>

              {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>

          </View>
        </Modal>

        {/* ......Work select modal 9..... */}
        <Modal
          isVisible={showPassionsModal9}
          swipeDirection="down"
          onBackdropPress={() => setShowPassionsModal9(false)}
          onSwipeComplete={(e) => {
            setShowPassionsModal9(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ height: '45%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>
                <View style={{ flex: 1 }} >
                  <Image source={require('../../../assets/dating_workicon.png')} style={{ height: 40, width: 40 }} />
                </View>
                <Text style={{ flex: 4, color: Mycolors.Black, fontWeight: '500', textAlign: 'center', fontSize: 16 }}>Please specify your designation and company</Text>

                <TouchableOpacity onPress={() => setShowPassionsModal9(false)} style={{ flex: 1 }}>
                  <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center' }}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', alignSelf: 'center', marginTop: 9 }}>
                {/* <Text style={{ color: '#4a4c52', fontSize: 12 }}>
                  Select Zodiac that you would like to share.
                </Text> */}

                <View>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 1 }}>Job title</Text>
                  <View style={{ justifyContent: 'center', backgroundColor: '#fff1f6', padding: 20, borderRadius: 10, height: 60, }}>

                    <TextInput
                      value={jobtitle}
                      onChangeText={(text) => {
                        setJobTitle(text)
                      }}
                      placeholder="Job title"
                      placeholderTextColor='#ff5e96'
                      style={{ color: '#ff5e96', fontSize: 14, height: 60, paddingLeft: -5, }}
                    />

                  </View>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 15 }}>Company name</Text>
                  <View style={{ justifyContent: 'center', backgroundColor: '#fff1f6', padding: 20, borderRadius: 10, height: 60, }}>

                    <TextInput
                      value={jobcompany}
                      onChangeText={(text) => {
                        setJobCompany(text)
                      }}
                      placeholder="Company name"
                      placeholderTextColor='#ff5e96'
                      style={{ color: '#ff5e96', fontSize: 14, height: 60, paddingLeft: -5, }}
                    />

                  </View>
                </View>

              </View>

              {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>

          </View>
        </Modal>

        {/* ......education select modal 10..... */}
        <Modal
          isVisible={showPassionsModal10}
          swipeDirection="down"
          onBackdropPress={() => setShowPassionsModal10(false)}
          onSwipeComplete={(e) => {
            setShowPassionsModal10(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ height: '45%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>
                <View style={{ flex: 1 }} >
                  <Image source={require('../../../assets/dating_workicon.png')} style={{ height: 40, width: 40 }} />
                </View>
                <Text style={{ flex: 4, color: Mycolors.Black, fontWeight: '500', textAlign: 'center', fontSize: 16 }}>Please specify your specialization and University name</Text>

                <TouchableOpacity onPress={() => setShowPassionsModal10(false)} style={{ flex: 1 }}>
                  <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center' }}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', alignSelf: 'center', marginTop: 0 }}>
                {/* <Text style={{ color: '#4a4c52', fontSize: 12 }}>
                  Select Zodiac that you would like to share.
                </Text> */}

                <View>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 1 }}>Qualification</Text>
                  <View style={{ justifyContent: 'center', backgroundColor: '#fff1f6', padding: 20, borderRadius: 10, height: 60, }}>

                    <TextInput
                      value={qualification}
                      onChangeText={(text) => {
                        setQualification(text)
                      }}
                      placeholder="Qualification(PG,UG..)"
                      placeholderTextColor='#ff5e96'
                      style={{ color: '#ff5e96', fontSize: 14, height: 60, paddingLeft: -5, }}
                    />

                  </View>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 15 }}>College/University</Text>
                  <View style={{ justifyContent: 'center', backgroundColor: '#fff1f6', padding: 20, borderRadius: 10, height: 60, }}>

                    <TextInput
                      value={collegename}
                      onChangeText={(text) => {
                        setCollegename(text)
                      }}
                      placeholder="College/University name"
                      placeholderTextColor='#ff5e96'
                      style={{ color: '#ff5e96', fontSize: 14, height: 60, paddingLeft: -5, }}
                    />

                  </View>
                </View>

              </View>

              {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>

          </View>
        </Modal>
        {/* ......Gender select modal 11..... */}
        <Modal
          isVisible={showPassionsModal11}
          swipeDirection="down"
          onBackdropPress={() => setShowPassionsModal11(false)}
          onSwipeComplete={(e) => {
            setShowPassionsModal11(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ height: '38%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>

                <View style={{ flex: 1 }} >
                  <Image source={require('../../../assets/gender-equality.png')} style={{ height: 40, width: 40 }} />
                </View>
                <Text style={{ flex: 4, color: Mycolors.Black, fontWeight: '500', textAlign: 'center', fontSize: 16 }}>Pick up which best describes you.</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal11(false)} style={{ flex: 1 }}>
                  <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center' }}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', alignSelf: 'center', marginTop: 9 }}>
                {/* <Text style={{ color: '#4a4c52', fontSize: 12 }}>
                  Select Zodiac that you would like to share.
                </Text> */}
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 1, marginBottom: 10 }}>

                </View> */}

                <FlatList

                  data={genderValue}
                  showsHorizontalScrollIndicator={false}
                  // numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity onPress={() => { changeSelectedGender(item) }} style={[styles.showMeView, { width: '100%', marginBottom: 10, backgroundColor: genderselect == item ? '#fff1f6' : '#fff', borderColor: genderselect == item ? '#ff3b7f' : '#e3d0d7' }]}>
                        <Text style={styles.showMeText}>{item}</Text>

                      </TouchableOpacity>
                    )
                  }}
                />
              </View>

              {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>

          </View>
        </Modal>
        {/* ......Height select modal 12..... */}
        <Modal
          isVisible={showPassionsModal12}
          swipeDirection="down"
          onBackdropPress={() => setShowPassionsModal12(false)}
          onSwipeComplete={(e) => {
            setShowPassionsModal12(false)
          }}
          scrollTo={() => { }}
          scrollOffset={1}
          propagateSwipe={true}
          coverScreen={false}
          backdropColor='transparent'
          style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ height: '38%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>

                <View style={{ flex: 1 }} >
                  <Image source={require('../../../assets/icons-ruler.png')} style={{ height: 40, width: 40 }} />
                </View>
                <Text style={{ flex: 4, color: Mycolors.Black, fontWeight: '500', textAlign: 'center', fontSize: 16 }}>What is your height?</Text>
                <TouchableOpacity onPress={() => setShowPassionsModal12(false)} style={{ flex: 1 }}>
                  <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center' }}>Done</Text>
                </TouchableOpacity>
              </View>

              {/* <View style={{ width: '95%', alignSelf: 'center', marginTop: 9 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3e5869', marginBottom: 10, marginTop: 1 }}>Height</Text>
                  <View style={{ justifyContent: 'center', backgroundColor: '#fff1f6', padding: 20, borderRadius: 10, height: 60, }}>

                    <TextInput
                      value={heightselect}
                      onChangeText={(text) => {
                        setHeightSelect(text)
                      }}
                      placeholder="167CM"
                      placeholderTextColor='#ff5e96'
                      style={{ color: '#ff5e96', fontSize: 14, height: 60, paddingLeft: -5, }}
                    />

                  </View>
              </View> */}
              {/* <Modal isVisible={showPassionsModal12}>
         
      </Modal> */}
              {/* <FlatList
                data={menutypedate}
                showsHorizontalScrollIndicator={false}
                style={{ height: 40 }}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                  return (
                    <View>
<Text>

</Text>
                    </View>
                  )
                }}
              /> */}
              {/* <View style={{ width: '95%', alignSelf: 'center', marginTop: 9,backgroundColor:'lightgray',paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.6,
                    borderColor: 'black',
                    borderRadius: 8, }}>
                <RNPickerSelect
                  placeholder={{ label: "Select your height", value: null }}
                  modalProps={{
                    style: {
                      height: 300, // Set a custom height for the modal
                    },
                  }}
                  onValueChange={(value) => { setHeightSelect(value) }}
                  items={[
                    { label: '150 cm', value: '150 cm' },
                    { label: '151 cm', value: '151 cm' },
                    { label: '152 cm', value: '152 cm' },
                    { label: '153 cm', value: '153 cm' },
                    { label: '154 cm', value: '154 cm' },
                    { label: '155 cm', value: '155 cm' },
                    { label: '156 cm', value: '156 cm' },
                    { label: '157 cm', value: '157 cm' },
                    { label: '158 cm', value: '158 cm' },
                    { label: '159 cm', value: '159 cm' },
                    { label: '160 cm', value: '160 cm' },
                    { label: '161 cm', value: '161 cm' },
                    { label: '162 cm', value: '162 cm' },
                    { label: '163 cm', value: '163 cm' },
                    { label: '164 cm', value: '164 cm' },
                    { label: '165 cm', value: '165 cm' },
                    { label: '166 cm', value: '166 cm' },
                    { label: '167 cm', value: '167 cm' },
                    { label: '168 cm', value: '168 cm' },
                    { label: '169 cm', value: '169 cm' },
                    { label: '170 cm', value: '170 cm' },
                    { label: '171 cm', value: '171 cm' },
                    { label: '172 cm', value: '172 cm' },
                    { label: '173 cm', value: '173 cm' },
                    { label: '174 cm', value: '174 cm' },
                    { label: '175 cm', value: '175 cm' },
                    { label: '176 cm', value: '176 cm' },
                    { label: '177 cm', value: '177 cm' },
                    { label: '178 cm', value: '178 cm' },
                    { label: '179 cm', value: '179 cm' },
                    { label: '180 cm', value: '180 cm' },
                    { label: '181 cm', value: '181 cm' },
                    { label: '182 cm', value: '182 cm' },
                    { label: '183 cm', value: '183 cm' },
                    { label: '184 cm', value: '184 cm' },
                    { label: '185 cm', value: '185 cm' },
                    { label: '186 cm', value: '186 cm' },
                    { label: '187 cm', value: '187 cm' },
                    { label: '188 cm', value: '188 cm' },
                    { label: '189 cm', value: '189 cm' },
                    { label: '190 cm', value: '190 cm' },
                    { label: '191 cm', value: '191 cm' },
                    { label: '192 cm', value: '192 cm' },
                    { label: '193 cm', value: '193 cm' },
                    { label: '194 cm', value: '194 cm' },
                    { label: '195 cm', value: '195 cm' },
                    { label: '196 cm', value: '196 cm' },
                    { label: '197 cm', value: '197 cm' },
                  ]}
 
                  style={{
                    height: 200,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 8,
                    color: 'black',
                    paddingRight: 30
                  }}
                />
              </View> */}
              {/* <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', marginBottom: 1, borderWidth: 1, borderColor: 'gray', padding: 4, borderRadius: 5, }}>
                <View style={{ width: '98%', height: 40, zIndex: -999 }}>



                  <DropDownPicker
                    open={menutypeOpen}
                    value={menutypevalue}
                    items={menutypedate}
                    //multiple={true}
                    setOpen={() => { setmenutypeOpen(!menutypeOpen) }}
                    setValue={(v) => { setmenutypevalue(v) }}
                    setItems={(i) => { setmenutypedate(i) }}
                    listMode="MODAL"
                    placeholder="Select Height"
                    searchable={true}
                    searchPlaceholder="Search..."
                    searchTextInputProps={{
                      maxLength: 25
                    }}
                    onChangeValue={(value) => {
                      // setmenuresData([])
                      setmenutypevalue(value)
                      console.log('hihiihi', value)
                      // getData(makeUrl(value))

                      // setreloades(!reloades)
                    }}
                    // dropDownDirection="TOP"
                    placeholderStyle={{
                      color: Mycolors.GrayColor,
                      fontSize: 16,
                      // fontWeight: 'bold'
                    }}
                    textStyle={{
                      color: Mycolors.GrayColor,
                      fontSize: 16,
                      fontWeight: 'bold'
                      //  fontSize:5
                    }}
                    style={{ borderColor: 'transparent', backgroundColor: 'transparent', height: 40, zIndex: 999, top: -5, }}
                    containerStyle={{

                      width: '102%',
                      borderColor: 'red',
                      height: 40,
                      zIndex: 999
                    }}
                    disabledStyle={{
                      opacity: 0.5
                    }}
                    dropDownContainerStyle={{

                      // width: '100%',
                      backgroundColor: "#fff",
                      borderColor: '#000',
                      // height:360,
                      borderWidth: 0.2,
                      shadowColor: '#000000',
                      shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 5,
                      shadowOpacity: 1.0,
                      elevation: 5,
                      zIndex: 999
                    }}
                  />

                </View>

              </View> */}

              {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>

          </View>
        </Modal>
      </LinearGradient>
      {loading ? <Loader /> : null}
      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    paddingLeft: 15,
    width: '100%',
    fontSize: 14,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    color: '#ff5e96',
    height: 100,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // color:Mycolors.Black,
    shadowColor: '#91e3e3',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 1,

  },
  showMeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '27%',
    padding: 10,
    // paddingHorizontal:15, 
    borderRadius: 5,
    borderWidth: 0.5
  },
  smokingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '32%',
    padding: 10,
    // paddingHorizontal:15, 
    borderRadius: 20,
    borderWidth: 0.5
  },
  showMeText: {
    fontSize: 14,
    color: '#4a4c52'
  },
  showMeImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 25,
    borderRadius: 20 / 2,
    marginLeft: 0,
  },
  showMeImage: {
    height: 15,
    width: 15
  },
  deleteIconView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 50 / 2,
    backgroundColor: '#ff001e',
    position: 'absolute',
    top: -5,
    left: 80
  },
  plusIconView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 50 / 2,
    backgroundColor: '#ff3b7f',
    position: 'absolute',
    bottom: -10,
    left: 40
  },
  deleteIcon: {
    width: 10,
    height: 10
  },
  plusIconSuperView: {
    marginLeft: 20,
    backgroundColor: '#fde7eb',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 10
  }
});
const pickerSelectStyles = StyleSheet.create({
  // inputIOS: {
  //   fontSize: 16,
  //   paddingVertical: 12,
  //   paddingHorizontal: 10,
  //   borderWidth: 1,
  //   borderColor: 'gray',
  //   borderRadius: 4,
  //   color: 'black',
  //   paddingRight: 30 // to ensure the text is never behind the icon
  // },
  inputAndroid: {
    justifyContent: 'center',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});
export default DatingEditProfile 