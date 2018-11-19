mkdir ./CodePush

react-native bundle --platform ios \
--entry-file index.ios.js \
--bundle-output ./CodePush/main.jsbundle \
--assets-dest ./CodePush \
--dev false

appcenter codepush release-react -a lintong320-gmail.com/combo  -t 1.2.0