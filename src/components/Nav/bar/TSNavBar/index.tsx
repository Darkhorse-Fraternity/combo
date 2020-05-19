import React, {memo} from 'react';
import {StyledNavbar, StyledArrow, StyledTitle, StyledButton} from './style';
import {
  StatusBar,
  View,
  TouchableOpacity,
  GestureResponderEvent,
  NativeModules,
  ViewProps,
  StatusBarStyle,
  TransformsStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const {RouterBridge} = NativeModules;
// const NavBar = title => {
//   return <StyledNavbar />;
// };

interface PropsNavBar extends ViewProps {
  title?: String;
  renderLeftView?: (props: PropsNavBar) => Element;
  renderRightView?: (props: PropsNavBar) => Element;
  onBackPress?: (event: GestureResponderEvent) => void;
  barStyle?: StatusBarStyle;
  tintColor?: string;
  style?: any;
}

const onDefaultBackPress = (event: GestureResponderEvent) => {};

const renderDefaultLeftView = (props: PropsNavBar) => {
  const {tintColor = 'white'} = props;

  const {goBack, isFirstRouteInParent, getScreenProps} = useNavigation();
  const {openBaseRouteBackBtn} = getScreenProps();

  const go =
    openBaseRouteBackBtn && isFirstRouteInParent()
      ? () => RouterBridge.pop(true)
      : () => goBack();
  const {onBackPress = go} = props;
  if (isFirstRouteInParent() && !openBaseRouteBackBtn) {
    return <View />;
  }
  return (
    <StyledButton
      onPress={onBackPress}
      hitSlop={{top: 30, left: 20, bottom: 20, right: 50}}>
      <StyledArrow color={tintColor} />
    </StyledButton>
  );
};

const renderDefaultRightView = (props: PropsNavBar) => {
  return <View />;
};

export const NavBar = (props: PropsNavBar) => {
  const {
    title = '',
    renderRightView = renderDefaultRightView,
    renderLeftView = renderDefaultLeftView,
    barStyle = 'light-content',
    tintColor = 'white',
    ...other
  } = props;
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle={barStyle}
        translucent
      />
      <StyledNavbar {...other}>
        {renderLeftView(props)}
        <StyledTitle color={tintColor}>{title}</StyledTitle>
        {renderRightView(props)}
      </StyledNavbar>
    </>
  );
};

export default memo(NavBar);
