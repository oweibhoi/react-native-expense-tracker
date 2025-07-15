import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_KEY = "AIzaSyC4Vdv8v6TBK57KabwM_LSuve9P1GXip4c";

export async function authenticate(mode, email, password) {
  const URL = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(URL, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  const refreshToken = response.data.refreshToken;
  const expiresAt = response.data.expiresIn;

  await AsyncStorage.multiSet([
    ["authToken", token],
    ["refreshToken", refreshToken],
    ["expiresAt", expiresAt.toString()],
  ]);

  return {
    token: token,
    refreshToken: refreshToken,
    expiresAt: expiresAt,
  };
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

export async function refreshToken() {
    
    const response = await axios.post(URL, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
}
