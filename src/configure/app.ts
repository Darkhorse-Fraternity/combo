import { storage } from './storage';

const allKey = 'all'

export const localRemindConfig = async ()=>{
  const res =  await storage.getBatchDataWithIds({
    key: 'localRemind',
    ids:[allKey],
  });
  
  if(res.length > 0){

  }
}