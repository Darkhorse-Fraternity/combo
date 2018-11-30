import { NavigationActions, StackActions } from 'react-navigation'

export function push(key, params) {
  return dispatch => dispatch(NavigationActions.navigate({ routeName: key, params }))
}

export function pop(key) {
  return dispatch => dispatch(NavigationActions.back({ key }))
}

export function popToIndex(n = 0) {
  //根据index 识别key

  return dispatch => dispatch(n <= 0 ?
    StackActions.popToTop() :
    StackActions.pop({ n }))


  // return dispatch => dispatch((dispatch, getState) => {
  //   const state = getState()
  //   const routes = state.nav.routes
  //   const routesIndex = state.nav.index
  //   const tab = routes[routesIndex]
  //   const tabRoutes = tab.routes
  //   if (!tabRoutes) return;
  //   const tabIndex = tab.index
  //   const nav = tabRoutes[tabIndex]
  //   const navRoutes = nav.routes
  //   const navIndex = nav.index
  //
  //   if (navIndex >= index) {
  //     const key = navRoutes[index].key
  //     // console.log('key:', key);
  //     dispatch(NavigationActions.back({ key }))
  //   }
  // })
}