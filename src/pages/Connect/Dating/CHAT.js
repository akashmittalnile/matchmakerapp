//React components
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Linking,
} from 'react-native';
//custom Header
import ChatNowHeader from './ChatNowHeader';
//third parties
import moment from 'moment';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Hyperlink from 'react-native-hyperlink';
//global
import {Colors, Constant, Fonts, ScreenNames, Server} from '../../global';
//styles
import {styles} from './ChatNowStyle';
//svg
import AttachSvg from '../../assets/svg/attach.svg';
import SendSvg from '../../assets/svg/submit-arrow.svg';
//firebase
import firestore from '@react-native-firebase/firestore';
//redux
import {connect} from 'react-redux';
import * as UserAction from '../../redux/actions/userActions';
//custom hooks
import {useKeyboard} from '../../hooks/isKeyBoardOpen';
//modal
import Attachment from '../../components/modal/Attachment/Attachment';

const ChatNow = ({userToken, navigation, dispatch}) => {
  //DATA
  const adminId = 1;
  //useRef
  const flatListRef = useRef();
  //variables : hooks
  const isKeyBoardOpen = useKeyboard();
  const pdfImageUrl = `https://play-lh.googleusercontent.com/3tLaTWjP9kz56OwkbnbAnZoNp4HL28zcDMt5DEjt-kfuVhraWJBYC5XQRuMBf084JQ`;
  //states
  const [userInfo, setUserInfo] = useState({});
  const [showAttachment, setShowAttachment] = useState(false);
  const [message, setmessage] = useState('');
  const [MessagesData, setMessagesData] = useState([]);
  const [ChatImage, setChatImage] = useState('');
  const [ChatDocument, setChatDocument] = useState('');
  const [showLoader, setshowLoader] = useState(false);
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
  const getUserDetail = async () => {
    try {
      const resp = await Server.getApiWithToken(
        userToken,
        Server.GET_USER_DETAIL,
      );
      if (resp?.data?.status) {
        setUserInfo(resp?.data?.data);
      }
    } catch (error) {
      console.log('error in getUserDetail', error);
    }
  };
  const resetChatCount = async () => {
    try {
      const data = {
        receiver_id: adminId,
      };
      const resp = await Server.postApiWithToken(
        userToken,
        Server.READ_MSG,
        data,
      );
      if (resp.data.status) {
        dispatch(UserAction.setChatCount(0));
      }
    } catch (error) {
      console.log('error in resetChatCount', error);
    }
  };
//to checkmessage read or not
  const getAllMyClubs = async () => {
    try {
      const {response, status} = await Service.getAPI(
        Service.get_clubs,
        {},
        userToken,
      );
      if (status) {
        let totalCount = 0;
        await response.map(item => {
          firestore()
            .collection('groups')
            .doc(item.id.toString())
            .collection('users')
            .where('id', '==', userInfo.id)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                const unreadCount = doc.data().unread_count;
                totalCount += unreadCount;
                // Perform any further operations with the unreadCount
              });
              setMessagesCount(totalCount);
              return;
            })
            .catch(error => {
              // Handle any errors that occur during the retrieval
              console.error('Error getting users:', error);
            });
        });
      }
    } catch (error) {
      console.error('error in getAllMyClubs', error);
    }
  };
















  const sendMessage = async () => {
    if (message == '' && ChatImage == '' && ChatDocument == '') {
    } else {
      if (ChatImage == '' && ChatDocument == '') {
        try {
          const Data = {
            userId: userInfo?.id,
            message: message,
            createdAt: new Date(),
          };
          firestore()
            .collection('Chat')
            .doc(adminId.toString() + userInfo?.id?.toString())
            .collection('Messages')
            .add({...Data, createdAt: firestore.FieldValue.serverTimestamp()});
          const tempMsg = message;
          setmessage('');
          try {
            const data = {
              receiver_id: adminId,
              msg: tempMsg,
            };
            await Server.postApiWithToken(userToken, Server.SEND_MSG, data);
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
        } else {
          let documentPath = ChatDocument.uri;
          const docsName = ChatDocument.name;
          formData.append('image', {
            name: docsName,
            type: ChatDocument.type,
            uri: documentPath,
          });
        }
        formData.append('receiver_id', adminId);
        formData.append('msg', message);
        try {
          const resp = await Server.postApiWithToken(
            userToken,
            Server.SEND_MSG,
            formData,
          );
          if (resp.data.status) {
            const Data = {
              userId: userInfo?.id,
              message: message,
              createdAt: new Date(),
              image: resp.data.url,
            };
            firestore()
              .collection('Chat')
              .doc(adminId.toString() + userInfo?.id?.toString())
              .collection('Messages')
              .add({
                ...Data,
                createdAt: firestore.FieldValue.serverTimestamp(),
              });
            setmessage('');
            setChatImage('');
            setChatDocument('');
            setshowLoader(false);
          }
        } catch (error) {
          console.log('error while uploading images ', error);
          setshowLoader(false);
        }
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
          alignItems: userInfo?.id == item?.userId ? 'flex-end' : 'flex-start',
        }}>
        <View
          style={{
            backgroundColor:
              userInfo?.id == item?.userId ? Colors.WHITE : Colors.LITEGREEN,
            borderRadius: 10,
            padding: 10,
          }}>
          {item.image ? (
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
                    : Server.BASE_URL + item.image,
                }}
                style={{
                  height: 200,
                  width: 200,
                  borderRadius: 10,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          ) : null}
          {item?.message ? (
            <Hyperlink
              linkStyle={{color: '#0000FF'}}
              onPress={(url, text) => Linking.openURL(url)}>
              <Text
                style={{
                  color:
                    userInfo?.id == item?.userId ? Colors.BLACK : Colors.WHITE,
                  fontFamily: Fonts.SEMI_BOLD,
                }}>
                {item?.message}
              </Text>
            </Hyperlink>
          ) : null}
        </View>
        <View style={{}}>
          <Text
            style={{
              fontFamily: Fonts.SEMI_BOLD,
              fontSize: 8,
              marginHorizontal: 5,
            }}>
            {moment(item.createdAt).format('lll')}
          </Text>
        </View>
      </View>
    );
  };

  //useEffect
  useEffect(() => {
    // const docid =
    //   driver_id > UserId ? UserId + "-" + driver_id : driver_id + "-" + UserId;

    //   const chatId = [userInfo.uid, FriendId].sort().join('-');






    resetChatCount();
    const MessageRef = firestore()
      .collection('Chat')
      .doc(adminId.toString() + userInfo?.id?.toString())
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
      } else {
        setMessagesData([]);
      }
    });
     
    // Stop listening for updates when no longer required
    return () => unSubscribe();
  }, [userInfo?.id]);
  //useEffect
  useEffect(() => {
    getUserDetail();

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
  //UI
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <ChatNowHeader headerName="BrandNUE Consultant" />
        <Image
          style={styles.chatBgImage}
          source={require('../../assets/Images/chat-bg.png')}
        />
        <View style={styles.mainView}>
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
          <View
            style={{
              ...styles.textInputView,
              marginBottom: isKeyBoardOpen ? 40 : 0,
            }}>
            <TextInput
              placeholder="Type a message"
              value={message}
              keyboardAppearance="default"
              keyboardType="default"
              onChangeText={text => setmessage(text)}
              style={styles.textInput}
            />
            <ActivityIndicator
              style={{position: 'absolute', right: Constant.windowWidth / 2}}
              animating={showLoader}
              size="large"
              color="#f39322"
            />
            <View style={styles.IconsView}>
              <TouchableOpacity onPress={openModal}>
                {ChatImage || ChatDocument ? (
                  <Image
                    source={{
                      uri: ChatImage == '' ? pdfImageUrl : ChatImage.path,
                    }}
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: Colors.GREY,
                    }}
                  />
                ) : (
                  <AttachSvg />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                disabled={showLoader}
                onPress={sendMessage}
                style={styles.sendIconView}>
                <SendSvg />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Attachment
        visible={showAttachment}
        setVisibility={setShowAttachment}
        setImage={setChatImage}
        setDocument={setChatDocument}
      />
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
const mapDispatchToProps = dispatch => ({dispatch});
export default connect(mapStateToProps, mapDispatchToProps)(ChatNow);




