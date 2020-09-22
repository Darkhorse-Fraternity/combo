import {Config, ExtendedInterface, ChangeCase} from 'yapi-to-typescript';

const token = '204b1c40f76f4e4b52ed59f2b9fc7e61ce755318a3d02ec35b57c5ad21641d6a';
const getRequestFunctionName = (
  interfaceInfo: ExtendedInterface,
  changeCase: ChangeCase,
) => {
  const {parsedPath, method} = interfaceInfo;
  const {name, dir} = parsedPath;
  const dirString = dir.replace(/\//g, ' ');
  return changeCase.camelCase(`${method} ${dirString} ${name}`);
};


const config: Config = [
  {
    serverUrl: 'http://121.89.170.197:3000',
    typesOnly: false,
    reactHooks: {
      enabled: true,
    },
    devEnvName: 'local',
    prodEnvName: 'prod',
    outputFilePath: 'src/hooks/interface.ts',
    requestFunctionFilePath: 'src/hooks/request.ts',
    projects: [
      {
        token,
        categories: [
          {
            id: [270],
            getRequestFunctionName,
          },
        ],
      },
    ],
  },
];

export default config;
