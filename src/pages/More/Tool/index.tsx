import React, { FC, PureComponent, useEffect } from 'react';
import { FlatList } from 'react-native';

import {
  StyledHeader,
  StyledHeaderTitle,
  StyledRow,
  StyledRowTitle,
  StyledRowDiscrib,
  StyledIcon,
  StyledRowInner,
} from './style';
import { isTablet } from 'react-native-device-info';
import { useGetInfoOfMe, useUpdateMe } from 'src/data/data-context/user';

class ToolClass extends PureComponent {
  renderHeader = () => (
    <StyledHeader>
      <StyledHeaderTitle>我的道具</StyledHeaderTitle>
    </StyledHeader>
  );

  renderRedoRow = ({ item, index }) => (
    <StyledRow num={isTablet() ? 2 : 1}>
      <StyledRowInner>
        <StyledRowTitle>
          补签卡 <StyledRowTitle style={{ fontSize: 30 }}>x</StyledRowTitle>
          <StyledRowTitle style={{ fontSize: 25, fontWeight: '400' }}>
            {item}
          </StyledRowTitle>
        </StyledRowTitle>
        <StyledRowDiscrib>点击卡片日历进行补签</StyledRowDiscrib>
      </StyledRowInner>
      <StyledIcon name="calendar-check" size={50} color="white" />
    </StyledRow>
  );

  _keyExtractor = (item: ItemT, index: number) => {
    // const id = typeof item === 'object' ? item[keyId || 'objectId'] : item;

    // const key = id || index;
    return `${index}`;
  };

  render() {
    const { toolConfig } = this.props;
    const { redo } = toolConfig;
    // return (
    //   <StyledContent>
    //     {this.renderHeader()}
    //     {this.renderRedoRow(redo)}
    //   </StyledContent>
    // );
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        numColumns={isTablet() ? 2 : 1}
        keyExtractor={this._keyExtractor}
        data={[redo]}
        renderItem={this.renderRedoRow}
      />
    );
  }
}

const Tool: FC<{}> = (props) => {
  const { user } = useGetInfoOfMe();
  const { run } = useUpdateMe();

  useEffect(() => {
    run();
  }, [run]);

  return <ToolClass {...props} toolConfig={user.toolConfig} />;
};

export default Tool;
