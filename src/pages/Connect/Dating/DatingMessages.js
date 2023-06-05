import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Keyboard } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../../WebApi/Loader';
import MyAlert from '../../../component/MyAlert';
import { useSelector, useDispatch } from 'react-redux';
import { connect_dating_swipe_profile, connect_dating_swipe_profile_id_delete, requestGetApi, requestPostApi } from '../../../WebApi/Service';

const image1 = require('../../../assets/images/people-following-person.png')
const onlinePersonImageWidth = 50
const onlineDotWidth = 12

const DatingMessages = (props) => {
  const User = useSelector(state => state.user.user_details)
  const [loading, setLoading] = useState(false);
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [searchValue, setsearchValue] = useState('')
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef();
  const [userlist, setUserList] = useState([]);
  const [userMessage, setUserMessage] = useState('')
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
  const [alluserdata, setUsersdata] = useState([]);
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
      isOnline: false,
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
      isOnline: false,
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
  useEffect(() => {
    GetSwipeProfile()
    console.log("DatingMessagetoken",User.token );
  }, []);

  const GetSwipeProfile = async () => {
    
    setLoading(true)
    const { responseJson, err } = await requestGetApi(connect_dating_swipe_profile + '?swipe_status=Accepted', '', 'GET', User.token)
    setLoading(false)
    console.log('the res==>>DatingMessages', responseJson)
    if (responseJson.headers.success == 1) {
      setUserList(responseJson?.body?.data)
    } else {
      setalert_sms(responseJson.headers.message)
      setMy_Alert(true)
    }
  }

  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ flex: 1 }}>
      <LinearGradient
        colors={['#FD869F', 'rgba(255, 255, 255, 0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.7, 0.9]}
        style={{ flex: 1, height: dimensions.SCREEN_HEIGHT, }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 70, padding: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
          <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ flex: 1 }}>
            <Image source={require('../../../assets/images/dating-back-arrow.png')} style={{ width: 25, height: 15 }} resizeMode='contain' />
          </TouchableOpacity>
          <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 12.5, fontWeight: 'bold', color: '#31313f' }}>Personal connect messages</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        <ScrollView>



          <View style={{ width: '92%', alignSelf: 'center', marginTop: 10, marginHorizontal: 10 }}>
            <FlatList
              data={userlist}
              showsHorizontalScrollIndicator={false}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ width: '100%', marginBottom: 20, borderRadius: 5 }}>
                    <View
                      style={styles.flatlistMainView}>
                      <View style={{ flex: 1 }}>
                        <Image source={{uri:item?.profile_image}} style={styles.onlinePerson} />
                        {/* {item.isOnline ?
                          <View style={styles.onlineDot} />
                          : null} */}
                      </View>
                      <View style={{ flex: 6, marginLeft: 15, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#e42f5e' }}>{item.fullname}</Text>
                        <View style={{}}>
                          <Text style={styles.numberStyle}>{item.message}</Text>
                        </View>
                      </View>


                    </View>
                  </View>
                )
              }}
              keyExtractor={item => item.id}
            />
          </View>







          <View style={{ height: 100 }} />

        </ScrollView>
      </LinearGradient>
      {loading ? <Loader /> : null}
      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  flatlistMainView: {
    flexDirection: 'row',
    backgroundColor: '#fff0f0',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  numberView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  numberStyle: {
    fontSize: 14,
    fontWeight: '300',
    color: '#4a4c52'
  },
  searchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  searchLeftSubView: {
    width: '83%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingLeft: 10,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 5,
  },
  input: {
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: '300',
    color: '#000',
    flex: 7
  },
  onlinePerson: {
    width: onlinePersonImageWidth,
    height: onlinePersonImageWidth,
    borderRadius: onlinePersonImageWidth / 2,
    borderWidth: 2,
    borderColor: '#e1194d',
  },
  onlineDot: {
    backgroundColor: '#29913C',
    width: onlineDotWidth,
    height: onlineDotWidth,
    position: 'absolute',
    borderRadius: onlineDotWidth / 2,
    left: onlinePersonImageWidth - 8,
    top: onlinePersonImageWidth / 10,
    borderWidth: 2,
    borderColor: '#fff'
  }
});
export default DatingMessages 