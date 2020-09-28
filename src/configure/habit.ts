export const defaultHabit = {
  notifyTimes: [],
  notifyText: '',
  record: [],
  recordDay: [1, 2, 3, 4, 5, 6, 7],
  limitTimes: ['00:00', '24:00'],
  icon: 'sun',
  color: '#afd2ef',
  period: '7',
};

const health1 = {
  title: '早起',
  notifyTimes: ['06:00'],
  limitTimes: ['05:00', '10:00'],
  notifyText: '愿你鹏程万里，前途无量!',
  recordDay: [1, 2, 3, 4, 5],
  color: '#a5d6a7',
};

const health2 = {
  title: '吃早餐',
  icon: 'knife',
  color: '#a5d6a7',
  notifyTimes: ['08:00'],
  limitTimes: ['05:00', '10:00'],
  notifyText: '美好的一天从早餐开始!',
};

const health3 = {
  title: '减肥',
  color: '#a5d6a7',
  icon: 'run',
  notifyTimes: ['19:00'],
  notifyText: '变成更美的自己!',
};

const health4 = {
  title: '喝水',
  color: '#a5d6a7',
  icon: 'drink',
  notifyTimes: [
    '08:00',
    '09:30',
    '11:00',
    '13:30',
    '15:00',
    '16:30',
    '20:00',
    '21:30',
  ],
  notifyText: '为生命加油!',
};
const health5 = {
  title: '护眼',
  color: '#a5d6a7',
  icon: 'eye',
  notifyTimes: ['09:30', '11:00', '15:00', '16:30'],
  notifyText: '爱护我自己!',
};

const health6 = {
  title: '准点吃饭',
  color: '#a5d6a7',
  icon: 'lunch',
  notifyTimes: ['07:30', '12:00', '19:00'],
  notifyText: '人是铁,饭是钢!',
};

const health7 = {
  title: '按时吃药',
  color: '#a5d6a7',
  icon: 'pills',
  notifyTimes: ['08:00', '12:30', '19:30'],
  notifyText: '和病魔对抗!',
};

const health8 = {
  title: '吃水果',
  color: '#a5d6a7',
  icon: 'apple',
  notifyTimes: ['08:00', '12:30', '20:00'],
  notifyText: '我爱吃水果!',
};

export const health = [
  health1,
  health2,
  health3,
  health4,
  health5,
  health6,
  health7,
  health8,
];

const lean1 = {
  title: '学习',
  color: '#c5e1a5',
  recordDay: [1, 2, 3, 4, 5],
  icon: 'studing',
  notifyTimes: ['20:00'],
  notifyText: '我爱学习,是真的!',
};

const lean2 = {
  title: '阅读',
  color: '#c5e1a5',
  icon: 'reading',
  notifyTimes: ['20:00'],
  notifyText: '读书才是正经事!',
};

const lean3 = {
  title: '练字',
  color: '#c5e1a5',
  recordDay: [6, 7],
  icon: 'homework',
  notifyTimes: ['20:00'],
  notifyText: '你的字真好看!',
};

const lean4 = {
  title: '外语学习',
  color: '#c5e1a5',
  recordDay: [1, 2, 3, 4, 5],
  icon: 'en',
  notifyTimes: ['20:00'],
  notifyText: '喜欢你认真的样子!',
};

const lean5 = {
  title: '专业技能',
  color: '#c5e1a5',
  icon: 'star',
  notifyTimes: ['20:00'],
  notifyText: '成为更好的自己!',
};

const lean6 = {
  title: '绘画',
  color: '#c5e1a5',
  icon: 'potted',
  notifyTimes: ['20:00'],
  notifyText: '栩栩如生!',
};

const lean7 = {
  title: '学吉他',
  color: '#c5e1a5',
  icon: 'guitar',
  notifyTimes: ['20:00'],
  notifyText: '孤独没有打败我!',
};

