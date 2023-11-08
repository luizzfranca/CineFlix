import {
  FlatList,
  HStack,
  Heading,
  VStack,
  Text,
  useToast,
  Image,
  Center,
  Box,
  ScrollView,
} from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { api } from "@services/apit";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";
import BackgroundImg from "@assets/avengersLogo.png";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";

import w1 from "@assets/w1.png";
import w2 from "@assets/w2.png";
import w3 from "@assets/w3.png";
import w4 from "@assets/w4.png";
import w5 from "@assets/w5.png";
import w6 from "@assets/w6.png";
import w7 from "@assets/w7.png";
import w8 from "@assets/w8.png";
import w9 from "@assets/w9.png";
import w10 from "@assets/w10.png";
import w11 from "@assets/w11.png";
import w12 from "@assets/w12.png";
import w16 from "@assets/w16.png";
import { HomeHeader } from "@components/HomeHeader";
import { useAuth } from "@hooks/useAuth";

export function Home() {
  const [movies, setMovies] = useState([
    w1,
    w2,
    w3,
    w4,
    w5,
    w6,
    w7,
    w8,
    w9,
    w10,
    w11,
    w12,
    w16,
  ]);
  const [moviesList, setMoviesList] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [upcomingMovies, setUpComingMovies] = useState([]);

  
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const getMovieList = async () => {
    try {
      await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=27fe8a23ddf7ee495c63cfeecb9b1151"
      )
        .then((response) => response.json())
        .then((data) => setMoviesList(data.results));
    } catch (error) {
      console.log(error);
    }
  };

  const getTopMovies = async () => {
    const apiKey = "27fe8a23ddf7ee495c63cfeecb9b1151";
    try {
      await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => setTopMovies(data.results));
    } catch (error) {
      console.log(error);
    }
  };

  const getUpComingMovies = async () => {
    const apiKey = "27fe8a23ddf7ee495c63cfeecb9b1151";
    try {
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => setUpComingMovies(data.results));
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    getMovieList();
  }, []);

  useEffect(() => {
    getTopMovies();
  }, []);

  useEffect(() => {
    getUpComingMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: currentIndex,
        });
      }
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <VStack flex={1} bg="gray.700">
      <HomeHeader />
      <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        position="absolute"
      />
      <ScrollView>
        <Box mb={10} h={270}>
          <FlatList
            ref={flatListRef}
            data={movies}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }: any) => (
              <Box rounded={5} w={420}>
                <Image
                  source={item}
                  alt="Pessoas treinando"
                  resizeMode="cover"
                  h={260}
                />
              </Box>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Box>

        <Box>
          <Heading
            ml={2}
            color="gray.100"
            fontSize="2xl"
            fontFamily="heading"
            mb={2}
          >
            Filmes
          </Heading>

          <FlatList
            data={moviesList}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }: any) => (
              <Box rounded={5}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  alt="Pessoas treinando"
                  resizeMode="contain"
                  h={250}
                  w={180}
                />
              </Box>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Box>

        <Box mt={10}>
          <Heading
            top={44}
            ml={2}
            color="gray.100"
            fontSize="2xl"
            fontFamily="heading"
          >
            Top Filmes
          </Heading>

          <Box>
            <FlatList
              data={topMovies}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }: any) => (
                <Box  mr={4}>
                  <VStack alignItems="center">
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
                      }}
                      alt="Pessoas treinando"
                      resizeMode="contain"
                      h={250}
                      w={270}
                      
                    />
                    <Text
                      color="gray.100"
                      fontSize="sm"
                      fontFamily="body"
                      bottom={10}
                    >
                      {item.original_title}
                    </Text>
                  </VStack>
                </Box>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </Box>
        </Box>
        <Box mt={10}>
          <Heading
            top={44}
            ml={2}
            color="gray.100"
            fontSize="2xl"
            fontFamily="heading"
          >
            Em Breve
          </Heading>

          <Box>
            <FlatList
              data={upcomingMovies}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }: any) => (
                <Box rounded={5} mr={4}>
                  <VStack alignItems="center">
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
                      }}
                      alt="Pessoas treinando"
                      resizeMode="contain"
                      h={250}
                      w={270}
                    />
                    <Text
                      color="gray.100"
                      fontSize="sm"
                      fontFamily="body"
                      bottom={10}
                    >
                      {item.original_title}
                    </Text>
                  </VStack>
                </Box>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </Box>
        </Box>
      </ScrollView>
    </VStack>
  );
}
