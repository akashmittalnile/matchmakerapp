import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Image, Text, StyleSheet, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Keyboard, KeyboardAvoidingView, ActivityIndicator,verticalScale } from 'react-native';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import Loader from '../../../WebApi/Loader';
// import auth from '@react-native-firebase/auth';
//third parties
import moment from 'moment';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Hyperlink from 'react-native-hyperlink';
// import { firebase } from '@react-native-firebase/messaging';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect_dating_block_profile, requestPostApi } from '../../../WebApi/Service'
import sendNotification from '../../../component/SendNotification';

const DatingChat = (props) => {
  const flatListRef = useRef();
  const user_details = useSelector(state => state.user.user_details)
  const [searchValue, setsearchValue] = useState('');
  const [showLoader, setshowLoader] = useState(false);
  const [MessagesData, setMessagesData] = useState([]);
  const [UserId, setuid] = useState('')
  const [driver_id, setDriverid] = useState('')
  const [messages, setMessages] = useState([]);
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const [profileModal, setProfileModal] = useState(false)
  const [userMessage, setUserMessage] = useState('');
  const [ChatImage, setChatImage] = useState('');
  const [loading, setLoading] = useState(false)
  const [ChatDocument, setChatDocument] = useState('');
  const [message, setmessage] = useState('');
  const [chats, setChats] = useState([]);
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false);
  

  const BloackCurrentUser = async () => {
    console.log("BloackCurrentUser==>", driver_id?.connect_userid);
    // setLoading(true);
    var data = {
      blocked_id: driver_id?.connect_userid
    }
    const { responseJson, err } = await requestPostApi(
      connect_dating_block_profile,
      data,
      "POST",
      user_details.token
    );
    setLoading(false);
    console.log("the res==>>BloackCurrentUser=>", responseJson);
    if (responseJson?.headers?.success == 1) {
      Toast.show({ text1: "User Blocked Successfully" });
      props.navigation.navigate('DatingBlockUserScreen');
      // console.log("the res==>>GetProfileImages", responseJson.headers.message);

    }
    else {
      setalert_sms(err);
      setMy_Alert(true);
    }

  };
  //function : navigation function
  const gotoFullImageView = image => {
    navigation?.navigate(ScreenNames.FULL_IMAGE_VIEW, { image: image });
  };
  const gotoPdfView = image =>
    navigation.navigate(ScreenNames.VIEW_PDF, {
      pdfUrl: image,
      pdfTitle: 'Track Sheet',
      type: 'PDF',
    });
  //function : imp function
  const openModal = () => {
    Keyboard.dismiss();
    setShowAttachment(true);
  };

   
