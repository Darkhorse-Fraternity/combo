// import I18n from "react-native-i18n";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import lodash from "lodash";
import "moment/locale/zh-cn";

import { I18nManager } from "react-native";
// import 'moment/min/moment-with-locales'
// Import all locales

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  zh: () => require("./zh.json"),
  en: () => require("./zh.json"),
};

const translate = lodash.memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: "en", isRTL: false };

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);

  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};
setI18nConfig();
// getLanguages().then((languages) => {
//   // const path = 'moment/locale/cn-z';
//   console.log(languages);

//   if (languages === 'zh-cn') {
//     require('moment/locale/zh-cn');
//   }
// });

// const en = zh
// Should the app fallback to English if user locale doesn't exists
// I18n.fallbacks = true;

// // Define the supported translations
// I18n.translations = {
//   en,
//   zh,
// };

// The method we'll use instead of a regular string
export function strings(name: string, params = {}) {
  return translate(name, params);
}

// export default I18n;
