/**
 * Created by lintong on 2017/8/4.
 * @flow
 */

// import * as immutable from 'immutable';
import React, { FC, PureComponent, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
// import { connect } from 'react-redux';
// import Toast from 'react-native-simple-toast';
// import { reduxForm, formValueSelector, change } from 'redux-form/immutable';
// import moment from 'moment';
// import { addNormalizrEntity } from '../../../redux/module/normalizr';
// import { update } from '../../../redux/module/leancloud';
// import { ICARD } from '../../../redux/reqKeys';
import { StyledContent } from './style';
import Main from './Main';
// import { defaultHabit } from '../../../configure/habit';
// import {
// import { normalize } from 'normalizr';
import {
  StyledHeader,
  StyledTitle,
  StyledHeaderInner,
  StyledHeaderBtn,
  StyledInnerView,
} from './Creat/style';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CardFormData,
  CardIconAndColor,
  // CardLimitdayTimes,
  CardLimitDayAndTimes,
  CardNotifyText,
  CardNotifyTimes,
  CardRecord,
  CardSound,
  CardTitle,
  cardValidationSchema,
} from './card_interface';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import { useGetClassesICardId } from 'src/hooks/interface';
import { LoadAnimation } from '@components/Load';
// static displayName = OptionView

// const FormID = 'CreatCardForm';

// @connect(
//   (state, props) => {
//     const id = props.route.params.iCardId;
//     let iCard = state.normalizr.get('iCard').get(id);
//     iCard = iCard && iCard.toJS();

//     // const data = props.route.params.opData
//     const propsOption = {
//       ...defaultHabit,
//       ...iCard,
//       icon: iCard.iconAndColor.name,
//       color: iCard.iconAndColor.color,
//     };

//     return {
//       initialValues: propsOption,
//       load: state.req.get('iCard').get('load'),
//       color: iCard.iconAndColor ? iCard.iconAndColor.color : '#39ba98',
//     };
//   },
//   (dispatch, props) => ({
//     // ...bindActionCreators({},dispatch),
//     //用 onChange 会导致错误 onSelect  后面改成hook-form 吧
//     onSelect: (field: string, value: string | object) => {
//       dispatch(change('CreatCardForm', field, value));
//     },
//     refresh: async () =>
//       dispatch(async (dispatch, getState) => {
//         {
//           const id = props.route.params.iCardId;
//           const state = getState();
//           const selector = formValueSelector(FormID);

//           const iCardMap = state.normalizr.get(ICARD).get(id);
//           if (iCardMap) {
//             const activityEndDate = iCardMap.get('activityEndDate');
//             if (activityEndDate) {
//               const date = activityEndDate.get('iso');
//               if (moment().isBefore(moment(date))) {
//                 Toast.show('活动期间无法修改卡片配置~');
//                 return;
//               }
//             }
//           }

//           const op = selector(
//             state,
//             'notifyTimes',
//             'notifyText',
//             'period',
//             'record',
//             'title',
//             'recordDay',
//             'icon',
//             'color',
//             'limitTimes',
//             'sound',
//           );

//           const notifyTimes = op.notifyTimes
//             .toJS()
//             .sort((a, b) => moment(a, 'HH:mm') - moment(b, 'HH:mm'));

//           const param = {
//             title: op.title,
//             period: op.period,
//             record: op.record.toJS(),
//             recordDay: op.recordDay.toJS(),
//             iconAndColor: {
//               name: op.icon,
//               color: op.color,
//             },
//             sound: op.sound || {
//               open: true,
//               item: { title: 'bell', type: 'normal', key: 'bell' },
//             },
//             limitTimes: op.limitTimes,
//             notifyText: op.notifyText,
//             notifyTimes,
//           };

//           const res = await dispatch(update(id, param, ICARD));

//           const entity = {
//             ...param,
//             ...res,
//           };
//           // console.log('entity:', entity);
//           // dispatch(addEntities({
//           //     [ICARD]: {
//           //         [entity.objectId]: entity
//           //     }
//           // }))
//           Toast.show('修改成功~!');
//           return dispatch(addNormalizrEntity(ICARD, entity));
//           // Toast.show('修改配置成功~!')
//         }
//       }),
//   }),
// )
// @reduxForm({
//   form: FormID,
// })
// class CardConfigClass extends PureComponent {
//   render() {
//     const { onSelect, nextStep, step } = this.props;
//     return (
//       <Main step={step} nextStep={this.props.nextStep} onSelect={onSelect} />
//     );
//   }
// }

const CardConfig: FC<{}> = (props) => {
  const [step, setStep] = useState(0);
  const { goBack } = useNavigation();
  const { iCardId } = useNavigationAllParamsWithType<RouteKey.cardConfig>();

  // 获取已经有的icard 数据
  const { data } = useGetClassesICardId({ id: iCardId });

  const { setValue, handleSubmit, errors, control } = useForm<CardFormData>({
    resolver: yupResolver(cardValidationSchema),
    defaultValues: {
      [CardTitle]: '',
      [CardNotifyTimes]: [],
      [CardLimitDayAndTimes]: { time: [], day: [] },
      [CardIconAndColor]: { name: '', color: '' },
      [CardNotifyText]: '',
      [CardRecord]: [],
      [CardSound]: {},
    },
    mode: 'onSubmit',
  });
  console.log('data', data);

  useEffect(() => {
    if (data) {
      const {
        notifyTimes,
        limitTimes,
        title,
        iconAndColor,
        recordDay,
        notifyText,
        record,
        sound,
      } = data;
      setValue(CardNotifyTimes, notifyTimes);
      setValue(CardLimitDayAndTimes, { day: recordDay, time: limitTimes });
      setValue(CardTitle, title);
      setValue(CardIconAndColor, iconAndColor);
      setValue(CardNotifyText, notifyText || '');
      setValue(CardRecord, record || []);
      setValue(CardSound, sound as never);
    }
  }, [data]);

  const nextStep = () => {
    step === 0 && setStep((s) => s + 1);
  };
  const backStep = () => {
    if (step === 0) {
      goBack();
    } else {
      setStep((data) => data - 1);
    }
    return null;
  };

  useEffect(() => {
    // const backStep = () => {
    //   if (step === 0) {
    //     goBack();
    //   } else {
    //     setStep((data) => data - 1);
    //   }
    //   return true;
    // };
    BackHandler.addEventListener('hardwareBackPress', backStep);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backStep);
    };
  }, [step]);

  const color = data?.iconAndColor.color || '';

  return (
    <StyledContent>
      <StyledHeader>
        <StyledTitle>习惯设置</StyledTitle>
        <StyledHeaderInner>
          {step === 0 && (
            <StyledHeaderBtn
              // load={false}
              // disabled={false}
              backgroundColor="#bfc2c7"
              hitSlop={{
                top: 15,
                left: 10,
                bottom: 15,
                right: 10,
              }}
              onPress={backStep}
              title={step === 0 ? '取消' : '返回'}
            />
          )}
          {step >= 1 && (
            <StyledHeaderBtn
              // load={false}
              // disabled={false}
              backgroundColor={color}
              hitSlop={{
                top: 15,
                left: 10,
                bottom: 15,
                right: 10,
              }}
              onPress={async () => {
                // await this.props.refresh();
                backStep();
              }}
              title="保存"
            />
          )}
        </StyledHeaderInner>
      </StyledHeader>

      <StyledInnerView>
        {!data && <LoadAnimation top={120} />}
        {data && (
          <Main control={control} step={step} nextStep={nextStep} {...props} />
        )}
      </StyledInnerView>
    </StyledContent>
  );
};

export default CardConfig;
