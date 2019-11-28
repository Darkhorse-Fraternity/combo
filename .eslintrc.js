module.exports = {
  root: true,
  extends: "@react-native-community",
  parser: "typescript-eslint-parser",
  env: {
    jest: true,
    useJSXTextNode: true
  },
  rules: {
    eqeqeq: [
      "error",
      "always",
      {
        null: "ignore"
      }
    ],
    "no-console": "off",
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "comma-dangle": "off",
    // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
    "typescript/class-name-casing": "error",
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  },
  globals: {
    fetch: false,
    __DEV__: false
  },
  parserOptions: { ecmaVersion: 2015, ecmaFeatures: { legacyDecorators: true } }
};
