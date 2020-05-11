import {Config, ExtendedInterface, ChangeCase} from 'yapi-to-typescript';

const token = '92970de02cf56005d872';
const getRequestFunctionName = (
  interfaceInfo: ExtendedInterface,
  changeCase: ChangeCase,
) => {
  const {name, dir} = interfaceInfo.parsedPath;
  const dirString = dir.replace(/\//g, ' ');
  return changeCase.camelCase(`${dirString} ${name}`);
};

const config: Config = [
  {
    serverUrl: 'http://39.99.162.233:3000/',
    typesOnly: false,
    reactHooks: {
      enabled: true,
    },
    devEnvName: 'local',
    prodEnvName: 'prod',
    outputFilePath: 'src/request/interface.ts',
    requestFunctionFilePath: 'src/request/request.ts',
    projects: [
      {
        token,
        categories: [
          {
            id: [],
            getRequestFunctionName,
          },
        ],
      },
    ],
  },
];

export default config;
