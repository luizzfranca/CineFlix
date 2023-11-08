import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_STORAGE } from "./storageConfig";

export async function storageAuthTokenSave(token: string) {
  await AsyncStorage.setItem(AUTH_STORAGE, JSON.stringify(token));
}

export async function storageAuthTokenGet() {
  const storage = await AsyncStorage.getItem(AUTH_STORAGE);

  const token = storage ? JSON.parse(storage) : {};

  return token;
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_STORAGE);
}
