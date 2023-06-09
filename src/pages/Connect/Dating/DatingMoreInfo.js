import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
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
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const DatingMoreInfo = (props) => {
  const User = useSelector(state => state.user.user_details);
  const [loading, setLoading] = useState(false)
  const [profiledata, setProfileData] = useState('');
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [searchValue, setsearchValue] = useState('')
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef()
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
  const [passionValues, setPassionsValues] = useState([
    { id: '1', name: 'Travelling', mutual: true },
    { id: '2', name: 'Books', mutual: true },
    { id: '3', name: 'Music', mutual: false },
    { id: '4', name: 'Dancing', mutual: false },
    { id: '5', name: 'Modelling', mutual: false },
  ])
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

  useEffect(() => {
    // ProfilePage()

    console.log("DatingMoreInfo useeffect", props.route.params.selectprofile);
    if (props.route.params.from == 'PeopleHome') {
      setProfileData(props.route.params.selectprofile)
    } else if (props.route.params.from == 'DatingProfile') {
      ProfilePage()
    }

  }, [])

  const SwipeProfile = async (type) => {
    console.log("SwipeProfile........", profiledata.userid, type);
    // setLoading(true)
    let message = 'Interest sent to ' + profiledata.fullname + ' successfully awaiting response.'
    var data = {
      userid: profiledata.userid,
      swipe_type: type
    }
    console.log("addres........", data);
    const { responseJson, err } = await requestPostApi(connect_dating_swipe_profile, data, 'POST', User.token)
    setLoading(false)
    // console.log('the res==>>homePage', responseJson)
    if (responseJson.headers.success == 1) {
      if (type == "R") {
        Toast.show({ text2: message });
        props.navigation.goBack()

      } else if (type == "L") {

        props.navigation.goBack()
      }

      // console.log('the res==>>Home.body.vendors', responseJson.body)

    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const ProfilePage = async () => {
    console.log('the res==>>DatingMoreInfo', User)
    setLoading(true)
    const { responseJson, err } = await requestGetApi(connect_dating_profile, '', 'GET', User.token)
    setLoading(false)
    console.log('the res==>>DatingMoreInfo', responseJson)
    if (responseJson.headers.success == 1) {
      console.log('the res==>>DatingMoreInfo', responseJson.body)
      setProfileData(responseJson.body)
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

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

      <ScrollView>
        <View style={{ height: dimensions.SCREEN_HEIGHT * 46 / 100, width: '100%' }}>



          <View style={{ overflow: 'hidden', width: '100%', alignSelf: 'center', zIndex: -999 }}>
            <ImageSlider
              //  localImg={true}
              data={[
                // require('../../assets/Group75972.png'),
                { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU' },
                { img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg' },
                { img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg' }
              ]}
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
            />

          </View>
        </View>
        <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ position: 'absolute', top: 40, left: 20, }}>
          <Image source={require('../../../assets/images/dating-white-back-button.png')} style={{ width: 25, height: 15 }} resizeMode='contain' />
        </TouchableOpacity>
        <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>

          <View style={{ backgroundColor: '#fff5f7', padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
              <View>
                <Text style={{ fontSize: 15, color: '#31313f', fontWeight: 'bold', }}>{profiledata?.fullname}, {profiledata?.age_preference}</Text>
                {/* <Text style={{fontSize:10, color:'#e10f51', marginTop:5}}>@marry</Text> */}
                <Text style={{ fontSize: 10, color: '#4a4c52', marginTop: 5 }}>{profiledata.job_title}</Text>
              </View>
              {
                profiledata.userid != User.userid ?
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
                <Text style={{ fontSize: 10, color: '#4a4c52' }}>{profiledata.address}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFE7F0', width: 80, height: 30, borderRadius: 15, paddingHorizontal: 10, shadowColor: 'rgba(255, 73, 137)', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.13, elevation: 2 }}>
                <Image source={require('../../../assets/images/dating-maptrifold.png')} style={{ width: 20, height: 20 }} />
                <Text style={{ fontSize: 10, color: '#FF4989' }}>2.5 km</Text>
              </View>
            </View>
            <View style={{ marginTop: 30 }} />
            <Text style={{ fontSize: 12, color: '#31313f', fontWeight: 'bold', marginBottom: 7 }}>About</Text>
            <ViewMoreText
              numberOfLines={3}
              renderViewMore={(onPress) => {
                return (
                  <Text onPress={onPress} style={{ fontSize: 10, color: '#dd2e44', textDecorationLine: "underline", fontWeight: '500' }}>Read more</Text>
                )
              }}
              renderViewLess={(onPress) => {
                return (
                  <Text onPress={onPress} style={{ fontSize: 10, color: '#dd2e44', textDecorationLine: "underline", fontWeight: '500' }}>Read less</Text>
                )
              }}
              textStyle={{ textAlign: 'left', width: '95%' }}
            >
              <Text style={{ fontSize: 10, color: '#4a4c52' }}>{profiledata?.about}</Text>
            </ViewMoreText>

            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 12, color: '#31313f', fontWeight: 'bold', marginBottom: 10 }}>Passions</Text>
              <FlatList
                data={profiledata.passions}
                showsHorizontalScrollIndicator={false}
                numColumns={3}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                  // if(item.mutual){
                  return (
                    <View key={item.name} style={[styles.showMeView, { width: '31%', marginHorizontal: index % 3 === 1 ? 10 : 0, marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f' }]}>
                      {/* <Image source={require('../../../assets/images/dating-tick-icon.png')} style={styles.showMeImage} resizeMode='contain' /> */}
                      <View style={styles.showMeImageView}>
                        <Image source={{ uri: `${item.attribute_image}` }} style={styles.showMeImage} resizeMode='contain' />
                      </View>
                      <Text style={[styles.showMeText, { marginLeft: 7 }]}>{item.attribute_value}</Text>
                    </View>
                  )
                  // }
                  // else{
                  //   return(
                  //     <View key={item.name} style={[styles.showMeView , {justifyContent:'center', width:'30%',marginHorizontal:index % 3 === 1 ? 10 : 0,marginBottom:10, borderColor: '#e3d0d7'}]}>
                  //       <Text style={styles.showMeText}>{item.attribute_value}</Text>
                  //     </View>
                  //   )
                  // }
                }}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 12, color: '#31313f', fontWeight: 'bold', marginBottom: 10 }}>Languages</Text>
              <FlatList
                data={profiledata.languages}
                showsHorizontalScrollIndicator={false}
                numColumns={3}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                  // if(item.mutual){
                  return (
                    <View key={item.name} style={[styles.showMeView, { width: '30%', marginHorizontal: index % 3 === 1 ? 10 : 0, marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f' }]}>
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

            <View style={{ width: '90%', marginTop: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#3e5869', marginBottom: 10 }}>My basics</Text>
            </View>
            <View style={{
              flexDirection: "row", width: '100%', flexWrap: 'wrap', borderColor: '#ffb0cb', borderRadius: 30,
              borderWidth: 0.5, padding: 10, paddingLeft: 16, paddingTop: 20
            }}>

              <View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', height: 40 }]}>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', }}>
                  <Image resizeMode='contain' source={require('../../../assets/dating_workicon.png')} style={{ heigh: 20, width: 20, marginRight: 7 }} />
                  <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata.job_company}</Text>
                  </View>

                </View>
              </View>

              <View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                  <Image resizeMode='contain' source={require('../../../assets/body-type-short.png')} style={{ heigh: 80, width: 34, marginLeft: -7, top: -3 }} />
                  <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata.gender}</Text>
                </View>
              </View>
              {profiledata?.height != null ?
                (<View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                  <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                    <Image resizeMode='contain' source={require('../../../assets/icons-ruler.png')} style={{ heigh: 22, width: 22, marginRight: 7, marginLeft: -2 }} />
                    <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata?.height != null ? profiledata?.height : null} cm</Text>
                  </View>
                </View>)
                :
                null
              }
              <View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                  <Image resizeMode='contain' source={require('../../../assets/education_icon.png')} style={{ heigh: 24, width: 20, marginRight: 7 }} />
                  <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata?.university}</Text>
                </View>
              </View>
              <View style={[styles.showMeView, { backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                  <Image resizeMode='contain' source={require('../../../assets/education_icon.png')} style={{ heigh: 24, width: 20, marginRight: 7 }} />
                  <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata.qualification}</Text>
                </View>
              </View>
            </View>

            <View style={{ width: '90%', marginTop: 10, marginBottom: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#3e5869', }}>More about me</Text>

            </View>
            <View style={{
              flexDirection: "row", width: '100%', flexWrap: 'wrap', borderColor: '#ffb0cb', borderRadius: 30,
              borderWidth: 0.5, padding: 10, paddingLeft: 16, paddingTop: 20
            }}>



              <View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                  <Image resizeMode='contain' source={require('../../../assets/body-type-short.png')} style={{ heigh: 80, width: 34, marginLeft: -7, top: -3 }} />
                  <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata.intrest_in}</Text>
                </View>
              </View>

              <View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                  <Image resizeMode='contain' source={require('../../../assets/no-smoking.png')} style={{ heigh: 24, width: 20, marginRight: 7 }} />
                  <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata.smoking}</Text>
                </View>
              </View>
              <View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                  <Image resizeMode='contain' source={require('../../../assets/icons-pacifier.png')} style={{ heigh: 24, width: 20, marginRight: 7 }} />
                  <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata.kids}</Text>
                </View>
              </View>
              <View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                  <Image resizeMode='contain' source={require('../../../assets/beer-mug.png')} style={{ heigh: 24, width: 20, marginRight: 7 }} />
                  <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata?.drinking}</Text>
                </View>
              </View>



              <View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                  <Image resizeMode='contain' source={require('../../../assets/crystal-ball.png')} style={{ heigh: 24, width: 20, marginRight: 7 }} />
                  <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata.zodiac}</Text>
                </View>
              </View>

              <View style={[styles.showMeView, { marginBottom: 10, backgroundColor: '#fff1f6', borderColor: '#ff3b7f', height: 40 }]}>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                  <Image resizeMode='contain' source={require('../../../assets/icons-elections.png')} style={{ heigh: 24, width: 20, marginRight: 7 }} />
                  <Text style={{ fontSize: 12, color: '#4a4c52', }}>{profiledata.politics}</Text>
                </View>
              </View>



            </View>
            {

              profiledata.userid != User.userid ?
                (<View style={styles.buttonsRow}>
                  <TouchableOpacity onPress={() => { SwipeProfile('L') }} style={styles.buttonViewOne}>
                    <Image source={require('../../../assets/images/dating-more-info-reject.png')} style={{ width: 20, height: 20, top: 0, }} resizeMode='contain' />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { SwipeProfile('R') }} style={styles.buttonViewTwo}>
                    <Image source={require('../../../assets/images/dating-more-info-heart.png')} style={{ width: 40, height: 40, top: 0, }} resizeMode='contain' />
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={() => { }} style={styles.buttonViewOne}>
                    <Image source={require('../../../assets/images/dating-yellow-star.png')} style={{ width: 20, height: 20, top: 0, }} resizeMode='contain' />
                  </TouchableOpacity> */}
                </View>)
                :
                null
            }



          </View>


        </View>
        <View style={{ height: 60 }} />

      </ScrollView>
      <Modal
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
                      Alert.alert('Miles cannot be more than 100')
                      // Toast.show('Miles cannot be more than 100', Toast.SHORT)
                    } else if (Number(value) < 0) {
                      Alert.alert('Miles cannot be more than 0')
                      // Toast.show('Miles cannot be less than 0', Toast.SHORT)
                    } else {
                      multiSliderValuesChange([Number(value)])
                    }
                  }}
                  textAlignVertical={'center'}
                  // onChangeText={(e) => console.log('e', e)}
                  placeholder={'0'}
                  placeholderTextColor="#263238"
                  multiline={true}
                  // maxLength={500}
                  // keyboardType="number-pad"
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
              {/* <Text style={{color:Mycolors.GrayColor,fontWeight:'600',fontSize:12,marginTop:9}} >{multiSliderValue[0]} miles</Text> */}
            </View>

            <View style={{ width: '95%', alignSelf: 'center' }}>
              <MyButtons title="Save" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { props.navigation.navigate('ShopPayment') }} marginHorizontal={20} fontSize={11}
                titlecolor={Mycolors.BG_COLOR} backgroundColor={'#FFD037'} marginVertical={0} />
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
    // justifyContent:'space-between',
    width: 'auto',
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
export default DatingMoreInfo 