// const resetChatCount = async () => {
  //   try {
  //     const data = {
  //       receiver_id: UserId,
  //     };
  //     const resp = await Server.postApiWithToken(
  //       userToken,
  //       Server.READ_MSG,
  //       data,
  //     );
  //     if (resp.data.status) {
  //       dispatch(UserAction.setChatCount(0));
  //     }
  //   } catch (error) {
  //     console.log('error in resetChatCount', error);
  //   }
  // };

  const sendMessage = async () => {
    if (message == '' && ChatImage == '' && ChatDocument == '') {
    } else {
      if (ChatImage == '' && ChatDocument == '') {
        try {
          const Data = {
            userId: driver_id?.connect_userid,
            message: message,
            unread_count:0,
            name: driver_id?.fullname,
            createdAt: new Date(),
          };
          firestore()
            .collection('Matchmakingapp')
            .doc(docid)
            .collection('Messages')
            .add({ ...Data, createdAt: firestore.FieldValue.serverTimestamp() });
          const tempMsg = message;
          Keyboard.dismiss();
          senNoti(message);
          setmessage('');
          // try {
          //   // const data = {
          //   //   receiver_id: UserId,
          //   //   msg: tempMsg,
          //   // };
          //   // await Server.postApiWithToken(userToken, Server.SEND_MSG, data);
          // } catch (error) {
          //   console.log('error while api call ', error);
          // }
        } catch (error) {
          console.log('error in sendMessage', error);
        }
      } else {
        setshowLoader(true);
        const formData = new FormData();
        if (ChatDocument == '') {
          const imageName = ChatImage.path.slice(
            ChatImage.path.lastIndexOf('/'),
            ChatImage.path.length,
          );
          formData.append('image', {
            name: imageName,
            type: ChatImage.mime,
            uri: ChatImage.path,
          });
        }
        // else {
        //   let documentPath = ChatDocument.uri;
        //   const docsName = ChatDocument.name;
        //   formData.append('image', {
        //     name: docsName,
        //     type: ChatDocument.type,
        //     uri: documentPath,
        //   });
        // }
        // formData.append('receiver_id', UserId);
        // formData.append('msg', message);
        // try {
        //   const resp = await Server.postApiWithToken(
        //     userToken,
        //     Server.SEND_MSG,
        //     formData,
        //   );
        //   if (resp.data.status) {
        //     const Data = {
        //       userId: driver_id,
        //       message: message,
        //       createdAt: new Date(),
        //       image: resp.data.url,
        //     };
        //     firestore()
        //       .collection('Chat')
        //       .doc(docid)
        //       .collection('Messages')
        //       .add({
        //         ...Data,
        //         createdAt: firestore.FieldValue.serverTimestamp(),
        //       });
        //     setmessage('');
        //     setChatImage('');
        //     setChatDocument('');
        //     setshowLoader(false);
        //   }
        // } catch (error) {
        //   console.log('error while uploading images ', error);
        //   setshowLoader(false);
        // }
      }
    }
  };
  // function : render function
  const chatRenderFunction = ({ item }) => {
    // console.log("idddddddddddddddddddd",item?.userId,   driver_id?.userid);
    return (
      <View
        key={item.id}
        style={{
          marginVertical: 10,
          alignItems: driver_id?.connect_userid == item?.userId ? 'flex-end' : 'flex-start',
        }}>
        <View
          style={{
            backgroundColor:
              driver_id?.connect_userid == item?.userId ? 'lightpink' : 'white',
            borderRadius: 10,
            padding: 10,
          }}>
          {/* {item.image ? (
          <TouchableOpacity
            onPress={() =>
              item?.image?.includes('pdf')
                ? gotoPdfView(item.image)
                : gotoFullImageView(item.image)
            }>
            <Image
              source={{
                uri: item?.image?.includes('pdf')
                  ? pdfImageUrl
                  :pdfImageUrl //Server.BASE_URL + item.image,
              }}
              style={{
                height: 200,
                width: 200,
                borderRadius: 10,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        ) : null} */}
          {item?.message ? (
            <Hyperlink
              linkStyle={{ color: '#0000FF' }}
              onPress={(url, text) => Linking.openURL(url)}>
              <Text
                style={{
                  color:
                    driver_id?.connect_userid == item?.userId ? 'white' : 'black',
                  fontWeight: 'bold',
                  // fontFamily: Fonts.SEMI_BOLD,
                }}>
                {item?.message}
              </Text>
            </Hyperlink>
          ) : null}
        </View>
        <View style={{}}>
          <Text
            style={{
              color:
                driver_id?.connect_userid == item?.userId ? 'black' : 'black',
              fontWeight: 'bold',
              // fontFamily: Fonts.SEMI_BOLD,
              fontSize: 8,
              marginHorizontal: 5,
            }}>
            {moment(item.createdAt).format('hh:mm a')}
          </Text>
        </View>
      </View>
    );
  };
  const docid =
  driver_id?.connect_userid  > UserId ? UserId + "-" + driver_id?.connect_userid : driver_id?.connect_userid  + "-" + UserId;



  


  const senNoti= async(mess)=>{
    if(message.trim().length>0){
      return
}
    let notidata={
      'data': user_details,
      'title':'Message from '+user_details.first_name,
      'body': mess,
      'token':props?.route?.params?.Reciver_id?.device_id
    }
    let result= await sendNotification.sendNotification(notidata)
    //  console.log('result')
}

  //useEffect
