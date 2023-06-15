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
import { connect_dating_chat_list, connect_dating_swipe_profile, connect_dating_swipe_profile_id_delete, requestGetApi, requestPostApi } from '../../../WebApi/Service';
import { TextInput } from 'react-native-gesture-handler';

import { setdatingmessagecount } from '../../../redux//actions/user_action';

const image1 = require('../../../assets/images/people-following-person.png')
const onlinePersonImageWidth = 70
const onlineDotWidth = 12

const DatingMessages = (props) => {
  const User = useSelector(state => state.user.user_details);
  const dispatch = useDispatch();
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
  const [driver_id, setDriverid] = useState([]);
  const [searchtext, setsearchtext] = useState('')
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
  ]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetSwipeProfile()
    })
    return unsubscribe;
  }, []);

  const [isRead, setIsRead] = useState(false);


  // const getAllChatCount = async () => {
  //   console.log("asdad", driver_id?.connect_userid, User?.userid);
    
       
  //       if (User?.userid != User?.userid) {
  //         let totalCount = 0;
  //         await driver_id.map(item => {
  //           firestore()
  //             .collection('groups')
  //             .doc(item.connect_userid.toString())
  //             .collection('users')
  //             .where('id', '==', userInfo.id)
  //             .get()
  //             .then(querySnapshot => {
  //               querySnapshot.forEach(doc => {
  //                 const unreadCount = doc.data().unread_count;
  //                 totalCount += unreadCount;
  //                 // Perform any further operations with the unreadCount
  //               });
  //               setMessagesCount(totalCount);
  //               return;
  //             })
  //             .catch(error => {
  //               // Handle any errors that occur during the retrieval
  //               console.error('Error getting users:', error);
  //             });
  //         });
  //       }
        
  //   };
   
  useEffect(() => {

    const docid =
      driver_id?.connect_userid > User?.userid ? User?.userid + "-" + driver_id?.connect_userid : driver_id?.connect_userid + "-" + User?.userid;

    console.log("asdad", driver_id?.connect_userid, User?.userid);

     const unSubscribe =
      firestore()
        .collection('Matchmakingapp')
        .doc(docid)
        .collection('Messages')
        .where('isRead', '==', '')
        .onSnapshot((snapshot) => {
          const count = snapshot.size;
          dispatch(setdatingmessagecount(count))
          console.log('New_Messages:', count);
          // setNewMessageCount(count);
        });


    // const MessageRef = 
    //   firestore()
    //   .collection('Matchmakingapp')
    //   .doc(docid)
    //   .collection('Messages')
    //.orderBy('isRead', 'desc');
    //   const unSubscribe = MessageRef.onSnapshot(querySnap => {
    //     if (querySnap != null) {
    //       const AllMsg = querySnap.docs.map(docSnap => {
    //         const data = docSnap.data();
    //         console.log("MessageRef::=>>>", data);
    //         if (data.isRead && data.userId == driver_id?.swipe_by ) {
    //           return {
    //             ...docSnap.data(),
    //             isRead: docSnap.data().isRead.toDate(),
    //           };
    //         } else {
    //           return {
    //             ...docSnap.data(),
    //             isRead: new Date(),
    //           };
    //         }
    //       });

    //       {
    //         // console.log("MessagesData.length::=>>>", AllMsg)
    //       }
    //       // setMessagesData(AllMsg);

    //     } 
    //   });
    // const unSubscribe =
    //   firestore()
    //     .collection('Matchmakingapp')
    //     .doc(docid)
    //     .collection('Messages')
    //     .onSnapshot((snapshot) => {
    //       const messageCount = snapshot.docs.length;
    //       dispatch(setdatingmessagecount(messageCount))
    //       console.log('New_Messages:', messageCount);
    //       // setMessageCount(snapshot.docs.length);
    //     });

    return () => { unSubscribe };
  }, [driver_id?.connect_userid]);

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
    const { responseJson, err } = await requestGetApi(connect_dating_chat_list, '', 'GET', User.token)
    setLoading(false)
    console.log('the res==>>DatingMessages', responseJson)
    if (responseJson?.headers?.success == 1) {
      setUserList(responseJson?.body?.data)
      console.log('the_driveridcheck', responseJson?.body?.data[0]?.swipe_by)
      setDriverid(responseJson?.body?.data)
    } else {
      setalert_sms(responseJson?.headers?.message)
      setMy_Alert(true)
    }
  }

  const Search = async (text) => {
    // if(text.trim().length != 0){

    // }
    setLoading(true)
    const { responseJson, err } = await requestGetApi(connect_dating_chat_list + '?name=' + text, '', 'GET', User.token)
    setLoading(false)
    console.log('the res==>>Search', responseJson)
    if (responseJson?.headers?.success == 1) {
      setUserList(responseJson?.body?.data)
    }
    // else {
    //   setalert_sms(responseJson?.headers?.message)
    //   setMy_Alert(true)
    // }
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
          {/* <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ flex: 1 }}>
            <Image source={require('../../../assets/images/dating-back-arrow.png')} style={{ width: 25, height: 15 }} resizeMode='contain' />
          </TouchableOpacity> */}
          <View style={{ flex: 0.2 }}></View>
          <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 12.5, fontWeight: 'bold', color: '#31313f' }}>Personal connect messages</Text>
          </View>
          <TouchableOpacity onPress={() => { props.navigation.navigate('DatingBlockUserScreen') }} style={{ justifyContent: 'center', flex: 0.35, backgroundColor: '#FFF5', width: 50, height: 35, borderRadius: 50, alignItems: 'center' }}>
            <Image source={require('../../../assets/icon-unblock.png')} style={{ width: 30, height: 27 }} resizeMode='contain' />
          </TouchableOpacity>
        </View>

        <View style={{ width: dimensions.SCREEN_WIDTH, borderBottomColor: '#ffb0ba', borderBottomWidth: StyleSheet.hairlineWidth, left: -21 }} />
        <View style={{ width: '90%', alignSelf: 'center', marginHorizontal: 14 }} >
          <Text style={{ fontSize: 34, fontWeight: '700', textAlign: 'left', color: '#000000' }}>Messages</Text>
        </View>

        <View style={{ width: '92%', alignSelf: 'center' }}>
          <View style={{ width: '98%', height: 55, borderRadius: 10, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 10, justifyContent: "space-between" }}
            onPress={() => { props.navigation.navigate('', { datas: [], from: 'search' }) }}>

            <View style={{ padding: 5, width: '85%', }}>
              <TextInput
                placeholder='Search'
                placeholderTextColor={'#808080'}
                onChangeText={(text) => {
                  Search(text)
                  setsearchtext(text)
                }}

                style={{ color: '#ff5e96', fontSize: 14, paddingLeft: 5 }}
              >
              </TextInput>

            </View>
            <View style={{ padding: 5, }}>
              <Image source={require('../../../assets/ent_search_icon.png')} style={{ width: 35, height: 35 }}></Image>
            </View>
          </View>
        </View>
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
                      <TouchableOpacity onPress={() => { props.navigation.navigate('DatingChat', { Reciver_id: item, from: 'DatingMessages' }) }} style={{ width: '100%', marginBottom: 4, borderRadius: 5 }}>
                        <View
                          style={styles.flatlistMainView}>
                          <View style={{
                            borderColor: '#e1194d', borderRadius: onlinePersonImageWidth + 4 / 2,
                            borderWidth: 2, padding: 3, backgroundColor: '#FFFFFF'
                          }}>
                            <Image source={{ uri: `${item?.profile_image != null ? item?.profile_image : 'https://kinengo-dev.s3.us-west-1.amazonaws.com/images/camera-icon.jpg'}` }} style={styles.onlinePerson} />
                            {item.activity_status ?
                              <View style={styles.onlineDot} />
                              : null}
                          </View>
                          <View style={{ flex: 6, marginLeft: 15, justifyContent: 'center', top: -3 }}>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#e42f5e', lineHeight: 20 }}>{item.fullname}</Text>
                            <View style={{}}>
                              <Text style={styles.numberStyle}>{item.about.substring(0, 60)}</Text>
                            </View>
                          </View>


                        </View>
                        <View style={{ backgroundColor: '#EDEEEE', height: 1, width: '85%', marginTop: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 30 }}>

                        </View>
                      </TouchableOpacity>
                    )
                  }}
                  keyExtractor={item => item.id}
                />
              </View>

              <View style={{ height: 100 }} />

            </ScrollView>)
            :
            <>
              {
                searchtext != '' ?
                  (
                    <View style={{ justifyContent: 'center', alignItems: "center", top: 50 }}>
                      <Image source={require('../../../assets/icon_chatOnline.png')}
                        style={{ height: 280, width: 280, alignSelf: 'center' }}
                      />
                      <View style={{ width: '59%' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: '#31313f', textAlign: 'center' }}>No results found</Text>
                        {/* <Text style={{ fontSize: 16, fontWeight: '400', color: '#a7a2a2', textAlign: 'center' }}>Likes are more intentional on Kinengo, so dont't fret, they'll come in soon.</Text> */}
                      </View>


                      {/* <View style={{ width: '50%', alignSelf: 'center', marginTop: 30 }}>
                    <MyButtons title="Go profile page" height={60} width={'100%'} borderRadius={10} alignSelf="center" press={() => { props.navigation.navigate('DatingProfile') }} marginHorizontal={20} fontSize={12}
                      titlecolor={Mycolors.BG_COLOR} hLinearColor={['#8d046e', '#e30f50']} />
                  </View> */}
                    </View>
                  )
                  :
                  (
                    <View style={{ justifyContent: 'center', alignItems: "center", top: 40 }}>
                      <Image source={require('../../../assets/icon_chatOnline.png')}
                        style={{ height: 250, width: 250 }}
                      />
                      <View style={{ width: '59%' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: '#31313f', textAlign: 'center' }}>No chat yet.</Text>
                        <Text style={{ fontSize: 16, fontWeight: '400', color: '#a7a2a2', textAlign: 'center' }}>Likes are more intentional on Kinenge, so dont't fret, they'll come in soon.</Text>
                      </View>


                      <View style={{ width: '50%', alignSelf: 'center', marginTop: 30 }}>
                        <MyButtons title="Go to profile page" height={60} width={'100%'} borderRadius={10} alignSelf="center" press={() => { props.navigation.navigate('DatingProfile') }} marginHorizontal={20} fontSize={12}
                          titlecolor={Mycolors.BG_COLOR} hLinearColor={['#8d046e', '#e30f50']} />
                      </View>
                    </View>
                  )
              }
            </>
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
    fontWeight: '400',
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
    borderRadius: onlinePersonImageWidth / 2


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