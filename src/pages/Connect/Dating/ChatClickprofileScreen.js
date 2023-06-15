import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, RefreshControl } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import HomeHeader from '../../../component/HomeHeader';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MyAlert from '../../../component/MyAlert';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Loader from '../../../WebApi/Loader';
import LinearGradient from 'react-native-linear-gradient';
import { baseUrl, login, shop_eat_business, requestPostApi, requestGetApi, connect_dating_profile, connect_dating_swipe_profile, } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import ViewMoreText from 'react-native-view-more-text';
import Toast from 'react-native-toast-message';

const ChatClickprofileScreen = (props) => {
  const User = useSelector(state => state.user.user_details);
  const [loading, setLoading] = useState(false)
  const [profiledata, setProfileData] = useState('');
  const [viewmore, setviewmore] = useState(true)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [searchValue, setsearchValue] = useState('')
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef();
  const [allImg, setAllImg] = useState([{ img: '' }])
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)

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
  const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    ProfilePage()
    console.log("DatingMoreInfo useeffect", props.route.params.selectprofile);
    if (props.route.params.from == 'DatingChat') {
      ProfilePage(props?.route?.params?.id)
      // setProfileData(props.route.params.selectprofile)
    } else {
      ProfilePage(props?.route?.params?.id)
    }

  }, [])
  const checkcon = () => {
    ProfilePage()
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



  const ProfilePage = async (id) => {
    console.log("the res==>>ChatClickprofileScreen", id);
    setLoading(true);

    const { responseJson, err } = await requestGetApi(
      connect_dating_profile + '/' + id,
      "",
      "GET",
      User.token
    );
    setLoading(false);
    console.log("the res==>>ChatClickprofileScreen", responseJson);
    if (responseJson?.headers?.success == 1) {
      console.log("the res==>>ChatClickprofileScreen", responseJson.body);
      setProfileData(responseJson?.body);
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

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

  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#fff5f7', height: '100%' }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}

          />
        }
      >
        <View style={{ height: dimensions.SCREEN_HEIGHT * 46 / 100, width: '100%' }}>
          <View style={{ overflow: 'hidden', width: '100%', alignSelf: 'center', zIndex: -999 }}>
          {
              allImg?.length > 0 ?
           (<ImageSlider
              //  localImg={true}
              data={allImg}
              // onClick={(item, index) => {alert('hello'+index)}}
              // autoPlay={true}
              // onItemChanged={(item) => console.log("item", item)}

              // activeIndicatorStyle={{backgroundColor:'#FF4989'}}
              indicatorContainerStyle={{ top: -5 }}

              caroselImageStyle={{ resizeMode: 'cover', height: 400 }}
              closeIconColor="#fff"
              headerStyle={{ padding: 0, backgroundColor: 'rgba(0,0,0, 0.6)', }}
              showHeader
            // preview={true}
            />)
            :
            <Image style={{height: 400,width:'100%'}} source={{ uri: `${'https://kinengo-dev.s3.us-west-1.amazonaws.com/images/camera-icon.jpg'}` }} />
        }

          </View>
        </View>
        <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ position: 'absolute', top: 40, left: 20, backgroundColor: '#FFA5C5', borderRadius: 50, height: 30, justifyContent: 'center', width: 30, alignItems: 'center' }}>
          <Image source={require('../../../assets/images/dating-white-back-button.png')} style={{ width: 25, height: 15, }} resizeMode='contain' />
        </TouchableOpacity>
        <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>

          <View style={{ backgroundColor: '#fff5f7', padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
              <View>
                <Text style={{ fontSize: 15, color: '#31313f', fontWeight: 'bold', }}>{profiledata?.fullname}, {profiledata?.age_preference}</Text>
                {/* <Text style={{fontSize:10, color:'#e10f51', marginTop:5}}>@marry</Text> */}
                <Text style={{ fontSize: 10, color: '#4a4c52', marginTop: 5 }}>{profiledata?.job_title}</Text>
              </View>
              {
                profiledata?.userid != User.userid ?
                  (<TouchableOpacity onPress={() => { props.navigation.navigate('DatingChat', { Reciver_id: profiledata, from: 'DatingMoreinfo' }) }} style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 10, backgroundColor: '#fff', shadowColor: '#0089CF', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.1, elevation: 2 }}>
                    <Image source={require('../../../assets/images/dating-home-header-right-image.png')} style={{ width: 20, height: 20 }} />
                  </TouchableOpacity>)
                  :
                  null
              }
            </View>
            <View style={{ marginTop: 20 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 12, color: '#31313f', fontWeight: 'bold' }}>Location</Text>
                <Text style={{ fontSize: 10, color: '#4a4c52' }}>{profiledata?.address}</Text>
              </View>
              {
                profiledata?.userid != User.userid ?
                  (<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFE7F0', width: 80, height: 30, borderRadius: 15, paddingHorizontal: 10, shadowColor: 'rgba(255, 73, 137)', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.13, elevation: 2 }}>
                    <Image source={require('../../../assets/images/dating-maptrifold.png')} style={{ width: 20, height: 20 }} />
                    <Text style={{ fontSize: 10, color: '#FF4989' }}>{Number(profiledata?.distance).toFixed(0)} mile</Text>
                  </View>)
                  :
                  null}
            </View>
            <View style={{ marginTop: 30 }} />
            {
              profiledata?.about != null ?
                (<>
                  <Text style={{ fontSize: 12, color: '#31313f', fontWeight: 'bold', marginBottom: 7 }}>About</Text>

                  <View style={{ alignSelf: 'center', width: '100%', marginTop: 1, paddingHorizontal: 0 }}>
                    <Text style={{ fontSize: 11, color: Mycolors.TEXT_COLOR }}>{profiledata?.about}</Text>

                  </View></>)
                : null
            }

            {
              profiledata?.passions?.filter(el => el.is_selected == 1).length > 0 ?
                (<View style={{ marginTop: 20 }}>
                  <Text style={{ fontSize: 12, color: '#31313f', fontWeight: 'bold', marginBottom: 10 }}>Passions</Text>
                  <View style={{}}>

                    <FlatList
                      // horizontsal
                      data={profiledata?.passions?.filter(el => el.is_selected)}
                      showsHorizontalScrollIndicator={false}
                      numColumns={3}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }) => {
                        return (

                          <View key={item} style={[styles.showMeView, { marginHorizontal: index % 3 === 1 ? 10 : 0, marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', }]}>
                            {/* <Image source={require('../../../assets/images/dating-tick-icon.png')} style={styles.showMeImage} resizeMode='contain' /> */}
                            <View style={styles.showMeImageView}>
                              <Image source={{ uri: `${item.attribute_image}` }} style={styles.showMeImage} resizeMode='contain' />
                            </View>
                            <Text style={[styles.showMeText, { marginLeft: 7 }]}>{item.attribute_value}</Text>
                          </View>
                        )


                      }}
                    />
                  </View>

                </View>)
                : null
            }
            {
              profiledata?.languages?.filter(el => el.is_selected == 1).length > 0 ?
                (<View style={{ marginTop: 20 }}>
                  <Text style={{ fontSize: 12, color: '#31313f', fontWeight: 'bold', marginBottom: 10 }}>Languages</Text>
                  <View style={{}}>
                    <FlatList
                      data={profiledata?.languages?.filter(el => el.is_selected)}
                      showsHorizontalScrollIndicator={false}
                      numColumns={3}
                      keyExtractor={item => item.id}
                      renderItem={({ item, index }) => {
                        if (item.is_selected == 1) {
                          return (
                            <View key={item.name} style={[styles.showMeView, { marginHorizontal: index % 3 === 1 ? 10 : 0, marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f' }]}>
                              {/* <Image source={require('../../../assets/images/dating-tick-icon.png')} style={styles.showMeImage} resizeMode='contain' /> */}
                              <View style={styles.showMeImageView}>
                                <Image source={{ uri: `${item.attribute_image}` }} style={styles.showMeImage} resizeMode='contain' />
                              </View>
                              <Text style={[styles.showMeText, { marginLeft: 7 }]}>{item.attribute_value}</Text>
                            </View>
                          )
                        }
                      }}
                    />
                  </View>
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
                profiledata?.job_company != null ?
                  (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', height: 40 }]}>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', }}>
                      <Image resizeMode='contain' source={require('../../../assets/icon-company.png')} style={{ height: 20, width: 20, marginRight: 7 }} />
                      <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text numberOfLines={1} style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata?.job_company}</Text>
                      </View>

                    </View>
                  </View>)
                  : null
              }
              {
                profiledata?.gender != null ?
                  (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                      <Image resizeMode='contain' source={require('../../../assets/icon-equality.png')} style={{ height: 20, width: 25, marginRight: 6, top: 1 }} />
                      <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata?.gender}</Text>
                    </View>
                  </View>)
                  : null
              }
              {profiledata?.height != null ?
                (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                  <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                    <Image resizeMode='contain' source={require('../../../assets/icon-growth.png')} style={{ height: 22, width: 22, marginRight: 7, marginLeft: 0 }} />
                    <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata?.height != null ? profiledata?.height : null} cm</Text>
                  </View>
                </View>)
                :
                null
              }
              {
                profiledata?.university != null ?
                  (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                      <Image resizeMode='contain' source={require('../../../assets/icon-school.png')} style={{ height: 24, width: 20, marginRight: 7 }} />
                      <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata?.university}</Text>
                    </View>
                  </View>)
                  : null
              }

              {
                profiledata?.qualification != null ?
                  (<View style={[styles.showMeView, { backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                      <Image resizeMode='contain' source={require('../../../assets/icon-degree.png')} style={{ height: 24, width: 20, marginRight: 7 }} />
                      <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata?.qualification}</Text>
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
                  <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata.intrest_in}</Text>
                </View>
              </View> */}
              {
                profiledata?.smoking != null ?
                  (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                      <Image resizeMode='contain' source={require('../../../assets/no-smoking.png')} style={{ height: 24, width: 20, marginRight: 7 }} />
                      <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata?.smoking}</Text>
                    </View>
                  </View>)
                  : null
              }

              {
                profiledata?.kids != null ?
                  (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                      <Image resizeMode='contain' source={require('../../../assets/icons-pacifier.png')} style={{ height: 24, width: 20, marginRight: 7 }} />
                      <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata?.kids}</Text>
                    </View>
                  </View>)
                  : null
              }
              {
                profiledata?.politics != null ?
                  (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                      <Image resizeMode='contain' source={require('../../../assets/icons-elections.png')} style={{ height: 24, width: 20, marginRight: 7 }} />
                      <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata?.politics}</Text>
                    </View>
                  </View>)
                  : null
              }

              {
                profiledata?.drinking != null ?
                  (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                      <Image resizeMode='contain' source={require('../../../assets/beer-mug.png')} style={{ height: 24, width: 20, marginRight: 7 }} />
                      <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata?.drinking}</Text>
                    </View>
                  </View>)
                  : null
              }

              {
                profiledata?.zodiac != null ?
                  (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                      <Image resizeMode='contain' source={require('../../../assets/crystal-ball.png')} style={{ height: 24, width: 20, marginRight: 7 }} />
                      <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata?.zodiac}</Text>
                    </View>
                  </View>) :
                  null
              }
            </View>
          </View>
        </View>
        <View style={{ height: 60 }} />

      </ScrollView>

      {loading ? <Loader /> : null}
      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
  text1: {
    fontSize: 12,
    fontWeight: '400',
    color: '#455A64'
  },
  showMeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: 100,
    padding: 10,
    backgroundColor: '#fff1f6',
    // paddingHorizontal:15, 
    borderRadius: 30,
    // borderWidth: 0.5
    marginRight: 6
  },
  showMeText: {
    fontSize: 10,
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
    height: 18,
    width: 18
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-evenly',
    alignSelf: 'center',
    marginTop: 20
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
    backgroundColor: '#FF4989',
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
  }
});
export default ChatClickprofileScreen 