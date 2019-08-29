module.exports = {
  dependencies: {
    '@react-native-community/masked-view': {},
    'react-native-gesture-handler': {},
    'react-native-device-info': {
      platforms: {
        android: {
          packageInstance: 'new RNDeviceInfo(false)',
        },
      },
    },
    'react-native-simple-toast': {},
    // 'react-native-fast-image': {},
  },
};