useEffect(() => {
  // senNoti()
    var UserId = user_details.userid
    // resetChatCount();
    
   
    if (props?.route?.params?.from == 'DatingMessages') {
      console.log("DatingMessagesDatingMessagesopen:::",props.route.params.Reciver_id);
      // const driver_id = props?.route?.params?.Reciver_id?.connect_userid
      setDriverid(props.route.params.Reciver_id)
    } else {
      var notidatas = props?.route?.params?.data
      setDriverid(notidatas);

      console.log("notificationDATA", notidatas);
    }
    console.log("Reciver_id",driver_id?.connect_userid , UserId);

    const docid =
    driver_id?.connect_userid  > UserId ? UserId + "-" + driver_id?.connect_userid : driver_id?.connect_userid  + "-" + UserId;

    setuid(UserId)


    const MessageRef = firestore()
      .collection('Matchmakingapp')
      .doc(docid)
      .collection('Messages')
      .orderBy('createdAt', 'desc');
    const unSubscribe = MessageRef.onSnapshot(querySnap => {
      if (querySnap != null) {
        const AllMsg = querySnap.docs.map(docSnap => {
          const data = docSnap.data();
          if (data.createdAt) {
            return {
              ...docSnap.data(),
              createdAt: docSnap.data().createdAt.toDate(),
            };
          } else {
            return {
              ...docSnap.data(),
              createdAt: new Date(),
            };
          }
        });
        // console.log("MessageRef::=>>>", data);
        {
          console.log("MessagesData.length::=>>>", AllMsg.length)
        }
        setMessagesData(AllMsg);

      } else {
        setMessagesData([]);
      }
    });

    // Stop listening for updates when no longer required
    return () => unSubscribe();
  }, [driver_id?.connect_userid]); 


  useEffect(() => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS?.checkPermissions(async permissions => {
        if (!permissions?.badge) {
          try {
            await PushNotificationIOS?.requestPermissions();
          } catch (err) {
            console.log('error', err);
          }
        } else {
          PushNotificationIOS?.setApplicationIconBadgeNumber(0);
        }
      });
    }
    return () => { };
  }, []);



  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#fff5f7', flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', height: 60, padding: 14, justifyContent: 'space-between', width: "100%" }}>
        <TouchableOpacity onPress={() => { props.navigation.goBack('') }}>
          <Image source={require('../../../assets/images/dating-back-arrow.png')} style={{ width: 25, height: 15, left: -5 }} resizeMode='contain' />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{props.navigation.navigate("ChatClickprofileScreen",{id:driver_id?.connect_userid ,from:'DatingChat'})}} style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: "row", left: 60, position: 'absolute' }}>
          <View style={{ left: -10, }}>
            <Image source={{ uri: `${driver_id?.profile_image != null ? driver_id?.profile_image : 'data:image/png;base64,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' }` }} style={{ height: 45, width: 45, borderRadius: 40, borderColor: '#e42f5e', borderWidth: 2 }} />
          </View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#4a4c52', }}>{driver_id?.fullname}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setProfileModal(true)} style={{ justifyContent: 'center', alignItems: 'center', }}>
          <Ionicons name={"ellipsis-vertical"} color={'black'} size={28} />

        </TouchableOpacity>

      </View>
      <View style={{ borderBottomColor: "red", borderWidth: 0.5, width: dimensions.SCREEN_WIDTH }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* <ScrollView> */}

          <View style={{ width: '90%', alignSelf: 'center', marginTop: 20,paddingBottom:90 }}>


            <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, backgroundColor: '#fff5f7' }}>
              {MessagesData.length > 0 ? (
                <FlatList
                inverted 
                  ref={flatListRef}  
                  // onContentSizeChange={() => flatListRef?.current?.scrollToEnd({ animated: false })}
                  // onLayout={() => flatListRef.current.scrollToEnd({ animated: false })}
         
                  showsVerticalScrollIndicator={false}
                  data={MessagesData}
                  renderItem={chatRenderFunction}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : (
                <>
                  {/* <Text style={{textAlign: 'center'}}>Say hi to start chat</Text> */}
                  <ActivityIndicator
                    animating={showLoader}
                    size="large"
                    color="#f39322"
                  />
                </>
              )}

            </View>
          </View>
          <View style={{ height: 100 }} />

        {/* </ScrollView> */}
      </KeyboardAvoidingView>
      <View style={styles.addCommentContainer}>
        <View style={styles.addCommentView}>
          <TextInput
            value={message}
            onChangeText={(text) => {
              setmessage(text)
            }}
            placeholder="Type a message"
            placeholderTextColor={'#edc4c4'}
            style={[styles.input, { width: '70%' }]}
            multiline
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '30%', justifyContent: 'flex-end' }}>
            {/* <TouchableOpacity onPress={sendMessage} style={styles.cameraButtonView}>
            <Image source={require('../../../assets/images/dating-camera-icon.png')}/>
        </TouchableOpacity> */}
            <TouchableOpacity onPress={sendMessage} style={styles.sendButtonView}>
              <Image source={require('../../../assets/images/dating-send-icon.png')} style={styles.sendButton} resizeMode='contain' />
            </TouchableOpacity>
          </View>
        </View>
      </View>


      <Modal
        isVisible={profileModal}
        swipeDirection="down"
        onBackdropPress={() => setProfileModal(false)}
        onSwipeComplete={e => {
          setProfileModal(false);
        }}

        style={{
          justifyContent: 'flex-start', // Update justifyContent to 'flex-start'
          margin: 0,
          height: 20,
          backgroundColor: 'transparent',
        }}>
        <View
          style={{
            height: '6%',
            backgroundColor: '#FFF',
            marginTop: '13%',
            width: '30%',
            alignSelf: 'flex-end',
            justifyContent: 'flex-end',
            right: 10,
            borderRadius: 10
          }}>

          {/* <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}> */}
          <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', height: '100%' }}>


            {/* <View style={{ backgroundColor: '#EDEEEE', height: 1, width: '100%', marginTop: 5 }}>

              </View> */}
            <View style={{ marginTop: 0 }}>
              <TouchableOpacity style={{ marginHorizontal: 6, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                BloackCurrentUser()
                setProfileModal(false);
              }}>
                <Image source={require('../../../assets/icon-blockcontact.png')} style={{ width: 30, height: 30 }} resizeMode='contain' />

                <Text style={{ fontSize: 16, left: 14, color: 'black' }}>Block</Text>
              </TouchableOpacity>


            </View>


          </View>

          {/* <View style={{ width: 100, height: 100 }} /> */}
          {/* </ScrollView> */}
        </View>
      </Modal>
      {loading ? <Loader /> : null}
    </SafeAreaView>

  );
}
const styles = StyleSheet.create({
  addCommentContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 15,
    backgroundColor: '#fff5f7',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#ffb0ba',
  },
  addCommentView: {
    width: '100%',
    backgroundColor: '#fff0f0',
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
    paddingLeft: 20,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  sendButtonView: {
    backgroundColor: '#fee3e3',
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
    left: 3
  },
  cameraButtonView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftMessage: {
    fontSize: 13,
    fontWeight: '400',
    color: '#996673'
  },
  rightMessage: {
    fontSize: 13,
    fontWeight: '400',
    color: '#fff'
  },
});
export default DatingChat




// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import { View, Image, Text, StyleSheet, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Keyboard, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
// import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
// import SearchInput2 from '../../../component/SearchInput2';
// import SearchInputEnt from '../../../component/SearchInputEnt';
// import SerchInput from '../../../component/SerchInput';
// import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import MyButtons from '../../../component/MyButtons';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import Modal from 'react-native-modal';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useSelector, useDispatch } from 'react-redux';
// import Loader from '../../../WebApi/Loader';
// // import { firebase } from '@react-native-firebase/messaging';	
// import Ionicons from 'react-native-vector-icons/Ionicons';	
// import { connect_dating_block_profile, requestPostApi } from '../../../WebApi/Service'	
// // import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// //third parties
// import moment from 'moment';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import Hyperlink from 'react-native-hyperlink';

// const image1 = require('../../../assets/images/people-following-person.png')
// const image2 = require('../../../assets/images/people-sender-image.png')

// const DatingChat = (props) => {
//   const flatListRef = useRef();
//   const user_details = useSelector(state => state.user.user_details)
//   const [searchValue, setsearchValue] = useState('');
//   const [showLoader, setshowLoader] = useState(false);
//   const [MessagesData, setMessagesData] = useState([]);
//   const [chats, setChats] = useState([]);
//   const [profileModal, setProfileModal] = useState(false);
//   const [UserId, setuid] = useState('')
//   const [driver_id, setDriverid] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [messages, setMessages] = useState([]);
//   const [scrollEnabled, setScrollEnabled] = useState(false);
//   const [alluserdata, setUsersdata] = useState([]);
//   const myTextInput = useRef()
//   const [userMessage, setUserMessage] = useState('');
//   const [ChatImage, setChatImage] = useState('');
//   const [ChatDocument, setChatDocument] = useState('');
//   const [message, setmessage] = useState('');
//   const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
//   const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
//   const [upData, setupData] = useState([
//     {
//       id: '1',
//       message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
//       me: false,
//       time: '12:50 pm'
//     },
//     {
//       id: '2',
//       message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
//       me: false,
//       time: '12:51 pm'
//     },
//     {
//       id: '2',
//       message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
//       me: true,
//       time: '12:51 pm'
//     },
//     {
//       id: '2',
//       message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
//       me: false,
//       time: '12:51 pm'
//     },
//     {
//       id: '2',
//       message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
//       me: true,
//       time: '12:51 pm'
//     },

