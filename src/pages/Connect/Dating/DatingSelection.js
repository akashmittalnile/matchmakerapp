import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, InteractionManager, Animated, PanResponder, RefreshControl, KeyboardAvoidingView } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import HomeHeader from '../../../component/HomeHeader';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import AppIntroSlider from 'react-native-app-intro-slider';
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Geocoder from "react-native-geocoding";
import { GoogleApiKey } from '../../../WebApi/GoogleApiKey';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import { setRestorentLocation, setdatingMatchData, setdatingmessagecount } from '../../../redux/actions/latLongAction';
import Loader from '../../../WebApi/Loader';
import Svg from 'react-native-svg';
import imageSvg from '../../../assets/lovematching_icon.svg';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { connect_dating_active_status, connect_dating_chat_list, connect_dating_home_data, connect_dating_location, connect_dating_profile, connect_dating_profile_list, connect_dating_swipe_profile, connect_dating_swipe_profile_id_delete, requestGetApi, requestPostApi } from '../../../WebApi/Service';
import DatingCard from "../../../component/DatingCard";
import MyAlert from '../../../component/MyAlert';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

Geocoder.init(GoogleApiKey);
const GOOGLE_MAPS_APIKEY = GoogleApiKey;
const SliderData = [
  { slider: `https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60` },
  { slider: `https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60` },
  { slider: `https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60` },
]

