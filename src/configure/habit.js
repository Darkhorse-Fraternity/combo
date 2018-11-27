export  const  defaultHabit = {
  notifyTimes: [],
  period: '7',
  notifyText: '',
  record: [],
  recordDay: [1, 2, 3, 4, 5, 6, 7],
  icon: 'sun',
  color: '#afd2ef',
}

 const health1 = {
  title:'早起',
}

 const health2 = {
  title:'吃早餐',
}

const health3 = {
  title:'减肥',
}

const health4 = {
  title:'吃水果',
}
const health5 = {
  title:'早起',
}

const health6 = {
  title:'吃早餐',
}

const health7 = {
  title:'减肥',
}

const health8 = {
  title:'吃水果',
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
  title:'早起',
}

const lean2 = {
  title:'吃早餐',
}

export const lean = [
  lean1,
  lean2
]


 const sport1 = {
  title:'步行',
}

 const sport2 = {
  title:'跑步',
}

export const sport = [
  sport1,
  sport2
]


const feeling1 = {
  title:'步行',
}

const feeling2 = {
  title:'跑步',
}

export const feeling = [
  feeling1,
  feeling2
]





const addDefaultHabit = (obj) => obj.map(item=>{
  return {
  ...defaultHabit,
  ...item
}})

export const  habits = {
  "健康":addDefaultHabit(health),
  "学习":addDefaultHabit(lean),
  "运动":addDefaultHabit(sport),
  "情感":addDefaultHabit(feeling),
}


console.log('habits:', habits);