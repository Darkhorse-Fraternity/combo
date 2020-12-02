module.exports = {
  root: true,
  extends: ['@react-native-community'],
  globals: {
    expect: true,
    element: true,
    by: true,
    device: true,
    beforeAll: true,
    beforeEach: true,
    afterAll: true,
    jest: true,
    jasmine: true,
    waitFor: true,
    // detoxCircus: true,
  },
  // parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   jsx: true,
  //   useJSXTextNode: true,
  // },
  // // plugins: ['react', 'react-native', '@typescript-eslint'],
  // settings: {
  //   'import/resolver': {
  //     typescript: {
  //       alwaysTryTypes: true,
  //     },
  //   },
  //   'import/ignore': ['node_modules'],
  // },
  rules: {
    // "object-curly-spacing": ["warn", "always"],
    // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    // eqeqeq: [
    //   'error',
    //   'always',
    //   {
    //     null: 'ignore',
    //   },
    // ],
    // 'no-unused-vars': [
    //   'warn',
    //   {
    //     vars: 'all',
    //     args: 'none',
    //   },
    // ],
    // '@typescript-eslint/no-unused-vars': [
    //   'warn',
    //   {
    //     vars: 'all',
    //     args: 'none',
    //   },
    // ],
    'max-len': [
      'warn',
      {
        code: 80,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        ignoreRestArgs: true,
      },
    ],
    // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
    // semi: 0,
    // 'typescript/class-name-casing': 'error',
    // 'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    // 'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
    // "no-any": [true, {"ignore-rest-args": true}]
    'react/forbid-prop-types': [2, { forbid: ['any'] }], //禁止某些propTypes
    'react/jsx-boolean-value': 2, //在JSX中强制布尔属性符号
    'no-irregular-whitespace': 0, //不规则的空白不允许
    // 'react/jsx-closing-bracket-location': 1, //在JSX中验证右括号位置
    'react/jsx-key': 2, //在数组或迭代器中验证JSX具有key属性
    'react/jsx-pascal-case': 2, //为用户定义的JSX组件强制使用PascalCase
    // 'react/react-in-jsx-scope': 2, //使用JSX时防止丢失React
    'react/self-closing-comp': 2, //防止没有children的组件的额外结束标签
    // 'react/no-array-index-key': 2, //防止在数组中遍历中使用数组key做索引
    'prefer-arrow-callback': 0, //比较喜欢箭头回调
    'no-var': 2, // 要求使用 let 或 const 而不是 var
  },
  //   settings: {
  //     'import/ignore': ['node_modules'],
  //   },
};
