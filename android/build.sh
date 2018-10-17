#!/bin/bash

./gradlew assembleRelease && fir p ./app/build/outputs/apk/release/app-release.apk