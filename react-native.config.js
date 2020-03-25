module.exports = {
  dependencies: {
    'react-native-gesture-handler': {},
    'react-native-device-info': {},
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
    'react-native-code-push': {
      platforms: {
        android: {
          packageInstance:
            'new CodePush(BuildConfig.CODEPUSH_KEY,getApplicationContext(),BuildConfig.DEBUG)',
        },
      },
    },
    'react-native-keyboard-input': {
      platforms: {
        android: {
          packageInstance:
            'new KeyboardInputPackage(getApplicationContext())',
        },
      },
    },
    // 'react-native-fast-image': {},
  },
};