//   ])

//   const BloackCurrentUser = async () => {
//     console.log("BloackCurrentUser==>", driver_id?.swipe_by);
//     setLoading(true);
//     var data = {
//       blocked_id: driver_id?.swipe_by
//     }
//     const { responseJson, err } = await requestPostApi(
//       connect_dating_block_profile,
//       data,
//       "POST",
//       user_details.token
//     );
//     setLoading(false);
//     console.log("the res==>>BloackCurrentUser=>", responseJson);
//     if (responseJson?.headers?.success == 1) {
//       Toast.show({ text1: responseJson.headers.message });
//       props.navigation.navigate('DatingBlockUserScreen');
//       // console.log("the res==>>GetProfileImages", responseJson.headers.message);

//     }
//     else {
//       setalert_sms(err);
//       setMy_Alert(true);
//     }

//   };

//   //function : navigation function
//   const gotoFullImageView = image => {
//     navigation?.navigate(ScreenNames.FULL_IMAGE_VIEW, { image: image });
//   };
//   const gotoPdfView = image =>
//     navigation.navigate(ScreenNames.VIEW_PDF, {
//       pdfUrl: image,
//       pdfTitle: 'Track Sheet',
//       type: 'PDF',
//     });
//   //function : imp function
//   const openModal = () => {
//     Keyboard.dismiss();
//     setShowAttachment(true);
//   };

//   //function : service function
//   // const getUserDetail = async () => {
//   //   try {
//   //     const resp = await Server.getApiWithToken(
//   //       userToken,
//   //       Server.GET_USER_DETAIL,
//   //     );
//   //     if (resp?.data?.status) {
//   //       setUserInfo(resp?.data?.data);
//   //     }
//   //   } catch (error) {
//   //     console.log('error in getUserDetail', error);
//   //   }
//   // };

