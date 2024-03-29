import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import { toLazyExoticComponent } from '@components/util/toLazyExoticComponent';
// import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';
// import {StyledIcon} from './style';

const navigationOptions: NavigationOptionsType<RouteKey.punch> = () => {
  return {
    title: '',
    // headerRight: headerRightProps => (
    //   <TouchableItem
    //     style={{marginRight: 20}}
    //     {...headerRightProps}
    //     onPress={() => {
    //       props.navigation.navigate(RouteKey.search);
    //     }}>
    //     <StyledIcon size={20} color="black" name="search" />
    //   </TouchableItem>
    // ),
  };
};

export default toLazyExoticComponent(Render, navigationOptions);
