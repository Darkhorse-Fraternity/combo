export const defaultHabit = {
  notifyTimes: [],
  period: '7',
  notifyText: '',
  record: [],
  recordDay: [1, 2, 3, 4, 5, 6, 7],
  icon: 'sun',
  color: '#afd2ef',
}

const health1 = {
  title: '早起',
  notifyTimes: ['06:00'],
  notifyText: '愿你鹏程万里，前途无量!',
  color:'#e8f5e9',
}

const health2 = {
  title: '吃早餐',
  icon:'knife',
  color:'#e8f5e9',
}

const health3 = {
  title: '减肥',
  color:'#e8f5e9',
  icon:'run'
}

const health4 = {
  title: '喝水',
  color:'#e8f5e9',
  icon:'drink'
}
const health5 = {
  title: '护眼',
  color:'#e8f5e9',
  icon:'eye'
}

const health6 = {
  title: '准点吃饭',
  color:'#e8f5e9',
  icon:'lunch',
}

const health7 = {
  title: '按时吃药',
  color:'#e8f5e9',
  icon:'pills'
}

const health8 = {
  title: '吃水果',
  color:'#e8f5e9',
  icon:'apple'
}

export const health = [
  health1,
  health2,
  health3,
  health4,
  health5,
  health6,
  health7,
  health8,
]


const lean1 = {
  title: '写作',
  color:'#f1f8e9',
  icon:'takeAShower',
}



const lean2 = {
  title: '阅读',
  color:'#f1f8e9',
  icon:'reading',
}

const lean3 = {
  title: '练字',
  color:'#f1f8e9',
  icon:'homework',
}

const lean4 = {
  title: '背单词',
  color:'#f1f8e9',
  icon:'en',
}

const lean5 = {
  title: '专业技能',
  color:'#f1f8e9',
  icon:'star',
}

const lean6 = {
  title: '绘画',
  color:'#f1f8e9',
  icon:'potted',
}

const lean7 = {
  title: '学吉他',
  color:'#f1f8e9',
  icon:'guitar',
}

const lean8 = {
  title: '冥想',
  color:'#f1f8e9',
  icon:'meditation',
}


export const lean = [
  lean1,
  lean2,
  lean3,
  lean4,
  lean5,
  lean6,
  lean7,
  lean8
]


const sport1 = {
  title: '骑行',
  color: '#f9fbe7',
  icon:'riding',

}

const sport2 = {
  title: '游泳',
  color: '#f9fbe7',
  icon:"swimming",
}

const sport3 = {
  title: '跑步',
  icon: 'run',
  color: '#f9fbe7'
}

const sport4 = {
  title: '羽毛球',
  color: '#f9fbe7',
  icon:'badminton'
}

const sport5 = {
  title: '瑜伽',
  icon: 'yoga',
  color: '#f9fbe7'
}

const sport6 = {
  title: '乒乓球',
  color: '#f9fbe7',
  icon:'tennis',
}

const sport7 = {
  title: '爬山',
  color: '#f9fbe7',
  icon:'mount'
}

const sport8 = {
  title: '篮球',
  icon:'basketball',
  color: '#f9fbe7'
}

export const sport = [
  sport1,
  sport2,
  sport3,
  sport4,
  sport5,
  sport6,
  sport7,
  sport8
]


const feeling1 = {
  title: '宠物照看',
  color:'#fffde7',
  icon:'dogBowl'
}

const feeling2 = {
  title: '打电话',
  color:'#fffde7',
  icon:'phone',
}
const feeling3 = {
  title: '陪护',
  color:'#fffde7',
  icon:'parenting',
}

const feeling4 = {
  title: '微笑',
  color:'#fffde7',
  icon:'smile',
}
const feeling5 = {
  title: '关心Ta',
  color:'#fffde7',
  icon:'love',
}

const feeling6 = {
  title: '放松',
  color:'#fffde7',
  icon:'music',
}
const feeling7 = {
  title: '烹饪',
  color:'#fffde7',
  icon:'boiling',
}

const feeling8 = {
  title: '摄影',
  color:'#fffde7',
  icon:'camera'
}


export const feeling = [
  feeling1,
  feeling2,
  feeling3,
  feeling4,
  feeling5,
  feeling6,
  feeling7,
  feeling8
]


const addDefaultHabit = (obj) => obj.map(item => {
  return {
    ...defaultHabit,
    ...item
  }
})

export const habits = {
  "健康": addDefaultHabit(health),
  "学习": addDefaultHabit(lean),
  "运动": addDefaultHabit(sport),
  "情感": addDefaultHabit(feeling),
}


console.log('habits:', habits);