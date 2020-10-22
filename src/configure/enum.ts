export const Privacy = {
  close: 0,
  openToCoach: 1,
  open: 2,
};

export const CourseStatu = {
  close: 0,
  open: 1,
};

export const CircleState = {
  close: 0,
  open: 1,
};

export const Days = ['周一', '周二', '周三', '周四', '周五', '周六', '周天'];
export const daysText = (recordDay:[]) => {
  const days = recordDay.sort();
  // console.log('days:', days);
  if (days.length === 0) {
    return '无';
  } else if (days.length === 7) {
    return '每天';
  } else if (days.length === 2 && days[0] === 6) {
    return '周六与周日';
  } else if (days.length === 5 && days[4] === 5) {
    return '周一至周五';
  } else {
    return days.map((day) => Days[day - 1]).toString();
  }
};

export enum DeviceEventEmitterKey {
  iDO_Reload='iDO_Reload'
}