const PeopleHome = (props) => {
  const User = useSelector(state => state.user.user_details)
  // const Userlatlog = useSelector(state => state.maplocation)
  const mapdata = useSelector(state => state.maplocation)
  const [loading, setLoading] = useState(false)
  const [searchValue, setsearchValue] = useState('')
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [addre, setaddre] = useState(' ');
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const myTextInput = useRef()
  const dispatch = useDispatch();
  const [googleAddress, setGoogleAddress] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [googleLatLng, setGoogleLatLng] = useState({});
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [ageRangeSliderValue, setAgeRangeSliderValue] = useState([18, 60])
  const [distanceSliderValue, setDistanceSliderValue] = useState([50, 50])
  const [interstedInValue, setInterstedInValue] = useState(['Male', 'Female', 'Transgender']);
  const [interstedInselect, setInterstedInSelect] = useState('');
  const [smokingValue, setSmokingValue] = useState(['Yes', 'No', 'Occassionally']);
  const [smokingselect, setSmokingSelect] = useState('');

  const [drinkingValue, setDrinkingValue] = useState(['Yes', 'No', 'Occassionally']);
  const [drinkingselect, setDrinkingSelect] = useState('');
  const [kidsValue, setKidsValue] = useState(['Open to kids', 'Don`t want', 'Not sure yet']);
  const [kidsSelect, setKidsSelect] = useState('');
  const [viewmore, setviewmore] = useState(true)
  const [isprofiles, setProfiles] = useState([]);
  const [totalpagecount, SetTotalpageCount] = useState('')

  const [increments, setIncrement] = useState(1);
  const [allImg, setAllImg] = useState([{ img: '' }])
  const [filterByStatus, setFilterByStatus] = useState(['All', 'Online', 'New']);
  const [filterBySelect, setFilterBySelect] = useState('');
  const [profiledata, setProfileData] = useState("");
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [filterselected, setfilterselected] = useState(false);

  const [counterStart, setCounterStart] = useState('');
  const [upData, setupData] = useState([
    {
      id: '1',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      img: require('../../../assets/images/images.png'),
      isSaved: false,
      isLiked: false
    },
    {
      id: '2',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      img: require('../../../assets/images/images.png'),
      isSaved: false,
      isLiked: false
    },
    {
      id: '3',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      img: require('../../../assets/images/images.png'),
      isSaved: false,
      isLiked: false
    },
    {
      id: '4',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      img: require('../../../assets/images/images.png'),
      isSaved: false,
      isLiked: false
    },

  ])

  const [timecounter, setTimecounter] = useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      setShowFilterModal(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setVisible(false);
    Geodummy()
    Activestatus()
    const unsubscribe = props.navigation.addListener('focus', () => {
      //  GetMessageProfile(); // use this function before come dating home screen 
      GetmatchesProfile(); // use this function before come dating home screen
      Profiledatas()
      ProfilePage()
    })
    return () => unsubscribe();
  }, []);

  const calcc = async () => {
    // const likescount = await AsyncStorage.getItem("Datingcounter");
    // console.log("likescountlikescount:>>>>>>>", likescount);
    // if (likescount != null) {

    // }
    // setCounterStart(likescount)
  }
  // remaing time = 24 hrs - (current time - backend time)
  useEffect(() => {
    // calcc()

    setInterval(() => {
      const end_time = '24:59:58';
      const datetimeA = moment(counterStart.lastSwipe);
      const datetimeB = moment(new Date()).endOf('day');
      // console.log(datetimeA.format('YYYY/MM/DD HH:mm:ss'));
      // console.log("BBBBBB===",datetimeB.format('YYYY/MM/DD HH:mm:ss'));
      const datetimeC = moment(datetimeB.diff(datetimeA));
      const formatted = datetimeC.format("HH:mm:ss");
      // console.log("datetimeTOTAL", formatted);

      setTimecounter(formatted)
    }, 1000);

  }, [])
  // const [images, setImages] = useState([
  //   {
  //     id: 1,
  //     image: `https://cdn.britannica.com/64/182864-050-8975B127/Scene-The-Incredible-Hulk-Louis-Leterrier.jpg`,
  //     title: "HULK",
  //     age: '20',
  //     fullname: '@hulk',
  //     distance: '5'
  //   },
  //   {
  //     id: 2,
  //     image: `https://cdn.britannica.com/49/182849-050-4C7FE34F/scene-Iron-Man.jpg`,
  //     title: "IRON MAN",
  //     age: '30',
  //     fullname: '@Iron Man',
  //     distance: '2'
  //   },
  //   {
  //     id: 3,
  //     image: `https://cdn.britannica.com/30/182830-050-96F2ED76/Chris-Evans-title-character-Joe-Johnston-Captain.jpg`,
  //     title: "CAPTAIN AMERICA",
  //     age: '10',
  //     fullname: '@CAPTAIN AMERICA',
  //     distance: '6'
  //   },
  //   {
  //     id: 4,
  //     image: `https://upload.wikimedia.org/wikipedia/en/d/d6/Superman_Man_of_Steel.jpg`,
  //     title: "SUPER MAN",
  //     age: '60',
  //     fullname: '@SUPER MAN',
  //     distance: '8'
  //   },
  // ]);
  //   useEffect(() => {
  //   const interactionPromise = InteractionManager.runAfterInteractions(() =>
  //   onShown(),
  // );
  // return () => interactionPromise.cancel();
  // }, [onShown]);

  // useEffect(() => {
  //   // Schedule a task to run after interactions have completed
  //   InteractionManager.runAfterInteractions(() => {
  //     fetchData();
  //   });
  // }, []);

  // const fetchData = () => {
  //   // Simulating a network request that takes some time

  //   setTimeout(() => {

  //     Profilelist()


  //     InteractionManager.clearInteractionHandle(interactionHandle);
  //   }, 2000);
  // };

  // const interactionHandle = InteractionManager.createInteractionHandle();

  const SwipeProfile = async (type) => {

    console.warn("SwipeProfile:", type);
    if (type == "L") {
      console.log("skipProfile,totalpagecount::", increments, totalpagecount);
      if (filterselected == true) {
        Profilelist();
        console.log("Filter-call.......")
      }
      else {
        console.log("homeAPI-call.......")
        Profiledatas();
      }
 
    }
    else if (type == "R") {
      console.log("uuuunnnuuuu,totalpagecount::", increments, totalpagecount);
      setLoading(true)
      let message = 'Interest sent to ' + isprofiles[0]?.fullname + ' successfully awaiting response.'
      var data = {
        userid: isprofiles[0].userid,
        swipe_type: "R"
      }
      console.log("addres........", data);
      const { responseJson, err } = await requestPostApi(connect_dating_swipe_profile, data, 'POST', User.token)
      setLoading(false)
      console.log('the res==>>SwipeProfileDATA', responseJson?.body)
      // console.log("1212121", increments);
      // AsyncStorage.setItem("Datingcounter", responseJson?.body);
      setCounterStart(responseJson?.body)
      if (responseJson?.headers?.success == 1) {

        // console.log('================er====================');
        // console.log('===2case================================');
        // console.log(distanceSliderValue[0] > '51' || ageRangeSliderValue[1] == ageRangeSliderValue[1] || interstedInselect != "" || filterBySelect != "" || smokingselect != "" || drinkingselect != "" || kidsSelect != "");
        // console.log('================e2case====================');
        if (filterselected == true) {
          if (distanceSliderValue[0] > '51' || ageRangeSliderValue[1] == ageRangeSliderValue[1] || interstedInselect != "" || filterBySelect != "" || smokingselect != "" || drinkingselect != "" || kidsSelect != "") {
            Profilelist();
          }
        } else {
          Profiledatas();

        }
        
        if (responseJson?.body?.totalSwipe == responseJson?.body?.swipeLimit) {
          setVisible(true);
        }
        else {
          setVisible(false);
        }

        Toast.show({ text2: message });



      }
      else {
        Toast.show({ text1: responseJson?.headers?.message });
        setVisible(false);

        // setalert_sms(err)
        // setMy_Alert(true)
      }
    }

  }


  const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }

  // useEffect(() => {
  //   const unsubscribe1 = props.navigation.addListener('blur', () => {
  //     setVisible(false);
  //   });

  //   return unsubscribe1;
  // }, []);


  const GetMessageProfile = async () => {

    setLoading(true);
    const { responseJson, err } = await requestGetApi(connect_dating_chat_list, '', 'GET', User.token)
    setLoading(false)
    // console.log('the res==>>DatingMessages', responseJson)
    if (responseJson?.headers?.success == 1) {
      // setUserList(responseJson?.body?.data)
      var dummyarray = responseJson?.body?.data
      var myarray = []
      for (let i = 0; i < dummyarray.length; i++) {
        var driverids = dummyarray[i].connect_userid
        var myid = User?.userid
        const docid = driverids > myid ? myid + "-" + driverids : driverids + "-" + myid;
        // console.log('=GetSwipeProfile===================================');
        // console.log("GetSwipeProfile", docid);
        // console.log('===============GetSwipeProfile=====================');
        myarray.push({ ...dummyarray[i], docid: docid })
      }
      // setUserList(myarray)
      console.log('res_GetMessageProfile =>>>>>', myarray);

      let totalCount = 0;
      myarray.map(item => {
        firestore()
          .collection('Matchmakingapp')
          .doc(item.docid.toString())
          // .doc(item.docid)
          .collection('users')
          .where('userId', '==', User.userid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              const unreadCount = doc.data().unread_count;
              totalCount += unreadCount;
              console.error('GetSwipeProfile------:', totalCount);
              // Perform any further operations with the unreadCount
            });
            dispatch(setdatingmessagecount(totalCount));
            // setMessagesCount(totalCount);
            return;
          })
          .catch(error => {
            // Handle any errors that occur during the retrieval
            console.error('Error getting users:', error);
          });
      });

      // setDriverid(myarray)
    } else {
      setalert_sms(responseJson?.headers?.message)
      setMy_Alert(true)
    }
  };

  const GetmatchesProfile = async () => {

    setLoading(true)
    const { responseJson, err } = await requestGetApi(connect_dating_swipe_profile, '', 'GET', User.token)

    // console.log('the res==>>GetmatchesProfile', responseJson?.body?.data?.length)
    if (responseJson.headers.success == 1) {
      dispatch(setdatingMatchData(responseJson?.body?.data?.length))
      // setmatchesprofile(responseJson?.body?.data)
    } else {
      setalert_sms(responseJson.headers.message);
      setMy_Alert(true)
    }
    setLoading(false)
  }



  messaging().onMessage(remoteMessage => {
    const data = remoteMessage.data
    // console.log('onMessage remoteMessage', remoteMessage)
    if (remoteMessage?.notification.body == 'Kinengo Dating has accepted your request to connect click to initiate the chat.') {
      props.navigation.navigate('DatingChat', { data: remoteMessage.data })
      // setRemoteMessageData(remoteMessage.data)
    } else if (remoteMessage?.notification.body == 'new message') {
      //  dispatch(setMessageCount(mapdata.messagecount+1))
      props.navigation.navigate('DatingChat', { data: remoteMessage.data })

    }

  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    const data = remoteMessage.data
    // console.log('Notification caused app to open from background state:', remoteMessage)
    if (remoteMessage?.notification.title == 'Kinengo Dating has accepted your request to connect click to initiate the chat.') {
      if (remoteMessage?.notification.body == 'Kinengo Dating has accepted your request to connect click to initiate the chat.') {
        props.navigation.navigate('DatingChat', { data: remoteMessage.data })
      } else {
        props.navigation.navigate('DatingChat', { data: remoteMessage.data })
      }

    } else if (remoteMessage?.notification.body == 'new message') {
      props.navigation.navigate('DatingChat', { data: remoteMessage.data })
      // dispatch(setMessageCount(mapdata.messagecount+1))
    }
  });


  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      // console.log('====================================');
      // console.log(remoteMessage);
      // console.log('====================================');
      if (remoteMessage?.notification.title == 'Kinengo Dating has accepted your request to connect click to initiate the chat.') {
        if (remoteMessage?.notification.body == 'Kinengo Dating has accepted your request to connect click to initiate the chat.') {
          props.navigation.navigate('DatingChat', { data: remoteMessage.data })
        } else {
          props.navigation.navigate('DatingChat', { data: remoteMessage.data })
        }
      } else if (remoteMessage?.notification.body == 'new message') {
        // dispatch(setMessageCount(mapdata.messagecount+1))
        props.navigation.navigate('DatingChat', { data: remoteMessage.data })

      }
    });



  const checkcon = () => {
    setIncrement(1)
    Profiledatas()
    Resetallinputfield()
  }
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {

    checkcon()
    wait(2000).then(() => {

      setRefreshing(false)

    });
  }, []);





  const swipe = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy }) => {
      // console.log("dx", dx, "dy", dy);
      swipe.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      let direction = Math.sign(dx);
      let isActionActive = Math.abs(dx) > 200;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: { x: 500 * dx, y: dy },
          duration: 500,
          useNativeDriver: true,
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: true,
        }).start();
      }

      // console.log("RELEASE dx", dx, "dy", dy);
    },
  });


  // const handleSelection1 = (direction, data) => {
  //   setLoading(true)
  //   Animated.spring(scaleValue, {
  //     toValue: 1,
  //     duration: 500,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     if (direction == '1') {
  //       PutSwipeProfile('Accepted')
  //       setLoading(false)
  //     }
  //   });
  // }

  const handleSelection = useCallback(
    (direction) => {
      Animated.spring(swipe, {
        toValue: { x: direction * 500, y: 0 },
        useNativeDriver: true,
        duration: 500,
      }).start(removeCard);
    },
    [removeCard]
  );
  const removeCard = useCallback(() => {
    // setProfiles((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, []);

  // const PutSwipeProfile = async (t) => {
  //   // console.log("SwipeProfile........", t);
  //   setLoading(true)

  //   var data = {
  //     swipe_status: t  // Accepted, Rejected,
  //   }
  //   const { responseJson, err } = await requestPostApi(connect_dating_swipe_profile_id_delete, data, 'PUT', User.token)
  //   setLoading(false)
  //   // console.log('the res==>>GetSwipeProfile', responseJson)
  //   if (responseJson.headers.success == 1) {
  //     props.navigation.navigate('DatingChat', { Reciver_data: t, from: 'DatingSelection' })
  //   } else {
  //     setalert_sms(responseJson.headers.message)
  //     setMy_Alert(true)
  //   }
  // }



  const navigateToNextScreen = (id) => {
    setLoading(false)
    // console.log("DatingMoreInfo");
    props.navigation.navigate('DatingMoreInfo', { selectprofile: id, from: 'PeopleHome' })
  };
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handleButtonPress = (id) => {
    setLoading(true)
    Animated.spring(scaleValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      navigateToNextScreen(id);
    });
  };





  const Geodummy = async () => {
    let My_cord = { latitude: '28.5355', longitude: '77.3910' }
    homePage('28.5355', '77.3910')

    dispatch(setRestorentLocation(My_cord))
    LatlongTo_address(My_cord)
  }

  const LatlongTo_address = async (latlong) => {
    // var courentlocation = mapdata.curentPosition
    // dispatch(setStartPosition(courentlocation))
    Geocoder.from(latlong.latitude, latlong.longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        // console.log('The address is', json.results[0].formatted_address);
        setaddre(addressComponent)
        // UpdateLocation(latlong,addressComponent)
      })
      .catch(error => console.warn(error));
  }


  const homePage = async (l, lo) => {
    // console.log("Userlatlog........", mapdata);
    // address: addre   
    // console.log('the res==>>DatingSelection', l, lo)
    setLoading(true)
    var data = {
      // "location_name": "Office",
      latitude: l,
      longitude: lo,
      address: "Dummy address"    //addre
    }
    // console.log("addres........", data);
    const { responseJson, err } = await requestPostApi(connect_dating_location, data, 'PUT', User.token)
    setLoading(false)
    // console.log('the res==>>homePage', responseJson)
    if (responseJson?.headers?.success == 1) {
      // console.log('the res==>>Home.body.vendors', responseJson.body)
      // setresData(responseJson.body)
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const Activestatus = async () => {

    setLoading(true)
    var data = {
      activity_status: "Online" //Offline, Online
    }
    // console.log("aActivestatus........", data);
    const { responseJson, err } = await requestPostApi(connect_dating_active_status, data, 'PUT', User.token)
    setLoading(false)
    // console.log('the res==>>Activestatuse', responseJson)
    if (responseJson?.headers?.success == 1) {
      // console.log('the res==>>Home.body.vendors', responseJson.body)
      // setresData(responseJson.body)
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  };

  const increment = () => {
    console.log("isprofiles?.length > ", isprofiles?.length);

    if (isprofiles?.length > 0) {

      setIncrement(increments + 1);

    }
    else {
      setIncrement(increments);
    }

  }

  const Profiledatas = async () => {

    console.log('========Profiledatas============================');
    console.log("ProfiledatasProfiledatas", increments, totalpagecount);
    console.log('============Profiledatas========================');
     
    if (totalpagecount == increments && totalpagecount < increments) {
      setIncrement(increments + 1);
      var pageup = 1
    } else {
      setIncrement(increments + 1)
      var pageup = increments;

    }
    if (totalpagecount < increments) {
      setIncrement(1)
      var pageup = 1;
    }
    console.log("the res==>>ProfileHOMEPage---------", distanceSliderValue[0], pageup)
    setLoading(true);

    const { responseJson, err } = await requestGetApi(connect_dating_home_data
      + 'lat=' + 28.5355 + '&long=' + 77.3910 + '&distance=' + distanceSliderValue[0] + '&limit=' + 1 + '&page=' + pageup, "", "GET", User.token);
    setLoading(false);
    console.log("the res==>>ProfileHOMEPage", responseJson?.body?.data);
    if (responseJson?.headers?.success == 1) {
      if (responseJson?.body?.page == responseJson?.body?.totalCount) {
        setIncrement(1);
      }
      setProfiles(responseJson?.body?.data);
      var allimgs = [];
      for (let i = 1; i <= responseJson?.body?.data[0].images.length; i++) {
        allimgs.push({ img: responseJson?.body?.data[0].images[i - 1].image })
      }
      setAllImg(allimgs)
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  const ProfilePage = async () => {
    // console.log("the res==>>ProfilePage");
    setLoading(true);

    const { responseJson, err } = await requestGetApi(
      connect_dating_profile + '/' + User.userid,
      "",
      "GET",
      User.token
    );
    setLoading(false);
    // console.log("the res==>>ProfilePage", responseJson);
    if (responseJson.headers.success == 1) {
      // console.log("the res==>>ProfilePage", responseJson.body);
      setProfileData(responseJson?.body);
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  const Resetallinputfield = () => {
    setInterstedInSelect('');
    setFilterBySelect('');
    setSmokingSelect('');
    setDrinkingSelect('');
    setKidsSelect('');
  }

  const Profilelist = async () => {
    setfilterselected(true);
    setShowFilterModal(false);
    console.log("the res==>>Profilelist------::", ageRangeSliderValue[0], ageRangeSliderValue[1], interstedInselect, filterBySelect, distanceSliderValue[0], totalpagecount, increments);

    
    if (totalpagecount == increments && totalpagecount < increments) {
      setIncrement(increments + 1);
      var pageup = 1
    } else {
      setIncrement(increments + 1)
      var pageup = increments;

    }
    if (totalpagecount < increments) {
      setIncrement(1)
      var pageup = 1;
    }

    console.log("PAGEUP_value::---", pageup);



    setLoading(true);


    const { responseJson, err } = await requestGetApi(connect_dating_profile_list + '?lat=' + 28.5758384 + '&long=' + 77.320955 + '&distance=' + distanceSliderValue[0] + '&intrest_in=' + interstedInselect + '&age_from=' + ageRangeSliderValue[0] + '&age_to=' + ageRangeSliderValue[1] + '&smoking=' + smokingselect + '&drinking=' + drinkingselect + '&kids=' + kidsSelect + '&activity_status=' + filterBySelect + '&limit=' + 1 + '&page=' + pageup, "", "GET", User.token);
    setLoading(false);
    console.log("the res==>>Profilefilter_list", responseJson?.body?.totalCount);
    if (responseJson?.headers?.success == 1) {
      setProfiles(responseJson?.body?.data);
      SetTotalpageCount(responseJson?.body?.totalCount)
      if (responseJson?.body?.page == responseJson?.body?.totalCount) {
        setIncrement(1);
      }

      console.log("the res==>>Profilefilter", responseJson.body.data);

      var allimgs = [];
      for (let i = 1; i <= responseJson?.body?.data[0].images.length; i++) {
        allimgs.push({ img: responseJson?.body?.data[0].images[i - 1].image })
      }
      setAllImg(allimgs)

    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  const ageRangeSliderValuesChange = (values) => { setAgeRangeSliderValue(values) }
  const distanceSliderValuesChange = (values) => { setDistanceSliderValue(values) }

  const changeSaved = (id) => {
    const updataCopy = [...upData]
    const updatedData = updataCopy?.map(el => el.id === id ? { ...el, isSaved: !el.isSaved } : el)
    setupData([...updatedData])
  }
  const changeLiked = (id) => {
    const updataCopy = [...upData]
    const updatedData = updataCopy?.map(el => el.id === id ? { ...el, isLiked: !el.isLiked } : el)
    setupData([...updatedData])
  }

  const onReject = (id) => {
    // console.log('id rejected', id);
    props.navigation.navigate('DatingChat')
  }
  const onLove = (id) => {
    // console.log('id loved', id);
    props.navigation.navigate('DatingMessages')
  }






  // const onRefresh = (id) => {
  //   console.log('id refreshed', id);
  //   props.navigation.navigate('DatingMoreInfo',{selectprofile:id ,from:'PeopleHome'})
  // }
  const onChangeInterested = (value) => {
    // console.log("onChangeInterested", value);
    if (interstedInselect === value) {
      return
    }
    setInterstedInSelect(value)
  }

  const onChangeFilterByStatus = (value) => {
    if (filterBySelect === value) {
      return
    }
    setFilterBySelect(value)
  }

  const onChangeSmoking = (value) => {
    // console.log("onChangeInterested", value);
    if (smokingselect === value) {
      return
    }
    setSmokingSelect(value)
  }

  const onChangeDrinking = (value) => {
    // console.log("onChangeInterested", value);
    if (drinkingselect === value) {
      return
    }
    setDrinkingSelect(value)
  }

  const onChangeKids = (value) => {
    console.log("onChangeInterested++++++++++++", value);
    if (kidsSelect === value) {
      return
    }
    setKidsSelect(value)
  }

  function renderDescription(rowData) {
    const title = rowData.structured_formatting.main_text;
    const address = rowData.structured_formatting.secondary_text;
    // console.log('renderDescription', address);
    return (
      <View style={{}}>
        <Text style={{ color: 'gray' }}>
          {title}
        </Text>
        <Text style={{ color: 'gray' }}>
          {address}
        </Text>
      </View>
    );
  }

  // const _renderItem = ({ item }) => {
  //   return (
  //     <Image source={{ uri: item?.image }} style={{ width: dimensions.SCREEN_WIDTH * 0.9, height: dimensions.SCREEN_HEIGHT / 2, borderRadius: 20 }} />
  //     // <View key={item.key} style={styles.slide}>
  //     //   <Text style={styles.title}>{item.title}</Text>
  //     //   <Text style={styles.text}>{item.text}</Text>
  //     // </View>
  //   );
  // }
  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#fff5f7', height: '100%', width: '100%' }}>

      <View style={{ width: '90%', alignSelf: 'center', marginTop: 0, zIndex: -999 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center', height: 70 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { props.navigation.navigate('DatingProfile') }} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={{ uri: `${profiledata?.profile_image != null ? profiledata?.profile_image : 'https://kinengo-dev.s3.us-west-1.amazonaws.com/images/camera-icon.jpg'}` }} style={{ height: 40, width: 40, borderRadius: 20, borderColor: '#e42f5e', borderWidth: 2 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 12.5, fontWeight: 'bold', color: '#31313f' }}>Personal connect</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}  >
            <Image source={require('../../../assets/images/dating-home-header-right-image.png')} />
          </View>
        </View>

        <View style={{ width: dimensions.SCREEN_WIDTH, borderBottomColor: '#ffb0ba', borderBottomWidth: StyleSheet.hairlineWidth, left: -21, marginTop: 1, }} />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginHorizontal: 10,
          // backgroundColor: 'rgba(0,0,0,0.025)',
          paddingHorizontal: 5,
          // paddingVertical: 5,
          // alignSelf: 'center',
          // alignItems: 'center',
          // backgroundColor: '#fff',
          width: '100%',
          borderRadius: 10,
          height: 50

        }}>
          <TouchableOpacity style={{ justifyContent: 'center', position: 'absolute', height: 55, left: 1 }}>
            <Image source={require('../../../assets/images/dating-location-image.png')} style={{ width: 12, height: 15 }}></Image>
          </TouchableOpacity>
          <View style={{ width: '92%', justifyContent: 'center', alignItems: 'center', }}>
            <GooglePlacesAutocomplete
              // placeholder={addre.substring(0, 45)}
              placeholder={'Noida, Uttar Pradesh, India'}
              textInputProps={{
                placeholderTextColor: '#000',
                top: Platform.OS == 'ios' ? 15 : 0,
                // width: '95%',
                // placeholderTextColor: Colors.BLACK,
                returnKeyType: 'search',
                // onFocus: () => setShowPlacesList(true),
                // onBlur: () => setShowPlacesList(false),
                multiline: true,
                numberOfLines: 3,
                // onTouchStart: ()=>{downButtonHandler()}
                height: 50,
                color: '#000'
              }}
              renderRow={rowData => {
                return (
                  <View>
                    {renderDescription(rowData)}
                  </View>
                )
              }}
              enablePoweredByContainer={false}
              listViewDisplayed={'auto'}
              styles={{
                textInputContainer: {
                  width: '100%',
                  marginLeft: 0,
                  // backgroundColor: 'grey',
                },
                description: {
                  color: '#000',
                  width: '74%',
                  // fontWeight: '300'
                },
                poweredContainer: {
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderColor: '#C8C7CC',
                  borderTopWidth: 0.5,
                  color: '#000'
                },
                powered: {},
                listView: {
                  // color:'#000'
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  // borderRadius:10,
                  overflow: 'hidden',
                  paddingBottom: 10,
                  padding: 3
                },
                row: {
                  // backgroundColor: '#FFFFFF',
                  paddingVertical: 10,
                  height: 50,
                  flexDirection: 'row',
                },
                separator: {
                  height: 0.5,
                  backgroundColor: '#C8C7CC',
                  color: '#000',
                  marginTop: 10
                },
                textInput: {
                  backgroundColor: 'transparent',
                  height: 40,
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: '#000',
                  flex: 1,
                  // paddingHorizontal: 5,
                },
              }}
              onPress={(data, details = null) => {
                // console.log(data, details);
                // 'details' is provided when fetchDetails = true
                // setShowPlacesList(false)
                homePage(details.geometry.location.lat, details.geometry.location.lng)
                // dispatch(setRestorentLocation({
                //   latitude: details.geometry.location.lat,
                //   longitude: details.geometry.location.lng,
                // }))

                setGoogleLatLng({
                  lat: details.geometry.location.lat,
                  lng: details.geometry.location.lng,
                });
                setGoogleAddress(data?.description);
              }}
              GooglePlacesDetailsQuery={{
                fields: 'geometry',
              }}
              fetchDetails={true}
              // currentLocation={true}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
              }}
            />
          </View>

          <TouchableOpacity onPress={() => { setShowFilterModal(true) }} style={{
            height: 50, position: 'absolute', right: 0,
            borderRadius: 10,
            // borderBottomRightRadius: 10,
            // marginHorizontal: 8, 
            top: 2,
            width: 55,
            // backgroundColor: '#FFA5C5',
            paddingVertical: 14,
            // alignSelf: 'center',
            // justifyContent: 'center',
            alignItems: 'center',
            // width: 40,
            // borderTopRightRadius: 10, borderBottomRightRadius: 10
          }}>
            <TouchableOpacity onPress={() => { setShowFilterModal(true) }}>
              <Image source={require('../../../assets/images/dating-filter-image.png')} style={{ width: 30, height: 30 }}></Image>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        {/* {
           
            console.log('=========sd===========================',isprofiles )
            
          } */}
        {
          isprofiles?.length > 0 ?
            (<ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}

                />
              }
            >
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <>
                  <View style={{ width: '100%', height: dimensions.SCREEN_HEIGHT * 46 / 100, width: '100%', zIndex: 999 }}>

                    <View style={{ width: '100%', alignSelf: 'center', }}>
                      {/* <Image style={{ height: 400, width: '100%' }}
                    source={{ uri: `${isprofiles?.profile_image}` }}
                  /> */}
                      {
                        allImg.length > 0 ?
                          (<ImageSlider
                            //  localImg={true}
                            data={allImg}
                            // onClick={(item, index) => {alert('hello'+index)}}
                            // autoPlay={true}
                            // onItemChanged={(item) => console.log("item", item)}

                            // activeIndicatorStyle={{backgroundColor:'#FF4989'}}
                            indicatorContainerStyle={{ top: -5 }}

                            caroselImageStyle={{ width: dimensions.SCREEN_WIDTH, resizeMode: 'cover', height: 400, }}
                            // closeIconColor="#fff"
                            headerStyle={{ padding: 0, backgroundColor: 'rgba(0,0,0, 0.6)', }}
                          // showHeader
                          // preview={true}
                          />)
                          :

                          <Image style={{ height: 400, width: '100%' }} source={{ uri: `${'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEWVu9////+QuN6Rud6Mtt2nxuTg6vWavuDp8Pi80+rJ2+6fweLR4fDN3u/3+vzl7vexzOfa5vO/1evy9vusyeW2z+ju8/mJFiEAAAAGxUlEQVR4nO2d67ajKBCFFfCGJmqief9HbYnJykVNq2ziNofvx0yv6e6zsgeoogrYCQKPx+PxeDwej8fj8VAhRYcU/b+2/jBYpJRK5FWmi7qO47iuC51VuVDdf9/6oyGQQkU6PoZDjrGO1O5HU4gsHhH3IM6E2PpDrkeq5rO8m8hK7XMgpcrOM/Rd52u2Q41StWNrb1JjuzeNMr8s0Ge45LuSqPRCfQattv7Y85HpCoFhmO5lFGW+Sp9hHzNVRKsFhmG0g+QoGwuBYdjQS5Q2I3gdRfaJmlgKDMNkawmfUXO3MdOcqeepqq0FhmFNnBdlBRAYhhXvUhQQgWFIO09FAVJYsEq0j6N3SOOpQISZnppzEHFDSDqIsFVooFyJCigwDAlzosygCjO+nChKqMKSbxAlVGAYbq1nAHiSEk5TYDLsoUuJakl3dA5HtoWITPc9ZElftnCFLddCFAe4wgPXQpRzDpmWEXONIaA/886ZK9RgN6U9XAoDBwq3lvTK+qOKafKtRb1g2+keI9pa1DOgNuIrVE1FBwmfLOXDKwsDVXXhFXqFO1D485EmsDvaHqfZWtQz1mfbY3Cdd+NLfLYiH3Vy+AxXBfz71dPvV8C/38WAHq31kB2wyRNc4YlrDB2kfKqEH/yBnreDdMEVSrtQs+5a8DQpV6BxEEzJQulfOCGFd0y5uqUGdKhhCzT4uxhsy7BTuOYRyTSaTyG4zKdq6d/4+VtfgUAWUDHfJAWXF2yFxQ2gQrZtd49a+uRwmgvjMuymKS5faM5J+vs32QOFqqBSzkkKrC/46oo7P/9mBlUG010tfQJTJPKVhg8UooQivMT+BKLAYCwrHgASBm2quGE/iNxDCFiJ3KvQYBtOmQNpj2VOpGsEjyBsXl4cdyDQzjaiod2RPqPWz9OCPsz0rL62QHY54QNrS2HWwnfIyqW4j0XYs6oW5q17x1DLm6en3SzCnsUS9yawS/zLLtW2e0j1byxyxNqDA9YQGcytM8odGZnKl7FQ80Jq9rIEqR1NhTq9XoMRwf+feNfB619JT4p1ysrrwcVbE0IknzXWyaucaxtEM85aqfLbhvvyNgJC6ql96lnL9z98O78qcjK3T6HaRwvq/P67nXo9DDqlHlHx+H+RtjST1Vghv9ZLx3zw2bo/lLe6iMv0kpZxodt8xCNZ5K/Fc0FhpGzkDYv6dmyDIkXv5W3+OfbB1XCPcDQiXUv4xLg8wwpXuQk3uw1FSpUcplsyx2iZRhV9+FmHZIO4I1X1nx3LW577yH/zZvl1R2xVzehU6Jlm5GLODYBz9c3iQyQzjycG+W7sh8294ZAmX1uPS2q/uvkYJ4RqFlj3fKuGVMuudx2LZvTrHkzmaCZC8RTxVySuOUArD1Wi1C0dmoSoVFIdVhzifOPobf3h0rmsi4PW+lDU5eqHYO6Ppiwa2hhct8Wd2EMsw7GZBNp3bg1OFUKckG1x6aTs5Mn2chw+8oZdzbPDXcogGUKHgwi9q26Ds3vuLmwF1uHooNGBr95aHPnxwe0t1+PIGJMlzhicXA1z8OR+PU4uFhFNUkfT1IWt3nocXH8DvhdB4ODNCfiNqC0O3pi6cKCxAb4Qafakd+B7U7Jl6GAhOrDYsQNu0EOVDQ34jLi1ogFogS5M9ewAO/SA/QQQgD0J6AINPNQ48GOzBXxlmm1HY4AqpNvRGKC7Gices7ZAb01T1fd3oHU+WenUAy2g6PZsBui+jeFQbQhwHVKGUmgwpQyl0GBK1M9/Btjbpzl0egV4BAX01kEC9Olh3JUagOliaykTwPSRJgtgunDyzQcIYN+eQNcrvQPrmVJWFgZYdUHYpOmBtWrgLsgoYG7KhG2oHlgzijXh41K+i6/nwICapTx3od5B3Y3iuqPwDOq+At+pzB3Q6Qztpg22bSPtYRhAfQwH3z+CAmQ3TLvxhm29SftQBlAv6g8oJJ6lGIW/ny3+wK6N5CHJENjTEtpeWw47uBDbv8kbowIekYqcb6KmuBG8oiKGh3kP6oWeDTOQQmYsA5lm0o3piVSB3v4U6qIDlw4SUiWnLUcyPX3BBEQqmW3TIo4z+S3/D2MrpL87lKn+tuFQJ1I0h++oTHUjNvJTEmYsY5e3iY6xGbtNjZSk7CJsdSjxMo/loeqiJod1m+wGM6lwo9mNXJWocb+sDTEyZXMqUis/77Q4NZJP3BNGZxBlRbz0vOocH7KIW9szRmcn1HjQXT4P6fFi/OmiQO1G2zNdlBBSKSXzqGpPxpemjg218ak5tVWUX39XkEQTK2Sn9mou1NP/Mti/Lo/H4/F4PB6Px+P5Hf4BrxJp8oCGoikAAAAASUVORK5CYII='}` }} />
                      }


                    </View>
                  </View>

                  <View style={{ width: '100%', alignSelf: 'center', marginTop: 20 }}>

                    <View style={{ width: '100%', backgroundColor: '#fff5f7', padding: 10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <View>
                          <Text style={{ fontSize: 15, color: '#31313f', fontWeight: 'bold', }}>{isprofiles[0]?.fullname}, {isprofiles[0]?.age_preference}</Text>
                          {/* <Text style={{fontSize:10, color:'#e10f51', marginTop:5}}>@marry</Text> */}
                          <Text style={{ fontSize: 10, color: '#4a4c52', marginTop: 5 }}>{isprofiles[0]?.job_title}</Text>
                        </View>
                        {/* {
                      isprofiles?.userid != User.userid ?
                        (<TouchableOpacity onPress={() => { props.navigation.navigate('DatingChat', { Reciver_id: isprofiles, from: 'DatingMoreinfo' }) }} style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 10, backgroundColor: '#fff', shadowColor: '#0089CF', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.1, elevation: 2 }}>
                          <Image source={require('../../../assets/images/dating-home-header-right-image.png')} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>)
                        :
                        null
                    } */}


                      </View>
                      <View style={{ marginTop: 20 }} />
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                          <Text style={{ fontSize: 12, color: '#31313f', fontWeight: 'bold' }}>Location</Text>
                          <Text style={{ fontSize: 10, color: '#4a4c52' }}>{isprofiles[0]?.address}</Text>
                        </View>
                        {
                          isprofiles[0]?.userid != User.userid ?
                            (<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFE7F0', width: 80, height: 30, borderRadius: 15, paddingHorizontal: 10, shadowColor: 'rgba(255, 73, 137)', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.13, elevation: 2 }}>
                              <Image source={require('../../../assets/images/dating-maptrifold.png')} style={{ width: 20, height: 20 }} />
                              <Text style={{ fontSize: 10, color: '#FF4989' }}>{Number(isprofiles[0]?.distance).toFixed(0)} mile</Text>
                            </View>)
                            :
                            null}
                      </View>
                      <View style={{ marginTop: 30 }} />
                      {
                        isprofiles[0]?.about != null ?
                          (<>
                            <Text style={{ fontSize: 12, color: '#31313f', fontWeight: 'bold', marginBottom: 7 }}>About</Text>

                            <View style={{ alignSelf: 'center', width: '100%', marginTop: 1, paddingHorizontal: 0 }}>
                              <Text style={{ fontSize: 11, color: Mycolors.TEXT_COLOR }}>{isprofiles[0]?.about}</Text>
                              {/* {isprofiles?.about ?
      <Text onPress={() => { setviewmore(!viewmore) }} style={{ color: '#dd2e44', textDecorationLine: "underline", fontSize: 10 }}>{viewmore ? 'Read more' : 'Read less'}</Text>
      : null} */}
                            </View>
                          </>)
                          : null
                      }


                      {
                        isprofiles[0]?.passions?.filter(el => el.is_selected == 1).length > 0 ?
                          (<View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 12, color: '#31313f', fontWeight: 'bold', marginBottom: 10 }}>Passions</Text>
                            <FlatList
                              data={isprofiles[0]?.passions?.filter(el => el.is_selected)}
                              showsHorizontalScrollIndicator={false}
                              numColumns={3}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={({ item, index }) => {
                                // if(item.mutual){
                                return (
                                  <View style={[styles.showMeView, { marginHorizontal: index % 3 === 1 ? 10 : 0, marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f' }]}>
                                    {/* <Image source={require('../../../assets/images/dating-tick-icon.png')} style={styles.showMeImage} resizeMode='contain' /> */}
                                    <View style={styles.showMeImageView}>
                                      <Image source={{ uri: `${item?.attribute_image}` }} style={styles.showMeImage} resizeMode='contain' />
                                    </View>
                                    <Text style={[styles.showMeText, { marginLeft: 7 }]}>{item.attribute_value}</Text>
                                  </View>
                                )

                              }}
                            />
                          </View>)
                          :
                          null
                      }

                      {
                        isprofiles[0]?.languages?.filter(el => el.is_selected == 1).length > 0 ?
                          (<View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 12, color: '#31313f', fontWeight: 'bold', marginBottom: 10 }}>Languages</Text>
                            <FlatList
                              data={isprofiles[0]?.languages?.filter(el => el.is_selected)}
                              showsHorizontalScrollIndicator={false}
                              numColumns={3}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={({ item, index }) => {
                                // if(item.mutual){
                                return (
                                  <View style={[styles.showMeView, { marginHorizontal: index % 3 === 1 ? 10 : 0, marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f' }]}>
                                    {/* <Image source={require('../../../assets/images/dating-tick-icon.png')} style={styles.showMeImage} resizeMode='contain' /> */}
                                    <View style={styles?.showMeImageView}>
                                      <Image source={{ uri: `${item?.attribute_image}` }} style={styles.showMeImage} resizeMode='contain' />
                                    </View>
                                    <Text style={[styles.showMeText, { marginLeft: 7 }]}>{item?.attribute_value}</Text>
                                  </View>
                                )

                              }}
                            />
                          </View>)
                          : null
                      }


                      <View style={{ width: '90%', marginTop: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#3e5869', marginBottom: 10 }}>My basics</Text>
                      </View>
                      <View style={{
                        flexDirection: "row", width: '100%', flexWrap: 'wrap', borderColor: '#ffb0cb', borderRadius: 30,
                        borderWidth: 0.5, padding: 10, paddingLeft: 16, paddingTop: 20
                      }}>

                        {
                          isprofiles[0]?.job_company != null ?
                            (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', height: 40 }]}>
                              <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', }}>
                                <Image resizeMode='contain' source={require('../../../assets/icon-company.png')} style={{ height: 20, width: 20, marginRight: 7 }} />
                                <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                  <Text numberOfLines={1} style={{ fontSize: 12, color: '#4a4c52', }}>{isprofiles[0]?.job_company}</Text>
                                </View>

                              </View>
                            </View>)
                            : null
                        }

                        {
                          isprofiles[0]?.gender != null ?
                            (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                              <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                                <Image resizeMode='contain' source={require('../../../assets/icon-equality.png')} style={{ height: 20, width: 25, marginRight: 6, top: 1 }} />
                                <Text style={{ fontSize: 12, color: '#4a4c52', }}>{isprofiles[0]?.gender}</Text>
                              </View>
                            </View>)
                            : null
                        }


                        {isprofiles[0]?.height != null ?
                          (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                            <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                              <Image resizeMode='contain' source={require('../../../assets/icon-growth.png')} style={{ height: 22, width: 22, marginRight: 7, marginLeft: 0 }} />
                              <Text style={{ fontSize: 12, color: '#4a4c52', }}>{isprofiles[0]?.height != null ? isprofiles[0]?.height : null} cm</Text>
                            </View>
                          </View>)
                          :
                          null
                        }

                        {
                          isprofiles[0]?.university != null ?
                            (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                              <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                                <Image resizeMode='contain' source={require('../../../assets/icon-school.png')} style={{ height: 24, width: 20, marginRight: 7 }} />
                                <Text style={{ fontSize: 12, color: '#4a4c52', }}>{isprofiles[0]?.university}</Text>
                              </View>
                            </View>)
                            :
                            null
                        }

                        {
                          isprofiles[0]?.qualification != null ?
                            (<View style={[styles.showMeView, { backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                              <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                                <Image resizeMode='contain' source={require('../../../assets/icon-degree.png')} style={{ height: 24, width: 20, marginRight: 7 }} />
                                <Text style={{ fontSize: 12, color: '#4a4c52', }}>{isprofiles[0]?.qualification}</Text>
                              </View>
                            </View>)
                            : null
                        }

                      </View>

                      <View style={{ width: '90%', marginTop: 10, marginBottom: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#3e5869', }}>More about me</Text>

                      </View>
                      <View style={{
                        flexDirection: "row", width: '100%', flexWrap: 'wrap', borderColor: '#ffb0cb', borderRadius: 30,
                        borderWidth: 0.5, padding: 10, paddingLeft: 16, paddingTop: 20
                      }}>



                        {/* <View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                      <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                        <Image resizeMode='contain' source={require('../../../assets/body-type-short.png')} style={{ height: 80, width: 34, marginLeft: -7, top: -3 }} />
                        <Text style={{ fontSize: 12, color: '#4a4c52', }}>{isprofiles?.intrest_in}</Text>
                      </View>
                    </View> */}
                        {
                          isprofiles[0]?.smoking != null ?
                            (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                              <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                                <Image resizeMode='contain' source={require('../../../assets/no-smoking.png')} style={{ height: 24, width: 20, marginRight: 7 }} />
                                <Text style={{ fontSize: 12, color: '#4a4c52', }}>{isprofiles[0]?.smoking}</Text>
                              </View>
                            </View>)
                            : null
                        }

                        {
                          isprofiles[0]?.kids != null ?
                            (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                              <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                                <Image resizeMode='contain' source={require('../../../assets/icons-pacifier.png')} style={{ height: 24, width: 20, marginRight: 7 }} />
                                <Text style={{ fontSize: 12, color: '#4a4c52', }}>{isprofiles[0]?.kids}</Text>
                              </View>
                            </View>)
                            : null
                        }

                        {
                          isprofiles[0]?.politics != null ?
                            (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                              <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                                <Image resizeMode='contain' source={require('../../../assets/icons-elections.png')} style={{ height: 24, width: 20, marginRight: 7 }} />
                                <Text style={{ fontSize: 12, color: '#4a4c52', }}>{isprofiles[0]?.politics}</Text>
                              </View>
                            </View>)
                            : null
                        }

                        {
                          isprofiles[0]?.drinking != null ?
                            (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                              <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                                <Image resizeMode='contain' source={require('../../../assets/beer-mug.png')} style={{ height: 24, width: 20, marginRight: 7 }} />
                                <Text style={{ fontSize: 12, color: '#4a4c52', }}>{isprofiles[0]?.drinking}</Text>
                              </View>
                            </View>)
                            : null
                        }

                        {
                          isprofiles[0]?.zodiac != null ?
                            (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                              <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                                <Image resizeMode='contain' source={require('../../../assets/crystal-ball.png')} style={{ height: 24, width: 20, marginRight: 7 }} />
                                <Text style={{ fontSize: 12, color: '#4a4c52', }}>{isprofiles[0]?.zodiac}</Text>
                              </View>
                            </View>)
                            : null
                        }
                      </View>
                      <View style={{ height: 20 }} />
                    </View>
                  </View>

                  <View style={{ height: 180 }} />
                </>
              </KeyboardAvoidingView>
            </ScrollView>)
            :
            (
              <View style={{ height: '80%', justifyContent: 'center', alignItems: "center", zIndex: -999, }}>
                {/* <Svg width="200" height="200">
                  <Image href={require('../../../assets/lovematching_icon.svg')} />
                </Svg> */}
                <Image resizeMode='contain' source={require('../../../assets/Not_found_Icon1.png')}
                  style={{ height: 500, width: 500 }}
                />
                <View style={{ width: '79%', top: -60 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 24, fontWeight: '800', color: '#31313f', textAlign: 'center', lineHeight: 40 }}>No more matches</Text>
                    <Image resizeMode='contain' source={require('../../../assets/emoji1.png')}
                      style={{ height: 30, width: 30, top: 8 }} />
                  </View>

                  <Text style={{ fontSize: 17, fontWeight: '500', color: '#808080', textAlign: 'center', lineHeight: 22 }}>You have seen all the nearby recommendations please visit later for more.</Text>
                  {/* <Text style={{ fontSize: 16, fontWeight: '400', color: '#a7a2a2',textAlign:'center' }}>Likes are more intentional on Kinengo, so dont't fret, they'll come in soon.</Text> */}
                </View>


                {/* <View style={{ width: '50%', alignSelf: 'center', marginTop: 30 }}>
                  <MyButtons title="Go profile page" height={60} width={'100%'} borderRadius={10} alignSelf="center" press={() => { props.navigation.navigate('DatingProfile') }} marginHorizontal={20} fontSize={12}
                    titlecolor={Mycolors.BG_COLOR} hLinearColor={['#8d046e', '#e30f50']} />
                </View> */}
              </View>
            )
        }



        {/* <View style={{borderBottomColor: '#ffb0ba', borderBottomWidth: StyleSheet.hairlineWidth, marginTop:10}}/> */}
        {/* <View style={{}}>
          
          {isprofiles.length > 0
            ? isprofiles
              .map((item, index) => {
                let isFirst = index === 0;
                let dragHandlers = isFirst ? panResponder.panHandlers : {};
                return (
                  <DatingCard
                    item={item}
                    isFirst={isFirst}
                    swipe={swipe}
                    heartPress={() =>{ 
                      // handleSelection(1,item) 
                      console.log("heartPress");}}
                    nopePress={() => handleSelection(-1,item)}
                    nextPress={() => removeCard()}
                    currentprofileopen={() =>{ handleButtonPress(item)}}
                    {...dragHandlers}
                  />
                );
              })
              .reverse()
            : null}
        </View> */}

        {/* <View style={{ }}>
  <AppIntroSlider
    data={introSliderData}
    renderItem={_renderItem}
    renderPagination={() => null}
    renderDoneButton={()=><View />}
    renderNextButton={()=><View />}
    keyExtractor={(item) => item.id}
  />
  </View> */}
        {/* <ImageSlider
    data={[
        {img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU'},
        {img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg'},
        {img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg'}
    ]}
    caroselImageContainerStyle={{borderRadius: 20,  overflow: 'hidden'}}
   showIndicator={false}
      closeIconColor="#fff"
  /> */}
        {/* <View style={styles.buttonsRow}>
    <TouchableOpacity onPress={()=>{onReject(1)}} style={styles.buttonViewOne}>
      <Image source={require('../../../assets/images/dating-reject-image.png')} style={{width:20, height:20,}} resizeMode='contain'/>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{onLove(1)}} style={styles.buttonViewTwo}>
      <Image source={require('../../../assets/images/dating-love-image.png')} style={{width:40, height:40,}} resizeMode='contain'/>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{onRefresh(1)}} style={styles.buttonViewOne}>
      <Image source={require('../../../assets/images/dating-refresh-image.png')} style={{width:20, height:20,}} resizeMode='contain'/>
    </TouchableOpacity>
  </View>
  <Text style={{fontSize:15, color:'#31313f', fontWeight:'bold', textAlign:'center', top:-20}}>Mary Burgees</Text>
  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', top:-10}}>
    <Text style={{fontSize:10, color:'#e10f51'}}>@marry</Text>
    <View style={{height: '100%',width: 1,backgroundColor: '#4a4c52', marginHorizontal:20}}></View>
    <Text style={{fontSize:10, color:'#e1e1e1'}}>Age 23</Text>
    <View style={{height: '100%',width: 1,backgroundColor: '#4a4c52', marginHorizontal:20}}></View>
    <Text style={{fontSize:10, color:'#e1e1e1'}}>5 miles away</Text>
  </View> */}
        {/* {SliderData.length > 0 ? <Carousel data={SliderData} onReject={onReject} onLove={onLove} onRefresh={onRefresh} /> : null}   */}

      </View>

      {
        isprofiles?.length > 0 ?
          (<View style={styles.buttonsRow1}>
            <TouchableOpacity onPress={() => { SwipeProfile('L') }} style={styles.buttonViewOne}>
              <Image source={require('../../../assets/images/dating-more-info-reject.png')} style={{ width: 25, height: 45, top: 0, }} resizeMode='contain' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { SwipeProfile('R') }} style={styles.buttonViewTwo}>
              <Image source={require('../../../assets/images/dating-love-image.png')} style={{ width: 40, height: 40, top: 0, }} resizeMode='contain' />
            </TouchableOpacity>

          </View>)
          :
          null
      }




      {/* <Modal
        isVisible={showChooseMilesModal}
        swipeDirection="down"
        onBackdropPress={() => setShowChooseMilesModal(false)}
        onSwipeComplete={(e) => {
          setShowChooseMilesModal(false)
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
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: Mycolors.Black, fontWeight: '500', marginBottom: 30, marginTop: 10 }}>Choose Miles</Text>
              <MultiSlider
                // values={[multiSliderValue[0], multiSliderValue[1]]}
                values={[multiSliderValue[0]]}
                sliderLength={320}
                onValuesChange={multiSliderValuesChange}
                min={0}
                max={100}
                step={1}
                allowOverlap={false}
                minMarkerOverlapDistance={10}
                markerStyle={{
                  ...Platform.select({
                    ios: {
                      height: 30,
                      width: 30,
                      shadowColor: '#000000',
                      shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.1,
                      borderColor: '#ED1C24',
                      borderWidth: 1
                    },
                    android: {
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                      backgroundColor: '#fff',
                      borderColor: '#ED1C24',
                      borderWidth: 1
                    }
                  })
                }}
                pressedMarkerStyle={{
                  ...Platform.select({
                    android: {
                      height: 30,
                      width: 30,
                      borderRadius: 20,
                      backgroundColor: '#ED1C24'
                    }
                  })
                }}
                selectedStyle={{ backgroundColor: '#ED1C24' }}
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
              <View style={{
                flexDirection: 'row', alignItems: 'center', width: '95%',
                height: 60,
                paddingHorizontal: 20,
                backgroundColor: '#fff',
                alignSelf: 'center',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowRadius: 1,
                shadowOpacity: 0.1,
                // overflow: 'hidden',
                elevation: 5,
                marginTop: 30,
                marginBottom: 30,
              }}>
                <TextInput
                  ref={myTextInput}
                  value={String(multiSliderValue[0])}
                  onChangeText={(e) => {
                    const value = e.replace(/[^0-9]/g, '')
                    if (Number(value) > 100) {
                     
                    } else if (Number(value) < 0) {
                    
                    } else {
                      multiSliderValuesChange([Number(value)])
                    }
                  }}
                  textAlignVertical={'center'}
                   
                  placeholder={'0'}
                  placeholderTextColor="#263238"
                  multiline={true}
                 
                  autoCapitalize='none'
                  style={{
                    color: '#263238',
                    fontSize: 12,
                    fontWeight: '500'
                  }}
                  keyboardType='numeric'
                />
                <Text onPress={() => { myTextInput.current.focus() }} style={{ color: '#263238', fontSize: 12, fontWeight: '500' }}> miles</Text>
              </View>
              
            </View>

            <View style={{ width: '95%', alignSelf: 'center' }}>
              <MyButtons title="Save" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { props.navigation.navigate('ShopPayment') }} marginHorizontal={20} fontSize={11}
                titlecolor={Mycolors.BG_COLOR} backgroundColor={'#FFD037'} marginVertical={0} />
            </View>

          
          </ScrollView>

        </View>
      </Modal> */}
      {/* Modal Timercounter */}
      <Modal
        isVisible={isVisible}
        swipeDirection="down"
        onBackdropPress={() => setVisible(false)}
        onSwipeComplete={(e) => {
          setVisible(false)
        }}

        scrollTo={() => { }}
        scrollOffset={1}
        // propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={styles.Container}
      >
        <View style={styles.mainview}>
          <View style={styles.childview}>
            <View style={styles.profilestyle}  >
              <Image resizeMode='cover'
                source={{ uri: `${profiledata?.profile_image != null ? profiledata?.profile_image : 'https://kinengo-dev.s3.us-west-1.amazonaws.com/images/camera-icon.jpg'}` }}
                style={styles.profilePictureStyle}
              />
              <View style={styles.heartstyle} >
                <Image resizeMode='contain' source={require('../../../assets/dating-love-image.png')} style={styles.heartimages} />
              </View>
            </View>
            <View style={styles.secondbox}>
              <Text style={{
                fontSize: 20,
                fontWeight: '800',
                color: '#455A64', lineHeight: 40
              }}>You're Out of Likes</Text>
              <Text style={{
                fontSize: 18,
                fontWeight: '800',
                color: '#FF4989'
              }}>Get more likes in:</Text>
              <Text style={{
                fontSize: 20,
                fontWeight: '800',
                color: '#FF4989',
              }}>{timecounter}</Text>
              <Text style={styles.text2}>Like limits encourage thoughtful swiping. More likes are coming soon please be patient.</Text>
              {/* <View style={styles.buttonstyle1}>
                <MyButtons title="CONTINUE (1 LEFT)" height={55} width={'100%'} borderRadius={50} alignSelf="center" press={() => { props.navigation.navigate('DatingProfile') }} marginHorizontal={20} fontSize={14}
                  titlecolor={Mycolors.BG_COLOR} hLinearColor={['#8d046e', '#e30f50']} />
              </View> */}
              {/* <View style={styles.Ortextlinestyle}>
                <View style={styles.linestyle}></View>
                <Text style={styles.text3}>OR</Text>
                <View style={styles.linestyle} />
              </View> */}
              {/* <View style={styles.buttonstyle2}>
                <MyButtons title="GET UNLIMITED LIKES" height={55} width={'100%'} borderRadius={50} alignSelf="center" press={() => { props.navigation.navigate('DatingProfile') }} marginHorizontal={20} fontSize={14} borderColor={'#e30f50'} backgroundColor={'white'} borderWidth={2}
                  titlecolor={'#e30f50'} />
              </View> */}
              {/* <TouchableOpacity onPress={() => setVisible(false)} style={{ marginTop: 15 }}>
                <Text style={styles.text4}>
                  NO THANKS
                </Text>
              </TouchableOpacity> */}
            </View>


          </View>

        </View>
      </Modal>


      <Modal
        isVisible={showFilterModal}
        swipeDirection="down"
        onBackdropPress={() => setShowFilterModal(false)}
        onSwipeComplete={(e) => {
          setShowFilterModal(false)
        }}
        scrollTo={() => { }}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)', }}
      >
        <View style={{ height: '70%', backgroundColor: '#fff5f7', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, zIndex: -999 }}>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
            {/* <View style={{alignItems:'center'}}> */}
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 10, marginBottom: 40 }}>

              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => { setShowFilterModal(false) }} style={{ flex: 1 }}>
                  <Image source={require('../../../assets/images/dating-back-arrow.png')} style={{ width: 25, height: 15 }} resizeMode='contain' />
                </TouchableOpacity>
                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 12.5, fontWeight: '600', color: '#31313f' }}>Filters</Text>
                </View>
                <View style={{ flex: 1 }} />
              </View>

              <View style={{ height: 20 }} />
              {/* <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#8F93A0' }}>Location</Text>
              <View style={styles.addCommentView}>
                <TextInput
                  value={'California'}
                  onChangeText={(text) => {
                    (text)
                  }}
                  placeholder=""
                  placeholderTextColor={'#B2B7B9'}
                  style={styles.input}
                  multiline
                />
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Image source={require('../../../assets/images/dating-modal-location-icon.png')} />
                </View>
              </View> */}
              <View
                style={{
                  borderBottomColor: '#DBDBDB',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
              <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', marginTop: 20 }}>I'm intersted in</Text>
              <View style={{ width: "100%", alignSelf: 'center', marginTop: 9, justifyContent: "center", flex: 1 }}>


                <FlatList
                  data={interstedInValue}
                  // showsHorizontalScrollIndicator={false}
                  horizontal
                  keyExtractor={(item, index) => index.toString()}

                  renderItem={({ item, index }) => {
                    return (

                      <TouchableOpacity onPress={() => { onChangeInterested(item) }} style={[styles.interestedView1, { width: 110, marginBottom: 1, backgroundColor: interstedInselect == item ? '#FF4989' : '#fff' }]}>
                        <Text style={interstedInselect == item ? styles.interestedText1 : styles.interestedText2}>{item}</Text>

                      </TouchableOpacity>

                    )
                  }}
                />
              </View>


              <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', marginTop: 10 }}>Filter by</Text>
              <View style={{ width: '100%', alignSelf: 'center', marginTop: 9, justifyContent: "center", flex: 1 }}>
                <FlatList
                  horizontal
                  data={filterByStatus}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {
                    return (

                      <TouchableOpacity onPress={() => { onChangeFilterByStatus(item) }} style={[styles.interestedView1, { width: 110, marginBottom: 1, backgroundColor: filterBySelect == item ? '#FF4989' : '#fff' }]}>
                        <Text style={filterBySelect == item ? styles.interestedText1 : styles.interestedText2}>{item}</Text>

                      </TouchableOpacity>

                    )
                  }}
                />
              </View>


              <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', marginTop: 20 }}>Smoking</Text>
              <View style={{ width: '100%', alignSelf: 'center', marginTop: 9, justifyContent: "center", flex: 1 }}>


                <FlatList
                  data={smokingValue}
                  // showsHorizontalScrollIndicator={false}
                  horizontal
                  keyExtractor={(item, index) => index.toString()}

                  renderItem={({ item, index }) => {
                    return (

                      <TouchableOpacity onPress={() => { onChangeSmoking(item) }} style={[styles.interestedView1, { width: 110, marginBottom: 1, backgroundColor: smokingselect == item ? '#FF4989' : '#fff' }]}>
                        <Text style={smokingselect == item ? styles.interestedText1 : styles.interestedText2}>{item}</Text>

                      </TouchableOpacity>

                    )
                  }}
                />
              </View>

              <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', marginTop: 20 }}>Drinking</Text>
              <View style={{ width: '100%', alignSelf: 'center', marginTop: 9, justifyContent: "center", flex: 1 }}>
                <FlatList
                  data={drinkingValue}
                  horizontal
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity onPress={() => { onChangeDrinking(item) }} style={[styles.interestedView1, { width: 110, marginBottom: 1, backgroundColor: drinkingselect == item ? '#FF4989' : '#fff' }]}>
                        <Text style={drinkingselect == item ? styles.interestedText1 : styles.interestedText2}>{item}</Text>

                      </TouchableOpacity>

                    )
                  }}
                />
              </View>

              <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', marginTop: 20 }}>Kid's</Text>
              <View style={{ width: '100%', alignSelf: 'center', marginTop: 9, justifyContent: "center", flex: 1 }}>
                <FlatList
                  data={kidsValue}
                  horizontal
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    return (

                      <TouchableOpacity onPress={() => { onChangeKids(item) }} style={[styles.interestedView1, { width: 110, marginBottom: 1, backgroundColor: kidsSelect == item ? '#FF4989' : '#fff' }]}>
                        <Text style={kidsSelect == item ? styles.interestedText1 : styles.interestedText2}>{item}</Text>

                      </TouchableOpacity>

                    )
                  }}
                />
              </View>


              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 15 }}>
                <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869' }}>Age range</Text>
                <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#ff3b7f' }}>{`${ageRangeSliderValue[0]}-${ageRangeSliderValue[1]}`}</Text>
              </View>
              <MultiSlider
                values={[ageRangeSliderValue[0], ageRangeSliderValue[1]]}
                // values={[multiSliderValue[0]]}
                sliderLength={320}
                onValuesChange={ageRangeSliderValuesChange}
                min={18}
                max={100}
                step={1}
                allowOverlap={false}
                minMarkerOverlapDistance={10}
                markerStyle={{
                  ...Platform.select({
                    ios: {
                      height: 30,
                      width: 30,
                      shadowColor: '#000000',
                      shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.1,
                      borderColor: '#f23476',
                      borderWidth: 1,
                      marginLeft: 16
                    },
                    android: {
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                      backgroundColor: '#fff',
                      borderColor: '#f23476',
                      borderWidth: 1,
                      marginLeft: 16
                    }
                  })
                }}
                pressedMarkerStyle={{
                  ...Platform.select({
                    android: {
                      height: 30,
                      width: 30,
                      borderRadius: 20,
                      backgroundColor: '#ED1C24'
                    }
                  })
                }}
                selectedStyle={{ backgroundColor: '#f23476' }}
                unselectedStyle={{ backgroundColor: '#FFCEBF' }}
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

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 15 }}>
                <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869' }}>Distance</Text>
                <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#ff3b7f' }}>{distanceSliderValue[0]}</Text>
              </View>
              <MultiSlider
                // values={[ageRangeSliderValue[0], ageRangeSliderValue[1]]}
                values={[distanceSliderValue[0]]}
                sliderLength={320}
                onValuesChange={distanceSliderValuesChange}
                min={0}
                max={1000}
                step={1}
                allowOverlap={false}
                minMarkerOverlapDistance={10}
                markerStyle={{
                  ...Platform.select({
                    ios: {
                      height: 30,
                      width: 30,
                      shadowColor: '#000000',
                      shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.1,
                      borderColor: '#f23476',
                      borderWidth: 1,
                    },
                    android: {
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                      backgroundColor: '#fff',
                      borderColor: '#f23476',
                      borderWidth: 1
                    }
                  })
                }}
                pressedMarkerStyle={{
                  ...Platform.select({
                    android: {
                      height: 30,
                      width: 30,
                      borderRadius: 20,
                      backgroundColor: '#ED1C24'
                    }
                  })
                }}
                selectedStyle={{ backgroundColor: '#f23476' }}
                unselectedStyle={{ backgroundColor: '#FFCEBF' }}
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

              {/* <Text style={{color:Mycolors.GrayColor,fontWeight:'600',fontSize:12,marginTop:9}} >{multiSliderValue[0]} miles</Text> */}
            </View>

            <View style={{ width: '95%', alignSelf: 'center' }}>
              <TouchableOpacity onPress={() => { Profilelist(); setIncrement(1) }} style={styles.applyButtonStyle}>
                <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#fff', }}>Apply</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { Resetallinputfield(), setShowFilterModal(false) }} style={{ marginTop: 20, marginBottom: 50 }}>
                <Text style={{ fontSize: 11.3, fontWeight: 'bold', color: '#3e5869', alignSelf: 'center' }}>Reset</Text>
              </TouchableOpacity>
            </View>

            {/* <View style={{width:100,height:100}} /> */}
          </ScrollView>

        </View>
      </Modal>
      {loading ? <Loader /> : null}
      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  createPostView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  createPostLeftSubView: {
    width: '83%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingLeft: 10,
    borderRadius: 10,
  },
  createPostText: {
    color: '#B2B7B9',
    fontSize: 14,
    fontWeight: '300',
    marginLeft: 10
  },
  showMeImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 25,
    borderRadius: 20 / 2,
    marginLeft: 0,
  },
  flatlistMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  rightButtonsView: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 20
  },
  followingImageView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  followingView: {
    justifyContent: 'center',
    marginLeft: 10
  },
  flatlistMainBottomView: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '90%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  flatlistBottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  interestedView1: {
    flex: 1,
    // flexDirection:'row',
    backgroundColor: '#FF4989',
    // width: '33%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0089CF',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
    elevation: 2
  },
  interestedView2: {
    // flexDirection: 'row',
    backgroundColor: '#fff',
    width: '33%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  interestedText1: {
    color: '#FFFFFF',
    fontSize: 11.3,
    fontWeight: '400'
  },
  interestedText2: {
    color: '#8F93A0',
    fontSize: 11.3,
    fontWeight: '400'
  },
  applyButtonStyle: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#FF4989',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00EE57',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 1,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  addCommentView: {
    // position:'absolute',
    // bottom:20,
    width: '100%',
    // backgroundColor:'#fff0f0',
    // padding:15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3
    // },
    // shadowRadius: 1,
    // shadowOpacity: 0.3,
    // elevation: 5,
  },
  input: {
    // paddingLeft: 20,
    fontSize: 11.3,
    fontWeight: 'bold',
    color: '#3e5869',
    flex: 7,
    // textDecorationLine: 'underline'
  },
  sendButtonView: {
    // backgroundColor:'#fee3e3',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  showMeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: 'auto',
    padding: 10,
    backgroundColor: '#fff1f6',
    // paddingHorizontal:15, 
    borderRadius: 30,
    // borderWidth: 0.5
    marginRight: 6
  },
  buttonsRow1: {

    marginHorizontal: 10,
    width: '98%',
    height: 100,
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    zIndex: -999
  },
  buttonViewOne: {
    backgroundColor: 'red',
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 1,
    shadowOpacity: 0.07,
    elevation: 1,
    zIndex: -999
  },
  showMeImage: {
    height: 18,
    width: 18
  },
  buttonViewTwo: {
    // backgroundColor: '#FF4989',
    width: 50,
    height: 50,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#E94057',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 1,
    shadowOpacity: 0.07,
    elevation: 1,
    zIndex: -999
  },
  cameraButtonView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#0089CF',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 1,
    shadowOpacity: 0.1,
    elevation: 5,
  },

  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    top: -40
  },
  slide: {
    width: '100%',
    height: 300,
  },
  showMeText: {
    fontSize: 10,
    color: '#4a4c52'
  },
  buttonViewOne: {
    backgroundColor: '#fff',
    width: 70,
    height: 70,
    borderRadius: 90 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 1,
    shadowOpacity: 0.07,
    elevation: 1,
  },
  buttonViewTwo: {
    backgroundColor: '#FFF',
    width: 80,
    height: 80,
    borderRadius: 90 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    shadowColor: '#E94057',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 1,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  Container: {
    flex: 1,
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 7
  },
  mainview: {
    height: '49%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingTop: 30,
    padding: 10
  },
  childview: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  profilestyle: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  profilePictureStyle: {
    alignSelf: "center",
    height: 110,
    width: 110,
    borderRadius: 60,
    // top: -(60 + 10),
    borderWidth: 7,
    borderColor: "#fff",
    shadowColor: '#000000',
    shadowRadius: 1,
    shadowOffset: {
      height: 3,
      width: 0
    },
    shadowOpacity: 1,
    elevation: 3,
  },
  heartstyle: {
    justifyContent: 'center',
    alignItems: 'center',
    top: -25,
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 40,
    shadowColor: '#000000',
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.1,
    elevation: 4,
    zIndex: -999
  },
  heartimages: {
    top: 2,
    height: 25,
    width: 25
  },
  secondbox: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    top: -10
  },
  text1: {
    color: 'black',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 20
  },
  text2: {
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 6
  },
  buttonstyle1: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 30
  },
  Ortextlinestyle: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    width: '80%',
    marginTop: 15
  },
  linestyle: {
    backgroundColor: '#e0e0e0',
    height: 1,
    width: '50%',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text3: {
    color: '#e0e0e0',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 10
  },
  buttonstyle2: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 20
  },
  text4: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600'
  }

});
export default PeopleHome

