import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
export default function PersonScreen() {
  const { params: item } = useRoute();
  const [isFav, toggleIsFav] = useState(false);
  const navigation = useNavigation();
  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5, 6]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log(item);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    console.log("got person details");
    setLoading(false);
    if (data) {
      setPerson(data);
    }
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    console.log("got person movies");
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center px-4 mt-4"
        }
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1"
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleIsFav(!isFav)}>
          <HeartIcon size="35" color={isFav ? theme.background : "white"} />
        </TouchableOpacity>
      </SafeAreaView>
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center mt-4 shadow-md ring-2"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
              <Image
                // source={require("../assets/licensed-image.jpeg")}
                source={{uri:image342(person?.profile_path)||fallbackPersonImage}}
                style={{ height: height * 0.33, width: width * 0.74 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {person?.name}
            </Text>
            <Text className="text-base text-neutral-500 font-bold text-center">
              {person?.place_of_birth}
            </Text>
          </View>
          <View className="rounded-full mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700">
            <View className="border-r-2 border-r-neutral-400 px-3 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">{person?.gender==1? 'Female':'Male'}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-3 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">{person?.birthday}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-3 items-center">
              <Text className="text-white font-semibold">Known For</Text>
              <Text className="text-neutral-300 text-sm">{person?.known_for_department}</Text>
            </View>
            <View className="px-3 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">{person?.popularity?.toFixed(2)} %</Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-white text-neutral-400 tracking-wide">{person?.biography||'N/A'}</Text>
          </View>
          <MovieList data={personMovies} title={"Movies"} hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
}
