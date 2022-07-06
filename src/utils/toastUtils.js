/* eslint-disable no-unused-expressions */
import Toast from "react-native-root-toast";
import { THEME } from "../styles/theme.style";

export const toast = (
  message,
  duration = 1000,
  position = -125
) => {
  message &&
    Toast.show(message, {
      position,
      duration,
    });
};

export const toastSuccess = (
  message,
  duration = 1000,
  position = -125
) => {
  message &&
    Toast.show(message, {
      position,
      duration,
      backgroundColor: '#dcf8e7',
      textColor: '#7bbc98',
      opacity: 1,
      shadow: false
    });
};

export const toastInfos = (
  message,
  duration = 1000,
  position = -125
) => {
  message &&
    Toast.show(message, {
      position,
      duration,
      backgroundColor: '#edf1f6',
      textColor: '#7a7c82',
      opacity: 1,
      shadow: false
    });
};

export const toastWarning = (
  message,
  duration = 1000,
  position = -125
) => {
  message &&
    Toast.show(message, {
      position,
      duration,
      backgroundColor: '#fef7e1',
      textColor: '#e4d095'
    });
};

export const toastError = (
  message,
  duration = 1000,
  position = -125
) => {
  message &&
    Toast.show(message, {
      position,
      duration,
      backgroundColor: '#fce4e4',
      textColor: '#d79090',
      opacity: 1,
      shadow: false
    });
};

export const generateToast = (message, messageCode = 2) => {
  switch (messageCode) {
    case 0:
      toastError(message);
      break;
    case 1:
      toastWarning(message);
      break;
    default:
      toastSuccess(message);
      break;
  }
};
