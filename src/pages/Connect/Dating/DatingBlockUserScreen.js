import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, RefreshControl, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Keyboard } from 'react-native';
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
import Toast from 'react-native-toast-message';
import { connect_dating_block_profile, connect_dating_swipe_profile, connect_dating_swipe_profile_id_delete, requestGetApi, requestPostApi } from '../../../WebApi/Service';

const image1 = require('../../../assets/images/people-following-person.png')
const onlinePersonImageWidth = 70
const onlineDotWidth = 12

const DatingBlockUserScreen = (props) => {
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

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    GetSwipeProfile()
    console.log("DatingMessagetoken", User.token);
  }, []);

  const checkcon = () => {
    GetSwipeProfile()
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

  const GetSwipeProfile = async () => {

    setLoading(true)
    const { responseJson, err } = await requestGetApi(connect_dating_block_profile, '', 'GET', User.token)
    setLoading(false)
    console.log('the res==>>DatingMessages', responseJson)
    if (responseJson?.headers?.success == 1) {
      setUserList(responseJson?.body?.data)
    } else {
      setalert_sms(responseJson?.headers?.message)
      setMy_Alert(true)
    }
  }
  const UnBloackUser = async (id) => {
    console.log("UnBloackUser=>", id );
    setLoading(true);
    var data = {
      blocked_id: 1
    }
    const { responseJson, err } = await requestPostApi(
      connect_dating_block_profile +'/'+ id,
      data,
      "DELETE",
      User.token
    );
    setLoading(false);
    console.log("the res==>>UnBloackUser=>", responseJson);
    if (responseJson?.headers?.success == 1) {
      Toast.show({ text1: "User Unblocked Successfully" });
      GetSwipeProfile()
      // props.navigation.goBack('');
      // console.log("the res==>>GetProfileImages", responseJson.headers.message);

     } 
    else {
      setalert_sms(err);
      setMy_Alert(true);
    }

  };
 
  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ flex: 1 }}>
      <LinearGradient
        colors={['#FD869F', 'rgba(255, 255, 255, 0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.7, 0.9]}
        style={{ flex: 1, height: dimensions.SCREEN_HEIGHT, }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 70, padding: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, width: '100%', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => {props.navigation.navigate('DatingMessages') }} style={{ flex: 1 }}>
            <Image source={require('../../../assets/images/dating-back-arrow.png')} style={{ width: 25, height: 15 }} resizeMode='contain' />
          </TouchableOpacity>

          <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 12.5, fontWeight: 'bold', color: '#31313f' }}>Blocked accounts</Text>
          </View>
          <View style={{ flex: 1 }}></View>
          {/* <TouchableOpacity onPress={() => {  props.navigation.navigate('')  }} style={{ justifyContent:'flex-end',flex:0.2 , right:10 }}>
            <Image source={require('../../../assets/icon-blockcontact.png')} style={{ width: 40, height: 30 }} resizeMode='contain' />
          </TouchableOpacity> */}
        </View>
        <View style={{ width: dimensions.SCREEN_WIDTH, borderBottomColor: '#ffb0ba', borderBottomWidth: StyleSheet.hairlineWidth, left: -21 }} />
        {
          userlist.length > 0 ?
            (<ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}

                />
              }
            >
              <View style={{ width: '92%', alignSelf: 'center', marginTop: 10, marginHorizontal: 10 }}>
                <FlatList
                  data={userlist}
                  showsHorizontalScrollIndicator={false}
                  numColumns={1}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{ width: '100%', marginBottom: 4, borderRadius: 5 }}>
                        <View
                          style={styles.flatlistMainView}>
                          <View style={{  borderColor: '#e1194d', borderRadius: onlinePersonImageWidth +4 / 2,
                            borderWidth: 2,padding:3,backgroundColor:'#FFFFFF' }}>
                            <Image source={{ uri: `${item?.profile_image != null ? item?.profile_image :'https://kinengo-dev.s3.us-west-1.amazonaws.com/images/camera-icon.jpg'}` }} style={styles.onlinePerson} />
                            {/* {item.isOnline ?
                              <View style={styles.onlineDot} />
                              : null} */}
                          </View>
                          <View style={{ flex: 4, marginLeft: 15, justifyContent: 'center',top:-4 }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#e42f5e' }}>{item.fullname}</Text>
                            <View style={{}}>
                              <Text style={styles.numberStyle}>{item.about.substring(0, 50)}</Text>
                            </View>
                          </View>

                          <View style={{ width: '10%', alignSelf: 'center', marginTop: 0, flex: 2 }}>
                            <MyButtons title="Unblock" height={50} width={'100%'} borderRadius={10} alignSelf="center" press={() => {UnBloackUser(item.id)}} marginHorizontal={20} fontSize={12}
                              titlecolor={Mycolors.BG_COLOR} hLinearColor={['#8d046e', '#e30f50']} />
                          </View>


                        </View>
                        <View style={{ backgroundColor: '#EDEEEE', height: 1, width: '85%', marginTop: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 30 }}>

</View>
                      </View>
                      
                    )
                  }}
                  keyExtractor={item => item.id}
                />
              </View>







              <View style={{ height: 100 }} />

            </ScrollView>)
            :
            (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", top: -40 }}>
                <Image source={require('../../../assets/icon-Blockempty1.png')}
                  style={{ height: 270, width: 280 }}
                />
                <View style={{ width: '59%' }}>
                  <Text style={{ fontSize: 20, fontWeight: '600', color: '#31313f', textAlign: 'center' }}>No blocked account yet.</Text>
                  {/* <Text style={{ fontSize: 16, fontWeight: '400', color: '#a7a2a2',textAlign:'center' }}>Likes are more intentional on Hinge, so dont't fret, they'll come in soon.</Text> */}
                </View>


                <View style={{ width: '50%', alignSelf: 'center', marginTop: 30 }}>
                  <MyButtons title="Go to profile page" height={60} width={'100%'} borderRadius={10} alignSelf="center" press={() => { props.navigation.navigate('DatingProfile') }} marginHorizontal={20} fontSize={12}
                    titlecolor={Mycolors.BG_COLOR} hLinearColor={['#8d046e', '#e30f50']} />
                </View>
              </View>
            )
        }

      </LinearGradient>
      {loading ? <Loader /> : null}
      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  flatlistMainView: {
    flexDirection: 'row',
    // backgroundColor: '#fff0f0',
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
    // borderWidth: 2,
    // borderColor: '#e1194d',
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
export default DatingBlockUserScreen