module.exports = {
  dependencies: {
    'react-native-gesture-handler': {},
    'react-native-device-info': {
      platforms: {
        android: {
          packageInstance: 'new RNDeviceInfo(false)',
        },
      },
    },
    'react-native-simple-toast': {},
    'react-native-update-app': {
      platforms: {
        ios: null
      },
    },
    'react-native-screens': {
      platforms: {
        android: null
      },
    },
    // 'react-native-fast-image': {},
  },
};