//   // const resetChatCount = async () => {
//   //   try {
//   //     const data = {
//   //       receiver_id: UserId,
//   //     };
//   //     const resp = await Server.postApiWithToken(
//   //       userToken,
//   //       Server.READ_MSG,
//   //       data,
//   //     );
//   //     if (resp.data.status) {
//   //       dispatch(UserAction.setChatCount(0));
//   //     }
//   //   } catch (error) {
//   //     console.log('error in resetChatCount', error);
//   //   }
//   // };
//   const sendMessage = async () => {
//     if (message == '' && ChatImage == '' && ChatDocument == '') {
//     } else {
//       if (ChatImage == '' && ChatDocument == '') {
//         try {
//           const Data = {
//             userId: driver_id,
//             message: message,
//             createdAt: new Date(),
//           };
//           firestore()
//             .collection('Matchmakingapp')
//             .doc(docid)
//             .collection('Messages')
//             .add({ ...Data, createdAt: firestore.FieldValue.serverTimestamp() });
//           const tempMsg = message;
//           setmessage('');
//           try {
//             // const data = {
//             //   receiver_id: UserId,
//             //   msg: tempMsg,
//             // };
//             // await Server.postApiWithToken(userToken, Server.SEND_MSG, data);
//           } catch (error) {
//             console.log('error while api call ', error);
//           }
//         } catch (error) {
//           console.log('error in sendMessage', error);
//         }
//       } else {
//         setshowLoader(true);
//         const formData = new FormData();
//         if (ChatDocument == '') {
//           const imageName = ChatImage.path.slice(
//             ChatImage.path.lastIndexOf('/'),
//             ChatImage.path.length,
//           );
//           formData.append('image', {
//             name: imageName,
//             type: ChatImage.mime,
//             uri: ChatImage.path,
//           });
//         }
//         // else {
//         //   let documentPath = ChatDocument.uri;
//         //   const docsName = ChatDocument.name;
//         //   formData.append('image', {
//         //     name: docsName,
//         //     type: ChatDocument.type,
//         //     uri: documentPath,
//         //   });
//         // }
//         // formData.append('receiver_id', UserId);
//         // formData.append('msg', message);
//         // try {
//         //   const resp = await Server.postApiWithToken(
//         //     userToken,
//         //     Server.SEND_MSG,
//         //     formData,
//         //   );
//         //   if (resp.data.status) {
//         //     const Data = {
//         //       userId: driver_id,
//         //       message: message,
//         //       createdAt: new Date(),
//         //       image: resp.data.url,
//         //     };
//         //     firestore()
//         //       .collection('Chat')
//         //       .doc(docid)
//         //       .collection('Messages')
//         //       .add({
//         //         ...Data,
//         //         createdAt: firestore.FieldValue.serverTimestamp(),
//         //       });
//         //     setmessage('');
//         //     setChatImage('');
//         //     setChatDocument('');
//         //     setshowLoader(false);
//         //   }
//         // } catch (error) {
//         //   console.log('error while uploading images ', error);
//         //   setshowLoader(false);
//         // }
//       }
//     }
//   };
//   // function : render function
//   const chatRenderFunction = ({ item }) => {
//     return (
//       <View
//         key={item.id}
//         style={{
//           marginVertical: 10,
//           alignItems: driver_id == item?.userId ? 'flex-end' : 'flex-start',
//         }}>
//         <View
//           style={{
//             backgroundColor:
//               driver_id == item?.userId ? 'lightpink' : 'white',
//             borderRadius: 10,
//             padding: 10,
//           }}>
//           {/* {item.image ? (
//           <TouchableOpacity
//             onPress={() =>
//               item?.image?.includes('pdf')
//                 ? gotoPdfView(item.image)
//                 : gotoFullImageView(item.image)
//             }>
//             <Image
//               source={{
//                 uri: item?.image?.includes('pdf')
//                   ? pdfImageUrl
//                   :pdfImageUrl //Server.BASE_URL + item.image,
//               }}
//               style={{
//                 height: 200,
//                 width: 200,
//                 borderRadius: 10,
//                 resizeMode: 'contain',
//               }}
//             />
//           </TouchableOpacity>
//         ) : null} */}
//           {item?.message ? (
//             <Hyperlink
//               linkStyle={{ color: '#0000FF' }}
//               onPress={(url, text) => Linking.openURL(url)}>
//               <Text
//                 style={{
//                   color:
//                     driver_id == item?.userId ? 'white' : 'black',
//                   fontWeight: 'bold',
//                   // fontFamily: Fonts.SEMI_BOLD,
//                 }}>
//                 {item?.message}
//               </Text>
//             </Hyperlink>
//           ) : null}
//         </View>
//         <View style={{}}>
//           <Text
//             style={{
//               color:
//                 driver_id == item?.userId ? 'black' : 'black',
//               fontWeight: 'bold',
//               // fontFamily: Fonts.SEMI_BOLD,
//               fontSize: 8,
//               marginHorizontal: 5,
//             }}>
//             {moment(item.createdAt).format('hh:mm a')}
//           </Text>
//         </View>
//       </View>
//     );
//   };
//   const docid =
//     driver_id > UserId ? UserId + "-" + driver_id : driver_id + "-" + UserId;

//   //useEffect
//   useEffect(() => {
//     console.log("Reciver_id", props.route.params.Reciver_id.userid, user_details.userid);
//     if (props?.route?.params?.from == 'DatingMessages') {
//       console.log("DatingMessagesDatingMessagesopen:::",props.route.params.Reciver_id);
      
