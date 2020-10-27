/**
 * Created by lintong on 2018/9/13.
 * @flow
 */

import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { selfUser } from '../../../request/LCModle';
import { ENCH } from '../../../redux/reqKeys';
import { StyledContent } from './style';

import {
  StyledRow,
  StyledRowTitle,
  StyledRowDate,
  StyledRowAmount,
  StyledRowStatu,
  StyledRowInner,
} from './style';
import LCList from '../../../components/Base/LCList';

const listKey = ENCH;
@connect((state) => ({}))
export default class CashRecord extends PureComponent {
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {};

  static defaultProps = {};

  renderRow = ({ item, index }: Object) => {
    let statu = '处理中';
    if (item.statu === 1) {
      statu = '已处理';
    } else if (item.statu === -1) {
      statu = '已退回';
    }

    return (
      <StyledRow>
        <StyledRowInner>
          <StyledRowTitle>
            申请单号：
            {item.enchId}
          </StyledRowTitle>
          <StyledRowAmount>￥{item.amount}</StyledRowAmount>
        </StyledRowInner>
        <StyledRowInner style={{ marginTop: 10 }}>
          <StyledRowDate>
            日期:
            {moment(item.createdAt).format('YYYY-MM-DD')}
          </StyledRowDate>

          <StyledRowStatu>{statu}</StyledRowStatu>
        </StyledRowInner>
      </StyledRow>
    );
  };

  render(): ReactElement<any> {
    const { dispatch } = this.props;
    const param = {
      where: {
        ...dispatch(selfUser()),
      },
    };

    return (
      <LCList
        reqKey={listKey}
        style={{ flex: 1 }}
        renderItem={this.renderRow.bind(this)}
        noDataPrompt="还没有记录"
        // dataMap={(data)=>{
        //   return {[OPENHISTORYLIST]:data.list}
        // }}
        reqParam={param}
      />
    );
  }
}