// import { View, Text, Animated, PanResponder, Image } from "react-native";
// import React, { useState, useRef, useCallback, useEffect } from "react";
// import DatingCard from "../../../component/DatingCard";

// const DatingSelection = () => {
//   const [images, setImages] = useState([
//     {
//       id: 1,
//       image: `https://cdn.britannica.com/64/182864-050-8975B127/Scene-The-Incredible-Hulk-Louis-Leterrier.jpg`,
//       title: "HULK",
//     },
//     {
//       id: 2,
//       image: `https://cdn.britannica.com/49/182849-050-4C7FE34F/scene-Iron-Man.jpg`,
//       title: "IRON MAN",
//     },
//     {
//       id: 3,
//       image: `https://cdn.britannica.com/30/182830-050-96F2ED76/Chris-Evans-title-character-Joe-Johnston-Captain.jpg`,
//       title: "CAPTAIN AMERICA",
//     },
//     {
//       id: 4,
//       image: `https://upload.wikimedia.org/wikipedia/en/d/d6/Superman_Man_of_Steel.jpg`,
//       title: "SUPER MAN",
//     },
//   ]);
//   useEffect(() => {
//     if (!images.length) {
//       setImages([
//         {
//           id: 1,
//           image: `https://cdn.britannica.com/64/182864-050-8975B127/Scene-The-Incredible-Hulk-Louis-Leterrier.jpg`,
//           title: "HULK",
//         },
//         {
//           id: 2,
//           image: `https://cdn.britannica.com/49/182849-050-4C7FE34F/scene-Iron-Man.jpg`,
//           title: "IRON MAN",
//         },
//         {
//           id: 3,
//           image: `https://cdn.britannica.com/30/182830-050-96F2ED76/Chris-Evans-title-character-Joe-Johnston-Captain.jpg`,
//           title: "CAPTAIN AMERICA",
//         },
//         {
//           id: 4,
//           image: `https://upload.wikimedia.org/wikipedia/en/d/d6/Superman_Man_of_Steel.jpg`,
//           title: "SUPER MAN",
//         },
//       ]);
//     }
//     return () => {};
//   }, [images]);

