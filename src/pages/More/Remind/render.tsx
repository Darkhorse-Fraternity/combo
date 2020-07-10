import React from 'react';
import {Platform} from 'react-native';
import {StyledTips} from './style';

export const NoticeTip = () => {
  if (Platform.OS === 'android') {
    return (
      <StyledTips>
        注意：{'\n'}
        开启日历通知,{'\n'}
        如果在删除本app前未关闭通知，{'\n'}
        需手动打开系统日历,{'\n'}
        删除所有重复提醒事件。
      </StyledTips>
    );
  }
  return null;
};
