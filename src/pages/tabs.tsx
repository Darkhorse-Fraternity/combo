import React, { useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
// import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
// import * as Animatable from 'react-native-animatable';
import { strings } from '../../locales/i18n';
import { RootStackParamList, StackPropsType, RouteKey } from './interface';
import { habitRoute, settingRoute, punchRoute, flagRoute } from './route';
import {
  defaultNavigationOptions,
  tabsOptions,
} from '@components/Nav/components/navigationOptions';
import AnimatedTabBar, {
  FlashyTabBarIconProps,
  FlashyTabBarItemConfig,
  TabsConfig,
} from '@gorhom/animated-tabbar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
// import {useNavigation, useRoute} from '@react-navigation/native';

const OrigenStack = (props: StackPropsType) => {
  const { initialRouteName, route } = props;

  const Stack = createStackNavigator<RootStackParamList>();
  const keys = Object.keys(route) as (keyof RootStackParamList)[];
  const scheme = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      // initialParams={}
      headerMode="screen"
      screenOptions={defaultNavigationOptions(scheme)}>
      {keys.map((key) => (
        <Stack.Screen
          name={key}
          // initialParams={
          //   initialRouteName === key ? initialRouteParams : undefined
          // }
          key={key}
          component={route[key].component}
          options={route[key].options}
        />
      ))}
    </Stack.Navigator>
  );
};

const PunchStack = () => {
  return (
    <OrigenStack
      initialRouteName={RouteKey.punch}
      // initialParams={}
      route={punchRoute as never}
    />
  );
};

const HabitStack = () => {
  return (
    <OrigenStack
      initialRouteName={RouteKey.habit}
      // initialParams={}
      route={habitRoute as never}
    />
  );
};

const FlagStack = () => {
  return (
    <OrigenStack
      initialRouteName={RouteKey.flag}
      // initialParams={}
      route={flagRoute as never}
    />
  );
};

const SettingsStack = () => {
  return (
    <OrigenStack
      initialRouteName={RouteKey.more}
      // initialParams={}
      route={settingRoute as never}
    />
  );
};
// const names: string[] = [
//   strings('tabs.clockIn'),
//   strings('tabs.habit'),
//   strings('tabs.flag'),
//   strings('tabs.more'),
// ];

const tabItems = (name: string) => ({
  labelStyle: {
    color: tabsOptions[name].color,
  },
  icon: {
    component: ({ color, size }: FlashyTabBarIconProps) => (
      <Feather name={tabsOptions[name].iconName} size={size} color={color} />
    ),
    color: tabsOptions[name].color,
  },
  indicator: {
    size: 4,
    color: tabsOptions[name].color,
  },
});

const tabs: TabsConfig<FlashyTabBarItemConfig> = {
  [strings('tabs.clockIn')]: tabItems(strings('tabs.clockIn')),
  [strings('tabs.habit')]: tabItems(strings('tabs.habit')),
  [strings('tabs.flag')]: tabItems(strings('tabs.flag')),
  [strings('tabs.more')]: tabItems(strings('tabs.more')),
};

const Tab = createBottomTabNavigator();

const options = ({ route }: { route: { state: { index: number } } }) => {
  return { tabBarVisible: route.state ? route.state.index === 0 : true };
};

export default function App() {
  // hooks
  const { bottom } = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  // memos
  // const screenPaddingBottom = useMemo(() => {
  //   // icon size + margin padding + outer space + inner space + screen bottom padding
  //   return 20 + bottom + 12 * 2 + 12 * 2 + 12;
  // }, [bottom]);

  const tabBarOptions = useMemo(
    () => ({
      safeAreaInsets: {
        bottom: bottom,
      },
      style: {
        shadowOffset: {
          width: 0,
          height: 20,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        backgroundColor: theme.colors.card,
        elevation: 24,
      },
    }),
    [bottom, theme.colors.card],
  );

  return (
    <Tab.Navigator
      // screenOptions={({ route, navigation }) => ({
      //   // tabBarIcon: ({ focused, color }) => {
      //   //   const { iconName, Icon, size } = tabsOptions[route.name];
      //   //   return <Icon name={iconName} size={size} color={color} />;
      //   // },
      //   // tabBarButton: props => <TouchableBounce {...props} />,

      // })}
      // tabBarOptions={{
      //   activeTintColor: 'tomato',
      //   inactiveTintColor: 'gray',
      //   showLabel: false,
      // }}
      tabBarOptions={tabBarOptions}
      tabBar={({ style, ...rest }) => (
        <AnimatedTabBar
          preset="flashy"
          tabs={tabs}
          iconSize={25}
          itemOuterSpace={12}
          itemInnerSpace={12}
          style={style as never}
          {...rest}
        />
      )}>
      <Tab.Screen
        name={strings('tabs.clockIn')}
        component={PunchStack}
        options={options as never}
      />
      <Tab.Screen
        name={strings('tabs.habit')}
        component={HabitStack}
        options={options as never}
      />
      <Tab.Screen
        name={strings('tabs.flag')}
        component={FlagStack}
        options={options as never}
      />
      <Tab.Screen
        name={strings('tabs.more')}
        component={SettingsStack}
        options={options as never}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}
