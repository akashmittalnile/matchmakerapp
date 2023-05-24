import React, { useEffect,useState ,useRef} from 'react';
import {View,Image,Text,StyleSheet,SafeAreaView,TextInput,FlatList,Alert,TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import HomeHeader from '../../../component/HomeHeader';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider,ImageCarousel } from "react-native-image-slider-banner";
import AppIntroSlider from 'react-native-app-intro-slider';
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Geocoder from "react-native-geocoding";
import { GoogleApiKey } from '../../../WebApi/GoogleApiKey';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import {setRestorentLocation } from '../../../redux/actions/latLongAction';
import Carousel from './Components/Carousel/Carousel';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { connect_dating_location, requestPostApi } from '../../../WebApi/Service';

Geocoder.init(GoogleApiKey);
const GOOGLE_MAPS_APIKEY = GoogleApiKey;
const SliderData = [
  {slider: `https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60`},
  {slider: `https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60`},
  {slider: `https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60`},
]

const PeopleHome = (props) => {
  const User = useSelector(state => state.user.user_details)
  const [searchValue,setsearchValue]=useState('')
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [addre, setaddre] = useState(' ');
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const myTextInput = useRef()
  const [googleAddress, setGoogleAddress] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [googleLatLng, setGoogleLatLng] = useState({});
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [ageRangeSliderValue, setAgeRangeSliderValue] = useState([18, 60])
  const [distanceSliderValue, setDistanceSliderValue] = useState([10, 60])
  const [interstedInValue, setInterstedInValue] = useState(1);
  const [filterByStatus, setFilterByStatus] = useState(1);
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
  const [introSliderData] = useState([
    // require('../../assets/Group75972.png'),
    {key:'one' ,image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU'},
    {key:'two' ,image: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg'},
    {key:'three' ,image: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg'}
])
  const [upData,setupData]=useState([
    {
      id: '1',
      name: 'Aryav Nadkarni',
      desc:'Amazing footbal shorts caption this',
      numViews:'183K',
      numComments:'183',
      time:'',
      img:require('../../../assets/images/images.png'),
      isSaved: false,
      isLiked: false
    },
    {
      id: '2',
      name: 'Aryav Nadkarni',
      desc:'Amazing footbal shorts caption this',
      numViews:'183K',
      numComments:'183',
      time:'',
      img:require('../../../assets/images/images.png'),
      isSaved: false,
      isLiked: false
    },
    {
      id: '3',
      name: 'Aryav Nadkarni',
      desc:'Amazing footbal shorts caption this',
      numViews:'183K',
      numComments:'183',
      time:'',
      img:require('../../../assets/images/images.png'),
      isSaved: false,
      isLiked: false
    },
    {
      id: '4',
      name: 'Aryav Nadkarni',
      desc:'Amazing footbal shorts caption this',
      numViews:'183K',
      numComments:'183',
      time:'',
      img:require('../../../assets/images/images.png'),
      isSaved: false,
      isLiked: false
    },

  ])
  const multiSliderValuesChange = (values) => {setMultiSliderValue(values)}
  useEffect(()=>{
    Geodummy()
 },[])
 const Geodummy= async()=>{
  let My_cord = { latitude: '28.5355', longitude: '77.3910' }
  homePage('28.5355','77.3910') 
  dispatch(setRestorentLocation(My_cord))
  LatlongTo_address(My_cord)
}

 const LatlongTo_address = async (latlong) => {
  // var courentlocation = mapdata.curentPosition
  // dispatch(setStartPosition(courentlocation))
  Geocoder.from(latlong.latitude, latlong.longitude)
    .then(json => {
      var addressComponent = json.results[0].formatted_address;
      console.log('The address is', json.results[0].formatted_address);
      setaddre(addressComponent)
      // UpdateLocation(latlong,addressComponent)
    })
    .catch(error => console.warn(error));
}
 const homePage = async (l,lo) => {
  // console.log("addres........",addre);
  console.log('the res==>>DatingSelection',l,lo)
  setLoading(true)
var data ={
  // "location_name": "Office",  
  latitude: l,
  longitude: lo,
  address: addre != ''? addre : "Dummy address"
}
console.log("addres........",data);
  const { responseJson, err } = await requestPostApi(connect_dating_location, data, 'PUT',User.token)
  setLoading(false)
  console.log('the res==>>Home', responseJson)
  if (responseJson.headers.success == 1) {
    console.log('the res==>>Home.body.vendors', responseJson.body)
    // setresData(responseJson.body)
  } else {
    setalert_sms(err)
    setMy_Alert(true)
  }
}

 const ageRangeSliderValuesChange = (values) => {setAgeRangeSliderValue(values)}
  const distanceSliderValuesChange = (values) => {setDistanceSliderValue(values)}

 const changeSaved = (id) => {
  const updataCopy = [...upData]
  const updatedData = updataCopy?.map(el=>el.id === id ? {...el, isSaved: !el.isSaved }: el)
  setupData([...updatedData])
 }
 const changeLiked = (id) => {
  const updataCopy = [...upData]
  const updatedData = updataCopy?.map(el=>el.id === id ? {...el, isLiked: !el.isLiked }: el)
  setupData([...updatedData])
 }

 const onReject = (id) => {
  console.log('id rejected', id);
  props.navigation.navigate('DatingChat')
 }
 const onLove = (id) => {
  console.log('id loved', id);
  props.navigation.navigate('DatingMessages')
}
const onRefresh = (id) => {
  console.log('id refreshed', id);
  props.navigation.navigate('DatingProfile')
 }
 const onChangeInterested = (value) => {
  if(interstedInValue === value){
    return
  }
  setInterstedInValue(value)
}
const onChangeFilterByStatus = (value) => {
  if(filterByStatus === value){
    return
  }
  setFilterByStatus(value)
}

function renderDescription(rowData) {
  const title = rowData.structured_formatting.main_text;
  const address = rowData.structured_formatting.secondary_text;
  // console.log('renderDescription', address);
  return (
    <View style={{}}>
      <Text style={{ color: 'gray' }}>
        {title}
      </Text>
      <Text style={{ color: 'gray' }}>
        {address}
      </Text>
    </View>
  );
}

const _renderItem = ({ item }) => {
  return (
      <Image source={{uri: item.image}} style={{width:dimensions.SCREEN_WIDTH*0.9,height:dimensions.SCREEN_HEIGHT/2, borderRadius:20}}/>
    // <View key={item.key} style={styles.slide}>
    //   <Text style={styles.title}>{item.title}</Text>
    //   <Text style={styles.text}>{item.text}</Text>
    // </View>
  );
}
  return(
    <SafeAreaView scrollEnabled={scrollEnabled} style={{backgroundColor:'#fff5f7', height:'100%'}}>
      <ScrollView>
<View style={{width:'90%',alignSelf:'center', marginTop:20}}>
  
  <View style={{flexDirection:'row', alignItems:'center'}}>
    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <Image source={require('../../../assets/images/dating-home-header-left-image.png')} style={{height:40, width:40, borderRadius:20, borderColor:'#e42f5e', borderWidth:2}}/>
        </View>
    </View>
    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:12.5, fontWeight:'bold', color:'#31313f'}}>Personal connect</Text>
    </View>
    <TouchableOpacity style={{flex:1, flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}} onPress={()=>{props.navigation.navigate('DatingYourMatches')}}>
        <Image source={require('../../../assets/images/dating-home-header-right-image.png')}/>
    </TouchableOpacity>
  </View>
  <View style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginHorizontal: 10,
          // backgroundColor: 'rgba(0,0,0,0.025)',
          paddingHorizontal: 5,
          // paddingVertical: 5,
          // alignSelf: 'center',
          // alignItems: 'center',
          // backgroundColor: '#fff',
          width: '94%',
          borderRadius: 10,

        }}>
          <TouchableOpacity style={{ justifyContent: 'center', position: 'absolute', height: 55, left: 1 }}>
            <Image source={require('../../../assets/images/dating-location-image.png')} style={{ width: 12, height: 15 }}></Image>
          </TouchableOpacity>
          <View style={{ width: '92%', justifyContent: 'center', alignItems: 'center', }}>
            <GooglePlacesAutocomplete
              // placeholder={addre.substring(0, 45)}
              placeholder={'Noida, Uttar Pradesh, India'}
              textInputProps={{
                placeholderTextColor: '#000',
                top: Platform.OS == 'ios' ? 15 : 0,
                // width: '95%',
                // placeholderTextColor: Colors.BLACK,
                returnKeyType: 'search',
                // onFocus: () => setShowPlacesList(true),
                // onBlur: () => setShowPlacesList(false),
                multiline: true,
                numberOfLines: 3,
                // onTouchStart: ()=>{downButtonHandler()}
                height: 50,
                color: '#000'
              }}
              renderRow={rowData => {
                return (
                  <View>
                    {renderDescription(rowData)}
                  </View>
                )
              }}
              enablePoweredByContainer={false}
              listViewDisplayed={'auto'}
              styles={{
                textInputContainer: {
                  width: '100%',
                  marginLeft: 0,
                  // backgroundColor: 'grey',
                },
                description: {
                  color: '#000',
                  width: '74%',
                  // fontWeight: '300'
                },
                poweredContainer: {
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderColor: '#C8C7CC',
                  borderTopWidth: 0.5,
                  color: '#000'
                },
                powered: {},
                listView: {
                  // color:'#000'
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  // borderRadius:10,
                  overflow: 'hidden',
                  paddingBottom: 10,
                  padding: 3
                },
                row: {
                  // backgroundColor: '#FFFFFF',
                  paddingVertical: 10,
                  height: 50,
                  flexDirection: 'row',
                },
                separator: {
                  height: 0.5,
                  backgroundColor: '#C8C7CC',
                  color: '#000',
                  marginTop: 10
                },
                textInput: {
                  backgroundColor: 'transparent',
                  height: 40,
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: '#000',
                  flex: 1,
                  // paddingHorizontal: 5,
                },
              }}
              onPress={(data, details = null) => {
                console.log(data, details);
                // 'details' is provided when fetchDetails = true
                // setShowPlacesList(false)
                homePage(details.geometry.location.lat, details.geometry.location.lng)
                // dispatch(setRestorentLocation({
                //   latitude: details.geometry.location.lat,
                //   longitude: details.geometry.location.lng,
                // }))

                setGoogleLatLng({
                  lat: details.geometry.location.lat,
                  lng: details.geometry.location.lng,
                });
                setGoogleAddress(data?.description);
              }}
              GooglePlacesDetailsQuery={{
                fields: 'geometry',
              }}
              fetchDetails={true}
              // currentLocation={true}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
              }}
            />
          </View>
          <View style={{
            height: 55, position: 'absolute', right: -10,
            // borderTopRightRadius: 10,
            // borderBottomRightRadius: 10,
            // marginHorizontal: 8, top: 0,
            // backgroundColor: '#ADC430',
            paddingVertical: 5,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            // width: 40,
            // borderTopRightRadius: 10, borderBottomRightRadius: 10
          }}>
            <TouchableOpacity onPress={() => { setShowFilterModal(true)}}>
              <Image source={require('../../../assets/images/dating-filter-image.png')} style={{ width: 25, height: 25 }}></Image>
            </TouchableOpacity>
          </View>
        </View>
  <View style={{borderBottomColor: '#ffb0ba', borderBottomWidth: StyleSheet.hairlineWidth, marginTop:10}}/>  
  {/* <HomeHeader height={40}  paddingHorizontal={0}
   press1={()=>{}} img1={require('../../../assets/images/dating-location-image.png')} img1width={11} img1height={15} 
   press2={()=>{}} title2={'New Yark USA'} fontWeight={'500'} img2height={20} right={dimensions.SCREEN_WIDTH*26/100} fontSize={10} color={'#e1194d'}
   press3={()=>{}} img3={require('../../../assets/images/dating-filter-image.png')} img3width={25} img3height={25} />  
  <View style={{borderBottomColor: '#ffb0ba', borderBottomWidth: StyleSheet.hairlineWidth}}/>
  <View style={{height:30}}/>   */}
  <View style={{ }}>
  <AppIntroSlider
    data={introSliderData}
    renderItem={_renderItem}
    renderPagination={() => null}
    renderDoneButton={()=><View />}
    renderNextButton={()=><View />}
    keyExtractor={(item) => item.id}
  />
  </View>
  {/* <ImageSlider 
    data={[
        {img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU'},
        {img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg'},
        {img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg'}
    ]}
    caroselImageContainerStyle={{borderRadius: 20,  overflow: 'hidden'}}
   showIndicator={false}
      closeIconColor="#fff"
  /> */}
  <View style={styles.buttonsRow}>
    <TouchableOpacity onPress={()=>{onReject(1)}} style={styles.buttonViewOne}>
      <Image source={require('../../../assets/images/dating-reject-image.png')} style={{width:20, height:20,}} resizeMode='contain'/>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{onLove(1)}} style={styles.buttonViewTwo}>
      <Image source={require('../../../assets/images/dating-love-image.png')} style={{width:40, height:40,}} resizeMode='contain'/>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{onRefresh(1)}} style={styles.buttonViewOne}>
      <Image source={require('../../../assets/images/dating-refresh-image.png')} style={{width:20, height:20,}} resizeMode='contain'/>
    </TouchableOpacity>
  </View>
  <Text style={{fontSize:15, color:'#31313f', fontWeight:'bold', textAlign:'center', top:-20}}>Mary Burgees</Text>
  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', top:-10}}>
    <Text style={{fontSize:10, color:'#e10f51'}}>@marry</Text>
    <View style={{height: '100%',width: 1,backgroundColor: '#4a4c52', marginHorizontal:20}}></View>
    <Text style={{fontSize:10, color:'#e1e1e1'}}>Age 23</Text>
    <View style={{height: '100%',width: 1,backgroundColor: '#4a4c52', marginHorizontal:20}}></View>
    <Text style={{fontSize:10, color:'#e1e1e1'}}>5 miles away</Text>
  </View>  
  {/* {SliderData.length > 0 ? <Carousel data={SliderData} onReject={onReject} onLove={onLove} onRefresh={onRefresh} /> : null}   */}

 </View>
