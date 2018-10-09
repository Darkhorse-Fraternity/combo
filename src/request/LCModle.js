export function point(className, objectId) {
  return {
    "__type": "Pointer",
    "className": className,
    "objectId": objectId
  }
}

export function pointModel(name, objectId, className) {
  return {
    [name]: point(className || name, objectId),
  }
}

export function user(objectId) {
  return pointModel("user", objectId, '_User')
}

export function selfUser() {
  return dispatch => dispatch((dispatch, getState) => {
    const id = getState().user.data.objectId;
    return user(id)
  })
}

export function iCard(id) {
  return pointModel('iCard', id)
}

export function iUse(id) {
  return pointModel('iUse', id)
}

export function iDo(id) {
  return pointModel('iDo', id)
}


export function Course(id) {
  return pointModel('course', id)
}

