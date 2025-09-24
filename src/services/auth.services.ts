import { accessAuthKey } from "@/constants/authKey";
import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";
import { JwtPayload } from "jwt-decode";

// store user info into local storage
export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(accessAuthKey, accessToken);
};

// get user info from local storage
export const getUserInfo = () => {
  const authToken = getFromLocalStorage(accessAuthKey);

  if (authToken) {
    const decodedData: JwtPayload = decodedToken(authToken);
    return decodedData;
  }
};

// remove user
export const removeUser = () => {
  return removeFromLocalStorage(accessAuthKey);
};