<View style={{height:100}} />

</ScrollView>
<Modal
        isVisible={showChooseMilesModal}
        swipeDirection="down"
        onBackdropPress={()=>setShowChooseMilesModal(false)}
        onSwipeComplete={(e) => {
          setShowChooseMilesModal(false)
        }}
          scrollTo={() => {}}
          scrollOffset={1}
          propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View style={{ height: '50%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
          <View style={{alignItems:'center'}}>
            <Text style={{color:Mycolors.Black,fontWeight:'500', marginBottom:30, marginTop:10}}>Choose Miles</Text>
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
                  borderColor:'#ED1C24',
                  borderWidth:1
                },
                android: {
                  height: 30,
                  width: 30,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                  borderColor:'#ED1C24',
                  borderWidth:1
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
            selectedStyle={{backgroundColor: '#ED1C24'}}
            trackStyle={{
              height:5
            }}
            touchDimensions={{
              height: 40,
              width: 40,
              borderRadius: 20,
              slipDisplacement: 40
            }}
            />
            <View style={{flexDirection:'row', alignItems:'center', width:'95%',
                  height:60,
                  paddingHorizontal:20,
                  backgroundColor:'#fff',
                  alignSelf:'center',
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                  shadowOffset: {
                    width: 0,
                    height: 3
                  },
                  shadowRadius: 1,
                  shadowOpacity: 0.1,
                  // overflow: 'hidden',
                  elevation: 5,
                  marginTop:30,
                  marginBottom:30,}}>
            <TextInput
                ref={myTextInput}
                value={String(multiSliderValue[0])}
                onChangeText={(e) => {
                  const value = e.replace(/[^0-9]/g, '')
                  if(Number(value) > 100){
                  // Toast.show('Miles cannot be more than 100', Toast.SHORT)
                  }else if(Number(value) < 0){
                   // Toast.show('Miles cannot be less than 0', Toast.SHORT)
                  } else{
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
                autoCapitalize = 'none'
                style={{
                  color:'#263238',
                  fontSize:12,
                  fontWeight:'500'
                }}
                keyboardType='numeric'
              />
              <Text onPress={()=>{myTextInput.current.focus()}} style={{color:'#263238', fontSize:12, fontWeight:'500'}}> miles</Text>
              </View>
            {/* <Text style={{color:Mycolors.GrayColor,fontWeight:'600',fontSize:12,marginTop:9}} >{multiSliderValue[0]} miles</Text> */}
          </View>
        
          <View style={{width:'95%',alignSelf:'center'}}>
          <MyButtons title="Save" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={()=>{props.navigation.navigate('ShopPayment')}} marginHorizontal={20} fontSize={11}
          titlecolor={Mycolors.BG_COLOR} backgroundColor={'#FFD037'} marginVertical={0} />
          </View>

            {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>
           
            </View>
</Modal>

<Modal
        isVisible={showFilterModal}
        swipeDirection="down"
        onBackdropPress={()=>setShowFilterModal(false)}
        onSwipeComplete={(e) => {
          setShowFilterModal(false)
        }}
          scrollTo={() => {}}
          scrollOffset={1}
          propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View style={{ height: '70%', backgroundColor: '#fff5f7', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
          {/* <View style={{alignItems:'center'}}> */}
          <View style={{width:'90%',alignSelf:'center', marginTop:10, marginBottom:40}}>
          
            <View style={{flexDirection:'row', alignItems:'center',}}>
            <TouchableOpacity onPress={()=>{setShowFilterModal(false)}} style={{flex:1}}>
              <Image source={require('../../../assets/images/dating-back-arrow.png')} style={{width:25, height:15}} resizeMode='contain'/>
            </TouchableOpacity>
            <View style={{flex:3, flexDirection:'row', justifyContent:'center'}}>
                <Text style={{fontSize:12.5, fontWeight:'600', color:'#31313f'}}>Filters</Text>
            </View>
            <View style={{flex:1}}/>
          </View>

            <View style={{height:20}}/>
            <Text style={{fontSize:11.3, fontWeight:'bold', color:'#8F93A0'}}>Location</Text>
            <View style={styles.addCommentView}>
            <TextInput
              value={'California'}
              onChangeText={(text) => {
                (text)
              }}
              placeholder=""
              placeholderTextColor={'#B2B7B9'}
              style={styles.input}
              multiline
            />
              <View style={{flex:1, alignItems:'flex-end'}}>
                <Image source={require('../../../assets/images/dating-modal-location-icon.png')}/>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: '#DBDBDB',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text style={{fontSize:11.3, fontWeight:'bold', color:'#3e5869', marginTop:20}}>I'm intersted in</Text>
            <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
              <TouchableOpacity onPress={()=>onChangeInterested(0)} style={interstedInValue === 0 ? styles.interestedView1 : styles.interestedView2}>
                <Text style={interstedInValue === 0 ? styles.interestedText1 : styles.interestedText2}>
                  Boys
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>onChangeInterested(1)} style={interstedInValue === 1 ? styles.interestedView1 : styles.interestedView2}>
                <Text style={interstedInValue === 1 ? styles.interestedText1 : styles.interestedText2}>
                  Girls
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>onChangeInterested(2)} style={interstedInValue === 2 ? styles.interestedView1 : styles.interestedView2}>
                <Text style={interstedInValue === 2 ? styles.interestedText1 : styles.interestedText2}>
                  Both
                </Text>
              </TouchableOpacity>
            </View>
            
            <Text style={{fontSize:11.3, fontWeight:'bold', color:'#3e5869', marginTop:10}}>Filter by</Text>
            <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
              <TouchableOpacity onPress={()=>onChangeFilterByStatus(0)} style={filterByStatus === 0 ? styles.interestedView1 : styles.interestedView2}>
                <Text style={filterByStatus === 0 ? styles.interestedText1 : styles.interestedText2}>
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>onChangeFilterByStatus(1)} style={filterByStatus === 1 ? styles.interestedView1 : styles.interestedView2}>
                <Text style={filterByStatus === 1 ? styles.interestedText1 : styles.interestedText2}>
                  Online
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>onChangeFilterByStatus(2)} style={filterByStatus === 2 ? styles.interestedView1 : styles.interestedView2}>
                <Text style={filterByStatus === 2 ? styles.interestedText1 : styles.interestedText2}>
                  New
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:10, marginTop:15}}>
            <Text style={{fontSize:11.3, fontWeight:'bold', color:'#3e5869'}}>Age range</Text>
            <Text style={{fontSize:11.3, fontWeight:'bold', color:'#ff3b7f'}}>{`${ageRangeSliderValue[0]}-${ageRangeSliderValue[1]}`}</Text>
          </View>
            <MultiSlider
            values={[ageRangeSliderValue[0], ageRangeSliderValue[1]]}
            // values={[multiSliderValue[0]]}
            sliderLength={320}
            onValuesChange={ageRangeSliderValuesChange}
            min={18}
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
                  borderColor:'#f23476',
                  borderWidth:1
                },
                android: {
                  height: 30,
                  width: 30,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                  borderColor:'#f23476',
                  borderWidth:1
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
            selectedStyle={{backgroundColor: '#f23476'}}
            unselectedStyle={{backgroundColor: '#FFCEBF'}}
            trackStyle={{
              height:5
            }}
            touchDimensions={{
              height: 40,
              width: 40,
              borderRadius: 20,
              slipDisplacement: 40
            }}
            />
            

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:10, marginTop:15}}>
            <Text style={{fontSize:11.3, fontWeight:'bold', color:'#3e5869'}}>Distance</Text>
            <Text style={{fontSize:11.3, fontWeight:'bold', color:'#ff3b7f'}}>{distanceSliderValue[0]}</Text>
          </View>
            <MultiSlider
            // values={[ageRangeSliderValue[0], ageRangeSliderValue[1]]}
            values={[distanceSliderValue[0]]}
            sliderLength={320}
            onValuesChange={distanceSliderValuesChange}
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
                  borderColor:'#f23476',
                  borderWidth:1
                },
                android: {
                  height: 30,
                  width: 30,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                  borderColor:'#f23476',
                  borderWidth:1
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
            selectedStyle={{backgroundColor: '#f23476'}}
            unselectedStyle={{backgroundColor: '#FFCEBF'}}
            trackStyle={{
              height:5
            }}
            touchDimensions={{
              height: 40,
              width: 40,
              borderRadius: 20,
              slipDisplacement: 40
            }}
            />
            
            {/* <Text style={{color:Mycolors.GrayColor,fontWeight:'600',fontSize:12,marginTop:9}} >{multiSliderValue[0]} miles</Text> */}
          </View>
        
          <View style={{width:'95%',alignSelf:'center'}}>
          <TouchableOpacity style={styles.applyButtonStyle}>
            <Text style={{fontSize:11.3, fontWeight:'bold', color:'#fff',}}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop:20, marginBottom:50}}>
            <Text style={{fontSize:11.3, fontWeight:'bold', color:'#3e5869', alignSelf:'center'}}>Reset</Text>
          </TouchableOpacity>
          </View>

            {/* <View style={{width:100,height:100}} /> */}
            </ScrollView>
           
            </View>
