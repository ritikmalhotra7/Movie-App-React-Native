import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    Dimensions,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
import { fallbackMoviePoster, image185 } from "../api/moviedb";
  
  var { width, height } = Dimensions.get("window");
  
  export default function SearchItem({movie,navigation}) {
    {console.log("movie-data",movie?.id)}
    return(
        <View className="flex-row justify-between items-center m-1 p-2 border border-neutral-700 border rounded-full">
            <TouchableOpacity onPress={()=>navigation.push('Movie',movie)}>
            <View className="flex-row items-center">
                <Image className="w-8 h-8 rounded-full border " 
                // source={require('../assets/Oppenheimer-Movie-Poster-Universal-Publicity-EMBED-2022-.webp')}/>
                source={{uri:image185(movie?.poster_path)||fallbackMoviePoster}}
                />
                <Text className="text-neutral-200 text-xl px-2">{movie?.title?.length>20?movie?.title?.slice(0,20)+"...":movie.title}</Text>
            </View>
            </TouchableOpacity>
            <Text className="text-neutral-400 border-l-2 border-neutral-400 px-2">{movie?.release_date}</Text>
        </View>
    )
  }