import { NavigationOptionsType, RouteKey } from '@pages/interface';
import Render from './render';

const navigationOptions: NavigationOptionsType<RouteKey.rcomment> = (props) => {
  return {
    title: '',
    // headerRight: headerRightProps => (
    //   <TouchableItem
    //     style={{marginRight: 15}}
    //     {...headerRightProps}
    //     onPress={() => {
    //       props.navigation.navigate(RouteKey.newCard);
    //     }}>
    //     <StyledIonicons
    //       // color={'#39ba98'}
    //       size={25}
    //       name="plus-circle"
    //     />
    //   </TouchableItem>
    // ),
    // headerRight,
    // headerShown: false,
  };
};

export default { component: Render, options: navigationOptions };
