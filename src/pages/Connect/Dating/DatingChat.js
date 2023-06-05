import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Image, Text, StyleSheet, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Keyboard, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
//third parties
import moment from 'moment';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Hyperlink from 'react-native-hyperlink';
import { firebase } from '@react-native-firebase/messaging';

const image1 = require('../../../assets/images/people-following-person.png')
const image2 = require('../../../assets/images/people-sender-image.png')

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
  const myTextInput = useRef()
  const [userMessage, setUserMessage] = useState('');
  const [ChatImage, setChatImage] = useState('');
  const [ChatDocument, setChatDocument] = useState('');
  const [message, setmessage] = useState('');
  const [chats, setChats] = useState([]);
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false);
  const [alluserdata, setUsersdata] = useState([]);
  const [upData, setupData] = useState([
    {
      id: '1',
      message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      me: false,
      time: '12:50 pm'
    },
    {
      id: '2',
      message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      me: false,
      time: '12:51 pm'
    },
    {
      id: '2',
      message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      me: true,
      time: '12:51 pm'
    },
    {
      id: '2',
      message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      me: false,
      time: '12:51 pm'
    },
    {
      id: '2',
      message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      me: true,
      time: '12:51 pm'
    },

  ])

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

  //function : service function
  // const getUserDetail = async () => {
  //   try {
  //     const resp = await Server.getApiWithToken(
  //       userToken,
  //       Server.GET_USER_DETAIL,
  //     );
  //     if (resp?.data?.status) {
  //       setUserInfo(resp?.data?.data);
  //     }
  //   } catch (error) {
  //     console.log('error in getUserDetail', error);
  //   }
  // };

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
            userId: driver_id?.userid,
            message: message,
            name: driver_id?.fullname,
            createdAt: new Date(),
          };
          firestore()
            .collection('Matchmakingapp')
            .doc(docid)
            .collection('Messages')
            .add({ ...Data, createdAt: firestore.FieldValue.serverTimestamp() });
          const tempMsg = message;
          setmessage('');
          try {
            // const data = {
            //   receiver_id: UserId,
            //   msg: tempMsg,
            // };
            // await Server.postApiWithToken(userToken, Server.SEND_MSG, data);
          } catch (error) {
            console.log('error while api call ', error);
          }
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
    return (
      <View
        key={item.id}
        style={{
          marginVertical: 10,
          alignItems: driver_id?.userid == item?.userId ? 'flex-end' : 'flex-start',
        }}>
        <View
          style={{
            backgroundColor:
              driver_id?.userid == item?.userId ? 'white' : 'lightpink',
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
                    driver_id?.userid == item?.userId ? 'black' : 'white',
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
                driver_id?.userid == item?.userId ? 'black' : 'black',
              fontWeight: 'bold',
              // fontFamily: Fonts.SEMI_BOLD,
              fontSize: 8,
              marginHorizontal: 5,
            }}>
            {moment(item.createdAt).format('lll')}
          </Text>
        </View>
      </View>
    );
  };
  const docid =
    driver_id > UserId ? UserId + "-" + driver_id?.userid : driver_id?.userid + "-" + UserId;

  //useEffect

  useEffect(() => {
    console.log("Reciver_id", props.route.params.Reciver_id.userid, user_details.userid);
    // resetChatCount();
    var UserId = user_details.userid
    var driver_id = props.route.params.Reciver_id
    const docid =
      driver_id > UserId ? UserId + "-" + driver_id?.userid : driver_id?.userid + "-" + UserId;

    setuid(UserId)
    setDriverid(driver_id)

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
        setMessagesData(AllMsg);

      } else {
        setMessagesData([]);
      }
    });

    // Stop listening for updates when no longer required
    return () => unSubscribe();
  }, [driver_id?.userid]);
  //useEffect

  //   const getLocation1 = () => {
  //     return firebase.firestore()
  //             .collection("Matchmakingapp")
  //             .doc(docid)
  //             .get()
  //             .then(function(doc) {
  //                 if (doc.exists) {
  //                     data = doc.data();
  //                     console.log("getfirebase",data);
  //                     // return data;
  //                 } else {
  //                   console.log("getfirebase");
  //                     // return "";
  //                 }
  //             });
  // };
  //   const getWithWhomList = async () => {
  //     const db =  firestore();
  //     const ref = db.collection("Matchmakingapp").doc(docid).collection('Messages');
  //     const query = ref.where("sender", "==", user_details.userid)
  //       .where("receiver", "==", driver_id?.userid);
  //     const results = await query.get();

  //     const withWhomList = results.docs.map((doc) => {
  //       const { sender, receiver } = doc.data();
  //       return {
  //         id: sender || receiver,
  //         name: sender || receiver,
  //       };
  //     });
  // console.log('withWhomList====================================');
  // console.log(withWhomList);
  // console.log('===================================withWhomList=');
  // // setWithWhom(withWhomList);
  // };

  // useEffect(() => {
  //   getWithWhomList();
  // }, []);

  // const getUsers = async () => {
  //   const querySnap = await firestore().collection("Matchmakingapp").get()

  //   const allusers = querySnap.then(querySnapshot => {
  //     console.log('Total users:', querySnapshot.size);
  //     querySnapshot.forEach(documentSnapshot => {
  //       console.log('User ID:', documentSnapshot.id, documentSnapshot.data());
  //       return documentSnapshot.data()
  //     })
  //   })
  //   // const allusers = querySnap.docs.map(docSnap => docSnap.data())
  //   setUsersdata(allusers)
  //   console.log('1getUsers====================================');
  //   console.log(allusers);
  //   console.log('===================================getUsers=');
  // }

  useEffect(() => {
    // getUsers()
    // firestore()
    //   .collection('Matchmakingapp')
    //   .doc(docid)
    //   .collection('Messages')
    //   .get()
    //   .then(querySnapshot => {
    //     console.log('Total users:', querySnapshot.size);

    //     querySnapshot.forEach(documentSnapshot => {
    //       console.log('User ID:', documentSnapshot.id, documentSnapshot.data());
    //       return documentSnapshot.data()

    //     });
    //   });
    // getUserDetail();
    // const chatsCollection = firestore()
    // .collection('Matchmakingapp')
    // const unSubscribe = chatsCollection.onSnapshot(querySnap => {
    //   if (querySnap != null) {
    //     const AllMsg = querySnap.docs.map(docSnap => {
    //       const data = docSnap 
    //       console.log("MessageRef::=>>>", data);


    //     });

    //    } else {
    //     console.log("avc=>>>",);
    //     // setMessagesData([]);
    //   }
    //   console.log("tttt::=>>>", data);
    // });

    return () => getUsers();
  }, []);

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

  // function : render function

  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#fff5f7', flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', height: 60, padding: 14, justifyContent: 'space-between', width: "100%" }}>
        <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
          <Image source={require('../../../assets/images/dating-back-arrow.png')} style={{ width: 25, height: 15, left: -5 }} resizeMode='contain' />
        </TouchableOpacity>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 14 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#4a4c52', }}>{props.route.params.Reciver_id.fullname}</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          {/* <Image source={require('../../../assets/images/dating-home-header-left-image.png')} style={{height:40, width:40, borderRadius:20, borderColor:'#e42f5e', borderWidth:2}}/> */}
        </View>

      </View>
      <View style={{ borderBottomColor: "red", borderWidth: 0.5, width: dimensions.SCREEN_WIDTH }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>

          <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>


            <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, backgroundColor: '#fff5f7' }}>
              {MessagesData.length > 0 ? (
                <FlatList
                  inverted
                  ref={flatListRef}
                  //onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: false })}
                  //onLayout={() => flatListRef.current.scrollToEnd({ animated: false })}
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

        </ScrollView>
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
