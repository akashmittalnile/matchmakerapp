import { View, Text } from "react-native";
import React from "react";

const DatingChoice = ({ type }) => {
  return (
    <View>
      <Text
        style={{
          color: type == "Like" ? "#01ff84" : "#f6006b",
          fontSize: 40,
          borderWidth: 4,
          borderColor: type == "Like" ? "#01ff84" : "#f6006b",
          padding: 10,
        }}
      >
        {type}
      </Text>
    </View>
  );
};

export default DatingChoice;
