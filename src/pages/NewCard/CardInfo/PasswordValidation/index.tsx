/*
 * @Author: tonyYo
 * @Date: 2021-01-06 16:44:48
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-19 16:52:39
 * @FilePath: /Combo/src/pages/NewCard/CardInfo/PasswordValidation/index.tsx
 */
import React, { useCallback, FC } from 'react';

import {
  StyledButton,
  StyledUnderLine,
  StyleModalMain,
  StyleTitle,
} from './style';

import { RHFError, MemoRHFInput } from '@components/Form';
import CModal, { CModalPropsType } from '@components/modal/c-model';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const validationSchema = yup.object().shape({
  password: yup.string().max(50).trim().required().label('密码'),
});

type FormData = {
  password: string;
};

interface RenderPropsType extends CModalPropsType {
  onDone: (password: string, pdErrorAction: () => void) => void;
  onClose: () => void;
  loading?: boolean;
}

const PasswordValidation: FC<RenderPropsType> = ({
  show = false,
  onDone,
  loading,
  onClose,
}) => {
  const { register, setValue, handleSubmit, errors, setError } = useForm<
    FormData
  >({
    resolver: yupResolver(validationSchema),
  });

  const pdErrorAction = () => {
    setValue('password', '', { shouldValidate: false });
    setError('password', { message: '密码错误' });
  };

  const onSubmit = (data: FormData) => onDone(data.password, pdErrorAction);

  const memoHanleSubmit = handleSubmit(onSubmit);
  const onChangeText = useCallback(
    (text) => setValue('password', text, { shouldValidate: true }),
    [setValue],
  );

  return (
    <CModal show={show} onClose={onClose}>
      <StyleModalMain>
        <StyleTitle>请输入加入密码</StyleTitle>
        <MemoRHFInput
          autoFocus
          name="password"
          setValue={setValue as never}
          register={register}
          maxLength={50}
          placeholder={'设置加入密码'}
          clearButtonMode={'while-editing'}
          autoCapitalize={'none'}
          returnKeyType={'done'}
          // keyboardType={'default'}
          textContentType={'password'}
          onSubmitEditing={memoHanleSubmit}
          onChangeText={onChangeText}
          // underlineColorAndroid={'green'}
          style={{ paddingVertical: 5 }}
        />
        <StyledUnderLine />
        <RHFError errors={errors} name={'password'} />
        <StyledButton
          loading={loading}
          // dise
          disabled={Object.keys(errors).length > 0}
          onPress={memoHanleSubmit}>
          确定
        </StyledButton>
      </StyleModalMain>
    </CModal>
  );
};

export default PasswordValidation;

// export class PasswordValidation extends PureComponent<RenderPropsType> {
//   render() {
//     return <Render {...this.props} />;
//   }
// }
