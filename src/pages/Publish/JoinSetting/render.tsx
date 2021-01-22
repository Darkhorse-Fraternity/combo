import React, { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  StyledContent,
  StyledUnderLine,
  StyledTitle,
  StyledDiscrib,
  StyledSpace,
  StyledSumbmit,
  StyledMain,
} from './style';
import * as yup from 'yup';
import { MemoRHFInput, RHFError } from '@components/Form';
// import {useNavigationParam} from '@react-navigation/natve';
import SimpleToast from 'react-native-simple-toast';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePutClassesICardId } from 'src/hooks/interface';
import { useMutateICardData } from 'src/data/data-context/core';
import { useNavigation } from '@react-navigation/native';
// interface iCardType {
//   objectId?: string;
// }

const validationSchema = yup.object().shape({
  password: yup.string().max(50).trim().label('密码'),
});

type FormData = {
  password: string;
};

const Render = (): JSX.Element => {
  const { iCardId } = useNavigationAllParamsWithType<RouteKey.cirlcleSetting>();
  // console.log("req", reqO);
  // reqO();
  const { goBack } = useNavigation();
  const [formData, setFormData] = useState<FormData>();
  const { password } = formData || {};

  // const params = classUpdate(ICARD, iCardID, formData || {});

  // const [{ pending, result }, load] = useFetch<iCardType>(params, false);

  // const searchParams = classIDSearch(ICARD, iCardID);
  // const [{ result: searchResult, pending: searchPennding }] = useFetch<
  //   FormData
  // >(searchParams);

  // const { data: searchResult, loading: searchLoading } = useGetClassesICardId({
  //   id: iCardId,
  // });

  const { data: searchResult, update } = useMutateICardData(iCardId);

  const { run, loading } = usePutClassesICardId(
    { id: iCardId, password },
    {
      manual: true,
      onSuccess: (data) => {
        if (data.objectId) {
          update({ password, objectId: iCardId });
          goBack();
          SimpleToast.show('保存成功！');
        }
      },
    },
  );

  const { register, setValue, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    // defaultValues: { password: "234" }
  });

  // useEffect(() => {
  //   if (data?.objectId) {
  //     update({ password, objectId: iCardId });
  //     SimpleToast.show('保存成功！');
  //   }
  // }, [data, iCardId, password, update]);

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

  // useLayoutEffect(() => {
  //   setOptions({
  //     headerRight: (headerRightProps: { tintColor?: string }) => (
  //       <ButtonItem
  //         loading={loading}
  //         hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
  //         style={{ marginRight: 15 }}
  //         {...headerRightProps}
  //         onPress={memoHanleSubmit}>
  //         <StyledHeaderText>{'提交'}</StyledHeaderText>
  //       </ButtonItem>
  //     ),
  //   });
  // }, [handleSubmit, loading, memoHanleSubmit, setOptions]);

  // console.log('RHFErrorAnmition', RHFErrorAnmition);

  // if (searchLoading) {
  //   return <LoadAnimation />;
  // }

  // const disabled = !password || password?.length === 0;

  // console.log('disabled', password);

  return (
    <StyledContent>
      <StyledMain>
        <StyledTitle>设置加入密码</StyledTitle>
        <StyledDiscrib>
          设置加入密码，会对加入成员进行一个简单的限制，只有通过密码验证后才可以加入。
        </StyledDiscrib>

        <StyledUnderLine />
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
          // style={{ paddingVertical: 15 }}
        />
        <StyledUnderLine />

        <RHFError errors={errors} name={'password'} />
      </StyledMain>
      <StyledSpace />
      <StyledSumbmit
        textColor={'white'}
        onPress={memoHanleSubmit}
        // disabled={disabled}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        loading={loading}>
        完 成
      </StyledSumbmit>
    </StyledContent>
  );
};

export default Render;