const lean8 = {
  title: '冥想',
  color: '#c5e1a5',
  icon: 'meditation',
  notifyTimes: ['20:00'],
  notifyText: '心静',
};

export const lean = [lean1, lean2, lean3, lean4, lean5, lean6, lean7, lean8];

const sport1 = {
  title: '骑行',
  color: '#d4e157',
  icon: 'riding',
  notifyTimes: ['20:00'],
  notifyText: '你是追风少年~',
};

const sport2 = {
  title: '游泳',
  color: '#d4e157',
  icon: 'swimming',
  notifyTimes: ['20:00'],
  notifyText: '生命在于运动!',
};

const sport3 = {
  title: '跑步',
  icon: 'run',
  color: '#d4e157',
  notifyTimes: ['20:00'],
  notifyText: '别停下,run!',
};

const sport4 = {
  title: '瑜伽',
  icon: 'yoga',
  color: '#d4e157',
  notifyTimes: ['20:00'],
  notifyText: '你今天真漂亮!',
};

const sport5 = {
  title: '羽毛球',
  color: '#d4e157',
  icon: 'badminton',
  notifyTimes: ['20:00'],
  notifyText: '跳跃吧!',
};

const sport6 = {
  title: '乒乓球',
  color: '#d4e157',
  icon: 'tennis',
  notifyTimes: ['20:00'],
  notifyText: '动起来!',
};

const sport7 = {
  title: '篮球',
  icon: 'basketball',
  color: '#d4e157',
  notifyTimes: ['20:00'],
  notifyText: '呼朋唤友一起去!',
};

const sport8 = {
  title: '爬山',
  color: '#d4e157',
  icon: 'mount',
  recordDay: [6, 7],
  notifyTimes: ['20:00'],
  notifyText: '去看那美景!',
};

export const sport = [
  sport1,
  sport2,
  sport3,
  sport4,
  sport5,
  sport6,
  sport7,
  sport8,
];

const feeling1 = {
  title: '关心Ta',
  color: '#ffe082',
  icon: 'love',
  notifyTimes: ['20:00'],
  notifyText: '我很好,你呢？',
};

const feeling2 = {
  title: '联系Ta',
  color: '#ffe082',
  icon: 'phone',
  notifyTimes: ['20:00'],
  notifyText: '我想你了!',
};
const feeling3 = {
  title: '陪护',
  color: '#ffe082',
  icon: 'parenting',
  notifyTimes: ['20:00'],
  notifyText: '我的乖宝贝!',
};

const feeling4 = {
  title: '微笑',
  color: '#ffe082',
  icon: 'smile',
  notifyTimes: ['08:00'],
  notifyText: '笑对人生!',
};

const feeling5 = {
  title: '宠物照看',
  color: '#ffe082',
  icon: 'dogBowl',
  notifyTimes: ['20:00'],
  notifyText: '铲屎官,快来!',
};

const feeling6 = {
  title: '放松',
  color: '#ffe082',
  icon: 'music',
  notifyTimes: ['20:00'],
  notifyText: '休息,休息',
};
const feeling7 = {
  title: '烹饪',
  color: '#ffe082',
  icon: 'boiling',
  notifyTimes: ['09:30', '11:00', '15:00', '16:30'],
  notifyText: '你会享受它的',
};

const feeling8 = {
  title: '摄影',
  color: '#ffe082',
  icon: 'camera',
  notifyTimes: ['20:00'],
  notifyText: '片刻即是永恒',
};

export const feeling = [
  feeling1,
  feeling2,
  feeling3,
  feeling4,
  feeling5,
  feeling6,
  feeling7,
  feeling8,
];

const addDefaultHabit = (obj) =>
  obj.map((item) => {
    return {
      ...defaultHabit,
      ...item,
    };
  });

export const habits = {
  健康: addDefaultHabit(health),
  学习: addDefaultHabit(lean),
  运动: addDefaultHabit(sport),
  情感: addDefaultHabit(feeling),
};
