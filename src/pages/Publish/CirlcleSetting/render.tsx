import React, { useCallback, useState, useEffect } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import {
  StyledContent,
  StyledText,
  StyledButton,
  StyledUnderLine,
  StyledNavBar,
} from './style';
import * as yup from 'yup';
import { MemoRHFInput, RHFError } from '@components/Form';
// import {useNavigationParam} from '@react-navigation/natve';
import SimpleToast from 'react-native-simple-toast';
import { LoadAnimation } from '@components/Load';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetClassesICardId,
  usePutClassesICardId,
} from 'src/hooks/interface';
// interface iCardType {
//   objectId?: string;
// }

const validationSchema = yup.object().shape({
  password: yup.string().max(50).min(6).trim().label('密码'),
});

type FormData = {
  password: string;
};

const Render = (): JSX.Element => {
  const { iCardId } = useNavigationAllParamsWithType<RouteKey.cirlcleSetting>();
  // console.log("req", reqO);
  // reqO();

  const [formData, setFormData] = useState<FormData>();
  const { password } = formData || {};

  // const params = classUpdate(ICARD, iCardID, formData || {});

  // const [{ pending, result }, load] = useFetch<iCardType>(params, false);

  // const searchParams = classIDSearch(ICARD, iCardID);
  // const [{ result: searchResult, pending: searchPennding }] = useFetch<
  //   FormData
  // >(searchParams);

  const { data: searchResult, loading: searchLoading } = useGetClassesICardId({
    id: iCardId,
  });

  const { data, run, loading } = usePutClassesICardId(
    { id: iCardId, password },
    { manual: true },
  );

  const { register, setValue, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    // defaultValues: { password: "234" }
  });

  useEffect(() => {
    if (data?.objectId) {
      SimpleToast.show('保存成功！');
    }
  }, [data]);

  const onSubmit = ({ password = '' }: FormData) => {
    setFormData({ password });
  };

  //根据password 去加载
  useEffect(() => {
    if (password !== undefined) {
      run();
    }
  }, [password, run]);

  //赋予初始值，因为是异步的，所以只能这么做。
  // useEffect(() => {
  //   if (searchResult) {
  //     setValue("password", searchResult.password, true);
  //   }
  // }, [searchResult]);

  const memoHanleSubmit = handleSubmit(onSubmit);
  const onChangeText = useCallback(
    (text) => setValue('password', text, { shouldValidate: true }),
    [setValue],
  );

  // console.log('RHFErrorAnmition', RHFErrorAnmition);

  if (searchLoading) {
    return <LoadAnimation />;
  }

  console.log('searchResult?.password', searchResult?.password);

  return (
    <StyledContent>
      <StyledNavBar>
        <StyledText>圈子设置</StyledText>
        <StyledButton
          loading={loading}
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
          // loading={true}
          onPress={memoHanleSubmit}
          disabled={Object.keys(errors).length > 0}>
          保存
        </StyledButton>
      </StyledNavBar>
      <View style={{ height: 10 }} />
      <MemoRHFInput
        autoFocus
        name="password"
        register={register}
        setValue={setValue as never}
        maxLength={50}
        placeholder={'设置加入密码'}
        clearButtonMode={'while-editing'}
        autoCapitalize={'none'}
        returnKeyType={'done'}
        // keyboardType={'default'}
        textContentType={'password'}
        defaultValue={searchResult?.password}
        onSubmitEditing={memoHanleSubmit}
        onChangeText={onChangeText}
        // underlineColorAndroid={'green'}
        style={{ paddingVertical: 5 }}
      />
      <StyledUnderLine />
      <RHFError errors={errors} name={'password'} />
    </StyledContent>
  );
};

export default Render;
