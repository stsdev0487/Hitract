import { Dimensions, Platform, StatusBar } from "react-native";
//import DeviceInfo from "react-native-device-info";
//
//const isIPhoneX =
//  Platform.OS === "ios" &&
//  DeviceInfo &&
//  DeviceInfo.getModel().includes("iPhone X");

const STATUS_BAR_HEIGHT = Platform.select({
  //ios: isIPhoneX ? 44 : 20,
  ios:44,
  android: StatusBar.currentHeight,
  default: 0
});

export default {
  ...Dimensions.get("window"),
  STATUS_BAR_HEIGHT
};
