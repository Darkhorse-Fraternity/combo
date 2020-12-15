# xcrun altool --upload-app --type ios --file "/Users/tonyyo/Documents/Project/RN/Combo/script/Combo.ipa" --username "420156367@qq.com" --password "xqbq-lwtw-jmcz-qkie"

# https://stackoverflow.com/questions/57976017/how-to-upload-ipa-now-that-application-loader-is-no-longer-included-in-xcode-11

#!/bin/bash
APPFILE=$1
set -euo pipefail

# key is in ~/.appstoreconnect/private_keys
# https://appstoreconnect.apple.com/access/api
KEY="73W59WMM2N"
ISSUER="69a6de86-f01e-47e3-e053-5b8c7c11a4d1"
xcrun altool --upload-app --type ios --file $APPFILE --apiKey $KEY --apiIssuer $ISSUER