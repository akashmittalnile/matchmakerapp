import {
  View,
  Animated,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";
import LinearGradient from "react-native-linear-gradient";
import DatingChoice from "./DatingChoice";
const { height, width } = Dimensions.get("screen");

const DatingCard = ({
  item,
  isFirst,
  heartPress = () => {},
  nopePress = () => {},
  nextPress = ()=>{},
  currentprofileopen =() =>{},
  swipe,
  ...rest
}) => {
  //variables
  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ["-8deg", "0deg", "8deg"],
    extrapolate: "clamp",
  });
  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const datingSelection = useCallback(() => {
    return (
      <>
        <Animated.View
          style={{
            backgroundColor:'yellow',
            position: "absolute",
            top: 60,
            left: 20,
            opacity: likeOpacity,
            transform: [{ rotate: "-30deg" }],
          }}
        >
          <DatingChoice type="Like" />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 60,
            right: 20,
            opacity: nopeOpacity,
            transform: [{ rotate: "30deg" }],
          }}
        >
          <DatingChoice type="Nope" />
        </Animated.View>
      </>
    );
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: width - 40,
          height: height - 250,
          alignSelf: "center",
          position: "absolute",
          backgroundColor: "#FFFFFF",
          // shadowColor: '#ffb0ba',
          // shadowOffset: {
          //   width: 0,
          //   height: 3
          // },
          // shadowRadius: 1,
          // shadowOpacity: 1,
          // elevation: 6,
          // borderColor: '#ffb0ba',
          // borderWidth:1,
          top: 20,
          borderRadius: 30,
        },
        isFirst && {
          transform: [...swipe.getTranslateTransform(), { rotate: rotate }],
        },
      ]}
      {...rest}
    >
      <TouchableOpacity style={{width: "100%",
          height: "85%",}} onPress={currentprofileopen}>
      <Image
        source={{ uri:  `${item.profile_image}` }}
        style={{
          width: "100%",
          height: "85%",
          borderRadius: 30,
        }}
      />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          marginTop: -50,
        }}
      >
        <ActionButton
          imageJsx={
            <Image
              source={require("../assets/images/dating-reject-image.png")}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          }
          onPress={nopePress}
        />
        <ActionButton
          imageJsx={
            <Image
              source={require("../assets/images/dating-love-image.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          }
          size={80}
          onPress={heartPress}
          style={{ marginHorizontal: 10 }}
        />
        <ActionButton
          imageJsx={
            <Image
              source={require("../assets/images/dating-refresh-image.png")}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          }
          onPress={nextPress}
        />
      </View>
      <View style={{top:-70}}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {item.title}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ color: "pink" }}>{item.fullname}</Text>
          <Text style={{color:'black'}}> | {item.age} | </Text>
          <Text style={{color:'black'}}>{item.intrest_in}
           {/* Mile Away */}
           </Text>
        </View>
      </View>

      {isFirst && datingSelection()}
    </Animated.View>
  );
};

export default DatingCard;

const ActionButton = ({ imageJsx, size = 50, onPress = () => {}, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        top:-70,
        height: size,
        width: size,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        ...style,
      }}
    >
      {imageJsx}
    </TouchableOpacity>
  );
};
