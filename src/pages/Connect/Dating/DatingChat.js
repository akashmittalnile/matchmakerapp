import React, { useEffect,useState ,useRef,useCallback} from 'react';
import {View,Image,Text,StyleSheet,TextInput,FlatList,Alert,TouchableOpacity, ScrollView, ImageBackground, Keyboard,KeyboardAvoidingView,ActivityIndicator} from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider,ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
 //third parties
import moment from 'moment';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Hyperlink from 'react-native-hyperlink';

const image1 = require('../../../assets/images/people-following-person.png')
const image2 = require('../../../assets/images/people-sender-image.png')

const DatingChat = (props) => {
  const flatListRef = useRef();
  const user_details  = useSelector(state => state.user.user_details)
  const [searchValue,setsearchValue]=useState('');
  const [showLoader, setshowLoader] = useState(false);
  const [MessagesData, setMessagesData] = useState([]);
  const [UserId,setuid]=useState('')
    const [driver_id,setDriverid]=useState('')
  const [messages, setMessages] = useState([]);
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef()
  const [userMessage, setUserMessage] = useState('');
  const [ChatImage, setChatImage] = useState('');
  const [ChatDocument, setChatDocument] = useState('');
  const [message, setmessage] = useState('');
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
  const [upData,setupData]=useState([
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
  navigation?.navigate(ScreenNames.FULL_IMAGE_VIEW, {image: image});
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
          userId: driver_id,
          message: message,
          createdAt: new Date(),
        };
        firestore()
          .collection('Chat')
          .doc(docid)
          .collection('Messages')
          .add({...Data, createdAt: firestore.FieldValue.serverTimestamp()});
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
const chatRenderFunction = ({item}) => {
  return (
    <View
      key={item.id}
      style={{
        marginVertical: 10,
        alignItems: driver_id == item?.userId ? 'flex-end' : 'flex-start',
      }}>
      <View
        style={{
          backgroundColor:
          driver_id == item?.userId ? 'white' : 'lightpink',
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
            linkStyle={{color: '#0000FF'}}
            onPress={(url, text) => Linking.openURL(url)}>
            <Text
              style={{
                color:
                driver_id == item?.userId ? 'black' : 'white',
                fontWeight:'bold',
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
            driver_id == item?.userId ? 'black' : 'black',
            fontWeight:'bold',
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
driver_id > UserId ? UserId + "-" + driver_id : driver_id + "-" + UserId;
  //useEffect
  useEffect(() => {
    console.log("Reciver_id",props.route.params.Reciver_id.userid,user_details.userid);
    // resetChatCount();
    var UserId=user_details.userid
    var driver_id=props.route.params.Reciver_id.userid
    const docid =
      driver_id > UserId ? UserId + "-" + driver_id : driver_id + "-" + UserId;
      setuid(UserId)
      setDriverid(driver_id)

    
const MessageRef = firestore()
      .collection('Chat')
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
        setMessagesData(AllMsg);
        console.log('====================================');
        console.log(AllMsg);
        console.log('====================================');
      } else {
        setMessagesData([]);
      }
    });
    // Stop listening for updates when no longer required
    return () => unSubscribe();
  }, [driver_id]);
  //useEffect
  useEffect(() => {
    // getUserDetail();

    return () => {};
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
    return () => {};
  }, []);
  
 // function : render function
 
  return(
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <SafeAreaView scrollEnabled={scrollEnabled} style={{backgroundColor:'#fff5f7'}}>
      
    <View style={{flexDirection:'row', alignItems:'center', height:80,padding:20, borderBottomLeftRadius:25, borderBottomRightRadius:25}}>
  <TouchableOpacity onPress={()=>{props.navigation.goBack()}}>
    <Image source={require('../../../assets/images/dating-back-arrow.png')} style={{width:25, height:15}} resizeMode='contain'/>
  </TouchableOpacity>
  <View style={{justifyContent:'center', alignItems:'center', marginLeft:10, }}>
    <Image source={require('../../../assets/images/dating-home-header-left-image.png')} style={{height:40, width:40, borderRadius:20, borderColor:'#e42f5e', borderWidth:2}}/>
  </View>
  
  <Text style={{fontSize:12.5, fontWeight:'bold', color:'#4a4c52', marginLeft:10}}>{props.route.params.Reciver_id.fullname}</Text>
</View>
      <ScrollView>

<View style={{width:'90%',alignSelf:'center', marginTop:20}}>
  

<View style={{width:'100%',alignSelf:'center',marginTop:20, backgroundColor:'#fff5f7'}}>
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
<View style={{height:100}} />

</ScrollView>

<View style={styles.addCommentContainer}>
<View style={styles.addCommentView}>
  <TextInput
    value={message}
    onChangeText={(text) => {
      setmessage(text)
    }}
    placeholder="Type a message"
    placeholderTextColor={'#edc4c4'}
    style={[styles.input, {width:'70%'}]}
    multiline
  />
    <View style={{flexDirection:'row', alignItems:'center', width:'30%',justifyContent:'flex-end'}}>
        {/* <TouchableOpacity onPress={sendMessage} style={styles.cameraButtonView}>
            <Image source={require('../../../assets/images/dating-camera-icon.png')}/>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={sendMessage} style={styles.sendButtonView}>
            <Image source={require('../../../assets/images/dating-send-icon.png')} style={styles.sendButton} resizeMode='contain'/>
        </TouchableOpacity>
    </View>
  </View>
  </View>
    </SafeAreaView>
    </KeyboardAvoidingView>
     );
  }
const styles = StyleSheet.create({
  addCommentContainer:{
    position:'absolute', 
    bottom:0,
    padding:15,
    backgroundColor:'#fff5f7', 
    alignItems:'center', 
    justifyContent:'center', 
    borderTopWidth:0.5, 
    borderTopColor:'#ffb0ba', 
  },
  addCommentView:{
    width:'100%', 
    backgroundColor:'#fff0f0',
    // padding:15, 
    flexDirection:'row',
    alignItems:'center', 
    justifyContent:'space-between',
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
    fontWeight:'500',
    color:'#000',
  },
  sendButtonView:{
    backgroundColor:'#fee3e3', 
    height:50,
    width:50,
    borderRadius:50/2,
    // flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  sendButton:{
    height:20,
    width:20,
  },
  cameraButtonView:{
    paddingHorizontal:20, 
    paddingVertical:10, 
    // flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  leftMessage:{
    fontSize:13, 
    fontWeight:'400', 
    color:'#996673'
},
  rightMessage:{
    fontSize:13, 
    fontWeight:'400', 
    color:'#fff'
},
});
export default DatingChat 

// import React, { useEffect, useState } from 'react';
// import {View,Image,Text,StyleSheet, TouchableOpacity, ScrollView,TextInput, Alert, PermissionsAndroid, Platform,} from 'react-native';
// import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import firestore from '@react-native-firebase/firestore'
// // import storage from '@react-native-firebase/storage'
// import { utils } from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth'
// import { GiftedChat,Bubble,InputToolbar,Send,Time} from 'react-native-gifted-chat'
// import {  useSelector, useDispatch } from 'react-redux';
// import sendNotification from '../../../component/SendNotification';
// import {setNotificationData,setMessageCount} from '../../../redux/actions/latLongAction';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Modal from 'react-native-modal';

// import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
// import SearchInput2 from '../../../component/SearchInput2';
// import SearchInputEnt from '../../../component/SearchInputEnt';
// import SerchInput from '../../../component/SerchInput';
 
// import { ImageSlider,ImageCarousel } from "react-native-image-slider-banner";
// import MyButtons from '../../../component/MyButtons';
 

// const DatingChat = (props) => {
//     const [sms,setsms]=useState('')
//     const dispatch =  useDispatch();
//     const [email,setemail]=useState('abc@yopmail.com')
//     const [password,setPassword] = useState('As@12345')
//     const [messages, setMessages] = useState([]);
//     const user_details  = useSelector(state => state.user.user_details)
//     const mapdata  = useSelector(state => state.maplocation)
//     const [userid,setuid]=useState('')
//     const [driverid,setDriverid]=useState('')
//       useEffect(()=>{console.log('DatingChat====================================');
//       console.log(props.route.params.Reciver_id);
//       console.log('==================================DatingChat==');
//          removeMessageCount()
//         var userId=user_details.userid
//         var driverId=props.route.params.Reciver_id.userid
//         // var userId=12
//         // var driverId=34
//         //mapdata.notificationdata.driver_id
//         setuid(userId)
//         setDriverid(driverId)
//         const docid  = driverId > userId ? userId+ "-" + driverId : driverId+"-"+userId 
//       //  const docid  = driverId > userId ? driverId+"-"+userId :userId+ "-" + driverId    //for testing only Uid 5,   D id149
     
//       //  const docid  = '123'

//           console.log('the DOC ID  is==>>',docid)
//         const messageRef = firestore().collection('chatrooms')
//         .doc(docid)
//         .collection('messages')
//         .orderBy('createdAt',"desc")
//         console.log('the messageRef data is==>>',messageRef)
//       const unSubscribe =  messageRef.onSnapshot((querySnap)=>{
//             const allmsg =   querySnap.docs.map(docSanp=>{
//              const data = docSanp.data()
//              if(data.createdAt){
//                  return {
//                     ...docSanp.data(),
//                     createdAt:docSanp.data().createdAt.toDate()
//                 }
//              }else {
//                 return {
//                     ...docSanp.data(),
//                     createdAt:new Date()
//                 }
//              }
//             })
//             setMessages(allmsg)
//         })
//         return ()=>{
//           unSubscribe()
//         }
       
//       },[]) 
//       const removeMessageCount=()=>{
//         // dispatch(setMessageCount(0))
//       }

// const getAllMessages = async ()=>{
//        // const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 
//         const docid='123'   //here use driverid and user id 
//         const querySanp = await firestore().collection('chatrooms')
//         .doc(docid)
//         .collection('messages')
//         .orderBy('createdAt',"desc")
//         .get()
//        const allmsg =   querySanp.docs.map(docSanp=>{
//             return {
//                 ...docSanp.data(),
//                 createdAt:docSanp.data().createdAt.toDate()
//             }
//         })
//         console.log('the message is==>>',allmsg)
//         setMessages(allmsg)

// }
// const senNoti= async()=>{
//       let notidata={
//         'data': {},
//         'title':'Message from '+user_details.first_name,
//         'body': 'new message',
//         'token':props.route.params.data.driver_device_id
//       }
//       let result= await sendNotification.sendNotification(notidata)
//        // console.log('result')
// }
// const onSend = (messageArray) => {
//    senNoti()
//   const msg=messageArray[0]
//   const mymsg={
//     ...msg,
//     sendBy:userid,  //user id 
//     sendto:driverid,  // driver id
//     createdAt: new Date()
//   }
//       setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
//      // const docid  = driverid > userid ?  driverid+"-"+userid :userid+ "-" + driverid 
//       const docid  = driverid > userid ?  userid+ "-" + driverid :driverid+"-"+userid 
//       // const docid  = '123'

//       console.log('the DOC 2 ID  is==>>',docid)
//         //const docid='123'  //here use driverid and user id 
//         firestore().collection('chatrooms')
//         .doc(docid)
//         .collection('messages')
//         .add({...mymsg,createdAt:firestore.FieldValue.serverTimestamp()})
// }
// const loginchaek=()=>{
//   auth().onAuthStateChanged(userExist=>{
//     if(userExist){
//      console.log('user deteils==>>',userExist)
//       // firestore().collection('users')
//       // .doc(userExist.uid)
//       // .update({
//       //   status:"online"
//       // })
//     } else {
//       console.log('user deteils==>>',userExist)
//     }
//   })
// }
// const adddata=()=>{
//     firestore()
//   .collection('Users')
//   .doc('ABC')
//   .set({
//     name: 'Ada Lovelace',
//     age: 30,
//   })
//   .then(() => {
//     console.log('User added!');
//   });

// }
// const login=()=>{
 
//    auth().signInWithEmailAndPassword(email,password)
//     .then(() => {
//       console.log('User signed in!');
//     })
//       // firestore().collection('Users').doc(result.user.uid).set({
//       //     name:'name',
//       //     email:result.user.email,
//       //     uid:result.user.uid,
//       //     pic:'image',
//       //     status:"offline"
//       // })  
//       .catch(error => {
//     console.log(error)
//         })
// }
// const getUsers = async ()=>{
//   // const querySanp = await firestore().collection('users').where('uid','!=',user.uid).get()
//   const querySanp = await firestore().collection('Users').get()
//   const allusers = querySanp.docs.map(docSnap=>docSnap.data())
 
 
//   console.log('All Users is',allusers)

// }
// const createaccount= async()=>{
//   try{
//     const result =  await auth().createUserWithEmailAndPassword(email,password)
//       firestore().collection('Users').doc(result.user.uid).set({
//           name:'UserName',
//           email:result.user.email,
//           uid:result.user.uid,
//           // pic:image,
//           status:"online"
//       })  
     
//   }catch(err){
//     console.log('err is',err)
//       // alert("something went wrong")
//   }
// }
// const loguot=()=>{
//   auth()
//   .signOut()
//   .then(() => console.log('User signed out!'));
// }
// const deletuser=()=>{
//     auth().currentUser.delete().then(function () {
//       console.log('delete successful?')
//       // console.log(app.auth().currentUser)
//     }).catch(function (error) {
//       console.error({error})
//     })
//   }

//      return(
//     <SafeAreaView style={styles.container}>
 
//   {/* ******** Header ********** */}

//   <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:20, backgroundColor:Mycolors.BG_COLOR,
//   width:'100%',height:55,
//       shadowColor:  Mycolors.GrayColor,
//             shadowOffset: {
//               width:0,
//               height:3
//             }, 
//             shadowRadius: 5,
//             shadowOpacity: 3.0,
//             // justifyContent: 'center',
//             elevation: 5}}>
// <TouchableOpacity style={{}} onPress={()=>{props.navigation.goBack()}}>
// <Image source={require('../../../assets/arrow.png')} style={{ width: 24, height: 16,alignSelf:'center'}}></Image>
// </TouchableOpacity>
// <View style={{width:25,height:25,borderRadius:15,marginHorizontal:10,borderRadius:15}}>
// <Image source={require('../../../assets/images/people-sender-image.png')} style={{ width: 25, height: 25, alignSelf: 'center',borderRadius:15 }}></Image>
// </View>
// <Text style={{color:Mycolors.TEXT_COLOR,fontWeight:'bold',}}>{props.route.params.data.fullname}</Text>
// </View>


// {/* ******** End Header ********** */}

// {/* 
// <TouchableOpacity onPress={() => {pickImageAndUpload()}}>
//   <Text>uploade img</Text>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => {loguot()}}>
//   <Text>log out</Text>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => {createaccount()}}>
//   <Text>Create Account</Text>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => {login()}}>
//   <Text>login</Text>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => {adddata()}}>
//   <Text>Add data</Text>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => {deletuser()}}>
//   <Text>delete User</Text>
// </TouchableOpacity>
               
// <TouchableOpacity onPress={() => {getUsers()}}>
//   <Text>GetAll User</Text>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => {loginchaek()}}>
//   <Text>Check login or not</Text>
// </TouchableOpacity> */}

//  {/* <View style={{width:dimensions.SCREEN_WIDTH,top:-100,backgroundColor:'red'}}>
//  <GiftedChat
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       user={{
//         _id: userid, //userId  and from driver side driver 
//       }}

//       renderTime={()=>{
//         <Time
//                 textStyle={{
//                     right: {
//                         color: 'red',
//                         // fontFamily: 'Montserrat-Light',
//                         // fontSize: 14
//                     },
//                     left: {
//                         color: 'black',
                      
//                     }
//                 }}
//             />
//       }}

//       renderBubble={(props)=>{
//         return <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor:'#FF8C00',
//              right:8
//           },
//           left:{
//             backgroundColor:"white",
//              left:-33,
//           }
//         }}
//         textStyle={{
//           right: {
//             color: "white"
//           },
//           left: {
//             color: Mycolors.TEXT_COLOR
//           }
//         }}
//       />
//     }}
//     // renderMessageText={()=>{
//     //   color:'red'
//     // }}
//       renderInputToolbar={(props)=>{
//          return (
//            <>
//            <View style={{width:'100%',height:70,alignSelf:'center',backgroundColor:'#fff',justifyContent:'center',flexDirection:'row'}}>

//             <View style={{width:'90%',height:45,borderRadius:28,marginTop:15}}>
//                <InputToolbar {...props}
//                 containerStyle={styles.input} 
//                 textInputStyle={{ color: "black" }}
//                 />
//           </View>
//           </View>
//            </>
//          )
//     }}
//     renderSend={(props) =>{
//       return (
//           <Send
//               {...props}
//           >
//               <View style={{width: 35, height: 35,borderRadius:20,backgroundColor:Mycolors.ORANGE,justifyContent:'center',left:15,top:-5}}>
//                   <Image source={require('../../../assets/dating-change-password-right-arrow.png')} style={{ width: 19, height: 19, alignSelf: 'center',resizeMode:"stretch"}}/>
//               </View>
//           </Send>
//       );
//      }}
//     />
//     <View style={{width:10,height:30}} />
    
// </View> */}
  
// <View style={{flex:1,width:dimensions.SCREEN_WIDTH}}>
//  <GiftedChat
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       user={{
//         _id: user_details.userid, //userId  and from driver side driver 
//       }}

//       renderTime={()=>{
//         <Time
//                 textStyle={{
//                     right: {
//                         color: 'red',
//                         // fontFamily: 'Montserrat-Light',
//                         // fontSize: 14
//                     },
//                     left: {
//                         color: 'black',
                      
//                     }
//                 }}
//             />
//       }}

//       renderBubble={(props)=>{
//         return <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor:Mycolors.BTN_LINEAR_END_COLOR,
//              right:8
//           },
//           left:{
//             backgroundColor:"white",
//              left:-33,
//           }
//         }}
//         textStyle={{
//           right: {
//             color: "white"
//           },
//           left: {
//             color: Mycolors.TEXT_COLOR
//           }
//         }}
//       />
//     }}
//       renderInputToolbar={(props)=>{
//          return (
//            <>
//            <View style={{width:'100%',height:70,alignSelf:'center',backgroundColor:'#fff',justifyContent:'center',flexDirection:'row'}}>

//             <View style={{width:'92%',height:45,borderRadius:28,marginTop:10}}>
//                <InputToolbar {...props}
//                 containerStyle={styles.input} 
//                 textInputStyle={{ color: "black" }}
//                 />
//           </View>
//           </View>
//            </>
//          )
//     }}
//     renderSend={(props) =>{
//       return (
//           <Send
//               {...props}
//           >
//               <View style={{width: 40, height: 40,marginTop:10,borderRadius:20,backgroundColor:Mycolors.BTN_LINEAR_END_COLOR,justifyContent:'center',left:15}}>
//                   <Image source={require('../../../assets/send.png')} resizeMode={'center'}style={{ width: 19, height: 19, alignSelf: 'center' }}/>
//               </View>
//           </Send>
//       );
//      }}

//     />
//      <View style={{width:10,height:30}} />
// </View>

//     </SafeAreaView>
//      );
//   }
// const styles = StyleSheet.create({

//   container: {
//     flex: 1,  
//     backgroundColor:'#fff'
//   },
//   input: {
//     paddingHorizontal: 10,
//     fontSize: 13,
//     borderColor: Mycolors.GrayColor,
//     backgroundColor: '#fff6e6',
//     borderRadius:8,
//     color:Mycolors.TEXT_COLOR,
//   },
// });
// export default DatingChat