//       setDriverid(props.route.params.Reciver_id)
//     } else {
//       var notidatas = props?.route?.params?.data
//       setDriverid(notidatas);
//       console.log("notificationDATA", notidatas);
//     }
//     // resetChatCount();
//     var UserId = user_details.userid
//     var driver_id = props.route.params.Reciver_id.userid
//     const docid =
//       driver_id > UserId ? UserId + "-" + driver_id : driver_id + "-" + UserId;

//     setuid(UserId)
//     setDriverid(driver_id)


//     const MessageRef = firestore()
//       .collection('Matchmakingapp')
//       .doc(docid)
//       .collection('Messages')
//       .orderBy('createdAt', 'desc');
//     const unSubscribe = MessageRef.onSnapshot(querySnap => {
//       if (querySnap != null) {
//         const AllMsg = querySnap.docs.map(docSnap => {
//           const data = docSnap.data();
//           if (data.createdAt) {
//             return {
//               ...docSnap.data(),
//               createdAt: docSnap.data().createdAt.toDate(),
//             };
//           } else {
//             return {
//               ...docSnap.data(),
//               createdAt: new Date(),
//             };
//           }
//         });
//         setMessagesData(AllMsg);
//         console.log('====================================');
//         console.log(AllMsg);
//         console.log('====================================');
//       } else {
//         setMessagesData([]);
//       }
//     });
//     // Stop listening for updates when no longer required
//     return () => unSubscribe();
//   }, [driver_id]);
//   //useEffect
//   useEffect(() => {
//     // getUserDetail();

//     return () => { };
//   }, []);

//   useEffect(() => {
//     if (Platform.OS === 'ios') {
//       PushNotificationIOS?.checkPermissions(async permissions => {
//         if (!permissions?.badge) {
//           try {
//             await PushNotificationIOS?.requestPermissions();
//           } catch (err) {
//             console.log('error', err);
//           }
//         } else {
//           PushNotificationIOS?.setApplicationIconBadgeNumber(0);
//         }
//       });
//     }
//     return () => { };
//   }, []);

//   // function : render function

//   return (
//     <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#fff5f7', flex: 1 }}>
//       <View style={{ flexDirection: 'row', alignItems: 'center', height: 60, padding: 14, justifyContent: 'space-between', width: "100%" }}>
//         <TouchableOpacity onPress={() => { props.navigation.goBack('') }}>
//           <Image source={require('../../../assets/images/dating-back-arrow.png')} style={{ width: 25, height: 15, left: -5 }} resizeMode='contain' />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={()=>{props.navigation.navigate("ChatClickprofileScreen",{id:driver_id?.swipe_by ,from:'DatingChat'})}} style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: "row", left: 60, position: 'absolute' }}>
//           <View style={{ left: -10, }}>
//             <Image source={{ uri: `${driver_id?.profile_image != null ? driver_id?.profile_image : 'data:image/png;base64,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' }` }} style={{ height: 45, width: 45, borderRadius: 40, borderColor: '#e42f5e', borderWidth: 2 }} />
//           </View>
//           <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#4a4c52', }}>{driver_id?.fullname}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => setProfileModal(true)} style={{ justifyContent: 'center', alignItems: 'center', }}>
//           <Ionicons name={"ellipsis-vertical"} color={'black'} size={28} />

//         </TouchableOpacity>

//       </View>
//       <View style={{ borderBottomColor: "red", borderWidth: 0.5, width: dimensions.SCREEN_WIDTH }} />
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//         <ScrollView>

//           <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>


//             <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, backgroundColor: '#fff5f7' }}>
//               {MessagesData.length > 0 ? (
//                 <FlatList
//                   inverted
//                   ref={flatListRef}
//                   //onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: false })}
//                   //onLayout={() => flatListRef.current.scrollToEnd({ animated: false })}
//                   showsVerticalScrollIndicator={false}
//                   data={MessagesData}
//                   renderItem={chatRenderFunction}
//                   keyExtractor={(item, index) => index.toString()}
//                 />
//               ) : (
//                 <>
//                   {/* <Text style={{textAlign: 'center'}}>Say hi to start chat</Text> */}
//                   <ActivityIndicator
//                     animating={showLoader}
//                     size="large"
//                     color="#f39322"
//                   />
//                 </>
//               )}