</Modal>
    </SafeAreaView>
     );
  }
const styles = StyleSheet.create({
 
  createPostView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    height:50,
  },
  createPostLeftSubView:{
    width:'83%',
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fff',
    paddingVertical:5, 
    paddingLeft:10, 
    borderRadius:10,
  },
  createPostText:{
    color:'#B2B7B9',
    fontSize:14,
    fontWeight:'300',
    marginLeft:10
  },
  flatlistMainView:{
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between', 
    backgroundColor:'#fff', 
    paddingHorizontal:15, 
    paddingVertical:10, 
    width:'90%', 
    borderTopLeftRadius:20, 
    borderTopRightRadius:20, 
  },
  rightButtonsView: {
    backgroundColor:'#F8F8F8',
    padding:10,
    borderRadius:20
  },
  followingImageView:{
    flexDirection:'row', 
    alignItems:'center'
  },
  followingView:{
    justifyContent:'center',
    marginLeft:10
  },
  flatlistMainBottomView:{
    backgroundColor:'#fff', 
    paddingVertical:15, 
    paddingHorizontal:20, 
    width:'90%', 
    borderBottomRightRadius:20, 
    borderBottomLeftRadius:20
  },
  flatlistBottomView:{
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between', 
  },
  text1:{
    fontSize:12, 
    fontWeight:'400', 
    color:'#455A64'
  },
  interestedView1:{
    backgroundColor:'#FF4989',
    width:'33%',
    height:50,
    alignItems:'center',
    justifyContent:'center',
    shadowColor:'#0089CF',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
    elevation: 2
  },
  interestedView2:{
    backgroundColor:'#fff',
    width:'33%',
    height:50,
    alignItems:'center',
    justifyContent:'center'
  },
  interestedText1:{
    color:'#FFFFFF',
    fontSize:11.3,
    fontWeight:'400'
  },
  interestedText2:{
    color:'#8F93A0',
    fontSize:11.3,
    fontWeight:'400'
  },
  applyButtonStyle:{
    width:'100%',
    height:50, 
    borderRadius:5, 
    alignSelf:'center', 
    backgroundColor:'#FF4989', 
    justifyContent:'center', 
    alignItems:'center',
    shadowColor: '#00EE57',
    shadowOffset: {width: 0,height: 3},
    shadowRadius: 1,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  addCommentView:{
    // position:'absolute', 
    // bottom:20,
    width:'100%', 
    // backgroundColor:'#fff0f0', 
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
    // paddingLeft: 20,
    fontSize: 11.3,
    fontWeight:'bold',
    color:'#3e5869',
    flex: 7,
    // textDecorationLine: 'underline'
  },
  sendButtonView:{
    // backgroundColor:'#fee3e3', 
    paddingHorizontal:30, 
    paddingVertical:10, 
    borderRadius:20,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  cameraButtonView:{
    paddingHorizontal:20, 
    paddingVertical:10, 
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  topButtonView:{
    justifyContent:'center',
    alignItems:'center',  
    backgroundColor:'#fff',
    borderRadius:20,
    paddingHorizontal:15,
    paddingVertical:10,
    shadowColor: '#0089CF',
    shadowOffset: {width: 0,height: 3},
    shadowRadius: 1,
    shadowOpacity: 0.1,
    elevation: 5,
  },
  
  buttonsRow:{
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'center',
    top:-40
  },
  slide:{
    width:'100%',
    height:300,
  },
  buttonViewOne:{
    backgroundColor:'#fff',
    width:70, 
    height:70,
    borderRadius:90/2, 
    justifyContent:'center', 
    alignItems:'center',
    shadowColor: '#000000',
    shadowOffset: {width: 0,height: 3},
    shadowRadius: 1,
    shadowOpacity: 0.07,
    elevation: 1,
  },
  buttonViewTwo:{
    backgroundColor:'#FFF',
    width:80, 
    height:80,
    borderRadius:90/2, 
    justifyContent:'center', 
    alignItems:'center', 
    marginHorizontal:15,
    shadowColor: '#E94057',
    shadowOffset: {width: 0,height: 3},
    shadowRadius: 1,
    shadowOpacity: 0.2,
    elevation: 4,
  }
});
export default PeopleHome 