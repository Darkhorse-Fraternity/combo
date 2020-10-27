/**
 * Created by lintong on 9/21/16.
 * @flow
 */

import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
// import SplashScreen from 'react-native-splash-screen';
import CodePush, { DownloadProgress } from 'react-native-code-push';
// import { useScreens } from "react-native-screens";

import { creatStore } from './redux/store';
import { theme } from './Theme';
import Configure from './configure';
import { SwitchNavigator } from '@pages/index';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ContextProvide from './data/data-context/context-provide-class';
import { Dimensions, ScaledSize } from 'react-native';

const downloadProgressCallback = (data: DownloadProgress) => {
  console.log(`热更新进度：${data.receivedBytes}/${data.totalBytes}`);
};

const App = () => {
  useEffect(() => {
    CodePush.checkForUpdate()
      .then((update) => {
        if (update) {
          CodePush.sync({}, undefined, downloadProgressCallback);
        }
      })
      .catch((e) => {
        console.log('热更新错误', e.message);
      });
  }, []);

  // const handle = (item: { window: ScaledSize; screen: ScaledSize }) => {
  //   console.log('item', item);
  //   console.log('width', Dimensions.get('window').width);
  // };

  // useEffect(() => {
  //   Dimensions.addEventListener('change', handle);
  //   return () => {
  //     Dimensions.removeEventListener('change', handle);
  //   };
  // }, []);

  return (
    <ReduxProvider store={creatStore(SwitchNavigator)}>
      <ContextProvide>
        <ThemeProvider theme={theme}>
          <Configure>
            <SafeAreaProvider>
              <NavigationContainer>
                <SwitchNavigator />
              </NavigationContainer>
            </SafeAreaProvider>
          </Configure>
        </ThemeProvider>
      </ContextProvide>
    </ReduxProvider>
  );
};
export default App;