//   const swipe = useRef(new Animated.ValueXY()).current;
//   const panResponder = PanResponder.create({
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderMove: (_, { dx, dy }) => {
//       console.log("dx", dx, "dy", dy);
//       swipe.setValue({ x: dx, y: dy });
//     },
//     onPanResponderRelease: (_, { dx, dy }) => {
//       let direction = Math.sign(dx);
//       let isActionActive = Math.abs(dx) > 200;
//       if (isActionActive) {
//         Animated.timing(swipe, {
//           toValue: { x: 500 * dx, y: dy },
//           duration: 500,
//           useNativeDriver: true,
//         }).start(removeCard);
//       } else {
//         Animated.spring(swipe, {
//           toValue: { x: 0, y: 0 },
//           friction: 5,
//           useNativeDriver: true,
//         }).start();
//       }

//       console.log("RELEASE dx", dx, "dy", dy);
//     },
//   });
//   const handleSelection = useCallback(
//     (direction) => {
//       Animated.timing(swipe, {
//         toValue: { x: direction * 500, y: 0 },
//         useNativeDriver: true,
//         duration: 500,
//       }).start(removeCard);
//     },
//     [removeCard]
//   );
//   const removeCard = useCallback(() => {
//     setImages((prevState) => prevState.slice(1));
//     swipe.setValue({ x: 0, y: 0 });
//   }, []);
//   //UI
//   return (
//     <View
//       style={{
//         flex: 1,
//       }}
//     >
//       <HomeHeader />
//       <LocationSelector />
//       <View>
//         {images.length > 0
//           ? images
//               .map((item, index) => {
//                 let isFirst = index === 0;
//                 let dragHandlers = isFirst ? panResponder.panHandlers : {};
//                 return (
//                   <DatingCard
//                     item={item}
//                     isFirst={isFirst}
//                     swipe={swipe}
//                     heartPress={() => handleSelection(1)}
//                     nopePress={() => handleSelection(-1)}
//                     {...dragHandlers}
//                   />
//                 );
//               })
//               .reverse()
//           : null}
//       </View>
//     </View>
//   );
// };

// export default DatingSelection;

// //import : custom components
// const HomeHeader = () => {
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         padding: 10,
//       }}
//     >
//       <Image
//         source={require("../../../assets/images/dating-home-header-left-image.png")}
//         style={{
//           height: 40,
//           width: 40,
//           borderRadius: 20,
//           borderColor: "#e42f5e",
//           borderWidth: 2,
//         }}
//       />
//       <Text>Personal Connect</Text>
//       <Image
//         source={require("../../../assets/images/dating-home-header-right-image.png")}
//       />
//     </View>
//   );
// };

// const LocationSelector = () => {
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "space-between",
//         padding: 10,
//       }}
//     >
//       <Image
//         source={require("../../../assets/images/dating-location-image.png")}
//         style={{ width: 12, height: 15 }}
//       />
//       <Text>New York, USA</Text>
//       <Image
//         source={require("../../../assets/images/dating-filter-image.png")}
//         style={{ width: 12, height: 15 }}
//       />
//     </View>
//   );
// };