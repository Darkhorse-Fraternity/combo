import I18n from 'react-native-i18n';
import 'moment/locale/zh-cn';
// import 'moment/min/moment-with-locales'
// Import all locales
import en from './zh.json';
import zh from './zh.json';

// getLanguages().then((languages) => {
//   // const path = 'moment/locale/cn-z';
//   console.log(languages);

//   if (languages === 'zh-cn') {
//     require('moment/locale/zh-cn');
//   }
// });


// const en = zh
// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  zh
};

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return I18n.t(name, params);
}

export default I18n;
