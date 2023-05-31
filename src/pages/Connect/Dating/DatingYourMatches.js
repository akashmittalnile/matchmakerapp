import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Loader from '../../../WebApi/Loader';
import ViewMoreText from 'react-native-view-more-text';
import MyAlert from '../../../component/MyAlert';
import { useSelector, useDispatch } from 'react-redux';
import { connect_dating_swipe_profile, connect_dating_swipe_profile_id_delete, requestGetApi, requestPostApi } from '../../../WebApi/Service';

const DatingYourMatches = (props) => {
  const User = useSelector(state => state.user.user_details);
  const [loading, setLoading] = useState(false)

  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [searchValue, setsearchValue] = useState('')
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef()
  // const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  // const [showChooseMilesModal, setShowChooseMilesModal] = useState(false);
  const [matchesprofile, setmatchesprofile] = useState([]);

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
    GetSwipeProfile()
  }, []);

  const GetSwipeProfile = async () => {
    console.log("SwipeProfile........",User.token );
    setLoading(true)
    const { responseJson, err } = await requestGetApi(connect_dating_swipe_profile, '', 'GET', User.token)
    setLoading(false)
    console.log('the res==>>GetSwipeProfile', responseJson)
    if (responseJson.headers.success == 1) {
      setmatchesprofile(responseJson?.body?.data)
    } else {
      setalert_sms(responseJson.headers.message)
      setMy_Alert(true)
    }
  }
  const PutSwipeProfile = async (t) => {
    console.log("SwipeProfile........",t );
    setLoading(true)
    // let message= 'Interest sent to ' + profiledata.fullname+ ' successfully awaiting response.'
    var data = {
      swipe_status: t  // Accepted, Rejected,
    } 
    const { responseJson, err } = await requestPostApi(connect_dating_swipe_profile_id_delete, data, 'PUT', User.token)
    setLoading(false)
    console.log('the res==>>GetSwipeProfile', responseJson)
    if (responseJson.headers.success == 1) {
      
     
        props.navigation.goBack()

      

    } else {
      setalert_sms(responseJson.headers.message)
      setMy_Alert(true)
    }
  }


  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#fff5f7', height: '100%' }}>
      <ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 80, padding: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
          <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ flex: 1 }}>
            <Image source={require('../../../assets/images/dating-back-arrow.png')} style={{ width: 25, height: 15 }} resizeMode='contain' />
          </TouchableOpacity>
          <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 12.5, fontWeight: '600', color: '#31313f' }}>Your Matches</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
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
                    <Image resizeMode='cover' source={{uri:`${item.profile_image}`}} style={styles.flatListImage} />
                    <View style={styles.absoluteView}>
                      <View style={{justifyContent:'center',alignItems:'center',width:"100%"}}>
                      <Text style={styles.nameStyle}>{item.fullname}</Text>
                        </View>
                     
                      <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={()=>{PutSwipeProfile('Rejected')}} style={styles.buttonView}>
                          <Image source={require('../../../assets/images/dating-matches-reject-icon.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{PutSwipeProfile('Accepted')}} style={styles.buttonView}>
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

      </ScrollView>
      {loading ? <Loader /> : null}
      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  flatListView: {
    width: dimensions.SCREEN_WIDTH *0.43,
    marginHorizontal: 5,
    height: 250,
    marginBottom: 10,
    backgroundColor:"gray",borderRadius:15
  },
  flatListImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 15
  },
  absoluteView: {
    justifyContent:'center',alignItems:'center',
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