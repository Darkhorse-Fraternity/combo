/**
 * Created by lintong on 2017/7/11.
 * @flow
 */

import React, { FC, PureComponent, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  // TextInput,
  BackHandler,
  DeviceEventEmitter,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { reduxForm, formValueSelector, change } from 'redux-form/immutable';
import Toast from 'react-native-simple-toast';
import { add } from '../../../../redux/module/leancloud';
import { addListNormalizrEntity } from '../../../../redux/actions/list';
import { addNormalizrEntity } from '../../../../redux/module/normalizr';
import {
  selfUser,
  iCard,
  pointModel,
  iCardPoint,
  userPoint,
} from '../../../../request/LCModle';
import Main from '../Main';
import { defaultHabit } from '../../../../configure/habit';

import {
  StyledContent,
  StyledSubTitleView,
  StyledSubTitle,
  StyledInnerView,
  StyledHeader,
  StyledTitle,
  StyledHeaderInner,
  StyledHeaderBtn,
  StyledInnerScrollView,
  StyledTitleInput,
} from './style';
// import { TextInput } from '../../../../components/Form/Cunstom/index';
// static displayName = Creat
import { DeviceEventEmitterKey, Privacy } from '../../../../configure/enum';

import IconAndColor from './IconAndColor';
import { StackActions, useNavigation } from '@react-navigation/native';
import { ICARD, IUSE } from '@redux/reqKeys';
import { Controller, useForm } from 'react-hook-form';
import {
  CardFormData,
  CardIconAndColor,
  CardLimitDayAndTimes,
  CardNotifyText,
  CardNotifyTimes,
  CardRecord,
  CardSound,
  CardTitle,
  cardValidationSchema,
} from '../card_interface';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  postClassesICard,
  postClassesIUse,
  putClassesICardId,
} from 'src/hooks/interface';
import { ButtonType } from '@components/Button';
import { useGetUserInfo } from 'src/data/data-context';

// export const FormID = 'CreatCardForm';
// const selector = formValueSelector(FormID);

// @connect(
//   (state, props) => ({
//     // data:state.req.get()
//     title: selector(state, 'title'),
//     initialValues: props.route.params ? props.route.params.habit : defaultHabit,
//     load: state.req.get(ICARD).get('load'),
//     iUseLoad: state.req.get(IUSE).get('load'),
//     color: selector(state, 'color'),
//   }),
//   (dispatch, props) => ({
//     // ...bindActionCreators({},dispatch),
//     onSelect: (field: string, value: string | object) => {
//       dispatch(change(FormID, field, value));
//     },
//     add: () =>
//       dispatch(async (dispatch, getState) => {
//         // console.log('test:', option);

//         // const state = getState()
//         // const user = state.user.data;
//         // 新建卡片

//         // WARNING:首次登陆的时候也有用到icard 记得修改
//         const state = getState();
//         // const title = selector(state, 'title')
//         const op = selector(
//           state,
//           'title',
//           'notifyTimes',
//           'period',
//           'recordDay',
//           'notifyText',
//           'record',
//           'icon',
//           'color',
//           'limitTimes',
//           'sound',
//         );
//         const notifyTimes = op.notifyTimes
//           .toJS()
//           .sort((a, b) => moment(a, 'HH:mm') - moment(b, 'HH:mm'));

//         const param = {
//           title: op.title,
//           period: op.period,
//           record: op.record.toJS(),
//           recordDay: op.recordDay.toJS(),
//           iconAndColor: {
//             name: op.icon,
//             color: op.color,
//           },
//           sound: op.sound || {
//             open: true,
//             item: { title: 'bell', type: 'normal', key: 'bell' },
//           },
//           notifyTimes,
//           notifyText: op.notifyText,
//           limitTimes: op.limitTimes,
//           price: 0,
//           state: 0,
//           // doneDate: {"__type": "Date", "iso": moment('2017-03-20')},
//           ...dispatch(selfUser()),
//         };

