export function point(className:string, objectId:string) {
  return {
    "__type": "Pointer",
    "className": className,
    "objectId": objectId
  }
}

export function pointModel(name:string, objectId:string, className?:string) {
  return {
    [name]: point(className || name, objectId),
  }
}

export function user(objectId:string) {
  return pointModel("user", objectId, '_User')
}

export function selfUser() {
  return dispatch => dispatch((dispatch, getState) => {
    const id = getState().user.data.objectId;
    return user(id)
  })
}

export function iCard(id:string) {
  return pointModel('iCard', id)
}

export function iUse(id:string) {
  return pointModel('iUse', id)
}

export function iDo(id:string) {
  return pointModel('iDo', id)
}


// export function Course(id:string) {
//   return pointModel('Course', id)
// }

export function Flag(id:string) {
  return pointModel('Flag', id)
}

export function FlagRecord(id:string) {
  return pointModel('FlagRecord', id)
}

export function ISODate(iso:string){
  return {
    __type:'Date',
    iso
  }
}