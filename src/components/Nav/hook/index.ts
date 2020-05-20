import {
  useNavigationState,
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import {RootStackParamList} from '@pages/interface';



export const useNavigationAllParamsWithType = <
  T extends keyof RootStackParamList
>() => {
  // type Route =

  const route = useRoute<
    RouteProp<RootStackParamList, keyof RootStackParamList>
  >();
  return route.params  as RootStackParamList[T];
  // return useRoute<T>(state => (state.routes[state.index]?.params || initData || {}) as T );
};

export function useNavigationWithType() {
  return useNavigation<NavigationProp<RootStackParamList>>();
}

export function useIsFirstRouteInParent() {
  const route = useRoute();
  const isFirstRouteInParent = useNavigationState(
    state => state.routes[0].key === route.key,
  );

  return isFirstRouteInParent;
}