//         const res = await dispatch(add(param, ICARD));
//         const entity = {
//           ...param,
//           ...res,
//         };
//         if (!res || !res.objectId) {
//           return;
//         }

//         dispatch(addNormalizrEntity(ICARD, entity));

//         // 返回首页
//         // dispatch((dispatch, getState) => {
//         //
//         // })

//         const iCardId = res.objectId;
//         const addParam = {
//           time: 0,
//           // notifyTime:option&&option.notifyTime||"20.00",
//           doneDate: { __type: 'Date', iso: moment('2017-03-20').toISOString() },
//           ...dispatch(selfUser()),
//           ...iCard(iCardId),
//           statu: 'start',
//           privacy: Privacy.open,
//         };
//         const addRes = await dispatch(add(addParam, IUSE));
//         const addEntity = {
//           ...addParam,
//           ...addRes,
//         };
//         dispatch(addListNormalizrEntity(IUSE, addEntity));
//         props.navigation.dispatch(StackActions.popToTop());
//       }),
//   }),
// )
// @reduxForm({
//   form: FormID,
// })

// // @formValues('title')
// class CreatClass extends PureComponent {
//   constructor(props: Object) {
//     super(props);
//     this.state = {
//       step: props.initialValues.get('title') ? 1 : 0,
//     };
//   }

//   static propTypes = {
//     title: PropTypes.string,
//     type: PropTypes.string,
//   };

//   static defaultProps = {
//     title: '',
//     type: 'custom',
//   };

//   __nextStep = () => {
//     const { step } = this.state;
//     if (this.props.title && this.props.title.length > 0) {
//       this.setState({ step: step + 1 });
//     } else {
//       Toast.show('标题不可为空');
//     }
//   };

//   __backStep = () => {
//     const { step } = this.state;
//     if (step < 2) {
//       this.props.navigation.goBack();
//     } else {
//       this.setState({ step: step - 1 });
//     }
//     return true;
//   };

//   render() {
//     // const { title, color } = this.props
//     const { step } = this.state;
//     const { onSelect } = this.props;
//     return (
//       <>
//         {this.state.step === 0 && (
//           <StyledInnerScrollView>
//             <RenderName />
//             <IconAndColor />
//           </StyledInnerScrollView>
//         )}

//         <StyledInnerView>
//           {this.state.step >= 1 && (
//             <Main
//               step={this.state.step - 1}
//               nextStep={this.__nextStep}
//               onSelect={onSelect}
//             />
//           )}
//         </StyledInnerView>
//       </>
//     );
//   }
// }

const RenderIconAndColor: FC<{
  value?: { name: string; color: string };
  onChange?: (data: { name: string; color: string }) => void;
}> = ({ value, onChange }) => {
  const { name = '', color = '' } = value || {};
  return <IconAndColor icon={name} color={color} onChange={onChange} />;
};

const RenderName: FC<{
  value?: string;
  onChange?: (value: string) => void;
}> = ({ value, onChange }) => (
  <View>
    <StyledSubTitleView>
      <StyledSubTitle>习惯标题：</StyledSubTitle>
    </StyledSubTitleView>
    <StyledTitleInput
      value={value}
      onChange={(e) => onChange?.call(undefined, e.nativeEvent.text)}
      placeholderTextColor="rgba(180,180,180,1)"
      // selectionColor={mainColor}
      returnKeyType="next"
      maxLength={50}
      // keyboardType={boardType}
      style={styles.textInputStyle}
      underlineColorAndroid="transparent"
      placeholder="例如跑步、早睡等"
      clearButtonMode="while-editing"
      enablesReturnKeyAutomatically
    />
  </View>
);

