import * as Animatable from 'react-native-animatable';
import React from 'react';
import {
  StyledIconView,
  StyledIcon,
  StyledIconItem,
  StyledActivityIndicator,
} from '../style';

export const AppleSigninBtn = () => {
  return (
    <Animatable.View
      style={{ zIndex: 100 }}
      useNativeDriver
      // duration={1000}
      // delay={200 + Math.random() * 500}
      // animation="bounceInUp"
      animation="fadeIn">
      <StyledIconItem
        disabled={load}
        onPress={onPress}
        style={style}
        background={
          TouchableNativeFeedback.SelectableBackgroundBorderless &&
          TouchableNativeFeedback.SelectableBackgroundBorderless()
        }>
        <StyledIconView style={{ backgroundColor: load ? 'transparent' : color }}>
          {load ? (
            <StyledActivityIndicator />
          ) : (
              <StyledIcon color={'#233238'} name={name} size={size} />
            )}
        </StyledIconView>
        {/*<StyledIconText>*/}
        {/*{title}*/}
        {/*</StyledIconText>*/}
      </StyledIconItem>
    </Animatable.View>
  )
}