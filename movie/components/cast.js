import { ScrollView, Text, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { fallbackPersonImage, image185 } from "../api/moviedb";

export default function Cast({ navigation, cast }) {
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity onPress={()=>navigation.navigate('Person',person)} key={index} className="mr-4 item-center">
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border-neutral-500">
                  <Image
                    className="rounded-2xl h-24 w-20"
                    source={{uri:image185(person?.profile_path)||fallbackPersonImage}}
                    // source={require("../assets/licensed-image.jpeg")}
                  />
                </View>
                <Text className="text-white text-xs mt-1">
                  {person?.character > 10
                    ? person?.character.slice(0, 10) + "..."
                    : person?.character}
                </Text>
                <Text className="text-white text-xs mt-1">
                  {person?.original_name > 10
                    ? person?.original_name.slice(0, 10) + "..."
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
