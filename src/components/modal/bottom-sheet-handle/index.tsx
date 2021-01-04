/*
 * @Author: tonyYo
 * @Date: 2020-12-30 16:18:48
 * @LastEditors: tonyYo
 * @LastEditTime: 2020-12-30 16:35:58
 * @FilePath: /Combo/src/pages/test/bottomSheetHandle/index.tsx
 */
import React, { FC, memo } from 'react';
import { isEqual } from 'lodash';
import { StyledContainer, StyledIndicator } from './styles';

import type Animated from 'react-native-reanimated';

export interface BottomSheetHandleProps {
  /**
   * Current sheet position index.
   * @type Animated.Value<number>
   */
  animatedIndex: Animated.Node<number>;
  /**
   * Current sheet position.
   * @type Animated.Value<number>
   */
  animatedPosition: Animated.Node<number>;
}

const BottomSheetHandleComponent: FC<BottomSheetHandleProps> = () => {
  return (
    <StyledContainer>
      <StyledIndicator />
    </StyledContainer>
  );
};

const BottomSheetHandle = memo(BottomSheetHandleComponent, isEqual);

export default BottomSheetHandle;
