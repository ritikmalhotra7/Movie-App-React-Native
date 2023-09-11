import { View, Text, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { theme } from "../theme";
const { width, height } = Dimensions.get("window");
export default function Loading() {
  return (
    <View
      style={{height:height, width}}
      className="absolute flex-row justify-center items-center"
    >
      <Progress.Bar
        thickness={8}
        size={100}
        color={'white'}
      />
    </View>
  );
}