//             </View>
//           </View>
//           <View style={{ height: 100 }} />

//         </ScrollView>
//       </KeyboardAvoidingView>
//       <View style={styles.addCommentContainer}>
//         <View style={styles.addCommentView}>
//           <TextInput
//             value={message}
//             onChangeText={(text) => {
//               setmessage(text)
//             }}
//             placeholder="Type a message"
//             placeholderTextColor={'#edc4c4'}
//             style={[styles.input, { width: '70%' }]}
//             multiline
//           />
//           <View style={{ flexDirection: 'row', alignItems: 'center', width: '30%', justifyContent: 'flex-end' }}>
//             {/* <TouchableOpacity onPress={sendMessage} style={styles.cameraButtonView}>
//             <Image source={require('../../../assets/images/dating-camera-icon.png')}/>
//         </TouchableOpacity> */}
//             <TouchableOpacity onPress={sendMessage} style={styles.sendButtonView}>
//               <Image source={require('../../../assets/images/dating-send-icon.png')} style={styles.sendButton} resizeMode='contain' />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//       <Modal
//         isVisible={profileModal}
//         swipeDirection="down"
//         onBackdropPress={() => setProfileModal(false)}
//         onSwipeComplete={e => {
//           setProfileModal(false);
//         }}

//         style={{
//           justifyContent: 'flex-start', // Update justifyContent to 'flex-start'
//           margin: 0,
//           height: 20,
//           backgroundColor: 'transparent',
//         }}>
//         <View
//           style={{
//             height: '6%',
//             backgroundColor: '#FFF',
//             marginTop: '13%',
//             width: '30%',
//             alignSelf: 'flex-end',
//             justifyContent: 'flex-end',
//             right: 10,
//             borderRadius: 10
//           }}>

//           {/* <ScrollView
//             showsVerticalScrollIndicator={false}
//             nestedScrollEnabled={true}> */}
//           <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', height: '100%' }}>


//             {/* <View style={{ backgroundColor: '#EDEEEE', height: 1, width: '100%', marginTop: 5 }}>

//               </View> */}
//             <View style={{ marginTop: 0 }}>
//               <TouchableOpacity style={{ marginHorizontal: 6, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
//                 BloackCurrentUser()
//                 setProfileModal(false);
//               }}>
//                 <Image source={require('../../../assets/icon-blockcontact.png')} style={{ width: 30, height: 30 }} resizeMode='contain' />

//                 <Text style={{ fontSize: 16, left: 14, color: 'black' }}>Block</Text>
//               </TouchableOpacity>


//             </View>


//           </View>

//           {/* <View style={{ width: 100, height: 100 }} /> */}
//           {/* </ScrollView> */}
//         </View>
//       </Modal>
//       {loading ? <Loader /> : null}
//     </SafeAreaView>

//   );
// }
// const styles = StyleSheet.create({
//   addCommentContainer: {
//     position: 'absolute',
//     bottom: 0,
//     padding: 15,
//     backgroundColor: '#fff5f7',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderTopWidth: 0.5,
//     borderTopColor: '#ffb0ba',
//   },
//   addCommentView: {
//     width: '100%',
//     backgroundColor: '#fff0f0',
//     // padding:15, 
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     // shadowColor: '#000',
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 3
//     // },
//     // shadowRadius: 1,
//     // shadowOpacity: 0.3,
//     // elevation: 5,
//   },
//   input: {
//     paddingLeft: 20,
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#000',
//   },
//   sendButtonView: {
//     backgroundColor: '#fee3e3',
//     height: 50,
//     width: 50,
//     borderRadius: 50 / 2,
//     // flex:1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   sendButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 20,
//     width: 20,
//     left: 3
//   },
//   cameraButtonView: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     // flex:1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   leftMessage: {
//     fontSize: 13,
//     fontWeight: '400',
//     color: '#996673'
//   },
//   rightMessage: {
//     fontSize: 13,
//     fontWeight: '400',
//     color: '#fff'
//   },
// });
// export default DatingChat

