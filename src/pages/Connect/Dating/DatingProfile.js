import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Keyboard,
  RefreshControl
} from "react-native";
import HomeHeaderRoundBottom from "../../../component/HomeHeaderRoundBottom";
import SearchInput2 from "../../../component/SearchInput2";
import SearchInputEnt from "../../../component/SearchInputEnt";
import SerchInput from "../../../component/SerchInput";
import { dimensions, Mycolors } from "../../../utility/Mycolors";
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from "../../../component/MyButtons";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Modal from "react-native-modal";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyAlert from "../../../component/MyAlert";
import Loader from "../../../WebApi/Loader";
import LinearGradient from "react-native-linear-gradient";
import {
  baseUrl,
  login,
  shop_eat_business,
  requestPostApi,
  requestGetApi,
  connect_dating_profile,
} from "../../../WebApi/Service";
import { useSelector, useDispatch } from "react-redux";
import {
  saveUserResult,
  saveUserToken,
  setVenderDetail,
  onLogoutUser,
  setUserType,
} from "../../../redux/actions/user_action";

const image1 = require("../../../assets/images/people-following-person.png");
const onlinePersonImageWidth = 50;
const onlineDotWidth = 12;

const DatingProfile = (props) => {
  const User = useSelector((state) => state.user.user_details);
  const [loading, setLoading] = useState(false);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState("");
  const [My_Alert2, setMy_Alert2] = useState(false)
  const [alert_sms2, setalert_sms2] = useState('')
  const [searchValue, setsearchValue] = useState("");
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const myTextInput = useRef();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100]);
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false);
  const [profiledata, setProfileData] = useState("");
  const [upData, setupData] = useState([
    {
      id: "1",
      name: "Chetan Manne",
      isOnline: true,
      message: "Reference site about lorem...",
      img: require("../../../assets/images/dating-message-image.png"),
    },
    {
      id: "1",
      name: "Chetan Manne",
      isOnline: false,
      message: "Reference site about lorem...",
      img: require("../../../assets/images/dating-message-image.png"),
    },
    {
      id: "1",
      name: "Chetan Manne",
      isOnline: true,
      message: "Reference site about lorem...",
      img: require("../../../assets/images/dating-message-image.png"),
    },
    {
      id: "1",
      name: "Chetan Manne",
      isOnline: false,
      message: "Reference site about lorem...",
      img: require("../../../assets/images/dating-message-image.png"),
    },
  ]);
  useEffect(() => {
    ProfilePage();
  }, []);

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

  const logoutDriver = async () => {
    AsyncStorage.clear();
    dispatch(onLogoutUser())
  }
  const ProfilePage = async () => {
    console.log("the res==>>ProfilePage");
    setLoading(true);

    const { responseJson, err } = await requestGetApi(
      connect_dating_profile ,
      "",
      "GET",
      User.token
    );
    setLoading(false);
    console.log("the res==>>ProfilePage", responseJson);
    if (responseJson.headers.success == 1) {
      console.log("the res==>>ProfilePage", responseJson.body);
      setProfileData(responseJson.body);
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ flex: 1 }}>
      <LinearGradient
        colors={["#FD869F", "rgba(255, 255, 255, 0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.7, 0.9]}
        style={{ flex: 1, height: dimensions.SCREEN_HEIGHT }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 55,
            padding: 10,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
        >
          <View style={{ flex: 1 }}></View>
          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{ flex: 1 }}
          >
            <Image
              source={require("../../../assets/images/dating-back-arrow.png")}
              style={{ width: 25, height: 15 }}
              resizeMode="contain"
            />
          </TouchableOpacity> */}
          <View
            style={{ flex: 3, flexDirection: "row", justifyContent: "center" }}
          >
            <Text
              style={{ fontSize: 12.5, fontWeight: "600", color: "#31313f" }}
            >
              Edit Profile
            </Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}

          />
        }
        >
          <View style={{ width: "90%", alignSelf: "center" }}>
            {/* <View style={styles.topContainer}> */}
            <View
              style={{
                width: "100%",
                backgroundColor: "#ff3b7f",
                marginTop: 80,
              }}
            >
              <ImageBackground
                source={require("../../../assets/images/dating-edit-profile-top-image.png")}
                style={{ width: "100%", height: 220 }}
              ><TouchableOpacity onPress={()=>{props.navigation.navigate('DatingMoreInfo')}} >
                  <Image 
                    source={{uri:`${profiledata?.profile_image != null ? profiledata?.profile_image : 'data:image/jpeg;base64,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' }`}}
                    style={styles.profilePictureStyle}
                  />
                </TouchableOpacity>
                <View style={styles.contactUsContainer}>
                  <View style={styles.contactUsSubContainer}>
                    <View style={styles.contactImageView}>
                      <Image
                        source={require("../../../assets/images/dating-email-icon.png")}
                        style={styles.contactImage}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={{ marginLeft: 10, width: 100 }}>
                      <Text style={styles.contactText}>Email</Text>
                      <Text numberOfLines={2} style={styles.contactValue}>{profiledata?.emailid}</Text>
                    </View>
                  </View>

                  <View style={styles.contactUsSubContainer}>
                    <View style={styles.contactImageView}>
                      <Image
                        source={require("../../../assets/images/dating-phone-icon.png")}
                        style={styles.contactImage}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.contactText}>Phone</Text>
                      <Text style={styles.contactValue}>{profiledata?.country_code + '-' + profiledata?.phone}</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
              {/* </View> */}
              {/* dating-liked-by-image.png
dating-matched-with-image.png */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: 30,
                  height: 150,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.likeView}>
                    <Image
                      source={require("../../../assets/images/dating-liked-by-image.png")}
                      style={styles.likeImage}
                      resizeMode="contain"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "bold",
                      color: "#fff",
                      marginLeft: 10,
                    }}
                  >
                    Liked by {"\n"}{profiledata?.total_likes}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.likeView}>
                    <Image
                      source={require("../../../assets/images/dating-matched-with-image.png")}
                      style={styles.likeImage}
                      resizeMode="contain"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "bold",
                      color: "#fff",
                      marginLeft: 10,
                    }}
                  >
                    Matched with {"\n"}75%
                  </Text>
                </View>
              </View>
              {/* dating-edit-image.png
dating-logout-image.png */}
              <ImageBackground
                source={require("../../../assets/images/dating-edit-profile-bottom-image.png")}
                style={{ width: "100%", height: 250 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginHorizontal: 40,
                    top: -10,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => {
                        setalert_sms2('Are you sure want to logout?')
                        setMy_Alert2(true)
                      }}
                      style={styles.buttonView}
                    >
                      <Image
                        source={require("../../../assets/images/dating-logout-image.png")}
                        style={styles.buttonImage}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        color: "#282727",
                        marginTop: 10,
                      }}
                    >
                      Logout
                    </Text>
                  </View>

                  <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate("DatingEditProfile");
                      }}
                      style={styles.buttonView}
                    >
                      <Image
                        source={require("../../../assets/images/dating-edit-image.png")}
                        style={styles.buttonImage}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        color: "#282727",
                        marginTop: 10,
                      }}
                    >
                      Edit
                    </Text>
                  </View>
                </View>
                {/* <View style={styles.changePasswordContainer}>
                  <View style={styles.changePasswordLeftSubContainer}>
                    <View style={styles.changePasswordImageView}>
                      <Image
                        source={require("../../../assets/images/dating-change-password-image.png")}
                        style={styles.changePasswordImage}
                        resizeMode="contain"
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        color: "#4a4c52",
                        marginLeft: 10,
                      }}
                    >
                      Change Password
                    </Text>
                  </View>
                  <Image
                    source={require("../../../assets/images/dating-change-password-right-arrow.png")}
                    style={{ height: 20, width: 20 }}
                    resizeMode="contain"
                  />
                </View> */}
              </ImageBackground>
            </View>

            <View
              style={{
                width: "100%",
                alignSelf: "center",
                marginTop: 20,
                backgroundColor: "#F8F8F8",
              }}
            ></View>
          </View>
          <View style={{ height: 50 }} />
        </ScrollView>
      </LinearGradient>
      {loading ? <Loader /> : null}
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
          }}
        />
      ) : null}
      {My_Alert2 ? <MyAlert sms={alert_sms2} sms2={'Logout'} okPress={() => { logoutDriver() }} canclePress={() => { setMy_Alert2(false) }} /> : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  flatlistMainView: {
    flexDirection: "row",
    // backgroundColor:'#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  numberView: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  numberStyle: {
    fontSize: 14,
    fontWeight: "300",
    color: "#4a4c52",
  },
  searchView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  searchLeftSubView: {
    width: "83%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingLeft: 10,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 5,
  },
  input: {
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: "300",
    color: "#000",
    flex: 7,
  },
  onlinePerson: {
    width: onlinePersonImageWidth,
    height: onlinePersonImageWidth,
    borderRadius: onlinePersonImageWidth / 2,
    borderWidth: 2,
    borderColor: "#e1194d",
  },
  onlineDot: {
    backgroundColor: "#29913C",
    width: onlineDotWidth,
    height: onlineDotWidth,
    position: "absolute",
    borderRadius: onlineDotWidth / 2,
    left: onlinePersonImageWidth - 8,
    top: onlinePersonImageWidth / 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  topContainer: {
    backgroundColor: "#fff",
    // padding:10,
    borderRadius: 10,
    marginTop: 80,
  },
  contactUsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    top: -40,
    marginHorizontal: 20,
  },
  contactUsSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePictureStyle: {
    alignSelf: "center",
    height: 120,
    width: 120,
    borderRadius: 60,
    top: -(60 + 10),
    borderWidth: 7,
    borderColor: "#fff",
  },
  contactImageView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 2,
  },
  contactImage: {
    width: 30,
    height: 30,
  },
  contactText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#B2B7B9",
  },
  contactValue: {
    fontSize: 10,
    fontWeight: "500",
    color: "#4a4c52",
    fontWeight: "bold",
  },
  changePasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff0f0",
    padding: 10,
    marginHorizontal: 10,
    marginTop: 40,
    // height:120
  },
  changePasswordLeftSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  changePasswordImageView: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ff3b7f",
  },
  changePasswordImage: {
    width: 40,
    height: 40,
  },
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 2,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  likeView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  likeImage: {
    width: 20,
    height: 20,
  },
});
export default DatingProfile;
