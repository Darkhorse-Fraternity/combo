/**
 * Created by lintong on 2018/8/17.
 * @flow
 */

import React, { FC, useCallback, useEffect } from 'react';

import Toast from 'react-native-simple-toast';
import {
  StyledContent,
  StyledHeader,
  StyledDiscrib,
  StyledHeaderTop,
  StyledHeaderTitle,
  StyledHeaderBtn,
  StyledTitleText,
  StyledInput,
} from './style';
import { userPoint } from '../../../request/LCModle';
import { useGetInfoOfMe } from 'src/data/data-context/user';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostClassesEnchashment } from 'src/hooks/interface';
import SimpleToast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import { TextInputProps } from 'react-native';
// const selector = formValueSelector(FormID);

// @connect(
//   (state) => ({}),
//   (dispatch, props) => ({
//     onSubmit: () =>
//       dispatch(async (dispatch, getState) => {
//         try {
//           const state = getState();
//           const user = state.user.data;
//           const amount = Number(selector(state, 'amount'));
//           if (user.balance >= amount * 100 && amount >= 10) {
//             const name = selector(state, 'name');
//             const account = selector(state, 'account');
//             const Atanisi = Math.floor(Math.random() * 999999);
//             const enchId = new Date().getTime() + Atanisi;
//             const params = {
//               account,
//               name,
//               enchId,
//               ...dispatch(selfUser()),
//               amount,
//             };
//             const res = await dispatch(add(params, ENCH));
//             // 修改本地用户数据

//             // console.log(res);

//             if (res) {
//               Toast.show('我们已经收到了您的申请,耐心等待哦。');
//               dispatch(
//                 updateUserData({
//                   balance: user.balance - amount * 100,
//                 }),
//               );
//               props.navigation.goBack();
//             }
//           } else if (user.balance <= amount * 100) {
//             Toast.show('您的余额不足');
//           } else if (amount < 10) {
//             Toast.show('取现金额需大于10元');
//           }
//         } catch (e) {
//           Toast.show(e.message);
//         }
//       }),
//   }),
// )
// class CashClass extends PureComponent {
//   render() {
//     return <CashForm onSubmit={this.props.onSubmit} />;
//   }
// }

export type FormData = {
  account: string;
  name: string;
  amount: number;
};

export const validationSchema = yup.object().shape({
  account: yup.string().max(50).trim().required().label('账号'),
  name: yup.string().max(30).trim().required().label('姓名'),
  amount: yup.number().max(1000).required().label('金额'),
});

const des = [
  '1、每笔提现金额至少10元,支付宝官方收取0.6%手续费、',
  '2、每日账户提现上线为2000元,超出请联系客服。',
  '3、为保证你的资金安全,提现申请需实名验证。',
  '4、账号或收款方实名不对,申请将会被退回。',
  '5、发起申请后约1到2个工作日到账。',
];

const ControlStyledInput: FC<
  Omit<TextInputProps, 'onChange'> & { onChange?: (text: string) => void }
> = ({ onChange, ...rest }) => {
  return (
    // @ts-ignore: Unreachable code error
    <StyledInput {...rest} onChangeText={(e) => onChange?.call(undefined, e)} />
  );
};

const AlertWithTitle = (title: string) => {
  SimpleToast.showWithGravity(title, SimpleToast.SHORT, SimpleToast.CENTER);
};

const Cash: FC<{}> = () => {
  const { user, updateMe } = useGetInfoOfMe();
  const { goBack } = useNavigation();
  const { getValues, handleSubmit, control, errors } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: { amount: 0, name: '', account: '' },
    mode: 'onSubmit',
  });

  const { data, loading, run } = usePostClassesEnchashment((res) => res, {
    manual: true,
  });
  const onSubmit = useCallback(
    (data1: FormData) => {
      if (data1.amount < 10) {
        return Toast.show('取现金额需大于10元');
      }

      if (user.balance <= data1.amount * 100) {
        return Toast.show('您的余额不足');
      }

      const Atanisi = Math.floor(Math.random() * 999999);
      const enchId = new Date().getTime() + Atanisi;
      run({
        ...data1,
        enchId,
        user: userPoint(user.objectId),
      });
    },
    [run, user.balance, user.objectId],
  );

  useEffect(() => {
    if (errors) {
      const keys = Object.keys(errors);
      const key = keys[0];
      if (key) {
        const message = errors[key].message;
        AlertWithTitle(message);
      }
    }
  }, [errors]);

  useEffect(() => {
    if (data?.objectId) {
      const amount = getValues('amount');
      updateMe({ balance: user.balance - amount * 100 });
      Toast.show('我们已经收到了您的申请,耐心等待哦。');
      goBack();
    }
  }, [data?.objectId, getValues, goBack, updateMe, user.balance]);

  return (
    <StyledContent>
      <StyledHeader>
        {/* <CashClass {...props} user={user} /> */}

        <StyledHeaderTop>
          <StyledHeaderTitle>支付宝取现</StyledHeaderTitle>
          <StyledHeaderBtn
            // {...rest}
            load={loading}
            // disabled={Object.keys(errors).length > 0}
            hitSlop={{
              top: 5,
              left: 50,
              bottom: 5,
              right: 5,
            }}
            onPress={handleSubmit(onSubmit)}
            title="提现申请"
          />
        </StyledHeaderTop>

        <StyledTitleText>提现金额</StyledTitleText>
        <Controller
          // defaultValue=''
          name={'amount'}
          control={control}
          maxLength={6}
          keyboardType="numeric"
          underlineColorAndroid="transparent"
          placeholderTextColor="rgb(200,200,200)"
          placeholder="最小提现金额为10元"
          // onChangeText={text => setval}
          as={ControlStyledInput}
        />

        <StyledTitleText>支付宝账号</StyledTitleText>
        <Controller
          // defaultValue=''
          name={'account'}
          control={control}
          maxLength={100}
          underlineColorAndroid="transparent"
          placeholderTextColor="rgb(200,200,200)"
          placeholder="请输入支付宝账号"
          // onChangeText={text => setval}
          as={ControlStyledInput}
        />

        <StyledTitleText>收款方实名</StyledTitleText>
        <Controller
          // defaultValue=''
          name={'name'}
          control={control}
          maxLength={20}
          underlineColorAndroid="transparent"
          placeholderTextColor="rgb(200,200,200)"
          placeholder="请输入你的真实姓名"
          // onChangeText={text => setval}
          as={ControlStyledInput}
        />

        {des.map((text, index) => (
          <StyledDiscrib key={index}>{text}</StyledDiscrib>
        ))}
      </StyledHeader>
    </StyledContent>
  );
};

export default Cash;
