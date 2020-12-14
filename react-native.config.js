module.exports = {
  dependencies: {
    'react-native-calendar-events': {
      platforms: {
        ios: null,
      },
    },
    'react-native-update-app': {
      platforms: {
        ios: null,
      },
    },
    'react-native-screens': {
      platforms: {
        android: null,
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
          packageInstance: 'new KeyboardInputPackage(getApplicationContext())',
        },
      },
    },
    'react-native-push-notification': {
      platforms: {
        android: null,
      },
    },
    // '@react-native-community/async-storage': {
    //   platforms: {
    //     android: null,
    //   },
    // },
    // 'react-native-fast-image': {},
  },
};
