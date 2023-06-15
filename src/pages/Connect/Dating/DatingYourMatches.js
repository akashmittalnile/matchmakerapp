import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, RefreshControl } from 'react-native';
import { dimensions, Mycolors, } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Loader from '../../../WebApi/Loader';
import ViewMoreText from 'react-native-view-more-text';
import MyAlert from '../../../component/MyAlert';
import { useSelector, useDispatch } from 'react-redux';
import { connect_dating_swipe_profile, connect_dating_swipe_profile_id_delete, requestGetApi, requestPostApi } from '../../../WebApi/Service';
import { setdatingMatchData } from '../../../redux/actions/user_action';

const DatingYourMatches = (props) => {
  const User = useSelector(state => state.user.user_details);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [searchValue, setsearchValue] = useState('')
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef()
  // const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  // const [showChooseMilesModal, setShowChooseMilesModal] = useState(false);
  const [matchesprofile, setmatchesprofile] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [matchesValues, setMatchesValues] = useState([
    { id: '1', name: 'Rose', img: require('../../../assets/images/dating-your-matches-person-image.png') },
    { id: '2', name: 'Rose', img: require('../../../assets/images/dating-your-matches-person-image.png') },
    { id: '3', name: 'Rose', img: require('../../../assets/images/dating-your-matches-person-image.png') },
    { id: '4', name: 'Rose', img: require('../../../assets/images/dating-your-matches-person-image.png') },
    { id: '5', name: 'Rose', img: require('../../../assets/images/dating-your-matches-person-image.png') },
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

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetSwipeProfile()
    })
    return unsubscribe;

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
    // console.log("SwipeProfile........",User.token );
    setLoading(true)
    const { responseJson, err } = await requestGetApi(connect_dating_swipe_profile, '', 'GET', User.token)

    console.log('the res==>>GetSwipeProfile', responseJson)
    if (responseJson.headers.success == 1) {
      dispatch(setdatingMatchData(responseJson?.body?.data?.length))
      setmatchesprofile(responseJson?.body?.data)
    } else {
      setalert_sms(responseJson.headers.message);
      setMy_Alert(true)
    }
    setLoading(false)
  }
  const PutSwipeProfile = async (t, id) => {
    console.log("SwipeProfile........", t, id);
    setLoading(true)

    var data = {
      swipe_status: t  // Accepted, Rejected,
    }
    const { responseJson, err } = await requestPostApi(connect_dating_swipe_profile_id_delete + id, data, 'PUT', User.token)
    setLoading(false)
    console.log('the res==>>GetSwipeProfile', responseJson)
    if (responseJson.headers.success == 1) {
      GetSwipeProfile()
      props.navigation.navigate('DatingMessages')
    } else {
      setalert_sms(responseJson.headers.message)
      setMy_Alert(true)
    }
  }


  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#fff5f7', height: '100%' }}>

      <View style={{ flexDirection: 'row', alignItems: 'center', height: 70, padding: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
        {/* <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ flex: 1 }}>
            <Image source={require('../../../assets/images/dating-back-arrow.png')} style={{ width: 25, height: 15 }} resizeMode='contain' />
          </TouchableOpacity> */}
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ fontSize: 12.5, fontWeight: '600', color: '#31313f' }}>Your Matches</Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>
      <View style={{ width: dimensions.SCREEN_WIDTH, borderBottomColor: '#ffb0ba', borderBottomWidth: StyleSheet.hairlineWidth, left: -21 }} />
      {
        matchesprofile?.length > 0 ?
          (<ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}

              />
            }
          >
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>

              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 22, fontWeight: '500', color: '#FF3B7F', marginBottom: 5 }}>Your Matches</Text>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#455A64' }}>Here you can see people who liked you</Text>
              </View>

              <View style={{ width: '100%', alignSelf: 'center', }}>
                <FlatList
                  data={matchesprofile}
                  showsHorizontalScrollIndicator={false}
                  numColumns={2}
                  // style={{  }}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <View key={item.name} style={styles.flatListView}>
                        <Image resizeMode='cover' source={{ uri: `${item.profile_image}` }} style={styles.flatListImage} />
                        <View style={styles.absoluteView}>
                          <View style={{ justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                            <Text style={styles.nameStyle}>{item.fullname}</Text>
                          </View>

                          <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={() => { PutSwipeProfile('Rejected', item.id) }} style={styles.buttonView}>
                              <Image source={require('../../../assets/images/dating-matches-reject-icon.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { PutSwipeProfile('Accepted', item.id) }} style={styles.buttonView}>
                              <Image source={require('../../../assets/images/dating-matches-love-icon.png')} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )
                  }}
                />
              </View>

            </View>
            <View style={{ height: 100 }} />

          </ScrollView>)
          :
          (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", top: -20 }}>
              <Image source={require('../../../assets/icon-matches.png')}
                style={{ height: 250, width: 250 }}
              />
              <View style={{ width: '59%' }}>
                <Text style={{ fontSize: 20, fontWeight: '600', color: '#31313f', textAlign: 'center' }}>No Likes yet.</Text>
                <Text style={{ fontSize: 16, fontWeight: '400', color: '#a7a2a2', textAlign: 'center' }}>Likes are more intentional on Kinengo, so don't fret, they'll come in soon.</Text>
              </View>


              <View style={{ width: '50%', alignSelf: 'center', marginTop: 30 }}>
                <MyButtons title="Go to profile page" height={60} width={'100%'} borderRadius={10} alignSelf="center" press={() => { props.navigation.navigate('DatingProfile') }} marginHorizontal={20} fontSize={12}
                  titlecolor={Mycolors.BG_COLOR} hLinearColor={['#8d046e', '#e30f50']} />
              </View>
            </View>
          )
      }

      {loading ? <Loader /> : null}
      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  flatListView: {
    width: dimensions.SCREEN_WIDTH * 0.43,
    marginHorizontal: 5,
    height: 250,
    marginBottom: 10,
    backgroundColor: "gray", borderRadius: 15
  },
  flatListImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 15
  },
  absoluteView: {
    justifyContent: 'center', alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: dimensions.SCREEN_WIDTH / (2.7 * 4)
  },
  nameStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF3B7F',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    width: 100,
    marginTop: 10
  },
  buttonView: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#FFF1ED',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default DatingYourMatches 