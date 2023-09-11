import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, XMarkIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import MovieList from "../components/movieList";
import SearchItem from "../components/searchItem";
import Loading from "../components/loading";
import { debounce } from 'lodash'
import { searchMovies } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
export default function SearchScreen() {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState([
    { movieName: "Oppenheimer", yearOfRelease: "2023" },
  ]);
  const handleSearch = (value)=>{
    if(value && value.length>2){
      setLoading(true)
      searchMovies({
        query:value, include_adults:'false',language:'en-US',page:'1'
      }).then(data=>{
        setLoading(false)
        console.log("data",data);
        if(data && data.results) setSearchResult(data.results);
      })
    }
  }
  const handleDebounce = useCallback(debounce(handleSearch,400),[]);
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full mt-4">
        <TextInput
        onChangeText={handleDebounce}
          placeholder="Search Movies"
          placeholderTextColor={"lightgray"}
          className="py-2 px-4 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          className="rounded-full p-1 m-4 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      {
        isLoading ? (
          <Loading />
        ) : searchResult.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            className="space-y-3"
          >
            {searchResult &&
              searchResult.map((item, index) => (
                <SearchItem movie={item} navigation={navigation}/>
              ))}
          </ScrollView>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-3xl text-white">No Result Found!</Text>
          </View>
      )}
    </SafeAreaView>
  );
}
