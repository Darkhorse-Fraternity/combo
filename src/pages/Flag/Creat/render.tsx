/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import React, { FC } from 'react';
import {
  StyledCoverPickcerBg,
  StyledCoverPickerBtn,
  StyledCoverPickerBtnText,
  StyledLogo,
  StyledSafeAreaView,
} from './style';

// import { useNavigationAllParamsWithType } from '@components/Nav/hook';
// import { RouteKey } from '@pages/interface';

const CoverPicher: FC<{}> = () => {
  return (
    <StyledCoverPickcerBg>
      <StyledLogo source={require('@img/my/logo.png')} />
      <StyledCoverPickerBtn>
        <StyledCoverPickerBtnText>选择封面</StyledCoverPickerBtnText>
      </StyledCoverPickerBtn>
    </StyledCoverPickcerBg>
  );
};

const FlagCreat: FC<{}> = () => {
  // const { iCardId } = useNavigationAllParamsWithType<RouteKey.flagDetail>();

  return (
    <StyledSafeAreaView>
      <CoverPicher />
    </StyledSafeAreaView>
  );
};

export default FlagCreat;
