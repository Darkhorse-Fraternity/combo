import { Config, ExtendedInterface, ChangeCase } from 'yapi-to-typescript';

const token =
  '204b1c40f76f4e4b52ed59f2b9fc7e61ce755318a3d02ec35b57c5ad21641d6a';
const leancloud_restful_token =
  'e9e18914866a667174c80c36c0b625b361aa1e6ad9138a6d53d6cd9cdeb3e8e2';
const getRequestFunctionName = (
  interfaceInfo: ExtendedInterface,
  changeCase: ChangeCase,
) => {
  const { parsedPath, method } = interfaceInfo;
  const { name, dir } = parsedPath;
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
    // dataKey:'',
    devEnvName: 'dev',
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
      {
        token: leancloud_restful_token,
        categories: [
          {
            id: [368, 375, 382, 389, 403, 417, 424, 438],
            getRequestFunctionName,
          },
        ],
      },
    ],
  },
];

export default config;
