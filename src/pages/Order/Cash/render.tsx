/**
 * Created by lintong on 2018/8/17.
 * @flow
 */

import React, { FC, PureComponent } from 'react';

import { connect } from 'react-redux';

import { formValueSelector } from 'redux-form/immutable';
import Toast from 'react-native-simple-toast';
import { StyledContent, StyledHeader, StyledDiscrib } from './style';
import { ENCH } from '../../../redux/reqKeys';
import CashForm, { FormID } from '../../../components/Form/Cash';
import { add } from '../../../redux/module/leancloud';
import { selfUser } from '../../../request/LCModle';
import { updateUserData } from '../../../redux/actions/user';
import { useGetInfoOfMe } from 'src/data/data-context/user';

const selector = formValueSelector(FormID);

@connect(
  (state) => ({}),
  (dispatch, props) => ({
    onSubmit: () =>
      dispatch(async (dispatch, getState) => {
        try {
          const state = getState();
          const user = state.user.data;
          const amount = Number(selector(state, 'amount'));
          if (user.balance >= amount * 100 && amount >= 10) {
            const name = selector(state, 'name');
            const account = selector(state, 'account');
            const Atanisi = Math.floor(Math.random() * 999999);
            const enchId = new Date().getTime() + Atanisi;
            const params = {
              account,
              name,
              enchId,
              ...dispatch(selfUser()),
              amount,
            };
            const res = await dispatch(add(params, ENCH));
            // 修改本地用户数据

            // console.log(res);

            if (res) {
              Toast.show('我们已经收到了您的申请,耐心等待哦。');
              dispatch(
                updateUserData({
                  balance: user.balance - amount * 100,
                }),
              );
              props.navigation.goBack();
            }
          } else if (user.balance <= amount * 100) {
            Toast.show('您的余额不足');
          } else if (amount < 10) {
            Toast.show('取现金额需大于10元');
          }
        } catch (e) {
          Toast.show(e.message);
        }
      }),
  }),
)
class CashClass extends PureComponent {
  render() {
    return <CashForm onSubmit={this.props.onSubmit} />;
  }
}

const des = [
  '1、每笔提现金额至少10元,支付宝官方收取0.6%手续费、',
  '2、每日账户提现上线为2000元,超出请联系客服。',
  '3、为保证你的资金安全,提现申请需实名验证。',
  '4、账号或收款方实名不对,申请将会被退回。',
  '5、发起申请后约1到2个工作日到账。',
];

const Cash: FC<{}> = (props) => {
  const { user } = useGetInfoOfMe();

  return (
    <StyledContent>
      <StyledHeader>
        <CashClass {...props} user={user} />
        {des.map((text, index) => (
          <StyledDiscrib key={index}>{text}</StyledDiscrib>
        ))}
      </StyledHeader>
    </StyledContent>
  );
};

export default Cash;
