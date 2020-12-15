mkdir ./CodePush

react-native bundle --platform ios \
--entry-file index.ios.js \
--bundle-output ./CodePush/main.jsbundle \
--assets-dest ./CodePush \
--dev false

appcenter codepush release-react -a lintong320-gmail.com/combo  -t 1.2.0


appcenter codepush promote -a <ownerName>/<appName> -s <sourceDeploymentName> -d <destDeploymentName>
[-s|--source-deployment-name <sourceDeploymentName>]
[-d|--destination-deployment-name <destDeploymentName>]
[-t|--target-binary-version <targetBinaryVersion>]
[-r|--rollout <rolloutPercentage>]
[--disable-duplicate-release-error]
[--description <description>]
[-a|--app <ownerName>/<appName>]
[--disable-telemetry]

appcenter codepush promote -a lintong320-gmail.com/combo  -s Staging -d Production -t 1.2.0