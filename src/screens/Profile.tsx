import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { UserPhoto } from "@components/UserPhoto";
import * as ImagePicker from "expo-image-picker";

import {
  Center,
  Heading,
  Text,
  VStack,
  Skeleton,
  ScrollView,
  useToast,
  Image,
} from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import BackgroundImg from "@assets/avengersLogo.png";

const PHOTO_SIZE = 33;

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

export function Profile() {
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
  
  return (
    <VStack flex={1} bg="gray.700">
      <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        position="absolute"
      />
      <ScrollView>
        <Center mt={10} px={10}>
          {isLoadingPhoto ? (
            <Skeleton
              width={PHOTO_SIZE}
              height={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={defaultUserPhotoImg}
              alt="foto do usuario"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Input bg="gray.600" placeholder="Patrick França" />
          <Input bg="gray.600" placeholder="Patrick@gmail.com" />
        </Center>
        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2} fontFamily="heading">
            Alterar senha
          </Heading>
          <Input bg="gray.600" placeholder="Senha antiga" />
          <Input bg="gray.600" placeholder="Nova senha" />

          <Button title="Atualizar" />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