const Render: FC<{}> = (props) => {
  const [step, setStep] = useState(0);
  const user = useGetUserInfo();
  const { goBack, dispatch } = useNavigation();
  const [loading, setLoading] = useState(false);
  const { setValue, getValues, handleSubmit, errors, control } = useForm<
    CardFormData
  >({
    resolver: yupResolver(cardValidationSchema),
    defaultValues: {
      [CardTitle]: '',
      [CardNotifyTimes]: [],
      [CardLimitDayAndTimes]: {
        time: ['00:00', '24:00'],
        day: [1, 2, 3, 4, 5, 6, 7],
      },
      [CardIconAndColor]: { name: 'sun', color: '#f6f7f9' },
      [CardNotifyText]: '时不我待！',
      [CardRecord]: [],
      [CardSound]: {
        open: true,
        item: { title: 'bell', type: 'normal', key: 'bell', source: '' },
      },
    },
    mode: 'onSubmit',
    shouldUnregister: false,
  });

  const onSubmit = async ({
    title,
    record,
    limitTimes,
    iconAndColor,
    notifyText,
    notifyTimes,
    sound,
  }: CardFormData) => {
    delete sound.item.source;
    setLoading(true);
    const { objectId: iCardId } = await postClassesICard({
      title,
      record,
      recordDay: limitTimes.day,
      limitTimes: limitTimes.time,
      iconAndColor: iconAndColor,
      notifyText,
      notifyTimes,
      sound,
      user: userPoint(user.objectId),
    });

    if (!iCardId) {
      return;
    }
    const { objectId } = await postClassesIUse({
      iCard: iCardPoint(iCardId),
      user: userPoint(user.objectId),
    });

    if (objectId) {
      DeviceEventEmitter.emit(DeviceEventEmitterKey.iUse_reload);
      dispatch(StackActions.popToTop());
    }
  };

  const nextStep = (sumit: boolean = false) => {
    const title = getValues('title');
    if (step === 0) {
      if (title.length !== 0) {
        setStep((s) => s + 1);
      } else {
        Toast.show('标题不可为空');
      }
    } else if (step === 1) {
      // setStep((s) => s + 1);
      if (sumit) {
        handleSubmit(onSubmit)();
      } else {
        setStep((s) => s + 1);
      }
    }
  };
  const backStep = () => {
    if (step === 0) {
      goBack();
    } else {
      setStep((data) => data - 1);
      // update iUse
    }
    return null;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backStep);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backStep);
    };
  }, [step]);

  return (
    <StyledContent>
      <StyledHeader>
        <StyledTitle>新建习惯</StyledTitle>
        <StyledHeaderInner>
          <StyledHeaderBtn
            // load={false}
            // disabled={false}
            backgroundColor={step < 2 ? '#bfc2c7' : undefined}
            hitSlop={{
              top: 15,
              left: 10,
              bottom: 15,
              right: 10,
            }}
            onPress={backStep}
            title={step < 2 ? '取消' : '返回'}
          />
          {step < 2 && (
            <StyledHeaderBtn
              load={loading}
              // disabled={false}
              // backgroundColor={color}
              hitSlop={{
                top: 15,
                left: 10,
                bottom: 15,
                right: 10,
              }}
              onPress={nextStep.bind(undefined, true)}
              title={step === 0 ? '下一步' : '提交'}
            />
          )}
        </StyledHeaderInner>
      </StyledHeader>
      {step === 0 && (
        <StyledInnerScrollView>
          <Controller name={CardTitle} control={control} as={RenderName} />
          {/* <Controller name={CardTitle} control={control} as={RenderName} /> */}
          <Controller
            name={CardIconAndColor}
            control={control}
            as={RenderIconAndColor}
          />
        </StyledInnerScrollView>
      )}

      <StyledInnerView>
        {step >= 1 && (
          <Main
            control={control}
            step={step - 1}
            nextStep={nextStep}
            // step={this.state.step - 1}
            // nextStep={this.__nextStep}
            // onSelect={onSelect}
          />
        )}
      </StyledInnerView>
    </StyledContent>
  );
};
export default Render;
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },

  textInputStyle: {
    height: 50,
    textAlign: 'left',
    fontSize: 15,
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 15,
  },
});
