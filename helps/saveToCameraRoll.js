import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { requestExternalStoragePermission } from "./permission";
import Toast from "react-native-simple-toast";
import { strings } from "../locales/i18n";
// const RNFS = require('react-native-fs'); //文件处理
import RNFS from "react-native-fs";

export const saveToCameraRoll = async url => {
  try {
    if (Platform.OS !== "ios") {
      const storeLocation = `${RNFS.DocumentDirectoryPath}`;
      let pathName = new Date().getTime() + "storage.jpg";
      let downloadDest = `${storeLocation}/${pathName}`;

      const ret = RNFS.downloadFile({
        fromUrl: url,
        toFile: downloadDest
      });
      ret.promise.then(async res => {
        if (res && res.statusCode === 200) {
          const granted = await requestExternalStoragePermission();
          if (granted) {
            await CameraRoll.saveToCameraRoll("file://" + downloadDest);
            Toast.showWithGravity(
              strings("save.save_success"),
              Toast.SHORT,
              Toast.CENTER
            );
          }
        }
      });
    } else {
      await CameraRoll.saveToCameraRoll(url);
      Toast.showWithGravity(
        strings("save.save_success"),
        Toast.SHORT,
        Toast.CENTER
      );
    }
  } catch (e) {
    console.log("错误:", e.message);
    Toast.showWithGravity(e.message, Toast.SHORT, Toast.CENTER);
  }
};
