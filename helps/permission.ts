import {
  PermissionsAndroid
} from 'react-native'
import { strings } from '../locales/i18n';

export const  requestExternalStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: strings('write_storage_title'),
        message: strings('write_storage_message'),
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    } else {
      console.log("Camera permission denied")
      return false
    }
  } catch (err) {
    console.error('Failed to request permission ', err.message);
    return false;
  }
};