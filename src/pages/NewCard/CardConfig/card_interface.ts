/*
 * @Author: tonyYo
 * @Date: 2020-12-25 09:38:48
 * @LastEditors: tonyYo
 * @LastEditTime: 2020-12-25 16:56:34
 * @FilePath: /Combo/src/pages/NewCard/CardConfig/card_interface.ts
 */
import { SoundsType } from '@configure/source';
import * as yup from 'yup';

// title: op.title,
// record: op.record.toJS(),
// recordDay: op.recordDay.toJS(),
// iconAndColor: {
//   name: op.icon,
//   color: op.color,
// },
// sound: op.sound || {
//   open: true,
//   item: { title: 'bell', type: 'normal', key: 'bell' },
// },
// limitTimes: op.limitTimes,
// notifyText: op.notifyText,
// notifyTimes,

export const CardTitle = 'title';
export const CardRecord = 'record';
// export const CardRecordDay = 'recordDay';
export const CardIconAndColor = 'iconAndColor';
export const CardSound = 'sound';
export const CardLimitDayAndTimes = 'limitTimes';
export const CardNotifyText = 'notifyText';
export const CardNotifyTimes = 'notifyTimes';

export type CardProps =
  | 'menu'
  | typeof CardTitle
  | typeof CardRecord
  | typeof CardIconAndColor
  | typeof CardSound
  | typeof CardLimitDayAndTimes
  | typeof CardNotifyTimes
  | typeof CardNotifyText;

export type CardFormData = {
  [CardTitle]: string;
  [CardRecord]: string[];
  [CardLimitDayAndTimes]: { time: string[]; day: number[] };
  [CardIconAndColor]: { name: string; color: string };
  [CardSound]: {
    open: boolean;
    item: SoundsType;
  };
  // [CardLimitTimes]: string[];
  [CardNotifyText]: string;
  [CardNotifyTimes]: string[];
};

export const cardValidationSchema = yup.object().shape({
  [CardTitle]: yup.string().max(50).trim().label('标题'),
  [CardRecord]: yup.array().of(yup.string()).label('打卡要求'),
  // [CardLimitDayAndTimes]: yup.array().of(yup.number()).label('打卡时间限制'),
  [CardLimitDayAndTimes]: yup
    .object()
    .shape({
      time: yup.array().of(yup.string()).required(),
      day: yup.array().of(yup.number()).required(),
    })
    .label('打卡时间限制'),
  [CardIconAndColor]: yup
    .object()
    .shape({
      name: yup.string().max(50).required(),
      color: yup.string().max(50).required(),
    })
    .label('icon和颜色'),
  [CardSound]: yup
    .object()
    .shape({
      open: yup.boolean().required(),
      item: yup
        .object()
        .shape({
          title: yup.string().max(50).required(),
          type: yup.string().max(50).required(),
          key: yup.string().max(50).required(),
        })
        .required(),
    })
    .label('打卡音效'),
  // [CardLimitTimes]: yup.array().of(yup.string()).label('打卡时间限制'),
  [CardNotifyText]: yup.string().max(50).trim().label('打卡激励语'),
  [CardNotifyTimes]: yup.array().of(yup.string()).label('打卡提醒时间'),
});
