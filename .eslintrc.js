module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    "no-console": "off",
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off'
  },
  'globals': {
    "fetch": false,
    "__DEV__": false,
  },
  parserOptions: { ecmaVersion: 2015, ecmaFeatures: { legacyDecorators: true } },
}